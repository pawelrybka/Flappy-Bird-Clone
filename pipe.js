const pipes = []
const PIPE_INTERVAL = 250
let timeSinceLastPipe = 0

function createPipe(){
    const pipeElem = document.createElement("div")
    pipeElem.classList.add("pipe")
    const hole = document.createElement("div")
    hole.classList.add("hole")
    pipeElem.appendChild(hole)
    hole.style.setProperty("--top", random(200, window.innerHeight - 200))
    const pipe = {
        get right(){
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--right"))
        },
        set right(value){
            pipeElem.style.setProperty("--right", value)
        },
         
    }
    pipe.right = -200
    document.body.append(pipeElem)
    pipes.push(pipe)
}
 
export function updatePipes(){
    timeSinceLastPipe++
    if(timeSinceLastPipe > PIPE_INTERVAL){
        timeSinceLastPipe = 0
        createPipe()
    }
    pipes.forEach(pipe => {
        pipe.right = pipe.right + 5  
    })
}

function random(min, max){
    return Math.floor(Math.random() * (max - min)) 
}

