let expression = [];
let equals = [];
let display = document.getElementById("display");
let Status = false;
document.addEventListener("keydown", function(event){
    if(event.key === "Enter" || event.key === '='){
        var current = document.getElementById('bequal');
        current.classList.add('nor-effect');
        setTimeout(() => {
            current.classList.remove('nor-effect')
        },300);
        calcu()
    }else if(event.key === 'Backspace'){
        var current = document.getElementById('bDEL');
        current.classList.add('nor-effect');
        setTimeout(() => {
            current.classList.remove('nor-effect')
        },300);
        delItem()
    }else if(event.key === '+'){
        var current = document.getElementById('bplus');
        current.classList.add('opr-effect');
        setTimeout(() => {
            current.classList.remove('opr-effect')
        },300);
        num(event.key)
    }else if(event.key === '-'){
        var current = document.getElementById('bminus');
        current.classList.add('opr-effect');
        setTimeout(() => {
            current.classList.remove('opr-effect')
        },300);
        num(event.key)
    }
    else if(event.key === '*'){
        var current = document.getElementById('bmul');
        current.classList.add('opr-effect');
        setTimeout(() => {
            current.classList.remove('opr-effect')
        },300);
        num(event.key)
    }else if(event.key === '/'){
        var current = document.getElementById('bdiv');
        current.classList.add('opr-effect');
        setTimeout(() => {
            current.classList.remove('opr-effect')
        },300);
        num(event.key)
    }else if(event.key === '%'){
        var current = document.getElementById('bmod');
        current.classList.add('opr-effect');
        setTimeout(() => {
            current.classList.remove('opr-effect')
        },300);
        num(event.key)
    }else if(event.key === '.'){
        var current = document.getElementById('bdot');
        current.classList.add('nor-effect');
        setTimeout(() => {
            current.classList.remove('nor-effect')
        },300);
        num(event.key)
    }else if(!isNaN(Number(event.key))){
        var current = document.getElementById('b'+event.key);
        current.classList.add('num-effect');
        setTimeout(() => {
            current.classList.remove('num-effect')
        },300);
        num(event.key)
    }else if(!['Alt','Shift','Ctrl'].includes(event.key)){
        messageNow("Wrong Key press")
    }
})
function allCancel(){
    display.value = ""
}
function delItem(){
    let temp = display.value
    display.value = temp.slice(0,(temp.length)-1)
}
function num(n){
    if(Status){
        display.value = ''
        Status = false
    }
    if(display.value === "Syntax Error" || display.value === '0'){
        display.value = n
    }else if(n === '0'){
        if(display.value !== ''){
            display.value = display.value + n
        }
    }else{
        display.value = display.value + n
    }
}
function appearHistroy(){
    if(expression.length !== 0 && document.querySelector('.history').style.display === 'none'){
        document.querySelector(".history").style.display = 'flex';
        document.querySelector('.history .h-btn').style.display = 'inline';
    }
}
function lookHistory(){
    document.querySelector('.history .h-btn').style.display = 'none';
    document.querySelector('.history h4').style.display = 'block';
    let hCont = document.querySelector('.history .h-cont');
    hCont.style.display = 'block'
    document.querySelector('.history .b-btn').style.display = 'inline';
}
function updateHistory(){
    let hCont = document.querySelector('.history .h-cont');
    hCont.innerHTML = '';
    for(let i=0; i<expression.length; i++){
        let newExp = document.createElement('p');
        newExp.innerHTML = expression[i]+' = '+equals[i];
        hCont.appendChild(newExp);
    }
}
function hideNow(){
    document.querySelector('.history h4').style.display = 'none';
    document.querySelector('.history .h-cont').style.display = 'none';
    document.querySelector('.history .h-btn').style.display = 'inline';
    document.querySelector('.history .b-btn').style.display = 'none';
}
function calcu(){
    try{
        if(display.value === ''){
            display.value = ''
        }else if(isNaN(eval(display.value))){
            display.value = "Syntax Error"
        }else{
            expression.push(display.value)
            display.value = eval(`"use strict"; (${display.value})`)
            equals.push(display.value)
            if(expression.at(-1) === equals.at(-1)){
                expression.pop();
                equals.pop()
            }else{
                Status = true;
            }
            updateHistory()
            appearHistroy()
        }
    }
    catch(SyntaxError){
        display.value = "Syntax Error";
        expression.pop();
        equals.pop();
    }
}
function messageNow(text){
    var msgElem = document.getElementById("message")
    msgElem.innerHTML = text
    msgElem.style.display = "block"
    setTimeout(() => {
        msgElem.style.display = "none"
    }, 1000);
}
