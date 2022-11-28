const bird = document.querySelector(".bird");
const jumpInterval = 20;
let jump = 0;

export function gravity(){
    jump++
    if(jump < jumpInterval){
        setTop(getTop() - 5)
    }
    else{
        setTop(getTop() + 5)
    }
}

function getTop(){
    return parseFloat(getComputedStyle(bird).getPropertyValue("top"));
}

function setTop(top){
    bird.style.setProperty("--top", top)
}

export function setupBird(){
    setTop(innerHeight / 2)
    document.removeEventListener("keydown", handleJump)
    document.addEventListener("keydown", handleJump)
}

function handleJump(e){
    if(e.code !== "Space") return
    jump = 0
}

