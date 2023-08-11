const express=require('express')
const env=require('dotenv').config()
const bodyparser=require('body-parser')
const cors=require('cors')

const corsOptions ={
    credentials: true,
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    exposedHeaders: 'Authorization',
    exposedHeaders: ["set-cookie"],
  };

const app=express()
const user=require('./Routes/userRouter')
app.use(bodyparser.json())
app.use(cors(corsOptions))
app.use('/user',user)


const PORT=process.env.PORT

app.listen(PORT, console.log(`écoute port ${PORT}`))


