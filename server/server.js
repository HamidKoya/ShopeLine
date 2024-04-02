import path from 'path'
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectBD from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler , notFound} from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import stripe from './utils/stripe.js'
import morgan from "morgan"

dotenv.config();
connectBD();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

stripe(app)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use(morgan('dev'));
const __dirname = path.resolve()
app.use("/api/uploads",express.static(path.join(__dirname,"uploads")))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
