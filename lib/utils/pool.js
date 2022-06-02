const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

pool.on('connect', () => console.log('🐘 Postgres connected'));

module.exports = pool;
