import express,{Application} from 'express';
import connectDB from './config/db';
import cors from 'cors'
import userRouter from './routes/user.route';
import { errorHandler } from './middleware/errorHandle';
const app:Application = express();



const corsOperation = {
  origin: "http://localhost:5173",
  credentials: true ,
};


const PORT = 3001;

app.use(express.json())
app.use(cors(corsOperation));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use('/api/user',userRouter);
app.use(errorHandler);
connectDB();
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
});

