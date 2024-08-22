import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body,validationResult } from 'express-validator';
import grid from 'gridfs-stream'
import mongoose from 'mongoose';

import { upload } from '../utils/upload.js';
import Token from '../models/token.js';
import User from '../models/user.js';
import Post from '../models/post.js';

let ACCESS_SECRET_KEY = '0545308339565e7b7a6af5261d6434c4cbf1b3f3aca48193723ba64793e3c500e645af3432a777a90bac2a9e148f983addb811adb163483a01790f94f9c4910e';
let REFRESH_SECRET_KEY = '5ae7fc8c3e3f698b06b48af1da50c17eeec4ba157608538781e0105384fe0f0ff960475712951c9b27d546f769fe01354509df9a37720d7e91210faf90fede8b';

const conn = mongoose.connection;
const router = express.Router();
const url = 'http://localhost:8000/'

router.post('/signup',[
    body('username').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')], async (req, res) => {
    try {
        // Validate request
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        
        const salt = bcrypt.genSaltSync(10);
        const secPass = bcrypt.hashSync(req.body.password, salt);

        const user = { username: req.body.username, email: req.body.email, password: secPass }
        let matchingUsername = await User.findOne({ username: req.body.username });
        let matchingEmail = await User.findOne({ email: req.body.email });

        if(matchingEmail && matchingUsername){
            return res.status(301).json({msg : 'email or username already in use'});
        }
        console.log(user);
        const newUser = new User(user);
        console.log(newUser);
        await newUser.save()
        return res.status(200).json({ msg: 'signup successful' });
    } catch (error) {
        return res.status(500).json({ msg: 'error while signing up user' });
    }
});

router.post('/login',async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ msg: 'Username does not match' });
    }
    try {
        let match =  bcrypt.compareSync(req.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), ACCESS_SECRET_KEY,{expiresIn : '15m'});
            const refreshToken = jwt.sign(user.toJSON(), REFRESH_SECRET_KEY);
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,email: user.email, username: user.username });
        
        } else {
            res.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        res.status(500).json({ msg: 'error while login the user' })
    }
})

router.post('/create', async (req, res) => {
    try {
        const post = await new Post(req.body);
        post.save();

        res.status(200).json('Post saved successfully');
    } catch (error) {
        res.status(500).json(error);
    }
})


let gfs, gridfsBucket;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'fs'
    });
    gfs = grid(conn.db,mongoose.mongo);
    gfs.collection('fs');
})

router.post('/file/upload',upload.single('file'), (req, res) => {
    if(!req.file) 
        return res.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${req.file.filename}`;

    res.status(200).json(imageUrl);    
});

router.get('/file/:filename',async (req, res) => {
    try {   
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

export default router;
