//import dependencies
import http from 'http';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './config/config.main';
import router from './routes/index';

const app = express();
const server = http.createServer(app);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
    credentials: true
}));

//routes
app.get('/', (req:express.Request, res: express.Response)=>{res.send("Company Management System REST-API live")});
 app.use('/api/v1', router());

//database
config.database();

//server port
server.listen(config.server.port, () => {
    console.log(`Server running on http://localhost:${config.server.port}`);
});