import express from "express";
import authRouter from './routes/authRouter.js';
import errorMiddleware from './middleware/ErrorMiddleware.js';
import CorsMiddleware from './middleware/CorsMiddleware.js';
import sequelize from './config/database.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
const app = express();

app.use(express.json())

app.use(cookieParser())
app.use(CorsMiddleware)

app.use('/api/auth', authRouter) 

try{
	sequelize.sync({/*force:true*/}).then(() => {
    	console.log(`Database & tables updated!`)})
	app.listen(5000, ()=>{ console.log('Server started on PORT '+5000)})
} catch (e){
	console.log(e)
}