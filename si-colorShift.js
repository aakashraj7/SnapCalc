// ===== HEX -> RGB =====
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// ===== RGB -> HEX =====
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// ===== RGB -> HSL =====
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h *= 60;
  }

  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// ===== HSL -> RGB =====
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r1, g1, b1;

  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  const r = Math.round((r1 + m) * 255);
  const g = Math.round((g1 + m) * 255);
  const b = Math.round((b1 + m) * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

// ===== RGB -> CMYK =====
function rgbToCmyk(r, g, b) {
  if (r === 0 && g === 0 && b === 0) return 'cmyk(0%, 0%, 0%, 100%)';

  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);

  return `cmyk(${(c * 100).toFixed(1)}%, ${(m * 100).toFixed(1)}%, ${(y * 100).toFixed(1)}%, ${(k * 100).toFixed(1)}%)`;
}

// ===== CMYK -> RGB =====
function cmykToRgb(c, m, y, k) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

// ===== HEX -> HSL =====
function hexToHsl(hex) {
  const rgb = hexToRgbObject(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

// ===== HEX -> CMYK =====
function hexToCmyk(hex) {
  const rgb = hexToRgbObject(hex);
  return rgbToCmyk(rgb.r, rgb.g, rgb.b);
}

// ===== HSL -> HEX =====
function hslToHex(h, s, l) {
  const rgbString = hslToRgb(h, s, l);
  const rgb = extractRgbValues(rgbString);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// ===== HSL -> CMYK =====
function hslToCmyk(h, s, l) {
  const rgbString = hslToRgb(h, s, l);
  const rgb = extractRgbValues(rgbString);
  return rgbToCmyk(rgb.r, rgb.g, rgb.b);
}

// ===== CMYK -> HEX =====
function cmykToHex(c, m, y, k) {
  const rgbString = cmykToRgb(c, m, y, k);
  const rgb = extractRgbValues(rgbString);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// ===== CMYK -> HSL =====
function cmykToHsl(c, m, y, k) {
  const rgbString = cmykToRgb(c, m, y, k);
  const rgb = extractRgbValues(rgbString);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

// ===== Helpers =====
function hexToRgbObject(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16)
  };
}

function extractRgbValues(rgbString) {
  const [r, g, b] = rgbString
    .replace(/[^\d,]/g, '')
    .split(',')
    .map(Number);
  return { r, g, b };
}
let mainCont = document.querySelector('.great-container');
let resCont = document.querySelector('.result');
let fromCont = resCont.querySelector('.from-container');
let resH1 = resCont.querySelector('.res-h1');
let topHeading = document.querySelector('.top-heading');
let resDisplayer = document.querySelector('.res-displayer');
document.addEventListener('keydown',function(event){
    if(event.key === 'Enter'){
        convertIt();
    }
})
function goBack(){
    resCont.style.display = 'none';
    mainCont.style.removeProperty('display');
    topHeading.innerHTML = "Switch It";
    document.querySelector('.color-box').style.background = 'transparent';
}

function pageChanger(from, to){
    mainCont.style.display = 'none';
    resCont.style.removeProperty('display');
    resH1.innerHTML = `${from} → ${to}`;
    topHeading.innerHTML = 'Color Shift';
    document.querySelector('.to-unit').innerHTML = to;
    // Clearing the Contents of "from container"
    fromCont.innerHTML = "";
    let fromUnit = document.createElement('h3');
    fromUnit.className = 'from-unit';
    fromUnit.innerHTML = from;
    fromCont.appendChild(fromUnit);
    if(from === 'RGB'){
        //Creating the Red input
        let red = document.createElement('div');
        red.className = "single-elem";
        let redSpan = document.createElement('span');
        redSpan.style.color = 'red';
        redSpan.innerHTML = 'R';
        red.appendChild(redSpan);
        redInput = document.createElement('input');
        redInput.id = "redInput";
        redInput.type = 'number';
        redInput.placeholder = 'Red';
        red.appendChild(redInput);
        fromCont.appendChild(red);

        //Creating the Green input
        let green = document.createElement('div');
        green.className = "single-elem";
        let greenSpan = document.createElement('span');
        greenSpan.style.color = 'green';
        greenSpan.innerHTML = 'G';
        green.appendChild(greenSpan);
        greenInput = document.createElement('input');
        greenInput.type = 'number';
        greenInput.id = 'greenInput';
        greenInput.placeholder = 'Green';
        green.appendChild(greenInput);
        fromCont.appendChild(green);

        //Creating the Blue input
        let blue = document.createElement('div');
        blue.className = "single-elem";
        let blueSpan = document.createElement('span');
        blueSpan.style.color = 'blue';
        blueSpan.innerHTML = 'B';
        blue.appendChild(blueSpan);
        blueInput = document.createElement('input');
        blueInput.id = "blueInput";
        blueInput.type = 'number';
        blueInput.placeholder = 'Blue';
        blue.appendChild(blueInput);
        fromCont.appendChild(blue);

        //Creating combined-unit element
        combinedUnit = document.createElement('input');
        combinedUnit.className = 'combined-unit';
        combinedUnit.type = 'text';
        combinedUnit.placeholder = 'rgb(rr,gg,bb)';
        fromCont.appendChild(combinedUnit);
    }else if(from === 'HSL'){

        //Creating the Hue input
        let hue = document.createElement('div');
        hue.className = "single-elem";
        let hueSpan = document.createElement('span');
        hueSpan.style.color = 'hsl(270, 100%, 60%)';
        hueSpan.innerHTML = 'H';
        hue.appendChild(hueSpan);
        hueInput = document.createElement('input');
        hueInput.id = "hueInput";
        hueInput.type = 'number';
        hueInput.placeholder = 'Hue';
        hue.appendChild(hueInput);
        fromCont.appendChild(hue);

        //Creating the Saturation input
        let saturation = document.createElement('div');
        saturation.className = "single-elem";
        let saturationSpan = document.createElement('span');
        saturationSpan.style.color = 'hsl(0, 100%, 50%)';
        saturationSpan.innerHTML = 'S';
        saturation.appendChild(saturationSpan);
        saturationInput = document.createElement('input');
        saturationInput.id = "saturationInput";
        saturationInput.type = 'number';
        saturationInput.placeholder = 'Saturation';
        saturation.appendChild(saturationInput);
        fromCont.appendChild(saturation);

        //Creating the Lightness input
        let lightness = document.createElement('div');
        lightness.className = "single-elem";
        let lightnessSpan = document.createElement('span');
        lightnessSpan.style.color = 'hsl(210, 100%, 50%)';
        lightnessSpan.innerHTML = 'L';
        lightness.appendChild(lightnessSpan);
        lightnessInput = document.createElement('input');
        lightnessInput.id = "lightnessInput";
        lightnessInput.type = 'number';
        lightnessInput.placeholder = 'Lightness';
        lightness.appendChild(lightnessInput);
        fromCont.appendChild(lightness);

        //Creating combined-unit element
        combinedUnit = document.createElement('input');
        combinedUnit.className = 'combined-unit';
        combinedUnit.type = 'text';
        combinedUnit.placeholder = 'hsl(hh,ss,ll)';
        fromCont.appendChild(combinedUnit);
    }else if(from === 'CMYK'){
        //Creating the Cyan input
        let cyan = document.createElement('div');
        cyan.className = "single-elem";
        let cyanSpan = document.createElement('span');
        cyanSpan.style.color = 'cyan';
        cyanSpan.innerHTML = 'C';
        cyan.appendChild(cyanSpan);
        cyanInput = document.createElement('input');
        cyanInput.id = "cyanInput";
        cyanInput.type = 'number';
        cyanInput.placeholder = 'Cyan';
        cyan.appendChild(cyanInput);
        fromCont.appendChild(cyan);

        //Creating the Magenta input
        let magenta = document.createElement('div');
        magenta.className = "single-elem";
        let magentaSpan = document.createElement('span');
        magentaSpan.style.color = 'magenta';
        magentaSpan.innerHTML = 'M';
        magenta.appendChild(magentaSpan);
        magentaInput = document.createElement('input');
        magentaInput.id = "magentaInput";
        magentaInput.type = 'number';
        magentaInput.placeholder = 'Magneta';
        magenta.appendChild(magentaInput);
        fromCont.appendChild(magenta);

        //Creating the Yellow input
        let yellow = document.createElement('div');
        yellow.className = "single-elem";
        let yellowSpan = document.createElement('span');
        yellowSpan.style.color = 'gold';
        yellowSpan.innerHTML = 'Y';
        yellow.appendChild(yellowSpan);
        yellowInput = document.createElement('input');
        yellowInput.id = "yellowInput";
        yellowInput.type = 'number';
        yellowInput.placeholder = 'Yellow';
        yellow.appendChild(yellowInput);
        fromCont.appendChild(yellow);

        //Creating the Key(black) input
        let key = document.createElement('div');
        key.className = "single-elem";
        let keySpan = document.createElement('span');
        keySpan.style.color = 'key';
        keySpan.innerHTML = 'K';
        key.appendChild(keySpan);
        keyInput = document.createElement('input');
        keyInput.id = "keyInput";
        keyInput.type = 'number';
        keyInput.placeholder = 'Key';
        key.appendChild(keyInput);
        fromCont.appendChild(key);

        //Creating combined-unit element
        combinedUnit = document.createElement('input');
        combinedUnit.className = 'combined-unit';
        combinedUnit.type = 'text';
        combinedUnit.placeholder = 'cmyk(cc,mm,yy,kk)';
        fromCont.appendChild(combinedUnit);

        document.querySelectorAll('span').forEach((span) => span.style.background = 'rgb(30, 41, 59)')
    }else if(from === 'Hex'){
        //Creating the Hexcode input
        let hex = document.createElement('div');
        hex.className = "single-elem";
        let hexSpan = document.createElement('span');
        hexSpan.style.color = 'blue';
        hexSpan.innerHTML = 'H';
        hex.appendChild(hexSpan);
        hexInput = document.createElement('input');
        hexInput.id = "hexInput";
        hexInput.type = 'text';
        hexInput.placeholder = 'Hexcode';
        hex.appendChild(hexInput);
        fromCont.appendChild(hex);

        document.querySelector('.res-holder').style.minHeight = 'fit-content';
        document.querySelector('.btn-cont').style.marginTop = '4rem';
    }if(to === 'Hex'){
        resDisplayer.innerHTML = '#RRGGBB';
    }else if(to === 'RGB'){
        resDisplayer.innerHTML = 'rgb(rr,gg,bb)';
    }else if(to === 'HSL'){
        resDisplayer.innerHTML = 'hsl(hh,ss,ll)';
    }else if(to === 'CMYK'){
        resDisplayer.innerHTML = 'cmyk(cc,mm,yy,kk)';
    }
}
function convertIt(){
    let fromUnit = document.querySelector('.from-unit').innerHTML;
    let toUnit = document.querySelector('.to-unit').innerHTML;
    if(fromUnit === 'Hex' && toUnit === 'RGB'){
        resDisplayer.innerHTML = hexToRgb(document.querySelector('#hexInput').value);
        document.querySelector('.color-box').style.background = resDisplayer.innerHTML;
    }else if(fromUnit === 'Hex' && toUnit === 'HSL'){
        resDisplayer.innerHTML = hexToHsl(document.querySelector('#hexInput').value);
        document.querySelector('.color-box').style.background = resDisplayer.innerHTML;
    }else if(fromUnit === 'Hex' && toUnit === 'CMYK'){
        resDisplayer.innerHTML = hexToCmyk(document.querySelector('#hexInput').value);
        document.querySelector('.color-box').style.background = document.querySelector('#hexInput').value;
    }else if(fromUnit === 'RGB'){
        let redValue = document.querySelector('#redInput').value;
        let blueValue = document.querySelector('#blueInput').value;
        let greenValue = document.querySelector('#greenInput').value;
        let combinedUnit = document.querySelector('.combined-unit').value;
        let temp, isCombinedUnit;
        if((redValue === '' && blueValue === '' && greenValue === '') && combinedUnit !== ''){
            temp = combinedUnit.slice(4,-1).split(',');
            isCombinedUnit = true;
        }else if((redValue !== '' && blueValue !== '' & greenValue !== '') && combinedUnit === ''){
            temp = [redValue,greenValue,blueValue];
            isCombinedUnit = false;
        }else{
            alert('Please Check your Input Given')
        }
        temp = temp.map(Number);
        if(toUnit === 'Hex'){
            resDisplayer.innerHTML = rgbToHex(...temp);
        }else if(toUnit === 'HSL'){
            resDisplayer.innerHTML = rgbToHsl(...temp);
        }else if(toUnit === 'CMYK'){
            resDisplayer.innerHTML = rgbToCmyk(...temp);
        }
        if(!isCombinedUnit){
            document.querySelector('.combined-unit').placeholder = `rgb(${temp[0]},${temp[1]},${temp[2]})`;
        }
        document.querySelector('.color-box').style.background = resDisplayer.innerHTML;
        if(toUnit === 'CMYK' && !isCombinedUnit){
            document.querySelector('.color-box').style.background = document.querySelector('.combined-unit').placeholder;
        }else{
            document.querySelector('.color-box').style.background = document.querySelector('.combined-unit').value;
        }
    }else if(fromUnit === 'HSL'){
        let hueValue = document.querySelector('#hueInput').value;
        let saturationValue = document.querySelector('#saturationInput').value;
        let lightnessValue = document.querySelector('#lightnessInput').value;
        let combinedUnit = document.querySelector('.combined-unit').value;
        let temp, isCombinedUnit;
        if((hueValue === '' && saturationValue === '' && lightnessValue === '') && combinedUnit !== ''){
            temp = combinedUnit.slice(4,-1).split(',');
            isCombinedUnit = true;
        }else if((hueValue !== '' && saturationValue !== '' & lightnessValue !== '') && combinedUnit === ''){
            temp = [hueValue,saturationValue,lightnessValue];
            isCombinedUnit = false;
        }else{
            alert('Please Check your Input Given')
        }
        temp = temp.map(Number);
        if(toUnit === 'Hex'){
            resDisplayer.innerHTML = hslToHex(...temp);
        }else if(toUnit === 'RGB'){
            resDisplayer.innerHTML = hslToRgb(...temp);
        }else if(toUnit === 'CMYK'){
            resDisplayer.innerHTML = hslToCmyk(...temp);
        }
        if(!isCombinedUnit){
            document.querySelector('.combined-unit').placeholder = `hsl(${temp[0]},${temp[1]},${temp[2]})`;
        }
        document.querySelector('.color-box').style.background = resDisplayer.innerHTML;
        if(toUnit === 'CMYK' && !isCombinedUnit){
            document.querySelector('.color-box').style.background = document.querySelector('.combined-unit').placeholder;
        }else{
            document.querySelector('.color-box').style.background = document.querySelector('.combined-unit').value;
        }
    }else if(fromUnit === 'CMYK'){
        let cyanValue = document.querySelector('#cyanInput').value;
        let magentaValue = document.querySelector('#magentaInput').value;
        let yellowValue = document.querySelector('#yellowInput').value;
        let keyValue = document.querySelector('#keyInput').value;
        let combinedUnit = document.querySelector('.combined-unit').value;
        let temp, isCombinedUnit;
        if((cyanValue === '' && magentaValue === '' && yellowValue === '' && keyValue === '') && combinedUnit !== ''){
            temp = combinedUnit.slice(5,-1).split(',');
            console.log(temp);
            isCombinedUnit = true;
        }else if((cyanValue !== '' && magentaValue !== '' & yellowValue !== '' && keyValue !== '') && combinedUnit === ''){
            temp = [cyanValue,magentaValue,yellowValue,keyValue];
            isCombinedUnit = false;
        }else{
            alert('Please Check your Input Given')
        }
        temp = temp.map(Number);
        if(toUnit === 'Hex'){
            resDisplayer.innerHTML = cmykToHex(...temp);
        }else if(toUnit === 'RGB'){
            resDisplayer.innerHTML = cmykToRgb(...temp);
        }else if(toUnit === 'HSL'){
            resDisplayer.innerHTML = cmykToHsl(...temp);
        }
        if(!isCombinedUnit){
            document.querySelector('.combined-unit').placeholder = `cmyk(${temp[0]},${temp[1]},${temp[2]},${temp[3]})`;
        }
        document.querySelector('.color-box').style.background = resDisplayer.innerHTML;
    }
    
}