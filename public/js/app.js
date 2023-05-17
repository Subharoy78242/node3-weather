console.log('Server side script')
// fetch('http://localhost:3000/weather?address=India').then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error)
//     } else {
//       console.log(data.location)
//       console.log(data.forecast)
//     }
//   })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m=document.querySelector('#m')
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  m.textContent = 'Loading..'
  m1.textContent=''
  fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        m.textContent=data.error
      } else {
        console.log(data.location)
        console.log(data.forecast)
        m.textContent = data.location
        m1.textContent=data.forecast
      }
    })
  })
  // console.log(location)
})