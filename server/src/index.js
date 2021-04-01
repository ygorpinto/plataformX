import express from 'express'
import cors from 'cors'
import connectDB from './database/db.js'
import router from './controllers/authController.js'
import routerp from './controllers/permissionController.js'

const port = 3000
const app = express();

app.use(cors());
app.use(express.json({ extended : false }));

app.use('/auth',router);
app.use('/app',routerp);

connectDB();
app.listen(port)