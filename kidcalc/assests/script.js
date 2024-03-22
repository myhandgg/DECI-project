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
    readOnlyInput.value = ""
    answerInput.value = ""
    resultMessage.textContent = ""
}

let num1 , num2 , finalAnswer

submitBtn.onclick = () => {
    getNumbers()
    if (+answerInput.value === finalAnswer) {
        resultMessage.textContent = "Great job"
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