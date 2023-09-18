const channelEl = document.getElementById("channel")
const timerEl = document.getElementById("timer")
const counterEl = document.getElementById("counter")
const scoreEl = document.getElementById("score")
const infoEl = document.getElementById("score")
const infoTextEl = document.getElementById("info-text")
const mainEl = document.getElementById("main")
const btnEl = document.getElementById("start-button")

let timer = null
let started = false
let timerValue = 0
let users = []
let score = 0.0


const params = (new URL(document.location)).searchParams
const channel = params.get("channel") || null

if ( channel ) {
    channelEl.parentNode.removeChild(channelEl)
    btnEl.disabled = false
}


function start() {
    if(started) {
        stop()
        return
    }

    mainEl.style.visibility = "visible"
    btnEl.innerText = "СТОП"
    btnEl.style.backgroundColor = "rgb(129, 93, 93)" // хотел без этого в коде, но так лень

    timerValue = timerEl.valueAsNumber * 60 || 0
    

    infoTextEl.innerHTML = "Голосование в чате!<br>Напишите оценку от 1 до 10<br>"
    started = true

    if(timerValue > 0) {
        timer = setInterval(onTimer, 1000)
        timerToTime()
    }
    
}


function messageHandler(user, message) {
    if(!started) {
        return
    }

    if(users.includes(user)) {
        return
    }

    let answer = message.split(" ")[0].replace(",",".")

    if(isNaN(answer)) {
        return
    }

    answer = parseFloat(answer)

    if (answer < 1 || answer > 10) {
        return
    }

    score += answer
    users.push(user)
    counterEl.innerText = users.length
    console.log(`${user}: ${answer}`)
}

function stop() {
    try { clearInterval(timer) } catch {}

    btnEl.innerText = "СТАРТ"
    btnEl.style.backgroundColor = "rgb(93, 129, 93)"
    infoTextEl.innerHTML = "Голование окончено!<br><br>"
    btnEl.disabled = true 
    // Да, нужно F5 чтобы запустить голосование заново
    // МНе лень писать пару строчек чтобы сбрасывать таймеры, списки, текста в html и чёт там ещё

    if(users.length > 0) {
        let result = (score/users.length).toFixed(2)
        let text = `Итог: ${result}`
        scoreEl.innerText = text
    } else {
        scoreEl.innerText = "Никто не проголосовал :("
    }

    started = false

}

function onTimer() {
    timerValue -= 1

    if(timerValue > 0) {
        timerToTime()
    } else {
        stop()
    }
    
}

function timerToTime() {
    let minutes = Math.floor(timerValue / 60)
    let seconds = timerValue % 60

    minutes = minutes.toString().padStart(2, "0")
    seconds = seconds.toString().padStart(2, "0")

    let text = `${minutes}:${seconds}`
    scoreEl.innerText = text
}
