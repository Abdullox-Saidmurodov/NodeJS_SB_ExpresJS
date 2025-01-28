import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export default async function(req, res, next) {
    if(!req.cookies.token) {
        // res.redirect('/login')
        next()
        return
    }

    const token = req.cookies.token
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decode.userId)
    // console.log(decode)
    // console.log(user)
    req.userId = user._id
    next()
}