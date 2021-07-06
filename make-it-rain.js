window.addEventListener('load', function () {
    console.log('All assets are loaded')

    var canvas = document.createElement('canvas');
    canvas.style = 'position:fixed'
    canvas.id = 'make-it-rain-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var cvwidth = canvas.width;
    var cvheight = canvas.height;

    document.body.appendChild(canvas);

    const noRainDivElements = document.getElementsByClassName('no-rain')
    let noRainDivs = []

    function isInViewport(rect) {
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    const updateNoRainDivsPosition = () => {
        noRainDivs = []
        for (let div of noRainDivElements) {
            const boundingRect = div.getBoundingClientRect()
            if (isInViewport(boundingRect)) {
                noRainDivs.push({
                    left: boundingRect.left,
                    right: boundingRect.right,
                    top: boundingRect.top,
                    bottom: boundingRect.bottom,
                    width: boundingRect.width
                })
            }
        }
        console.log(noRainDivs)
    }
    updateNoRainDivsPosition()
    window.addEventListener('scroll', updateNoRainDivsPosition)

    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "rgba(255,255,255, 0.7)";

    const drawLine = (ctx, x, y, x2, y2) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    drawLine(ctx, 0,0, 200, 200);
    var rain = []

    const fillNewDrops = (rain) => {
        const initialSeed = 20;
        let r = Math.random() * initialSeed;
        for (let i = 0; i < r; i+= 1) {
            rain.push([(Math.random() * cvwidth), 0])            
        }
    }

    const checkNoRainDivs = (rainDrop) => {
        for (const div of noRainDivs) {
            if (rainDrop[0] >= div.left && rainDrop[0] <= div.right && rainDrop[1] >= div.top - 20) {
                return true
            }
        }
        return false
    }

    const rainSplashBacks = () => {
        for (const div of noRainDivs) {
            let j = Math.random() * 30;
            for (let i =0 ; i< j; i+= 1) {
                let top = div.top - Math.random() * 25
                let left = div.left + div.width / 2 + (Math.random() - 0.5) * (div.width + Math.random() * 90);

                                
                ctx.beginPath();
                ctx.arc(left, top, Math.random() * 3, 0, 2 * Math.PI, true);
                ctx.stroke();
            }
   
        }
    }

    const updateRain = (rain) => {
        const rainSpeed = 15;
        for (let i = rain.length - 1; i > 0; i-= 1) {
            if (rain[i][1] >= cvheight || checkNoRainDivs(rain[i])) {
                rain.splice(i, 1)
            } else {
                rain[i][1] += rainSpeed // + Math.random() *3
            }
        }
        rainSplashBacks()
    }
    const dropLength = 15;
    const dropWidth = 3;
    const drawRain = (rain) => {
        for (const [x,y] of rain) {
            drawLine(ctx, x, y, x, y + dropLength)
        }
    }


    let h = 0
    var animationNum = 0
    function animate() {
        animationNum = requestAnimationFrame(animate);
        // clear canvas
        ctx.clearRect(0, 0, cvwidth, cvheight);
        // draw everything
        // everyObject.forEach(function(o) {
        //   ctx.fillStyle = o[4];
        //   ctx.fillRect(o[0], o[1], o[2], o[3]);
        // });
        // 
        ctx.fillText('click to add random rects', 10, 10);
        fillNewDrops(rain)
        drawRain(rain)
        updateRain(rain)
        // console.log(rain.length)
    }

    animate()
    
    // click handler to add random rects
    window.addEventListener('click', function() {
        this.cancelAnimationFrame(animationNum)
  });
  
  function addRandRect() {
    var randColor = Math.random() > 0.5 ? 'blue' : 'red';
    everyObject.push([Math.random() * cvwidth, Math.random() * cvheight, 10 + Math.random() * 40, 10 + Math.random() * 40, randColor]);
  }

})

