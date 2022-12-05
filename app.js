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
    gravity()
    updatePipe()
    if(checkloose()) return lose() 
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

function checkloose(){
    const birdOutside = birdEndRect()
    const outside = birdOutside.top < 0 || birdOutside.bottom > innerHeight
    return outside
}

//PIPE

const PIPE_INTERVAL = 200;
const pipes = [];
let timeSinceLastPipe = 0;
let counter = 0;

function setupPipe(){
    timeSinceLastPipe = PIPE_INTERVAL;
    counter = 0;
    pipes.forEach(pipe => pipe.remove())
}

function updatePipe(){
    timeSinceLastPipe++
    if (timeSinceLastPipe > PIPE_INTERVAL){
        timeSinceLastPipe = 0
        createPipe()
    }

    pipes.forEach(pipe => {
        pipe.right += 5;
        if(pipe.right > innerWidth){
            counter++
            return pipe.remove()
        }
        display()
    })
} 

function display(){
    displayCounter.innerHTML = counter
}

function createPipe(){
    const pipeElem = document.createElement("div");
    const hole = document.createElement("div");
    hole.classList.add("hole"); 
    hole.style.setProperty("--top", randomHolePosition())
    pipeElem.appendChild(hole);
    pipeElem.classList.add("pipe")
    const pipe = {
        get right(){
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--right"))
        },
        set right(value){
            pipeElem.style.setProperty("--right", value)
        },
        remove(){
            pipeElem.remove()
        },
    }
    pipe.right= -200;
    document.body.appendChild(pipeElem)
    pipes.push(pipe)
}

function randomHolePosition(){
    return (Math.random() * (innerHeight - 250))
}


 