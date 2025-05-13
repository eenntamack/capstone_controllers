import { user } from "../schemas/user.js"
import { projectSchema } from "../schemas/write.js"
import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 10

const router = express.Router()
 
// Define User model
const User = mongoose.models.user || mongoose.model('user', user)
const Projects = mongoose.models.projects || mongoose.model('projects',projectSchema)

router.route("/login").post( async (req, res) => {
    const { username, password } = req.body; 

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ userExist: false });
        }

        const match = await bcrypt.compare(password, user.password);

        res.json({
            userExist: true,
            passwordCorrect: match,
            userKey: user._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during login" });
    }
}).delete(async(req,res)=>{
    const id = req.body.userKey;
    try{
        const success = await User.deleteOne({_id:id});
        if(success){
            res.json({success:success});
        }else{
            res.json({success:false});
        }
    
    }catch{
        console.error("Deletion could not be fulfilled")
    }
    

});
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, password: hashedPassword });
        const savedUser = await newUser.save();

        const project = new Projects({ userKey: savedUser._id });
        await project.save();

        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during registration" });
    }
});

export {router}