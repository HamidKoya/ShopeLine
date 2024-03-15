import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectBD from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from './routes/userRoutes.js'
import { errorHandler , notFound} from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";


dotenv.config();
connectBD();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
