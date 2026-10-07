# Writing a post

Create a Markdown file in `src/posts`. Its filename becomes the title unless you add a `title` field. Start from `tools/Blog post.md`; Obsidian's Templates command fills its date placeholder when this folder is selected as the template folder. When copying manually, replace the placeholder with a quoted date such as `"2026-10-07"`.

Keep `draft: true` while writing. Set `draft: false` to publish. A valid `publishedDate` in `YYYY-MM-DD` format is required. Future dates publish immediately; they do not schedule publication. Posts appear newest first by this date. The display date and URL are generated automatically. Once a post is published, preserve its filename/title or set an explicit `permalink` to preserve its URL.

Run `npm start` to preview, `npm test` to build and verify, and `npm run build` for production output. Only `src` becomes site content. The build clears disposable `public` output so posts switched back to drafts disappear.

## Dependency compatibility

The overrides use Chokidar 4 and argparse 2 to remove vulnerable `braces` and `sprintf-js` dependency chains while retaining Eleventy 3.1.6. Eleventy 3 supplies watcher globs, so the development runner converts those targets to directories for Chokidar 4. Use `npm start` for this adapter. Build output, Markdown/YAML parsing, editing existing posts, creating new posts, and the development server were checked with these overrides.
