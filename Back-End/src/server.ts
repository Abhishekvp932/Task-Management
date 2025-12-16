import express,{Application} from 'express';
import connectDB from './config/db';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './routes/user.route';
import taskRouter from './routes/task.route';
import { errorHandler } from './middleware/errorHandle';
import { initSocket } from './utils/socket/taskSocket';
const app:Application = express();



const corsOperation = {
  origin: "https://taskmanagement-eight-mu.vercel.app",
  credentials: true ,
};


const PORT = 3001;
app.use(cookieParser());
app.use(express.json())

app.use(cors(corsOperation));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use('/api/user',userRouter);
app.use('/api/task',taskRouter);
app.use(errorHandler);
const server = http.createServer(app);
initSocket(server)

connectDB();
server.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
});

