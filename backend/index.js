import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

import { UserModel } from "./models/User.js";
import { UserDetails } from "./models/Login.js";
import bodyParser from "body-parser";



const PORT=process.env.PORT||3002;

const app=express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
   cors({
     origin: "http://127.0.0.1:5173",
   })
 );

mongoose.connect(
   "mongodb+srv://dbUser:prakhar@cluster0.xvidd6o.mongodb.net/?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }
)



const itemSchema = new mongoose.Schema({
  username: String,
  quantity: Number,
  price: Number,
  taxRate: Number,
});


const invoiceSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  items: [itemSchema],
  total: Number,
});


const Invoice = mongoose.model('Invoice', invoiceSchema);
app.post('/invoices', async (req, res) => {
   try {
     const newInvoice = new Invoice(req.body);
     await newInvoice.save();
     res.status(201).send(newInvoice);
   } catch (error) {
     res.status(500).send(error.message);
   }
 });
app.get("/",async(req,res)=>{
 return res.json({message:"Hello"});
})
app.post("/register", async (req, res) => {
   try {
     const { username, password } = req.body;
     console.log("Received registration request for username:", username);
 
     const user = await UserDetails.findOne({ username });
     if (user) {
       return res.status(400).json({ message: "Username already exists" });
     } else {
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUserD = new UserDetails({ username, password: hashedPassword });
       await newUserD.save();
       res.json({ message: "User Registration Successful" });
     }
   } catch (error) {
     console.error("An error occurred during registration:", error);
     res.status(500).json({ message: "An error occurred during registration." });
   }
 });
 
 app.post("/login", async (req, res) => {
   try {
     const { username, password } = req.body;
     console.log("Received login request for username:", username);
 
     const user = await UserDetails.findOne({ username });
 
     if (!user) {
       return res
         .status(400)
         .json({ message: "Username or password is incorrect" });
     }
 
     const isPasswordValid = await bcrypt.compare(password, user.password);
 
     if (!isPasswordValid) {
       return res
         .status(400)
         .json({ message: "Username or password is incorrect" });
     }
 
     res.json({ userID: user._id });
   } catch (error) {
     console.error("An error occurred during login:", error);
     res.status(500).json({ message: "An error occurred during login." });
   }
 });
 

app.post("/billing",async(req,res)=>{
   const {username,email,number,itemprice,tax,totalPrice,id}=req.body;
   const user=await UserModel.findOne({username});
   if(user){
      return res.status(400).json({message:"Username already exists"});
   }
   else{
      const newUser=new UserModel({username,email,number,itemprice,tax,totalPrice,id});
      await newUser.save();
      return res.json({message:"Bill Generated"});

   }
})

app.get('/invoices', async (req, res) => {
   try {
     const invoices = await Invoice.find({});
     res.json(invoices);
   } catch (error) {
     res.status(500).send(error);
   }
 });

// -----------------------------------------

// ----------------------------------------
app.listen(PORT,()=>console.log("Server Is running"));