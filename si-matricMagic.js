let lengthOptions = ['Kilometer','Meter','Centimeter','Millimeter','Inch','Foot','Mile'];
let lengthMap = {'Kilometer':'km','Meter':'m','Centimeter':'cm','Millimeter':'mm','Inch':'in','Foot':'ft','Mile':'mile'};

let massOptions = ['Kilogram','Gram','Milligram','Pound','Ounce','Metric ton'];
let massMap = {'Kilogram':'kg','Gram':'g','Milligram':'mg','Pound':'lb','Ounce':'oz','Metric ton':'t'};


let mainCont = document.querySelector('.enter-cont');
let resCont = document.querySelector('.result');
let conversionTitle = resCont.querySelector('.res-h1');
let fromContainer = resCont.querySelector('.getting');
let toContainer = resCont.querySelector('.setting');
let gnInput = resCont.querySelector('.inputter');
let largeTitle = document.querySelector('.large-title');
gnInput.addEventListener('input',function(){
    let which;
    if(conversionTitle.innerHTML === "Length / Distance Conversion"){
        which = 'length';
    }else if(conversionTitle.innerHTML === "Mass / Weight Conversion"){
        which = 'mass';
    }
    execution(which)
});
document.addEventListener('keydown',function(event){
    let which;
    if(conversionTitle.innerHTML === "Length / Distance Conversion"){
        which = 'length';
    }else if(conversionTitle.innerHTML === "Mass / Weight Conversion"){
        which = 'mass';
    }
    if(mainCont.style.display === 'none'){
        if(['1','2','3','4','5','6','7','8','9','0','.'].includes(event.key)){
            gnInput.value = gnInput.value + event.key
            execution(which)
        }else if(event.key === 'Backspace'){
            if(gnInput !== ''){
                gnInput.value = (gnInput.value).slice(0,(gnInput.value).length - 1);
                execution(which)
            }
        }
    }
})
function fromToUpdate(decider){
    let requiredOptions, requiredMap, which;
    if(decider === 'Length / Distance Conversion'){
        requiredOptions = [...lengthOptions];
        requiredMap = structuredClone(lengthMap);
        which = 'length';
    }else if(decider === 'Mass / Weight Conversion'){
        requiredOptions = [...massOptions];
        requiredMap = structuredClone(massMap);
        which = 'mass';
    }
    //Creating 'from' inner-options container
    let innerOptions = document.createElement('div');
    innerOptions.className = 'inner-options';
    //Adding Elements inside the 'from' inner-options container
    for(let i=0; i<requiredOptions.length; i++){
        let combined = document.createElement('div');
        combined.className = 'combined';
        let inputElem = document.createElement('input');
        inputElem.type = 'radio';
        inputElem.id = requiredOptions[i]+'from';
        inputElem.value = requiredOptions[i];
        inputElem.setAttribute('name','fromInput');
        let newLabel = document.createElement('label');
        newLabel.setAttribute('for',requiredOptions[i]+'from');
        newLabel.appendChild(inputElem);
        newLabel.append(requiredOptions[i]);
        combined.appendChild(newLabel);
        innerOptions.appendChild(combined);
    }
    fromContainer.appendChild(innerOptions);
    let newInnerOptions = document.createElement('div');
    newInnerOptions.className = 'inner-options';
    for(let i=0; i<requiredOptions.length; i++){
        let combined = document.createElement('div');
        combined.className = 'combined';
        let inputElem = document.createElement('input');
        inputElem.type = 'radio';
        inputElem.id = requiredOptions[i]+'to';
        inputElem.value = requiredOptions[i];
        inputElem.setAttribute('name','toInput');
        let newLabel = document.createElement('label');
        newLabel.setAttribute('for',requiredOptions[i]+'to');
        newLabel.appendChild(inputElem);
        newLabel.append(requiredOptions[i])
        combined.appendChild(newLabel);
        newInnerOptions.appendChild(combined);
    }
    toContainer.appendChild(newInnerOptions);
    const fromOptions = document.querySelectorAll('input[name="fromInput"]');
    fromOptions.forEach(radio => {
        radio.addEventListener('change',function(){
            if(this.checked){
                unitChange('from',requiredMap[this.value])
                execution(which)
            }
        })
    })
    const toOptions = document.querySelectorAll('input[name="toInput"]');
    toOptions.forEach(radio => {
        radio.addEventListener('change',function(){
            if(this.checked){
                unitChange('to',requiredMap[this.value])
                execution(which)
            }
        })
    })
}
function pageChanger(purpose){
    mainCont.style.display = 'none';
    resCont.style.removeProperty('display');
    largeTitle.innerHTML = "MatricMagic";
    conversionTitle.innerHTML = purpose;
    //Erasing Contents in fromContainer
    fromContainer.innerHTML = '';
    toContainer.innerHTML = '';
    //Creating and Appending 'From' title
    let fromTit = document.createElement('h3');
    fromTit.innerHTML = 'From';
    //Creating and Appending 'To' title
    let toTit = document.createElement('h3');
    toTit.innerHTML = 'To';
    toContainer.appendChild(toTit);
    fromContainer.appendChild(fromTit);
    fromToUpdate(purpose)  
}
function execution(which){
    let fromChecked = document.querySelector('input[name="fromInput"]:checked');
    let toChecked = document.querySelector('input[name="toInput"]:checked');
    let outputter = document.querySelector('.output');
    let fromUnit = fromChecked !== null ? fromChecked.value : null;
    let toUnit = toChecked !== null ? toChecked.value : null;
    if(fromChecked !== null && toChecked !== null){
        if(which === 'length'){
            if(fromUnit === toUnit){
                outputter.innerHTML = gnInput.value;
            }else if(fromUnit === 'Kilometer' && toUnit === 'Meter'){
                outputter.innerHTML = (gnInput.value * 1000).toFixed(2);
            }else if(fromUnit === 'Kilometer' && toUnit === 'Centimeter'){
                outputter.innerHTML = (gnInput.value * 100000).toFixed(2);
            }else if(fromUnit === 'Kilometer' && toUnit === 'Millimeter'){
                outputter.innerHTML = (gnInput.value * 1000000).toFixed(2);
            }else if(fromUnit === 'Kilometer' && toUnit === 'Inch'){
                outputter.innerHTML = (gnInput.value * 39370.0787).toFixed(2);
            }else if(fromUnit === 'Kilometer' && toUnit === 'Foot'){
                outputter.innerHTML = (gnInput.value * 3280.8399).toFixed(2);
            }else if(fromUnit === 'Kilometer' && toUnit === 'Mile'){
                outputter.innerHTML = (gnInput.value * 0.621371).toFixed(2);
            }else if(fromUnit === 'Meter' && toUnit === 'Kilometer'){
                outputter.innerHTML = (gnInput.value / 1000).toFixed(2);
            }else if(fromUnit === 'Meter' && toUnit === 'Centimeter'){
                outputter.innerHTML = (gnInput.value * 100).toFixed(2);
            }else if(fromUnit === 'Meter' && toUnit === 'Millimeter'){
                outputter.innerHTML = (gnInput.value * 1000).toFixed(2);
            }else if(fromUnit === 'Meter' && toUnit === 'Inch'){
                outputter.innerHTML = (gnInput.value * 39.3700787).toFixed(2);
            }else if(fromUnit === 'Meter' && toUnit === 'Foot'){
                outputter.innerHTML = (gnInput.value * 3.2808399).toFixed(2);
            }else if(fromUnit === 'Meter' && toUnit === 'Mile'){
                outputter.innerHTML = (gnInput.value * 0.000621371).toFixed(2);
            }else if(fromUnit === 'Centimeter' && toUnit === 'Kilometer'){
                outputter.innerHTML = (gnInput.value / 100000).toFixed(2);
            }else if(fromUnit === 'Centimeter' && toUnit === 'Meter'){
                outputter.innerHTML = (gnInput.value / 100).toFixed(2);
            }else if(fromUnit === 'Centimeter' && toUnit === 'Millimeter'){
                outputter.innerHTML = (gnInput.value * 10).toFixed(2);
            }else if(fromUnit === 'Centimeter' && toUnit === 'Inch'){
                outputter.innerHTML = (gnInput.value * 0.393700787).toFixed(2);
            }else if(fromUnit === 'Centimeter' && toUnit === 'Foot'){
                outputter.innerHTML = (gnInput.value * 0.032808399).toFixed(2);
            }else if(fromUnit === 'Centimeter' && toUnit === 'Mile'){
                outputter.innerHTML = (gnInput.value * 0.0000062137).toFixed(2);
            }else if(fromUnit === 'Millimeter' && toUnit === 'Kilometer'){
                outputter.innerHTML = (gnInput.value / 1000000).toFixed(2);
            }else if(fromUnit === 'Millimeter' && toUnit === 'Meter'){
                outputter.innerHTML = (gnInput.value / 1000).toFixed(2);
            }else if(fromUnit === 'Millimeter' && toUnit === 'Centimeter'){
                outputter.innerHTML = (gnInput.value / 10).toFixed(2);
            }else if(fromUnit === 'Millimeter' && toUnit === 'Inch'){
                outputter.innerHTML = (gnInput.value * 0.0393700787).toFixed(2);
            }else if(fromUnit === 'Millimeter' && toUnit === 'Foot'){
                outputter.innerHTML = (gnInput.value * 0.0032808399).toFixed(2);
            }else if(fromUnit === 'Millimeter' && toUnit === 'Mile'){
                outputter.innerHTML = (gnInput.value * 0.000000621371).toFixed(2);
            }else if(fromUnit === 'Inch' && toUnit === 'Kilometer'){
                outputter.innerHTML = (gnInput.value * 0.0000254).toFixed(2);
            }else if(fromUnit === 'Inch' && toUnit === 'Meter'){
                outputter.innerHTML = (gnInput.value * 0.0254).toFixed(2);
            }else if(fromUnit === 'Inch' && toUnit === 'Centimeter'){
                outputter.innerHTML = (gnInput.value * 2.54).toFixed(2);
            }else if(fromUnit === 'Inch' && toUnit === 'Millimeter'){
                outputter.innerHTML = (gnInput.value * 25.4).toFixed(2);
            }else if(fromUnit === 'Inch' && toUnit === 'Feet'){
                outputter.innerHTML = (gnInput.value / 12).toFixed(2);
            }else if(fromUnit === 'Inch' && toUnit === 'Mile'){
                outputter.innerHTML = (gnInput.value * 0.000015783).toFixed(2);
            }else if(fromUnit === 'Foot' && toUnit === 'Kilometer'){
                outputter.innerHTML = (gnInput.value * 0.0003048).toFixed(2);
            }else if(fromUnit === 'Foot' && toUnit === 'Meter'){
                outputter.innerHTML = (gnInput.value * 0.3048).toFixed(2);
            }else if(fromUnit === 'Foot' && toUnit === 'Centimeter'){
                outputter.innerHTML = (gnInput.value * 30.48).toFixed(2);
            }else if(fromUnit === 'Foot' && toUnit === 'Millimeter'){
                outputter.innerHTML = (gnInput.value * 304.8).toFixed(2);
            }else if(fromUnit === 'Foot' && toUnit === 'Inch'){
                outputter.innerHTML = (gnInput.value * 12).toFixed(2);
            }else if(fromUnit === 'Foot' && toUnit === 'Mile'){
                outputter.innerHTML = (gnInput.value * 0.000189394).toFixed(2);
            }else if(fromUnit === 'Mile' && toUnit === 'Kilometer'){
                outputter.innerHTML = (gnInput.value * 1.60934).toFixed(2);
            }else if(fromUnit === 'Mile' && toUnit === 'Meter'){
                outputter.innerHTML = (gnInput.value * 1609.34).toFixed(2);
            }else if(fromUnit === 'Mile' && toUnit === 'Centimeter'){
                outputter.innerHTML = (gnInput.value * 160934).toFixed(2);
            }else if(fromUnit === 'Mile' && toUnit === 'Millimeter'){
                outputter.innerHTML = (gnInput.value * 1609340).toFixed(2);
            }else if(fromUnit === 'Mile' && toUnit === 'Inch'){
                outputter.innerHTML = (gnInput.value * 63360).toFixed(2);
            }else if(fromUnit === 'Mile' && toUnit === 'Foot'){
                outputter.innerHTML = (gnInput.value * 5280).toFixed(2);
            }
        }else if(which === 'mass'){
            if(fromUnit === toUnit){
                if(outputter.innerHTML === ''){
                    outputter.innerHTML = '---';
                }else{
                    outputter.innerHTML = gnInput.value;
                }
            }else if(fromUnit === 'Kilogram' && toUnit === 'Gram'){
                outputter.innerHTML = (gnInput.value * 1000).toFixed(2);
            }else if(fromUnit === 'Kilogram' && toUnit === 'Milligram'){
                outputter.innerHTML = (gnInput.value * 1000000).toFixed(2);
            }else if(fromUnit === 'Kilogram' && toUnit === 'Pound'){
                outputter.innerHTML = (gnInput.value * 2.2046226218).toFixed(2);
            }else if(fromUnit === 'Kilogram' && toUnit === 'Ounce'){
                outputter.innerHTML = (gnInput.value * 35.27396195).toFixed(2);
            }else if(fromUnit === 'Kilogram' && toUnit === 'Metric ton'){
                outputter.innerHTML = (gnInput.value / 1000).toFixed(2);
            }else if(fromUnit === 'Gram' && toUnit === 'Kilogram'){
                outputter.innerHTML = (gnInput.value / 1000).toFixed(2);
            }else if(fromUnit === 'Gram' && toUnit === 'Milligram'){
                outputter.innerHTML = (gnInput.value * 1000).toFixed(2);
            }else if(fromUnit === 'Gram' && toUnit === 'Pound'){
                outputter.innerHTML = ((gnInput.value  / 1000) * 2.2046226218).toFixed(2);
            }else if(fromUnit === 'Gram' && toUnit === 'Ounce'){
                outputter.innerHTML = ((gnInput.value / 1000) * 35.27396195).toFixed(2);
            }else if(fromUnit === 'Gram' && toUnit === 'Metric ton'){
                outputter.innerHTML = (gnInput.value / 1000000).toFixed(2);
            }else if(fromUnit === 'Milligram' && toUnit === 'Kilogram'){
                outputter.innerHTML = (gnInput.value / 1000000).toFixed(2);
            }else if(fromUnit === 'Milligram' && toUnit === 'Gram'){
                outputter.innerHTML = (gnInput.value / 1000).toFixed(2);
            }else if(fromUnit === 'Milligram' && toUnit === 'Pound'){
                outputter.innerHTML = ((gnInput.value / 1_000_000) * 2.2046226218).toFixed(2);
            }else if(fromUnit === 'Milligram' && toUnit === 'Ounce'){
                outputter.innerHTML = ((gnInput.value / 1_000_000) * 35.27396195).toFixed(2);
            }else if(fromUnit === 'Milligram' && toUnit === 'Matric ton'){
                outputter.innerHTML = (gnInput.value / 1_000_000_000).toFixed(2);
            }else if(fromUnit === 'Pound' && toUnit === 'Kilogram'){
                outputter.innerHTML = (gnInput.value / 2.2046226218).toFixed(2);
            }else if(fromUnit === 'Pound' && toUnit === 'Gram'){
                outputter.innerHTML = ((gnInput.value / 2.2046226218) * 1000).toFixed(2);
            }else if(fromUnit === 'Pound' && toUnit === 'Milligram'){
                outputter.innerHTML = ((gnInput.value / 2.2046226218) * 1_000_000).toFixed(2);
            }else if(fromUnit === 'Pound' && toUnit === 'Ounce'){
                outputter.innerHTML = (gnInput.value * 16).toFixed(2);
            }else if(fromUnit === 'Pound' && toUnit === 'Metric ton'){
                outputter.innerHTML = ((gnInput.value / 2.2046226218) / 1000).toFixed(2);
            }else if(fromUnit === 'Ounce' && toUnit === 'Kilogram'){
                outputter.innerHTML = (gnInput.value / 35.27396195).toFixed(2);
            }else if(fromUnit === 'Ounce' && toUnit === 'Gram'){
                outputter.innerHTML = ((gnInput.value / 35.27396195) * 1000).toFixed(2);
            }else if(fromUnit === 'Ounce' && toUnit === 'Milligram'){
                outputter.innerHTML = ((gnInput.value / 35.27396195) * 1_000_000).toFixed(2);
            }else if(fromUnit === 'Ounce' && toUnit === 'Pound'){
                outputter.innerHTML = (gnInput.value / 16).toFixed(2);
            }else if(fromUnit === 'Ounce' && toUnit === 'Metric ton'){
                outputter.innerHTML = ((gnInput.value / 35.27396195) / 1000).toFixed(2);
            }else if(fromUnit === 'Metric ton' && toUnit === 'Kilogram'){
                outputter.innerHTML = (gnInput.value * 1000).toFixed(2);
            }else if(fromUnit === 'Metric ton' && toUnit === 'Gram'){
                outputter.innerHTML = (gnInput.value * 1_000_000).toFixed(2);
            }else if(fromUnit === 'Metric ton' && toUnit === 'Milligram'){
                outputter.innerHTML = (gnInput.value * 1_000_000_000).toFixed(2);
            }else if(fromUnit === 'Metric ton' && toUnit === 'Pound'){
                outputter.innerHTML = ((gnInput.value * 1000) * 2.2046226218).toFixed(2);
            }else if(fromUnit === 'Metric ton' && toUnit === 'Ounce'){
                outputter.innerHTML = ((gnInput.value * 1000) * 35.27396195).toFixed(2);
            }
        }
    }
}
function unitChange(purpose,val){
    if(purpose === 'from'){
        resCont.querySelector('.unit-from').innerHTML = val;
    }else if(purpose === 'to'){
        resCont.querySelector('.unit-to').innerHTML = val;
    }
}
function goBack(){
    mainCont.style.removeProperty('display');
    resCont.style.display = 'none';
    largeTitle.innerHTML = 'Switch It';
    resCont.querySelector('.unit-from').innerHTML = "Unit";
    resCont.querySelector('.unit-to').innerHTML = "Unit";
}
