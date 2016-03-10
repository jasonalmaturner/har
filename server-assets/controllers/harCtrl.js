import { defer, all } from 'q';

export default {
  upload(req, res) {
    // Eventually need to make more robust to validate that the
    // file is a har file. Probably best to have some validation in the
    // front and the back.
    if (!req.body.harsA && !req.body.harsB) {
      return res.status(500).json('upload file(s)');
    }

    // console.log(typeof req.body.harsA[0], typeof req.body.harsB[0], req.body.harsB[0]);

    // Checking files to make sure they are in JSON format, so they can be parsed
    // correctly
    if (!jsonChecker(req.body.harsA)) {
      return res.status(500).json('Are you sure all the files in Set A were in JSON format?');
    }

    if (!jsonChecker(req.body.harsB)) {
      return res.status(500).json('Are you sure all the files in Set B were in JSON format?');
    }

    const aFiles = parseFiles(req.body.harsA);
    const bFiles = parseFiles(req.body.harsB);

    // Checking files to make sure they are in the correct har format
    if (!fileTypeCheck(aFiles)) {
      return res.status(500).json('Are you sure all the files in Set A were har files?');
    }

    if (!fileTypeCheck(bFiles)) {
      return res.status(500).json('Are you sure all the files in Set B were har files?');
    }

    const aData = compileAverages(aFiles);
    const bData = compileAverages(bFiles);
    res.json({
      aData,
      bData,
    });
  },
};

function jsonChecker(files) {
  let flag = true;
  files.forEach(file => {
    try {
      JSON.parse(file);
    } catch (e) {
      flag = false;
    }
  });
  return flag;
}

function fileTypeCheck(files) {
  let flag = true;
  files.forEach(file => {
    if (!file || !file.log || !file.log.pages || !file.log.entries) {
      flag = false;
    }
  });
  return flag;
}

function parseFiles(arr) {
  // console.log(typeof arr[0]);
  return arr.map(file => JSON.parse(file));
}

function compileAverages(arr) {
  // Page load totals
  let onLoadTotal = 0;
  let onContentLoadTotal = 0;
  let requestTotal = 0;

  // File loads
  let jsTotal = 0;
  let imagesTotal = 0;
  let cssTotal = 0;
  let htmlTotal = 0;
  let otherTotal = 0;

  // Timings totals
  let blockedTotal = 0;
  let dnsTotal = 0;
  let connectTotal = 0;
  let sendTotal = 0;
  let waitTotal = 0;
  let receiveTotal = 0;
  let sslTotal = 0;

  arr.forEach(file => {
    onLoadTotal += file.log.pages[0].pageTimings.onLoad;
    onContentLoadTotal += file.log.pages[0].pageTimings.onContentLoad;
    requestTotal += file.log.entries.length;

    const {
      js, images, css, html, blocked, dns, connect, send, wait, receive, ssl,
    } = compileFileLoads(file.log.entries, file.log.pages[0].pageTimings.onLoad);

    jsTotal += js;
    imagesTotal += images;
    cssTotal += css;
    htmlTotal += html;

    blockedTotal += blocked;
    dnsTotal += dns;
    connectTotal += connect;
    sendTotal += send;
    waitTotal += wait;
    receiveTotal += receive;
    sslTotal += ssl;
  });

  // Page load averages
  const onLoadAvg = onLoadTotal / arr.length;
  const onContentAvg = onContentLoadTotal / arr.length;
  const requestAvg = requestTotal / arr.length;

  // Ratio averages
  const jsAvg = jsTotal / arr.length;
  const imagesAvg = imagesTotal / arr.length;
  const cssAvg = cssTotal / arr.length;
  const htmlAvg = htmlTotal / arr.length;
  const otherAvg = 1 - (jsAvg + imagesAvg + cssAvg + htmlAvg);

  // Timings averages
  const blockedAvg = blockedTotal / arr.length;
  const dnsAvg = dnsTotal / arr.length;
  const connectAvg = connectTotal / arr.length;
  const sendAvg = sendTotal / arr.length;
  const waitAvg = waitTotal / arr.length;
  const receiveAvg = receiveTotal / arr.length;
  const sslAvg = sslTotal / arr.length;

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
    timings: {
      blockedAvg,
      dnsAvg,
      connectAvg,
      sendAvg,
      waitAvg,
      receiveAvg,
      sslAvg,
    },
  };
}

function compileFileLoads(entries, onLoad) {

  // RegEx
  const jsRe = /(javascript|ecmascript|json)/g;
  const imgRe = /(png|jpg|jpeg|gif|tiff|bmp)/g;
  const cssRe = /(css)/g;
  const htmlRe = /(html)/g;

  // Files
  let js = 0;
  let images = 0;
  let css = 0;
  let html = 0;
  let loadTimeTotal = 0;

  // Timings
  let blocked = 0;
  let dns = 0;
  let connect = 0;
  let send = 0;
  let wait = 0;
  let receive = 0;
  let ssl = 0;

  // Add everything up
  entries.forEach(entry => {
    const mimeType = entry.response.content.mimeType;
    const loadTime = entry.time;
    const timings = entry.timings;
    loadTimeTotal += loadTime;

    blocked += timings.blocked > 0 ? timings.blocked : 0;
    dns += timings.dns > 0 ? timings.dns : 0;
    connect += timings.connect > 0 ? timings.connect : 0;
    send += timings.send > 0 ? timings.send : 0;
    wait += timings.wait > 0 ? timings.wait : 0;
    receive += timings.receive > 0 ? timings.receive : 0;
    ssl += timings.ssl > 0 ? timings.ssl : 0;

    // RegEx add times
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

  // I want to nest the timings into its own object,
  // but redux says to keep everything as flat as possible?
  // I think keeping it this flat might be overkill.
  return {
    js: js / loadTimeTotal,
    images: images / loadTimeTotal,
    css: css / loadTimeTotal,
    html: html / loadTimeTotal,
    blocked: blocked / entries.length,
    dns: dns / entries.length,
    connect: connect / entries.length,
    send: send / entries.length,
    wait: wait / entries.length,
    receive: receive / entries.length,
    ssl: ssl / entries.length,
  };
}
