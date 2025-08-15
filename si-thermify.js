let mainCont = document.querySelector('.selection');
let resCont = document.querySelector('.result');
let gnInput = resCont.querySelector('#givenInput');
let convertionTitle = resCont.querySelector('.res-h1');
let fromHeader = resCont.querySelector('.from-header');
let toHeader = resCont.querySelector('.to-header');
let resultShow = resCont.querySelector('.to-res');
let mainTitle = document.querySelector('.main-title');
gnInput.addEventListener("input",function(){
    let newFrom = fromHeader.innerHTML;
    let newTo = toHeader.innerHTML;
    if(Number(gnInput.value) !== NaN){
        convertIt(newFrom,newTo);
    }
})
document.addEventListener('keydown',function(event){
    if(mainCont.style.display === 'none' && resCont.style.display !== 'none'){
        let from = fromHeader.innerHTML;
        let to = toHeader.innerHTML;
        if(['1','2','3','4','5','6','7','8','9','0','.'].includes(event.key)){
            gnInput.value = gnInput.value + event.key;
            convertIt(from,to)
        }else if(event.key === 'Backspace'){
            if(gnInput.value !== ''){
                gnInput.value = (gnInput.value).slice(0,(gnInput.value).length - 1);
                convertIt(from,to)
            }
        }
    }
})
function convertIt(from, to){
    if(gnInput.value !== ''){
        if(from === 'Celcius' && to === 'Kelvin'){
            resultShow.innerHTML = (Number(gnInput.value) + 273.15).toFixed(2);
        }else if(from === 'Kelvin' && to === 'Celcius'){
            resultShow.innerHTML = (Number(gnInput.value) - 273.15).toFixed(2);
        }else if(from === 'Celcius' && to === 'Farenheit'){
            resultShow.innerHTML = ((Number(gnInput.value) * 9/5) + 32).toFixed(2);
        }else if(from === 'Farenheit' && to === 'Celcius'){
            resultShow.innerHTML = ((Number(gnInput.value) - 32) * 5/9).toFixed(2);
        }else if(from === 'Kelvin' && to === 'Farenheit'){
            resultShow.innerHTML = ((Number(gnInput.value) - 273.15) * 9/5 + 32).toFixed(2);
        }else if(from === 'Farenheit' && to === 'Kelvin'){
            resultShow.innerHTML = ((Number(gnInput.value) - 32) * 5/9 + 273.15).toFixed(2);
        }
    }else{
        resultShow.innerHTML = '---';
    }
}
function changePage(from, to){
    mainCont.style.display = 'none';
    resCont.style.removeProperty('display');
    mainTitle.innerHTML = 'Thermify';
    convertionTitle.innerHTML = `${from} → ${to}`;
    fromHeader.innerHTML = from;
    toHeader.innerHTML = to;
}
function returnBack(){
    resCont.style.display = 'none';
    mainCont.style.removeProperty('display');
    mainTitle.innerHTML = 'Switch It'
}