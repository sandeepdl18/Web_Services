console.log('client side javascript');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})



const weatherform = document.querySelector('form')
const input = document.querySelector('input')
const error = document.querySelector('p.error')
const forecastP =  document.querySelector('p.forecast')


// forecastP.textContent = "Fetching weather information for: " + input.value
weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(input.value);
    error.textContent = 'Loading...'
    forecastP.textContent = ''
    fetch('http://localhost:3000/weather?address=' + input.value).then((response) => {
    response.json().then((data) => {
            if(data.error){
                error.textContent = data.error
            }else{
                error.textContent = ''
                forecastP.textContent = data.location + '/n'
                + data.forecast

            }
        })
    })
})