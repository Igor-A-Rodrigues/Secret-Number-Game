let generatedNumbersArray = [];
let maximumNumberspermited = 10;
let secretNumber = generateRandomNumber();
let attempts = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'en-UK'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function firstGreetings(){
    exibirTextoNaTela('h1', 'The secret number game');
    exibirTextoNaTela('p', 'Choose a number between 1 and 10');
}

firstGreetings();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == secretNumber) {
        exibirTextoNaTela('h1', 'You got it!');
        let attemptsWord = attempts > 1 ? 'attempts' : 'attempt';
        let attemptsMessage = `You found the secret number within ${attempts} ${attemptsWord}.`;
                exibirTextoNaTela('p', attemptsMessage);
                document.getElementById('restart').removeAttribute('disabled');
        } else {
                if (chute > secretNumber) {
                        exibirTextoNaTela('h1', 'Try again!')
                        exibirTextoNaTela('p', 'The secret number is smaller than that');
                } else {
                        exibirTextoNaTela('h1', 'Try again!')
                        exibirTextoNaTela('p', 'The secret number is bigger than that');
                }
                attempts++;
                clearNumber();
        }
}

function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * maximumNumberspermited + 1);
    let arrayNumbersQuantity = generatedNumbersArray.length;

    if (generatedNumbersArray == maximumNumberspermited) {
        generatedNumbersArray = [];
    }
    if (generatedNumbersArray.includes(chosenNumber)) {
        return generateRandomNumber();
    } else {
        generatedNumbersArray.push(chosenNumber);
        console.log(generatedNumbersArray)
        return chosenNumber;
    }
}

function clearNumber(){
    chute = document.querySelector('input');
    chute.value = '';
}

function restart(){
    secretNumber = generateRandomNumber();
    clearNumber();
    attempts = 1;
    firstGreetings();
    document.getElementById('restart').setAttribute('disabled', true);
}