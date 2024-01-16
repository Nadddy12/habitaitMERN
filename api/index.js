import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import listRouter from "./routes/listRouter.js"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO)

mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
});

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de donénes établie");
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/user' , userRouter)
app.use('/api/auth' , authRouter)
app.use('/api/list' , listRouter)

app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

app.listen(3000 , () => {
    console.log('server is running on port 3000!')
});