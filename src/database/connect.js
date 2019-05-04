import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.CONNECTIONSTRING;

const client = new Client({ connectionString });

client.connect();

export default client;
