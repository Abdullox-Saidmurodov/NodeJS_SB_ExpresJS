import express from 'express'
// import path, {dirname} from 'path'
// import {fileURLToPath} from 'url'
import {engine, create} from 'express-handlebars'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const app = express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', (req, res) => {
    // res.send('Main page')
    // res.status(200)
    res.render('index')
    // res.end()
})

app.get('/about', (req, res) => {
    // res.send('About page')
    // res.status(200)
    res.render('about')
    // res.end()
})

const PORT = process.env.PORT || 4100
app.listen(4100, () => console.log(`Server is running on port: ${PORT}`)) 
