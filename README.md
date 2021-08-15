
Installation

```
npm i make-it-rain
```

Usage

                    
```
import makeItRain from 'make-it-rain'

var rain 
window.addEventListener('load', () => {
   rain = makeItRain()
   rain.startAnimation()
})
window.addEventListener('click', () => {
   rain.stopAnimation()
})
```               

                        

Add the class "no-rain" to your div to block the div from rain

There are 2 types of classes you can apply to the divs
no-rain

This class blocks the rain and any elements below it would not have rain. There would be splash effects near the top-edge
no-rain-non-blocking

This class makes the rain go behind the div. There will not be any splash effects

                    
```
<div class="no-rain">
    This div will block the raindrops at the top of the div
</div>
<div class="no-rain-non-blocking">
    This will silently let the rain pass through behind the div
</div>
```                    


## Customizations

The makeItRain function accepts an object with the following parameters

                    
```
{ 
    rainSpeed: 15,
    dropLength = 20,
    dropWidth: 3,
    rainColor: '255,255,255'
}
```                    

## Return Object

The makeItRain() function returns an object with the following properties

                    
```
{
    stopAnimation: () => {
        //stops the rain
    },
    startAnimation: () => {
        //starts the rain
    },
    clearScreen: () => {
        //clears the screen
    },
    updateNoRainDivsPosition: () => {
        //triggered when the zoom changes/user scrolls so 
        //that the div's positions are updated
    },
    onZoomChange: () => {
        // This handler is automatically triggered on resize event
    }
}
```
            


                
            



