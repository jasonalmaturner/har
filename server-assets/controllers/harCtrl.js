import { defer, all } from 'q';

export default {
  upload(req, res) {
    console.log(req.body);
    let harsA = createBlob(req.body.harsA);
    let harsB = createBlob(req.body.harsB);
    console.log(1111, harsA, harsB);
    let harsAFiles = readFiles(harsA);
    let harsBFiles = readFiles(harsB);
    all([harsAFiles, harsBFiles]).then(files => {
      console.log(files);
      return res.json({
        harsA: files[0],
        harsB: files[1],
      });
    }).catch(err => res.status(501).json(err));
  },
};

function parseFiles(arr) {
  return arr.map(file => JSON.parse(file));
}

function createBlob(arrBuff) {
  return new Blob(arrBuff);
}

function readFiles(files) {
  return all(files.map(file => readFile(file)));
}

function readFile(file) {
  let dfd = defer();
  let reader = new FileReader();
  reader.onload = function (event) {
    console.log(reader.result);
    dfd.resolve(reader.result);
  };

  reader.onerror = function (event) {
    dfd.reject('read error');
  };

  reader.readAsArrayBuffer(file);
  return dfd.promise;
}
