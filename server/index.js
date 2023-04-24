import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './mongo/connect.js';
import UserModel from './models/User.js';
import PlaceModel from './models/Place.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
/* import multer from 'multer' */

import imageDownloader from 'image-downloader'
import multer from 'multer';
import BookingSchema from './models/Booking.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'))
const secret = 'fasefraw4r5r3wq45wdfgw34twdfg'
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}))
app.use(express.json());
connectDB(process.env.MONGO_URL)


app.get('/test', (req, res) => {
    res.json('test ok')
})
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await UserModel.create({
            name, email, password: bcrypt.hashSync(password, bcryptSalt)
        })


        res.json(user)
    } catch (error) {
        res.status(422).json(error);
    }

})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email })
        console.log(user.password,password)
        if (user) {
            const passok = bcrypt.compareSync(password, user.password)
            console.log(passok)
            if (passok) {
                jwt.sign({
                    email: user.email, id: user._id
                }, secret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user)
                })

            } else {
                res.status(422).json('pass not ok')
            }
        } else {
            res.json('Not found')
        }


    } catch (error) {
        res.status(422).json(error);
    }

})
app.post('/profile', (req, res) => {
    const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
})
const photosMiddleware= multer({dest:'uploads'})
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.')
        const ext = parts[parts.length-1]
        
        const newPath=path + '.' + ext;

        fs.renameSync(path,newPath)
        console.log(newPath.slice(8))
        uploadedFiles.push('/'+newPath.slice(8));
    }
    console.log(uploadedFiles)
    res.json(uploadedFiles)
})
 
app.post('/uploadLink',async (req,res)=>{
     
    const {link} = req.body;
 
    const newName =  'photo' + Date.now() + '.jpg';
  await  imageDownloader.image({
        url: link,
        dest: (__dirname+'/uploads/'+newName),

    })
    console.log((__dirname+'/uploads/'+newName).slice(3))
    res.json('/'+newName)
})
app.post('/places',(req,res)=>{
    const {token} = req.cookies;

    const {title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    jwt.verify(token,secret,{},async(err,userData)=>{
        if(err) throw err;
     const placeDoc =   await PlaceModel.create({
            owner: userData.id,
            title , address,photos, description,perks,extraInfo,checkIn,checkOut,maxGuests,price
        })
        res.json(placeDoc)
    })
   
})
app.get('/places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},async(err,userD)=>{
        const {id} = userD;

        res.json(await PlaceModel.find({owner:id}))
    })
})
app.get('/places/:id', async (req,res)=>{
    const {id} = req.params;
    res.json(await PlaceModel.findById(id))
})
app.put('/places', async (req,res)=>{
   // const {id} = req.params;
    const {token} = req.cookies;

    const {id,title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    const placeD= await PlaceModel.findById(id);
    jwt.verify(token,secret,{},async (err,userD)=>{
        if(err) throw err;
        if(userD.id === placeD.owner.toString()){
            placeD.set({
                owner: userD.id,
                title , address,photos, description,perks,extraInfo,checkIn,checkOut,maxGuests,price
            })
           await placeD.save()
            res.json('OK BRO')
        }
    })

})
app.get('/all',async (req,res)=>{
    res.json(await PlaceModel.find());

})
app.get('/place/:id',async(req,res)=>{
    const {id} = req.params;
    res.json(await PlaceModel.findById(id))
})
app.post('/booking',async (req,res)=>{
    const userDat = await getUser(req);
    const {place,checkIn,checkOut,name,phone,price}= req.body;
  const boky= await BookingSchema.create({
        place,user: userDat.id,checkIn,checkOut,name,phone,price
    })
    res.json(boky)
})
function  getUser(req){
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,secret,{},async(err,userD)=>{
            if(err) throw err;
            
    
           resolve(userD);

        })
    })
    
}
app.get('/bookings',async(req,res)=>{
   const userD= await getUser(req);
    res.json( await BookingSchema.find({user: userD.id}).populate('place'))
})
app.get('/bookings',async(req,res)=>{
    
})
const startServer = async () => {

    try {
        connectDB(process.env.MONGO_URL)
    } catch (error) {
        console.log(error)
    }





    app.listen(4000, () => console.log('Server has started on port 4000'))
}
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})
startServer();
//MONGO_URL='mongodb+srv://nixyz:naocare123@cluster0.ahzvesm.mongodb.net/?retryWrites=true&w=majority'

/* import mongoose from "mongoose";

const connectDB = (url) =>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url).then(()=>{
        console.log('Mongo connected!')
    }).catch((err)=>console.log(err))
}

export default connectDB */