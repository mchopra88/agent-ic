export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy({"src/_data/journal-cache.json": "journal/data.json"});
  // Videos hidden for now — MP4 passthrough disabled
  // eleventyConfig.addPassthroughCopy({"src/videos/*.mp4": "videos/"});
  eleventyConfig.addFilter("isoDate", function(date) {
    if (!date) return "";
    const d = new Date(date);
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  });
  eleventyConfig.addCollection("essays", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/essays/*.md").sort((a, b) => {
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
