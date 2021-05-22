import dotenv from 'dotenv';
import app from './app';
import '@shared/container';
import '../typeorm';

dotenv.config();

app.listen(process.env.API_PORT || 3000, () => {
  if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line no-console
    console.log(`✅ OK ${process.env.API_PORT || 3000}`);
  }
});
