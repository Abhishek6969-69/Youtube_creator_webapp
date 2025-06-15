import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI=new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model=genAI.getGenerativeModel({model:"gemini-2.0-flash-exp"});

const response=await model.generateContent("Hello, how are you?");

console.log(response.response.text());