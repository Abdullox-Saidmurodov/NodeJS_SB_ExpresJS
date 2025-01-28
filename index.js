import express from 'express'
import {create} from 'express-handlebars'
import mongoose from 'mongoose'
import flash from 'connect-flash'
import session from 'express-session'
import * as dotenv from 'dotenv'

// ROUTES
import AuthRoutes from './routes/auth.js'
import ProductsRoutes from './routes/products.js'

dotenv.config()

const app = express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({secret: "ab", resave: false, saveUninitialized: false}))
// app.use(express.cookieParser('keyboard cat'))
// app.use(express.session({ cookie: { maxAge: 60000 }}))
app.use(flash())

app.use(AuthRoutes)
app.use(ProductsRoutes)

const startApp = () => {
    try {
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log('MongoDB connected')
        })
        const PORT = process.env.PORT || 4100
        app.listen(4100, () => console.log(`Server is running on port: ${PORT}`)) 
    } catch (err) {
        console.log(err)
    }
}

// console.log(process.env.MONGO_URI)

startApp()