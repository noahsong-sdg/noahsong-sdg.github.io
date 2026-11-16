const fs = require("node:fs");
const path = require("node:path");
const { publicEssay, slug } = require("../lib/posts");

// An explicit import, not a vault-wide copy: private tails and unreferenced files
// must never enter the website checkout, even for an unpublished draft.
function importPost(input, siteRoot, { force = false } = {}) {
  const source = fs.readFileSync(input, "utf8");
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) throw new Error("The note needs YAML frontmatter.");
  let metadata = frontmatter[1];
  metadata = /^draft:/m.test(metadata)
    ? metadata.replace(/^draft:.*$/m, "draft: true") : `${metadata}\ndraft: true`;
  let body = publicEssay(source.slice(frontmatter[0].length));
  const title = path.basename(input, ".md");
  const post = path.join(siteRoot, "src/posts", `${title}.md`);
  if (!force && fs.existsSync(post)) throw new Error("Post already exists; pass --force to replace it.");
  const sourceRoot = fs.realpathSync(path.dirname(input));
  const assetDirectory = `files/posts/${slug(title)}`;
  const assets = [];
  body = body.replace(/(!\[[^\]\n]*\]\()([^\s)]+)(\))/g, (image, open, url, close) => {
    if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(url)) return image;
    const decoded = decodeURIComponent(url);
    const origin = fs.realpathSync(path.resolve(sourceRoot, decoded));
    if (!origin.startsWith(sourceRoot + path.sep)) throw new Error(`Image outside note directory: ${url}`);
    if (!/\.(?:png|jpe?g|gif|webp|svg)$/i.test(origin)) throw new Error(`Unsupported image: ${url}`);
    // Preserve directories to avoid basename collisions between attachment folders.
    const relative = path.relative(sourceRoot, origin).split(path.sep).join("/");
    const destination = path.join(siteRoot, "src", assetDirectory, relative);
    assets.push({ origin, destination });
    return `${open}/${assetDirectory}/${relative.split("/").map(encodeURIComponent).join("/")}${close}`;
  });
  for (const { origin, destination } of assets) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(origin, destination);
  }
  fs.mkdirSync(path.dirname(post), { recursive: true });
  fs.writeFileSync(post, `---\n${metadata}\n---\n\n${body}\n`);
  return { post, images: assets.length };
}

if (require.main === module) {
  const input = process.argv[2];
  if (!input) throw new Error("Usage: npm run import-post -- /absolute/note.md [--force]");
  console.log(importPost(path.resolve(input), path.resolve(__dirname, ".."), {
    force: process.argv.includes("--force"),
  }));
}

module.exports = { importPost };
