const MarkdownIt = require("markdown-it");

function callouts(md) {
  md.core.ruler.before("inline", "obsidian callouts", state => {
    for (let i = 0; i < state.tokens.length; i++) {
      const tokens = state.tokens;
      if (tokens[i].type !== "blockquote_open" || tokens[i + 1]?.type !== "paragraph_open") continue;
      const header = tokens[i + 2];
      const match = header?.content.match(/^\[!([a-z]+)\]([+-]?)[ \t]*([^\n]*)(?:\n([\s\S]*))?$/i);
      if (!match || tokens[i + 3]?.type !== "paragraph_close") continue;
      let end = i + 1;
      let depth = 1;
      for (; end < tokens.length; end++) {
        if (tokens[end].type === "blockquote_open") depth++;
        if (tokens[end].type === "blockquote_close" && --depth === 0) break;
      }
      const title = md.utils.escapeHtml(match[3] || match[1]);
      const collapsible = Boolean(match[2]);
      tokens[i].type = "html_block";
      tokens[i].content = collapsible
        ? `<details class="callout"${match[2] === "+" ? " open" : ""}><summary>${title}</summary>\n`
        : `<aside class="callout"><p class="callout-title">${title}</p>\n`;
      tokens[end].type = "html_block";
      tokens[end].content = collapsible ? "</details>\n" : "</aside>\n";
      if (match[4]) {
        header.content = match[4];
      } else {
        tokens.splice(i + 1, 3);
      }
    }
  });
}

function markdown() {
  const md = new MarkdownIt({ html: true });
  md.use(require("markdown-it-footnote"));
  md.use(require("markdown-it-texmath"), {
    engine: require("katex"),
    delimiters: "dollars",
    katexOptions: { trust: false, throwOnError: true },
  });
  md.use(callouts);
  const tableOpen = md.renderer.rules.table_open || (() => "<table>\n");
  const tableClose = md.renderer.rules.table_close || (() => "</table>\n");
  md.renderer.rules.table_open = (...args) => '<div class="table-scroll" role="region" aria-label="Table" tabindex="0">' + tableOpen(...args);
  md.renderer.rules.table_close = (...args) => tableClose(...args) + "</div>\n";
  return md;
}

module.exports = { markdown };
