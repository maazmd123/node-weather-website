const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000
const request = require ( 'request')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast') 

const dirpath =path.join(__dirname , '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partailspath = path.join(__dirname, '../templates/partials')
app.use(express.static(dirpath))

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partailspath)
app.get('' , (req,res) => {
res.render('index', {
    title : 'Weather App',
    name : 'Maaz'
})
})
app.get('/about' , (req,res) => {
    res.render('about', {
        title : 'About me',
        name : 'Maaz'
    })
})
app.get('/help' , (req,res) => {
    res.render('help', {
        title : 'Help',
        message : 'This page provides you all the assistance you need',
        name : 'Maaz'
    })
})

app.get('/weather', (req,res)=>
{
    if (!req.query.address)
    {
     return   res.send(
            {
             error : 'Address not provided'   
            }
        )
    }
    geocode(req.query.address , (error,{latitude, longitude , location}={})=>
    {
    if(error)
    {
     return   res.send({error})
    }
    
    forcast({latitude,longitude}, (error, {forcast})=> {
    if(error)
    {
      return res.send({error})
    }
       
           res.send(
               {
                   address : location,
                   forcast : forcast
               })
            })
        })
    })
app.get('/help/*', (req, res) =>{
    res.render('404',{
        title : '404',
        errorMessage : 'Help article not found',
        name : 'Maaz'
    })
})
app.get('*', (req, res) =>{
    res.render('404',{
        title : '404',
       errorMessage : 'Page not found',
        name : 'Maaz'
    })
})

app.listen (port, () => {
    console.log('Server is up on port'+ port)
})