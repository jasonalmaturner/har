import { defer, all } from 'q';

export default {
  upload(req, res) {
    // Eventually need to make more robust to validate that the
    // file is a har file. Probably best to have some validation in the
    // front and the back.
    if (!req.body.harsA || !req.body.harsB) {
      return res.status(500).json('need two sets of file(s)');
    }

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
  let jsTotal = 0;
  let imagesTotal = 0;
  let cssTotal = 0;
  let htmlTotal = 0;
  let otherTotal = 0;
  arr.forEach(file => {
    onLoadTotal += file.log.pages[0].pageTimings.onLoad;
    onContentLoadTotal += file.log.pages[0].pageTimings.onContentLoad;
    requestTotal += file.log.entries.length;
    const {
      js, images, css, html,
    } = compileFileLoads(file.log.entries, file.log.pages[0].pageTimings.onLoad);
    console.log(111111, js, images, css, html);
    jsTotal += js;
    imagesTotal += images;
    cssTotal += css;
    htmlTotal += html;
  });
  const onLoadAvg = onLoadTotal / requestTotal;
  const onContentAvg = onContentLoadTotal / requestTotal;
  const requestAvg = requestTotal / arr.length;
  const jsAvg = jsTotal / arr.length;
  const imagesAvg = imagesTotal / arr.length;
  const cssAvg = cssTotal / arr.length;
  const htmlAvg = htmlTotal / arr.length;
  const otherAvg = 1 - (jsAvg + imagesAvg + cssAvg + htmlAvg);

  // otherAvg is not a true average. It's just what's left after all the other file averages
  // are added up.
  return {
    onLoadAvg,
    onContentAvg,
    requestAvg,
    jsAvg,
    imagesAvg,
    cssAvg,
    htmlAvg,
    otherAvg,
  };
}

function compileFileLoads(entries, onLoad) {
  const jsRe = /(\/javascript|\/ecmascript)/g;
  const imgRe = /(\/png|\/jpg|\/jpeg|\/gif|\/tiff|\/bmp)/g;
  const cssRe = /(\/css)/g;
  const htmlRe = /(\/html)/g;
  let js = 0;
  let images = 0;
  let css = 0;
  let html = 0;
  let loadTimeTotal = 0;
  entries.forEach(entry => {
    const mimeType = entry.response.content.mimeType;
    const loadTime = entry.time;
    loadTimeTotal += loadTime;
    if (jsRe.test(mimeType)) {
      js += loadTime;
    } else if (imgRe.test(mimeType)) {
      images += loadTime;
    } else if (cssRe.test(mimeType)) {
      css += loadTime;
    } else if (htmlRe.test(mimeType)) {
      html += loadTime;
    }
  });
  const total = js + images + css + html;
  return {
    js: js / loadTimeTotal,
    images: images / loadTimeTotal,
    css: css / loadTimeTotal,
    html: html / loadTimeTotal,
  };
}
