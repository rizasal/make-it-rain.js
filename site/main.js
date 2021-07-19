import makeItRain from '../make-it-rain'

var rain 
window.addEventListener('load', () => {
   rain = makeItRain()
})

window.addEventListener('click', () => {
    rain.startAnimation()
})