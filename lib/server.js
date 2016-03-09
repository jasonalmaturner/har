import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import testCtrl from '../server-assets/controllers/testCtrl';
import harCtrl from '../server-assets/controllers/harCtrl';

const app = express();
const port = process.env.EXPRESS_PORT || 9001;

app.use(json({limit: '100mb'}), cors(), express.static(`${__dirname}/../public`));

app.get('/api/test', testCtrl.firstGet);
app.post('/api/files', harCtrl.upload);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
