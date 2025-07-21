import 'reflect-metadata';
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ClientRouter from "./routes/ClientRouter";
import CompanyRouter from "./routes/CompanyRouter";
import InvoiceRouter from "./routes/InvoiceRouter";
import { AppDataSource } from './database/ormconfig';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;
AppDataSource.initialize().then(async () => {

    app.use('/client', ClientRouter);
    app.use('/company', CompanyRouter);
    app.use('/invoice', InvoiceRouter);

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});