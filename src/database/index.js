import client from './connect';
import createUserTable from './migrations/Users';

/* Method to handle data migration for the database */
const runMigration = async () => {
  await createUserTable(client);
  await client.end();
};

runMigration();
