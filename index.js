import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
// import { booksSchema } from './schemas/write'
// import { log } from './schemas/write'
// import { user } from './schemas/user'
//import {router as seed} from "./seed.js"
import {router as authenticate} from "./routes/authenticate.js"

import { router as user} from './routes/user.js'
import { router as userData} from './routes/userData.js'
import { router as fetchQuote } from './routes/fetchQuote.js'

import cors from 'cors'

const PORT = process.env.PORT || 3000;




try {
  await mongoose.connect(process.env.ATLAS_URI);
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("MongoDB connection error:", err);
}
const app = express()


app.use(cors({
  origin: 'https://capstone-h59f.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json())
app.use('/authenticate',authenticate)
app.use('/userData',userData)
app.use('/fetchQuote',fetchQuote)
//app.use('/seed/populate',seed)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})