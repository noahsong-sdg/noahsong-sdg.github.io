const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const test = require("node:test");
const { publishedTime, slug } = require("../lib/posts");

const root = path.resolve(__dirname, "..");
function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? files(p) : [p];
  });
}

test("every rendered page omits description decks and empty drafts", () => {
  const descriptions = files(path.join(root, "src")).filter(p => /\.(md|njk)$/.test(p))
    .flatMap(p => [...fs.readFileSync(p, "utf8").matchAll(/^description: (.+)$/gm)].map(m => m[1]));
  for (const file of files(path.join(root, "public")).filter(p => p.endsWith(".html"))) {
    const html = fs.readFileSync(file, "utf8");
    for (const description of descriptions) assert.ok(!html.includes(description), `${file} contains a subtitle`);
    assert.ok(!html.includes("Ammunition and Leverage"), "empty draft must not be listed");
  }
  assert.ok(!fs.existsSync(path.join(root, "public/posts/Ammunition and Leverage/index.html")));
});

test("native template creates a safe draft, then fills metadata and sorts by publishedDate", t => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "noah-blog-test-"));
  t.after(() => fs.rmSync(fixture, { recursive: true, force: true }));
  for (const name of [".eleventy.js", "lib", "src/_includes", "src/_data", "src/pages", "src/posts/posts.json"])
    fs.cpSync(path.join(root, name), path.join(fixture, name), { recursive: true });
  // Use reversed filenames and unrelated legacy date fields to distinguish date sorting from filesystem order.
  fs.writeFileSync(path.join(fixture, "src/posts/Z older.md"), '---\npublishedDate: "2026-01-01"\ndate: "2026-12-01"\n---\nOlder body.');
  const template = fs.readFileSync(path.join(root, "tools/Blog post.md"), "utf8");
  assert.ok(template.includes('{{date:YYYY-MM-DD}}'));
  const post = path.join(fixture, "src/posts/A newer.md");
  const draft = template.replace('{{date:YYYY-MM-DD}}', '2026-10-07') + '## Keep this body heading\n\nNewer body.';
  fs.writeFileSync(post, draft);
  fs.writeFileSync(path.join(fixture, "src/posts/Empty.md"), '');
  fs.writeFileSync(path.join(fixture, "src/posts/Invalid date.md"), '---\npublishedDate: "2026-02-31"\n---\nInvalid.');
  fs.writeFileSync(path.join(fixture, "private-note.md"), '# PRIVATE_SENTINEL');
  const build = () => {
    fs.rmSync(path.join(fixture, "public"), { recursive: true, force: true });
    execFileSync(process.execPath, [path.join(root, "node_modules/.bin/eleventy")], { cwd: fixture, stdio: "pipe" });
  };
  build();
  assert.ok(!fs.existsSync(path.join(fixture, "public/writing/a-newer/index.html")));
  assert.ok(!fs.readFileSync(path.join(fixture, "public/writing/index.html"), "utf8").includes('A newer'));
  fs.writeFileSync(post, draft.replace('draft: true', 'draft: false'));
  build();
  const html = fs.readFileSync(path.join(fixture, "public/writing/a-newer/index.html"), "utf8");
  assert.ok(html.includes('<h1>A newer</h1>'));
  assert.ok(html.includes('Keep this body heading'));
  const index = fs.readFileSync(path.join(fixture, "public/writing/index.html"), "utf8");
  assert.ok(index.indexOf('A newer') < index.indexOf('Z older'));
  assert.ok(index.includes('October 7, 2026'));
  assert.ok(!index.includes('Empty') && !index.includes('Invalid date'));
  assert.ok(!files(path.join(fixture, "public")).some(p => fs.readFileSync(p, 'utf8').includes('PRIVATE_SENTINEL')));
  // Future dates do not schedule publication: draft is the explicit guard.
  fs.writeFileSync(post, draft.replace('draft: true', 'draft: false').replace('2026-10-07', '2099-10-07'));
  build();
  assert.ok(fs.existsSync(path.join(fixture, "public/writing/a-newer/index.html")));
});

test("date validation and URL slugs are stable", () => {
  assert.ok(Number.isNaN(publishedTime('2026-02-31')));
  assert.ok(Number.isNaN(publishedTime(undefined)));
  assert.equal(slug('Café, notes & ideas!'), 'cafe-notes-ideas');
});
