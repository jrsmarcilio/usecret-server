import express from 'express';
import 'dotenv/config';

import './prisma/prismaClient'
import { routes } from './routes';

const app = express();

const PORT: number = Number(process.env.PORT) || 3333;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => console.log('server in running on port', PORT));
