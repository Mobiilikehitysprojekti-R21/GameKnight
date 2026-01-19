require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function testDb() {
const result = await pool.query(`
  SELECT u.nickname, sp.score, sp.is_winner
  FROM session_players sp
  JOIN users u ON u.user_id = sp.user_id
  WHERE sp.session_id = 1`
);


  console.log(result.rows);
  await pool.end();
}

testDb().catch(console.error);
