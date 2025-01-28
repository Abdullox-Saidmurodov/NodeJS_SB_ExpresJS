import {Router} from 'express'
import authMiddleware from '../middleware/auth.js'
import userMiddleware from '../middleware/user.js'
import Product from '../models/Product.js'

const router = Router()

router.get('/', async (req, res) => {
    const products = await Product.find().lean()

    console.log(req.userId)

    // console.log(products)
    res.render('index', {
        title: 'Boom Shop | AB',
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null,
    })
})

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | AB',
        isProducts: true,
    })
})

router.get('/add', authMiddleware, (req, res) => {
    // if(!req.cookies.token) {
    //     res.redirect('/login')
    //     return
    // }
    res.render('add', {
        title: 'Add products',
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts'),
    })
})

router.post('/add-products', userMiddleware, async (req, res) => {
    // console.log(req.body)
    const {title, description, image, price} = req.body
    if(!title || !description || !image || !price) {
        req.flash('errorAddProducts', 'All fields are requider')
        res.redirect('/add')
        return
    }

    console.log(req.userId)
    // const products = await Product.create({...req.body, user: req.userId})
    await Product.create({...req.body, user: req.userId})
    // console.log(products)
    res.redirect('/')
})

export default router