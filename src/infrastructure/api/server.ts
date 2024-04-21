import dotevn from 'dotenv'
import { app } from './express';

dotevn.config();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port) 