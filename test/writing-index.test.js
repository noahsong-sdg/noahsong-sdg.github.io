const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

test("writing index lists posts newest first without descriptions", () => {
  const html = fs.readFileSync("public/writing/index.html", "utf8");
  const items = [...html.matchAll(/<section class="post-list-item">([\s\S]*?)<\/section>/g)];
  const dates = items.map(([, item]) => {
    const displayDate = item.match(/<p class="post-meta">([^<]+)<\/p>/)?.[1];

    assert.ok(displayDate, "each writing entry has a display date");
    assert.equal((item.match(/<p/g) || []).length, 1, "writing entries only show their date");

    return new Date(displayDate).getTime();
  });

  assert.ok(items.length > 1, "writing index contains multiple posts");
  assert.deepEqual(dates, [...dates].sort((a, b) => b - a));
});
