import { gravity, setupBird,  } from "./bird.js"

import { updatePipes } from "./pipe.js"


const text = document.querySelector(".text")

document.addEventListener("keypress", handleStart, { once:true })

function updateLoop(){
    gravity()
    updatePipes()
    requestAnimationFrame(updateLoop)
}

function handleStart(){
    text.classList.add("hidden")
    setupBird()
    requestAnimationFrame(updateLoop)
}

