const { isReady, publishedTime } = require("./lib/posts");

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("publishedPosts", collection => {
    const posts = collection.getFilteredByTag("posts").filter(post => isReady(post.data));
    const urls = new Set();
    for (const post of posts) {
      if (urls.has(post.url)) throw new Error(`Duplicate blog URL: ${post.url}`);
      urls.add(post.url);
    }
    return posts.sort((a, b) => publishedTime(b.data.publishedDate) - publishedTime(a.data.publishedDate)
      || a.inputPath.localeCompare(b.inputPath));
  });
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/files/");
  eleventyConfig.addPassthroughCopy("./src/js/");
  eleventyConfig.addWatchTarget("./src/css/");

  eleventyConfig.addGlobalData("posthog", {
    projectToken: process.env.POSTHOG_PROJECT_TOKEN,
    host: process.env.POSTHOG_HOST,
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
