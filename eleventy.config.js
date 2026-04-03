import crypto from 'node:crypto';

// --- Encryption helpers ---
const TIER_SALTS = {
  commercial: 'e3b0c44298fc1c149afbf4c8996fb924',
  personal:   'a665a45920422f9d417e4867efdc4fb8'
};
const ITERATIONS = 600000;
const KEY_LENGTH = 32; // 256 bits

function encryptContent(htmlContent, tier, password) {
  const salt = Buffer.from(TIER_SALTS[tier], 'hex');
  const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha256');
  const iv = crypto.randomBytes(12); // 96-bit IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(htmlContent, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  // Append authTag to ciphertext (browser crypto.subtle expects this)
  const combined = Buffer.concat([encrypted, authTag]);
  return {
    tier,
    iv: iv.toString('hex'),
    ciphertext: combined.toString('hex')
  };
}

// --- Passwords from env ---
const ENCRYPT_COMMERCIAL = process.env.ENCRYPT_COMMERCIAL || '';
const ENCRYPT_PERSONAL   = process.env.ENCRYPT_PERSONAL || '';

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy({"src/_data/journal-cache.json": "journal/data.json"});
  eleventyConfig.addPassthroughCopy({"src/js": "js"});
  // Videos hidden for now — MP4 passthrough disabled
  // eleventyConfig.addPassthroughCopy({"src/videos/*.mp4": "videos/"});
  eleventyConfig.addFilter("isoDate", function(date) {
    if (!date) return "";
    const d = new Date(date);
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  });

  // Encryption filter for essay templates
  eleventyConfig.addFilter("encryptEssay", function(content, tier) {
    if (!tier || tier === 'public') return content;
    const password = tier === 'commercial' ? ENCRYPT_COMMERCIAL : ENCRYPT_PERSONAL;
    if (!password) {
      throw new Error(`Missing ENCRYPT_${tier.toUpperCase()} env var. Cannot build encrypted essays without passwords.`);
    }
    return JSON.stringify(encryptContent(content, tier, password));
  });

  // Essays collection: include public + commercial (shown in index), exclude personal (hidden from index)
  eleventyConfig.addCollection("essays", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/essays/*.md")
      .filter(item => item.data.tier !== 'personal')
      .sort((a, b) => {
        return (b.data.order || 0) - (a.data.order || 0);
      });
  });

  // All essays including personal — needed so Eleventy still builds their HTML pages
  eleventyConfig.addCollection("allEssays", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/essays/*.md")
      .sort((a, b) => {
        return (b.data.order || 0) - (a.data.order || 0);
      });
  });

  // Videos hidden for now
  // eleventyConfig.addCollection("videos", function(collectionApi) {
  //   return collectionApi.getFilteredByGlob("src/videos/*.md").sort((a, b) => {
  //     return (b.data.order || 0) - (a.data.order || 0);
  //   });
  // });
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
