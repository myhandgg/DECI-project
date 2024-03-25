const nameP = document.querySelector("p .name")
const problemNums = document.querySelector("p .num")

const nameInput = document.querySelector("#name")
const themeBtn = document.querySelector("select")
const submit = document.querySelector(".theme-btn button")

const head = document.querySelector("head")

if (localStorage.getItem("name")) {
    nameP.textContent = localStorage.getItem("name")
}

if (localStorage.getItem("solved")) {
    problemNums.textContent = localStorage.getItem("solved")
}

if (localStorage.getItem("theme")) {
    themeBtn.value = localStorage.getItem("theme")
    changingThemes()
}

submit.onclick = (e) => {
    e.preventDefault()
    localStorage.setItem("name" , nameInput.value)
    localStorage.setItem("theme" , themeBtn.value)
    nameP.textContent = localStorage.getItem("name")
    changingThemes()
}


function theme1() {
    head.innerHTML = `<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>kidCalc</title>
        <link rel="stylesheet" href="assests/css/style.css">
        <link rel="stylesheet" href="assests/css/theme1.css">
        <!-- Font -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></head>
    `
}

function theme2() {
    head.innerHTML = `<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>kidCalc</title>
        <link rel="stylesheet" href="assests/css/style.css">
        <link rel="stylesheet" href="assests/css/theme2.css">
        <!-- Font -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></head>
    ">`
}

function theme3() {
    head.innerHTML = `<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>kidCalc</title>
        <link rel="stylesheet" href="assests/css/style.css">
        <link rel="stylesheet" href="assests/css/theme3.css">
        <!-- Font -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></head>
    `
}

function changingThemes() {
    if (themeBtn.value === "Theme 1" || localStorage.getItem("theme") === "Theme 1") {
        theme1()
    } else if (themeBtn.value === "Theme 2" || localStorage.getItem("theme") === "Theme 2") {
        theme2()
    } else {
        theme3()
    }
}

// kidCalc Logic

const readOnlyInput = document.querySelector(".readOnlyInput")
const answerInput = document.getElementById("submit-input")

const allNums = document.querySelectorAll(".number-buttons .number")
const allOperators = document.querySelectorAll(".operator-buttons .operator")

const clearBtn = document.querySelector(".clear")
const submitBtn = document.querySelector(".submit")

const resultMessage = document.getElementById("result-message")

const equalBtn = document.querySelector(".equal")

allNums.forEach(e => {
    e.onclick = () => {
        readOnlyInput.value += e.textContent
    }
})

allOperators.forEach(e => {
    e.onclick = () => {
        readOnlyInput.value += e.textContent
    }
})

clearBtn.onclick = () => {
    clear()
}

let num1 , num2 , finalAnswer

submitBtn.onclick = () => {
    getNumbers()
    if (+answerInput.value === finalAnswer || answerInput.value === true) {
        problemNums.textContent = ++problemNums.textContent
        localStorage.setItem("solved" , problemNums.textContent)
        resultMessage.textContent = "Great job"
        setTimeout(() => clear() , 1500);
    } else {
        resultMessage.textContent = "Try again"
    }
    // Error handling
    if (answerInput.value === ""  || isNaN(answerInput.value) || readOnlyInput.value === ""){
        resultMessage.textContent = "Invalid Input"
        answerInput.value = ""
    }
}

equalBtn.onclick = () => {
    getNumbers()
    if (finalAnswer) {
        answerInput.value = finalAnswer
        resultMessage.textContent = ""
    } else {
        answerInput.value = finalAnswer
    }
    
    if (readOnlyInput.value === "") answerInput.value = ""
}

function getNumbers() {
    let input = readOnlyInput.value
    let operator;
    for (let i = 0; i < input.length; i++) {
        // Targeting the operator
        if (!Number(input[i])) {
            operator = input[i]
        }
    }
    num1 = input.slice(0 , input.indexOf(operator))
    num2 = input.slice(input.indexOf(operator) + 1)
    finalAnswer = eval(num1 + operator + num2)
}

function clear() {
    readOnlyInput.value = ""
    answerInput.value = ""
    resultMessage.textContent = ""
}