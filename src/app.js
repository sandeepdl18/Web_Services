const express = require('express')
const path = require('path') //core node module to do string manipulations on paths
const hbs = require('hbs')
const request = require('request')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const publicDirPath = path.join(__dirname, '../public') //public -- directory to serve all static files
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


//specifying express to use staic folder to serve files
app.use(express.static(publicDirPath))

/** app.get('', (req, res) => {
    res.send('Hello Express Home page');
}) */ //will get called when there is no static path/folder set up
app.set('view engine', 'hbs')

//by default express looks for views folder to serve hbs files, if we want to customise the folder which serves
// handlebar files then we need to specify it to express config using app.set
app.set('views', viewspath)
hbs.registerPartials(partialspath)

app.listen(3000, () => {
    console.log('Express server is running on port 3000');
});

app.get('', (req, res) => {
    res.render('index', {
        name: 'Tanuja Bolisetty',
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Tanuja Bolisetty',
        title: 'About Page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Tanuja Bolisetty',
        title: 'Help Page'
    })
})
app.get('/weather', (req, res) => {
    // res.send({location: 'Cary', forecast: 'The weather cary is raining'});
    if(!req.query.address){
        return res.send({'error': 'Please send a address'})
    }
    geocode(req.query.address, (error, {latittude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latittude, longitude, (error, weatherdata) => {
            if(error){
                return res.send({error})
            }
            return res.send({address : req.query.address, 
                location, 
                forecast : weatherdata})
        })

    })
})

app.get('products', (req, res) => {
    if(!req.query.search){
        return res.send({'error': 'Please send a search query'})
    }

    res.send({
        'products': []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => { //express uses wild card character * to match any undefined routes
    res.render('404', {
        errorMessage: '404 page not found'
    })
})