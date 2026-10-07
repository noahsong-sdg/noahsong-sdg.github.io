const { isPost, isReady, publishedTime, slug, fileTitle } = require("../../lib/posts");

module.exports = {
  title: data => data.title || (isPost(data) ? fileTitle(data) : data.title),
  displayDate: data => data.displayDate || (isPost(data) && isReady(data)
    ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
      .format(new Date(publishedTime(data.publishedDate))) : data.displayDate),
  permalink: data => {
    if (!isPost(data)) return data.permalink;
    if (!isReady(data)) return false;
    return data.permalink || `/writing/${slug(data.title || fileTitle(data))}/`;
  },
};
