const express = require('express');
// const path = require('path');

require('dotenv').config()

const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'pug');

app.set('views', './views');

const checkavailablehours = (req, res, next) =>{
    const now =  new Date()
    const day =now.getDay()
    const hours = now.getHours()

    if (day === 0 || day === 6 || hours < 9 || hours >= 17) {
        return res.render('error',{
            message : "The web application is only available during working hours (Monday to Friday,  from 9 to 17)."
        })

    }
    next()
}

app.use(checkavailablehours)

app.get('/',(req, res)=>{
    res.render('layout')
})

.get('/home',(req, res)=>{
    res.render('home')
})
.get('/about',(req, res)=>{
    res.render('about')
})
  
.get('/services',(req, res)=>{
    res.render('services')
})

.get('/projects',(req, res)=>{
    res.render('projects')
})

.get('/contact',(req, res)=>{
    res.render('contact')
})

.get('*',(req, res)=>{
    // res.end('404 PAGE NOT FOUND')
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 Not Found</title>
        </head>
        <body>
            <h1>404 PAGE NOT FOUND</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="/">Back to Home</a>
        </body>
        </html>
        `)
    })

app.listen(port,()=>{
    console.log('The server is running at http://localhost:%s',port);
})