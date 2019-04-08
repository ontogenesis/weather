const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use( express.static( publicDirectoryPath ) )

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'Weather App',
        name: 'Rustam'
    })
})



app.get('/help', (req, res) =>
{
    res.render('help', {
        title: 'Help',
        name: 'Rustam Murtazin',
        message: 'Help content'
    })
})

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'About weather',
        name: 'Murtazin'
    })
})

app.get('/weather', (req, res) =>
{

    if(!req.query.address)
    {
        res.send({
            error: 'You must provide an address.'
        })
        return
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>
    {
        if(error)
        {
            return res.send({error})            
        }

        forecast(latitude, longitude, (error, data) =>
        {
            if(error)
            {
                return res.send({error})            
            }

            res.send({
                location,
                temperature: data.currently.temperature
            })
        })
    })
    
})

app.get('/help/*', (req, res) =>
{
    res.render('404',  {
        title: '404',
        name: 'Murtazin',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) =>
{
    res.render('404',  {
        title: '404',
        name: 'Murtazin',
        message: 'Page not found'
    })
})



app.listen(3000, () =>
{
    console.log('Server is up on port 3000.')
})