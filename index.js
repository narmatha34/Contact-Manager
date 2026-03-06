import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/contacts", contactRoutes)

app.get("/", (req,res)=>{
 res.send("ConnectHub API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
 console.log(`Server running on ${PORT}`)
})