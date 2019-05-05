const createSMSTable = async (client) => {
  const query = `
  CREATE TABLE IF NOT EXISTS sms (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES Users(user_id) ON DELETE CASCADE,
    receiver_id INTEGER REFERENCES Users(user_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
  `;
  try {
    await client.query(query);
  } catch (error) {
    console.log('create sms table error: ', error);
  }
};

export default createSMSTable;
