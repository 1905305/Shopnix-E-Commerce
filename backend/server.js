import express from 'express';
import testRoutes from './routes/firebaseTest.js';

const app = express();
app.use(express.json());
app.use('/api', testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
