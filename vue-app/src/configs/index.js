const path = require('path');
const env = process.env.APP_ENV;

const envPath = path.resolve(process.cwd(), `src/configs/.env.${env}`);
console.log(envPath, 'env...')
require('dotenv').config({
  path: envPath,
});
