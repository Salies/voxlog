import 'dotenv/config';
import express from 'express';
import scrobbleRoutes from './routes/ScrobbleRoutes';
const app = express();

app.use(express.json());
app.use('/users', scrobbleRoutes);

app.listen(8000);
