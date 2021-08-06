import express from 'express';
const app = express();
const port = process.env.PORT ?? 3000;
import bodyParser from 'body-parser';
import db from './models';
import cors from 'cors';
import { allowCrossDomain } from './middleware/crossDomain';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(allowCrossDomain);
//some other code

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening to port: ${port}`);
  });
});

app.use('/users', require('./routes/api'));
