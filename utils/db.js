// import mysql from 'mysql2';

// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'EMS_DATABASE'
// });

// con.connect((err) => {
//   if (err) {
//     console.error('Connection Error:', err.message)
//   } else {
//     console.log("Connected to EMS_DATABASE");
//   }
// });

// export default con;


import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
    connectionLimit: 10,  // Adjust based on expected workload
    queueLimit: 0

});

con.connect((err) => {
  if (err) {
    console.error('Connection Error:', err.message);
  } else {
    console.log("Connected to Clever Cloud MySQL Database");
  }
});  

// Keep-alive mechanism to prevent idle disconnections
setInterval(async () => {
    try {
        await db.query('SELECT 1');
        console.log("Keep-alive ping successful.");
    } catch (error) {
        console.error("Keep-alive ping failed:", error);
    }
}, 60000); // Ping every 60 seconds

export default con;