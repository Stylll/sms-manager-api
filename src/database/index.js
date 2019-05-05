import client from './connect';
import createUserTable from './migrations/Users';
import createSmsTable from './migrations/Sms';

/* Method to handle data migration for the database */
const runMigration = async () => {
  await createUserTable(client);
  await createSmsTable(client);
  await client.end();
};

runMigration();
