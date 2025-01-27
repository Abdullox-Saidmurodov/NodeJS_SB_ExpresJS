import {Router} from 'express'

const router = Router()

router.get('/', (req, res) => {
    // res.send('Main page')
    // res.status(200)
    res.render('index')
    // res.end()
})

router.get('/products', (req, res) => {
    res.render('products')
})

router.get('/add', (req, res) => {
    res.render('add')
})

export default router