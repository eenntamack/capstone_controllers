import express from 'express'
import { projectSchema } from '../schemas/write.js'

import mongoose from 'mongoose'

const router = express.Router()

const Projects = mongoose.models.projects || mongoose.model('projects',projectSchema)

router.route("/").get( async (req, res) => {
    const userKey = req.query.userKey;
    try {
        if (!userKey) return res.status(400).json({ message: "Missing userKey in query" });

        const projects = await Projects.find({ userKey: userKey });
        res.json({ data: projects });
    } catch (err) {
        console.error("Error fetching projects:", err);
        res.status(500).json({ message: "Server error fetching projects" });
    }
})
.post(async (req,res)=>{
    
    const userKey = req.body.userKey
    const userData = req.body.elements
    const project = new Projects({
        userKey : userKey,
        books : []
    })
    for(let i =0; i< userData.length; i++){
        let data = {
            name : userData[i].title,
            chapters : [{
                name:userData[i].title,
                text: [{
                    text:userData[i].content
                    
                }],
                entries:1
            }]
        }
        project.books.push(data)
    }
    const saved = await project.save()
    //const project = await Projects.find({userKey:userKey})
    res.json({data:saved})
}).delete(async (req,res)=>{
    try{
        const userKey = req.body.userKey;
        const clearData = await Projects.deleteMany({userKey:userKey})
       
        if(clearData.deletedCount > 0){
            
       
                res.status(200).json({success:true})
            
        }else{
            res.json({success:false})
        }
       
    }catch(e){
        console.error("could not delete data")
    }
    
})



export {router}