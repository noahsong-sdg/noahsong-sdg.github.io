const path = require("node:path");

const PUBLIC_ESSAY_START = "<!-- PUBLIC ESSAY START -->";
const PUBLIC_ESSAY_END = "<!-- PUBLIC ESSAY END -->";

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

function publicEssay(content) {
  const start = content.indexOf(PUBLIC_ESSAY_START);
  const end = content.indexOf(PUBLIC_ESSAY_END);
  if (start === -1 && end === -1) return content;
  if (start === -1 || end === -1 || end < start) {
    throw new Error("Public essay markers must appear once and in START/END order.");
  }
  if (content.indexOf(PUBLIC_ESSAY_START, start + PUBLIC_ESSAY_START.length) !== -1
    || content.indexOf(PUBLIC_ESSAY_END, end + PUBLIC_ESSAY_END.length) !== -1) {
    throw new Error("Public essay markers may only appear once.");
  }
  return content.slice(start + PUBLIC_ESSAY_START.length, end).trim();
}

module.exports = {
  isPost,
  isReady,
  publishedTime,
  slug,
  publicEssay,
  fileTitle: data => path.basename(data.page.inputPath, ".md"),
};
