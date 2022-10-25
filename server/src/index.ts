import 'dotenv/config';
import express from 'express';
import scrobbleRoutes from './routes/ScrobbleRoutes';
const app = express();
import userRoutes from './routes/UserRoutes';

app.use(express.json());
app.use('/api', scrobbleRoutes);
app.use('/users', userRoutes);

app.listen(8000);
