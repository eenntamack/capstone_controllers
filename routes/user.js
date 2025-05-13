import express from 'express'

const router = express.Router()

router.route("/")
.get(async (req,res)=>{
    const Users = mongoose.models.user || mongoose.model('user', user);
    const users = await Users.find()
    res.json(users)
})

export{router}