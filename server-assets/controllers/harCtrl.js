import { defer, all } from 'q';

export default {
  upload(req, res) {
    // Eventually need to make more robust to validate that the
    // file is a har file. Probably best to have some validation in the
    // front and the back.
    const aFiles = parseFiles(req.body.harsA);
    const bFiles = parseFiles(req.body.harsB);
    const aData = compileAverages(aFiles);
    const bData = compileAverages(bFiles);
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
  const jsRe = /(javascript|ecmascript)/g;
  const imgRe = /(png|jpg|jpeg|gif|tiff|bmp)/g;
  const cssRe = /(css)/g;
  const htmlRe = /(html)/g;
  let resultsObj = {
    js: 0,
    images: 0,
    css: 0,
    html: 0,
    other: 0,
  };
  entries.forEach(entry => {
    const mimeType = entry.response.content.mimeType;
    const timings = entry.response.timings;
    if (jsRe.test(mimeType)) {
      resultsObj.js += addTimings(timings);
    } else if (imgRe.test(mimeType)) {
      resultsObj.images += addTimings(timings);
    } else if (cssRe.test(mimeType)) {
      resultsObj.css += addTimings(timings);
    } else if (htmlRe.test(mimeType)) {
      resultsObj.html += addTimings(timings);
    }
  });
  return resultsObj;
}

function addTimings(timings) {
  let total = 0;
  for (let key in timings) {
    if (timings[key] > 0) {
      total += timings[key];
    }
  }

  return total;
}
