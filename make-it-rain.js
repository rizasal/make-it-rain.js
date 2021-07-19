export default function makeItRain(options = {}) {
        var canvas = document.createElement('canvas');
        canvas.style = 'position:fixed; left:0; top:0; pointer-events:none'
        canvas.id = 'make-it-rain-canvas';
        canvas.width = document.body.clientWidth || window.innerWidth;
        canvas.height = document.body.clientHeight || window.innerHeight;

        var scale = window.devicePixelRatio;
        var cvwidth = canvas.width;
        var cvheight = canvas.height;

        document.body.appendChild(canvas);

        const noRainDivElements = document.getElementsByClassName('no-rain')
        const nonBlockingElements = document.getElementsByClassName('no-rain-non-blocking')

        let nonBlockingDivs = []
        let noRainDivs = []

        const rainSpeed = (options.rainSpeed || 15) * scale;
        const dropLength = (options.dropLength || 20) * scale;
        const dropWidth = (options.dropWidth || 3) * scale;
        const rainColor = options.rainColor || '255,255,255'

        function isInViewport(rect) {
            return (
                rect.bottom >= 0 &&
                rect.left >= 0 &&
                // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        const updateNoRainDivsPosition = (divsList, divElements) => {
            return () => {
                divsList.length = 0
                for (let div of divElements) {
                    const boundingRect = div.getBoundingClientRect()
                    if (isInViewport(boundingRect)) {
                        divsList.push({
                            left: boundingRect.left,
                            right: boundingRect.right,
                            top: boundingRect.top,
                            bottom: boundingRect.bottom,
                            width: boundingRect.width
                        })
                    }
                }
            }
        }
        const blockingRainDivsPositionUpdate = updateNoRainDivsPosition(noRainDivs, noRainDivElements)
        const nonBlockingRainDivsPositionUpdate = updateNoRainDivsPosition(nonBlockingDivs, nonBlockingElements)
        blockingRainDivsPositionUpdate()
        nonBlockingRainDivsPositionUpdate()

        window.addEventListener('scroll', blockingRainDivsPositionUpdate)
        window.addEventListener('scroll', nonBlockingRainDivsPositionUpdate)

        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "rgba(255,255,255, 0.7)";

        const drawLine = (ctx, x, y, x2, y2) => {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        const drawLineOpacity = (opacity, ctx, ...args) => {
            ctx.strokeStyle = `rgba(${rainColor},${opacity})`
            drawLine(ctx, ...args)
        }

        drawLine(ctx, 0, 0, 200, 200);
        var rain = []
        const initialSeed = cvwidth / (scale * 100);

        const fillNewDrops = (rain) => {
            let r = Math.random() * initialSeed;
            for (let i = 0; i < r; i += 1) {
                rain.push([(Math.random() * cvwidth), 0, Math.round(Math.random() * 10) / 10])
            }
        }

        const checkNoRainDivs = (rainDrop) => {
            for (const div of noRainDivs) {
                if (rainDrop[0] >= div.left && rainDrop[0] <= div.right && rainDrop[1] >= div.top - dropLength) {
                    return true
                }
            }
            return false
        }

        const rainSplashBacks = () => {
            for (const div of noRainDivs) {
                let j = Math.random() * 30;
                for (let i = 0; i < j; i += 1) {
                    let top = div.top - Math.random() * 25
                    let left = div.left + div.width / 2 + (Math.random() - 0.5) * (div.width + Math.random() * 90);


                    ctx.beginPath();
                    ctx.arc(left, top, Math.random() * 3, 0, 2 * Math.PI, true);
                    ctx.stroke();
                }

            }
        }

        const updateRain = (rain) => {
            for (let i = rain.length - 1; i > 0; i -= 1) {
                if (rain[i][1] >= cvheight || checkNoRainDivs(rain[i])) {
                    const [left, top] = rain.splice(i, 1)[0]
                    // ctx.beginPath();
                    // ctx.arc(left + Math.random() * 10, top - Math.random() * 10, Math.random() * 3, 0, 2 * Math.PI, true);
                    // ctx.stroke();
                    // ctx.beginPath();
                    // ctx.arc(left + Math.random() * 10, top - Math.random() * 10, Math.random() * 3, 0, 2 * Math.PI, true);
                    // ctx.stroke();
                } else {
                    rain[i][1] += rainSpeed // + Math.random() *3
                }
            }
            rainSplashBacks()
        }
        const checkNonBlockingDiv = (x, y) => {
            for (const div of nonBlockingDivs) {
                if ((div.left <= x && x <= div.right) && (div.top - dropLength) <= y && y <=div.bottom) {
                    return true
                }
            }
            return false
        }
        const drawRain = (rain) => {
            for (const [x, y, z] of rain) {
                if (!checkNonBlockingDiv(x, y))
                    drawLineOpacity(z, ctx, x, y, x, y + dropLength)
            }
        }


        let h = 0
        var animationNum = 0
        function animate() {
            animationNum = requestAnimationFrame(animate);
            // clear canvas
            ctx.clearRect(0, 0, cvwidth, cvheight);
            fillNewDrops(rain)
            drawRain(rain)
            updateRain(rain)
        }

        // animate()

        // click handler to add random rects
        // window.addEventListener('click', function () {
        //     this.cancelAnimationFrame(animationNum)
        // });

        return {
            stopAnimation: () => {
                this.cancelAnimationFrame(animationNum)
            },
            startAnimation: () => {
                animate()
            },
            clearScreen: () => {
                ctx.clearRect(0, 0, cvwidth, cvheight)
            },
            updateNoRainDivsPosition
        }


    
}