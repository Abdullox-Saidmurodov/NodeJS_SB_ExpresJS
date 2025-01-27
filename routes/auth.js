import {Router} from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = Router()

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login | AB',
        isLogin: true,
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register | AB',
        isRegister: true,
    })
})

router.post('/login', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // console.log(req.body)
    const userData = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.lastname,
        password: hashedPassword,
    }
    // console.log(userData)
    const user = await User.create(userData)
    // console.log(user)
    res.redirect('/')
})

export default router