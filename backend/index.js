import express from 'express';
// import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'

import Connection from './db.js';
import router from './routes/auth.js';
const app = express();

const PORT = 8000;
// dotenv.config();
app.listen(PORT , () => console.log(`server is running on port http://localhost:${PORT}/`));
//P.S please maintain the hierarchy below otherwise gandh maregi

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

Connection()
