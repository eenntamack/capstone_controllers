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
        const user = await User.findOne({ name : username });

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
        return res.status(500).json({ message: "Server error during login" });
        
    }
}).put(async(req,res)=>{
    const newPass = req.body.newPass
    const key = req.body.key

    try{
        const user = await User.findById(key);

        if(user){
            
            const hashedPassword = await bcrypt.hash(newPass, saltRounds);
            user.password = hashedPassword
            await user.save()
            return res.json({message:'successfully updated password'})
        }else{
            console.error("could not update pass")
            return res.status(500).json({message: "failed to update password"})
        }
    }
    catch{
        console.error("update operation has failed")
    }
}).delete(async(req,res)=>{
    const id = req.body.userKey;
    try{
        const data = await Projects.deleteMany({userKey: id})
        const success = await User.deleteOne({_id:id});
        if(success && data){
            return res.json({success:success});
        }else{
            return res.json({success:false});
        }
    
    }catch{
        console.error("Deletion could not be fulfilled")
        return res.status(500).json({success:false})
    }
    

});
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ name : username });
        if (existingUser) {
            return res.json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name:username, password: hashedPassword });
        const savedUser = await newUser.save();

        const project = new Projects({ userKey: savedUser._id });
        await project.save();

        return res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error during registration" });
    }
});

router.route("/update").put(async(req,res)=>{
    const { prevpass, pass, key } = req.body;

  try {
    const user = await User.findById(key);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(prevpass, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(pass, saltRounds);
    const updateUser = await User.findByIdAndUpdate(key,{password : hashedPassword},{ runValidators: true })
    

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Server error during password update" });
  }
})

export {router}