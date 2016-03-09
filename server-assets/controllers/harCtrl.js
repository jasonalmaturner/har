import { defer, all } from 'q';

export default {
  upload(req, res) {
    // console.log(1111, req.body);
    let aFiles = parseFiles(req.body.harsA);
    let bFiles = parseFiles(req.body.harsB);
    let aData = compileAverages(aFiles);
    let bData = compileAverages(bFiles);
    console.log(aData);
    res.json({
      aData,
      bData,
    });
  },
};

function parseFiles(arr) {
  return arr.map(file => JSON.parse(file));
}

function compileAverages(arr) {
  let onLoadTotal = 0;
  let onContentLoadTotal = 0;
  let requestTotal = 0;
  arr.forEach(file => {
    onLoadTotal += file.log.pages[0].pageTimings.onLoad;
    onContentLoadTotal += file.log.pages[0].pageTimings.onContentLoad;
    requestTotal += file.log.entries.length;
  });
  return {
    onLoadAvg: onLoadTotal / requestTotal,
    onContentAvg: onContentLoadTotal / requestTotal,
    requestAvg: requestTotal / arr.length,
  };
}

function compileFileLoads(entries) {
  
}
