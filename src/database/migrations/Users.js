const createUsersTable = async (client) => {
  const query = `
  DROP TABLE IF EXISTS Users CASCADE;
  CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(225) NOT NULL UNIQUE,
    password VARCHAR(225) NOT NULL,
    phone_number VARCHAR(225) NOT NULL UNIQUE,
    email VARCHAR(225) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
  `;
  try {
    await client.query(query);
  } catch (error) {
    console.log('create user table error: ', error);
  }
};

export default createUsersTable;
