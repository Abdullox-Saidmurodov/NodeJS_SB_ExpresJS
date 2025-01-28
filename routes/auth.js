import {Router} from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import {generateJWTToken} from '../services/token.js'

const router = Router()

router.get('/login', (req, res) => {
    if(req.cookies.token) {
        res.redirect('/')
        return
    }
    res.render('login', {
        title: 'Login | AB',
        isLogin: true,
        loginError: req.flash('loginError'),
    })
})

router.get('/register', (req, res) => {
    if(req.cookies.token) {
        res.redirect('/')
        return
    }
    res.render('register', {
        title: 'Register | AB',
        isRegister: true,
        registerError: req.flash('registerError'),
    })
})

router.get('/logout', (req, res) => {
    // res.send('Logout')
    res.clearCookie('token')
    res.redirect('/')
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        req.flash('loginError', 'All fields are requider')
        res.redirect('/login')
        return
    }

    // console.log(req.body)
    const existUser = await User.findOne({email})
    if(!existUser) {
        // console.log('User not found')
        req.flash('loginError', 'User not found')
        res.redirect('/login')
        return
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if(!isPassEqual) {
        // console.log('Password wrong')
        req.flash('loginError', 'Password wrong')
        res.redirect('/login')
        return
    }

    
    const token = generateJWTToken(existUser._id)
    res.cookie('token', token, {httpOnly: true, secure: true})
    // console.log(existUser)
    res.redirect('/')
})

router.post('/register', async (req, res) => {
    const {firstname, lastname, email, password} = req.body
    
    if(!firstname || !lastname || !email || !password) {
        req.flash('registerError', 'All fields are requider')
        res.redirect('/register')
        return
    }

    const candidate = await User.findOne({email})

    if(candidate) {
        req.flash('registerError', 'User already exist')
        res.redirect('/register')
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log(req.body)
    const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashedPassword,
    }
    // console.log(userData)
    const user = await User.create(userData)
    const token = generateJWTToken(user._id)
    // console.log(token)
    // console.log(user)
    res.cookie('token', token, {httpOnly: true, secure: true})
    res.redirect('/')
})

export default router