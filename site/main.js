import makeItRain from '../make-it-rain'

var rain 
window.addEventListener('load', () => {
   rain = makeItRain()
   rain.startAnimation()
})
