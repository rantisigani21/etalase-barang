
import mysql from 'mysql2/promise';


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306, // Pastikan port adalah number
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0
});



export async function query({ query: sqlQuery, values = [] }) {
  try {
    const [results] = await pool.execute(sqlQuery, values);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error(`Database query failed: ${error.message}`);
  }
}

