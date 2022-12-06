// GENERAL

const text = document.querySelector(".text"); 
const displayCounter = document.querySelector(".displayCounter")

document.addEventListener("keypress", start, {once:true});
document.addEventListener("touchstart", start, {once:true});
document.addEventListener("touchstart", touch)

function start(){
    text.classList.add("hide");
    displayCounter.classList.remove("hide");
    setupBird();
    setupPipe();
    requestAnimationFrame(updateLoop);
}

function lose(){ 
    text.classList.remove("hide");
    displayCounter.innerHTML = "Pipes: " + counter;
    setTimeout(() => {
        document.addEventListener("keypress", start, {once: true})
        document.addEventListener("touchstart", start, {once:true});
    }, 500)
}

function updateLoop(){
    gravity();
    updatePipe();
    if (checklose()) return lose()
    requestAnimationFrame(updateLoop)
}

function touch(){
    timeSinceLastJump = 0;
}

// BIRD SETTINGS

const bird = document.querySelector(".bird");
const JUMP_DURATION = 20;
let timeSinceLastJump = 0;

function setupBird(){
    setBirdTop(innerHeight / 2)
    document.removeEventListener("keydown", jump)
    document.addEventListener("keydown", jump)
    pipes.forEach(pipe => {
        pipe.remove()
    })
    counter = 0;
}

function getBirdTop(){
    return parseFloat(getComputedStyle(bird).getPropertyValue("--top"))
}

function setBirdTop(top){
    bird.style.setProperty("--top", top)
}

function gravity(){
    timeSinceLastJump++
    if(timeSinceLastJump < JUMP_DURATION){
        setBirdTop((getBirdTop() - 5))
    }
    else{
        setBirdTop((getBirdTop() + 5))
    }
}

function jump(e){
    if(e.code === "Space"){
        timeSinceLastJump = 0;
    }
}

function birdEndRect(){
    return bird.getBoundingClientRect()
}

function checklose(){
    const birdOutside = birdEndRect()
    const insidePipe = getPipeRects().some(rect => isCollision(birdOutside, rect))
    const outside = birdOutside.top < 0 || birdOutside.bottom > innerHeight
    return outside || insidePipe
}

function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    )
}

//PIPE

const pipeInterval = 200;
let timeSinceLastPipe = 0;
let counter = 0;
let pipes = [];

function setupPipe(){
    timeSinceLastPipe = pipeInterval
}

function updatePipe(){
    timeSinceLastPipe++
    if(timeSinceLastPipe > pipeInterval){
        timeSinceLastPipe = 0;
        createPipe()
    }
    
    pipes.forEach(pipe => {
        pipe.right = pipe.right + 5;
        if(pipe.right > innerWidth){
            counter++
            pipe.remove()
        }
        display()
    })
}

function display(){
    displayCounter.innerHTML = counter
}

function createPipe(){
    const allPipe = document.createElement("div");
    const pipeTop = document.createElement("div");
    const pipeBottom = document.createElement("div");
    pipeTop.classList.add("pipeTop");
    pipeBottom.classList.add("pipeBottom");
    allPipe.append(pipeTop);
    allPipe.append(pipeBottom);
    allPipe.classList.add("allPipe");
    allPipe.style.setProperty("--hole-top", random(120 * 1.5, innerHeight - 150 * 0.5))
    const pipe = {
        get right(){
            return parseFloat(getComputedStyle(allPipe).getPropertyValue("--piperight"))
        },
        set right(value){
            allPipe.style.setProperty("--piperight", value)
        },
        remove(){
            allPipe.remove()
        },
        rects(){
            return [
                pipeTop.getBoundingClientRect(),
                pipeBottom.getBoundingClientRect()
            ]
        }
    } 
    pipe.right = -200
    document.body.append(allPipe)
    pipes.push(pipe)
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getPipeRects(){
    return pipes.flatMap(pipe => pipe.rects())
}




 