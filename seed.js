// import express from 'express'
// import mongoose from 'mongoose'
// import { projectSchema} from './schemas/write.js'
// import user from './schemas/user.js'

// const router = express.Router()


// // Connect to MongoDB


// // Define User model
// const User = mongoose.models.user || mongoose.model('user', user)

// // Seed route
// router.route("/")
// .get(async(req, res) => {
//     try {
//         const newUser = new User({
//             username: "John",
//             password: "password"
//         })
//         await newUser.save()
//         res.json({ message: "User seeded successfully", user: newUser })
//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ error: "Failed to seed user" })
//     }
// })

// // Start server (add this if missing)
// export {router}