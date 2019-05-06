import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = (process.env.NODE_ENV === 'development')
  ? process.env.CONNECTIONSTRING : process.env.PROD_CONNECTIONSTRING;

const client = new Client({ connectionString });

client.connect();

export default client;
