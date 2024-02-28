import express from'express'
import dotenv from'dotenv'
import {products} from './data/products.js'
import cors from "cors"
import connectBD from './config/db.js'

dotenv.config()
connectBD()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

app.get('/api/products',(req,res)=>{
  res.json(products)
})

app.get('/api/product/:id',(req,res)=>{
  const product = products.find((p)=>(
    p.id == req.params.id
  ))
  res.json(product)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})