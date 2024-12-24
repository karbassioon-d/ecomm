import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MongoDB');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});