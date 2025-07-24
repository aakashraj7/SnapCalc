let mainCont = document.getElementById('mainCont');
let weightInput = mainCont.querySelector('#weightInput');
let heightInput = mainCont.querySelector('#heightInput');
let matric = mainCont.querySelector('#matric')
let standard = mainCont.querySelector('#standard');
let bmiReport = document.querySelector('.bmi-report');
let inch = document.querySelector('.inch');
function toStandard(){
    if(mainCont.classList.contains('matric')){
        matric.classList.remove('measurement-active');
        standard.classList.add('measurement-active');
        standard.classList.remove('measurement-inactive');
        matric.classList.add('measurement-inactive');
        weightInput.placeholder = 'In Pounds';
        heightInput.placeholder = 'In Feets';
        mainCont.classList.remove('matric');
        mainCont.classList.add('standard');
        inch.style.removeProperty('display');
        weightInput.value = '';
        heightInput.value = '';
        inch.value = '';
    }
}
function toMatric(){
    if(mainCont.classList.contains('standard')){
        standard.classList.remove('measurement-active');
        matric.classList.add('measurement-active');
        matric.classList.remove('measurement-inactive');
        standard.classList.add('measurement-inactive');
        weightInput.placeholder = 'In Kilograms';
        heightInput.placeholder = 'In Centimeters';
        mainCont.classList.remove('standard');
        mainCont.classList.add('matric');
        inch.style.display = 'none';
        weightInput.value = '';
        heightInput.value = '';
        inch.value = '';
    }
}
function calcBMI(){
    let bmiVal;
    let ansHeight = document.querySelector('#ansHeight');
    let ansWeight = document.querySelector('#ansWeight');
    if(mainCont.classList.contains('matric')){
        if(Number(heightInput.value) < 91.44 || Number(heightInput.value) > 271.78){
            messageNow('Please enter Height ranging <br> from 91.44cm to 271.78cm');
            return
        }else if(Number(weightInput.value) < 24.947 || Number(weightInput.value) > 453.592){
            messageNow('Please enter Weight ranging <br> from 24.947kg to 453.592kg');
            return
        }
        let heightM = Number(heightInput.value)/100;
        bmiVal = (Number(weightInput.value)/(heightM**2)).toFixed(1);
        ansHeight.innerHTML = heightInput.value + ' Centimeters';
        ansWeight.innerHTML = weightInput.value + ' Kilograms';
    }else if(mainCont.classList.contains('standard')){
        if(Number(heightInput.value) > 8 || Number(heightInput.value) < 3 || Number(inch.value) < 0 || Number(inch.value) > 11){
            messageNow('Please enter Height ranging from <br> 3 to 8 feets <br> and 0 to 11 inches');
            return
        }else if(Number(weightInput.value) < 55 || Number(weightInput.value) > 1000){
            messageNow('Plase enter Weight ranging <br> from 55 to 1000 pounds');
            return
        }
        var heightVal = (Number(heightInput.value) * 12) + Number(inch.value)
        bmiVal = ((Number(weightInput.value) * 703)/(heightVal ** 2)).toFixed(1);
        ansHeight.innerHTML = heightInput.value + ' Inches';
        ansWeight.innerHTML = weightInput.value + ' Pounds';
    }
    let finalAns = document.querySelector('#finalAns');
    finalAns.innerHTML = bmiVal;
    let finalCat = document.getElementById('finalCat');
    if(bmiVal < 18){
        finalCat.innerHTML = 'Under Weight';
        document.querySelector('.huw').style.color = 'aquamarine';
        document.querySelector('.vuw').style.color = 'aquamarine';
    }else if(bmiVal > 18 && bmiVal < 25){
        finalCat.innerHTML = 'Healthy';
        document.querySelector('.hh').style.color = 'aquamarine';
        document.querySelector('.vh').style.color = 'aquamarine';
    }else if(bmiVal > 25 && bmiVal < 30){
        finalCat.innerHTML = 'Over Weight';
        document.querySelector('.how').style.color = 'aquamarine';
        document.querySelector('.vow').style.color = 'aquamarine';
    }else{
        finalCat.innerHTML = 'Obesity';
        document.querySelector('.ho').style.color = 'aquamarine';
        document.querySelector('.vo').style.color = 'aquamarine';
    }
    document.getElementById('returnSnap').style.display = 'none';
    mainCont.style.display = 'none';
    bmiReport.style.display = 'block';
}
function goBack(){
    mainCont.style.removeProperty('display');
    bmiReport.style.display = 'none';
    document.querySelector('#returnSnap').style.removeProperty('display');
    document.querySelector('.huw').style.color = 'aliceblue';
    document.querySelector('.vuw').style.color = 'aliceblue';
    document.querySelector('.hh').style.color = 'aliceblue';
    document.querySelector('.vh').style.color = 'aliceblue';
    document.querySelector('.how').style.color = 'aliceblue';
    document.querySelector('.vow').style.color = 'aliceblue';
    document.querySelector('.ho').style.color = 'aliceblue';
    document.querySelector('.vo').style.color = 'aliceblue';
}
function messageNow(msg){
    let message = document.querySelector('.message');
    message.innerHTML = msg;
    message.style.removeProperty('display');
    setTimeout(function(){
        message.style.display = 'none'
    },6000);
}