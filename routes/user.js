import express from 'express'
import mongoose from 'mongoose';
const router = express.Router()

router.route("/")
.get(async (req,res)=>{
    const Users = mongoose.models.user || mongoose.model('user', user);
    const users = await Users.find()
    return res.json(users)
})

export{router}