export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addCollection("essays", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/essays/*.md").sort((a, b) => {
      return (b.data.order || 0) - (a.data.order || 0);
    });
  });
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
