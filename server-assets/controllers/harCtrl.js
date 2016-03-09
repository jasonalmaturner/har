import { defer, all } from 'q';

export default {
  upload(req, res) {
    // console.log(1111, req.body);
    let aFiles = parseFiles(req.body.harsA);
    let bFiles = parseFiles(req.body.harsB);
    console.log(11111, aFiles);
    res.json('test');
  },
};

function parseFiles(arr) {
  return arr.map(file => JSON.parse(file));
}
