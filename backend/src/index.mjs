// packages
import express from 'express';
import compression from 'compression';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

// local files
import { Environment } from './config/index.mjs';
import { connect } from './config/db-connect.mjs';
import passport from './service/Passport.mjs';
import routes from './routes/index.mjs';

const { urlencoded, json } = express;

const { environment, url, server, db } = Environment;

const app = express();

app.disable('x-powered-by');

app.use([
  passport.initialize(),
  hpp(),
  helmet(),
  compression(),
  json({ limit: '50mb' }),
  urlencoded({ extended: false, limit: '1kb', parameterLimit: 10 }),
  cors({ origin: url, credentials: true }),
  cookieparser(),
]);

app.use('/api', routes);

connect(db.MONGO_URI);

app.listen(server.PORT, () =>
  console.info(
    `App is running at http://localhost:${server.PORT} in ${environment} mode.`
  )
);

export default app;
