import express from "express"
import cors from "cors"
import authroutes from "../routes/authroute.js"
import uploadroutes from "../routes/uploadroute.js"
import youtuberoutes from "../routes/youtuberoute.js"
import metadatarouter from "../routes/metadataroute.js"
import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const app=express()
app.use('/auth',authroutes);
app.use('/upload',uploadroutes);
app.use('/publish',youtuberoutes);
app.use('/metadata',metadatarouter);

// const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model=genAI.getGenerativeModel({model:"gemini-2.0-flash-exp"});

// const response=await model.generateContent("explain about thermodynamic in hindi");

// console.log(response.response.text());
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});