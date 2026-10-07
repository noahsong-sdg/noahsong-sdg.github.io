// Eleventy 3 supplies globs; Chokidar 4 accepts files and directories.
// Watch each glob's directory so edits and newly created posts trigger builds.
function directoryTargets(targets) {
  return [...new Set(targets.map(target => {
    const glob = target.search(/[*?{[]/);
    return glob < 0 ? target : target.slice(0, target.lastIndexOf('/', glob)) || '.';
  }))];
}
function adaptWatchTargets(eleventy) {
  const getTargets = eleventy.getWatchedFiles.bind(eleventy);
  eleventy.getWatchedFiles = async () => directoryTargets(await getTargets());
}
module.exports = { directoryTargets, adaptWatchTargets };
