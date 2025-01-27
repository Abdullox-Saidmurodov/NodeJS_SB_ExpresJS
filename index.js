import express from 'express'
// import path, {dirname} from 'path'
// import {fileURLToPath} from 'url'
import {engine, create} from 'express-handlebars'
import AuthRoutes from './routes/auth.js'
import ProductsRoutes from './routes/products.js'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const app = express()

// app.use(() => console.log('Middleware'))
app.use(AuthRoutes)
app.use(ProductsRoutes)

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

// app.get('/', (req, res) => {
//     // res.send('Main page')
//     // res.status(200)
//     res.render('index')
//     // res.end()
// })

// // app.get('/about', (req, res) => {
// //     // res.send('About page')
// //     // res.status(200)
// //     res.render('about')
// //     // res.end()
// // })

// app.get('/products', (req, res) => {
//     res.render('products')
// })

// app.get('/add', (req, res) => {
//     res.render('add')
// })

// app.get('/login', (req, res) => {
//     res.render('login')
// })

// app.get('/register', (req, res) => {
//     res.render('register')
// })

const PORT = process.env.PORT || 4100
app.listen(4100, () => console.log(`Server is running on port: ${PORT}`)) 
