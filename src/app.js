
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// Define path for express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// set up handle bar engine in views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name: 'Bhagyashree'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Bhagyashree'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'this is some helpful text.',
        title:'Help',
        name: 'Bhagyashree'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=> {
        if(error)
        {
            return res.send({error})
        }
        else 
        {
        forecast(latitude, longitude, (error, foreCastData) => {
            if(error)
            return res.send({error})
            res.send({
                forecast: foreCastData,
                location: location
            })
          })
        }
    
    })
    
   
})
app.get('/help/*',(req,res) => {
    res.render('404Page',{
        title:'404 page',
        name: 'Bhagyashree',
        msg: 'Help Article not found'
    })
})
app.get('*',(rq,res) => {
    res.render('404Page',{
        title:'404 page',
        name: 'Bhagyashree',
        msg: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})