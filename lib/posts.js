const path = require("node:path");

function isPost(data) {
  return /(?:^|\/)src\/posts\/.*\.md$/.test(data.page?.inputPath || "");
}

function publishedTime(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : NaN;
}

function isReady(data) {
  return data.draft !== true && Number.isFinite(publishedTime(data.publishedDate));
}

function slug(value) {
  const result = value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!result) throw new Error("Choose a title with letters or numbers, or provide a permalink.");
  return result;
}

module.exports = { isPost, isReady, publishedTime, slug, fileTitle: data => path.basename(data.page.inputPath, ".md") };
