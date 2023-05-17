const path=require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')
console.log(path.join(__dirname,'../public'))
console.log(__filename)
const app = express()
const port = process.env.PORT || 3000
//app.com
//app.com/help
//app.com/about
const pDP = path.join(__dirname, '../public')
const vDP = path.join(__dirname, '../templets/views')
const pP = path.join(__dirname, '../templets/partials')
app.set('view engine', 'hbs')
hbs.registerPartials(pP)
app.set('views',vDP)
app.use(express.static(pDP))
app.get('', (req, res) => {
  res.render('index1', {
    name: 'HARE  KRSNA',
    surname:'HARE HARE'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    name: 'HARE  KRSNA about',
    surname:'HARE HARE about'
  })
})
// //insteed of being that it will take from path
// app.get('', (req, res) => {
//   res.send('<h1>Hare Krsna</h1>')
// })
app.get('/help', (req, res) => {
  res.send([{
    H:'Help Hare Krsna'
  },{
      H2:'Help Hare Krsna'
  }])
})
// app.get('/about', (req, res) => {
//   res.send('About Hare Krsna')
// })
// app.get('/weather', (req, res) => {
//   if (!req.query.address) {
//     return res.send({
//       error:'Please provide search'
//     })
//   }
//   res.send({
//     title: 'Weather Hare Krsna',
//     address:req.query.address
//   })
// })
console.log('HARE KRSNA')
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide search'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({
        error:'You must provide an address'
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address:req.query.address
      })
    })
  })
})
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error:'Please provide search'
    })
  }
  res.send({
    products:[]
  })
})
app.get('/help/*', (req, res) => {
  res.send('404 help')
})
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'HARE KRSNA',
    errorMessage: 'Page not found'
  })
})
app.listen(port, () => {
  console.log('Server running', port)
})