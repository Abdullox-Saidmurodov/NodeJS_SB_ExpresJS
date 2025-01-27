import {Router} from 'express'

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

export default router