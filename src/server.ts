import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { isHttpError } from 'http-errors';
import middleware from 'i18next-http-middleware';
import i18n from '~/i18n';
import routes from '~/routes';

dotenv.config();

const port = 6000;

const app = express();

app.use(middleware.handle(i18n, {}));
app.use(express.json());

app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);

app.use('/api/', routes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  let errorCode;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
    errorCode = error.name;
  }

  res
    .status(statusCode)
    .json({ error_message: errorMessage, error_code: errorCode });
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
