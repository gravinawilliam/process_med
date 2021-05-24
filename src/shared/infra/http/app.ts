import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import express from 'express';
import { errors as validationErrorsHandler } from 'celebrate';

import errorsHandler from '@shared/infra/http/handlers/errors';
import '@shared/infra/typeorm';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use(validationErrorsHandler());
app.use(errorsHandler);

export default app;
