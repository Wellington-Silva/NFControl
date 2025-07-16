import 'reflect-metadata';
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from './database/ormconfig';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;
AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});