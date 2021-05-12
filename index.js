const butterfly = document.getElementById('butterfly')
const gameover = document.getElementById('gameover')
const start = document.getElementById('start')
const reload = document.getElementById('reload')
const net = document.getElementById('net')
const guide = document.getElementById('guide')
const score = document.getElementById('score')
let scorecard = 0
let cross = true

const s1 = new Audio('start.mp3')
const s2 = new Audio('game.mp3')
const s3 = new Audio('over.mp3')

setTimeout(()=>{
    s1.play()
},1000)

document.onkeydown = (a) => {
    if (a.keyCode == 13) {
        net.classList.add('animateNet')
        start.style.display = "none"
        guide.style.visibility = "hidden"
        s1.pause()
        s2.play()

        document.onkeydown = (e) => {
            // console.log('Code : ', e.keyCode);
            if (e.keyCode == 38 || e.keyCode == 87) {
                butterfly.classList.add('animateButterfly')
                setTimeout(() => {
                    butterfly.classList.remove('animateButterfly')
                }, 1000)
            }
            if (e.keyCode == 39 || e.keyCode == 68) {
                butterflyX = parseInt(window.getComputedStyle(butterfly, null).getPropertyValue('left'))
                butterfly.style.left = butterflyX + 50 + 'px'
            }
            if (e.keyCode == 37 || e.keyCode == 65) {
                butterflyX = parseInt(window.getComputedStyle(butterfly, null).getPropertyValue('left'))
                butterfly.style.left = (butterflyX - 50) + 'px'
            }
            if(e.keyCode == 32){
                location.reload()
            }
        }

        setInterval(() => {

            butterflyX = parseInt(window.getComputedStyle(butterfly, null).getPropertyValue('left'))
            butterflyY = parseInt(window.getComputedStyle(butterfly, null).getPropertyValue('bottom'))

            netX = parseInt(window.getComputedStyle(net, null).getPropertyValue('left'))
            netY = parseInt(window.getComputedStyle(net, null).getPropertyValue('bottom'))

            offsetX = Math.abs(butterflyX - netX)
            offsetY = Math.abs(butterflyY - netY)

            // console.log(offsetX, offsetY);

            if (offsetX < 20 && offsetY < 141) {
                gameover.style.display = "block";
                reload.style.display = "block";
                net.style.animation = "none";
                s2.pause()
                s3.play()
            }

            else if (offsetX < 20 && cross) {
                scorecard += 1;
                updateScore();
                cross = false;
                animationDuration = parseFloat(window.getComputedStyle(net, null).getPropertyValue('animation-duration'))
                
                let newAnimationDuration = animationDuration

                if (newAnimationDuration > 1.5) {
                    setTimeout(() => {
                        cross = true
                        newAnimationDuration = animationDuration - 0.05
                        net.style.animationDuration = newAnimationDuration + "s";
                        console.log(0);
                    }, 500)
                }

                else {
                    setTimeout(() => {
                        cross = true
                        console.log(1);
                    }, 10)
                }

            }
        }, 10);

    }
}


function updateScore() {
    score.innerHTML = "Score : " + scorecard;
}