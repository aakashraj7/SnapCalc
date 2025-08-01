let ageFinder = document.querySelector('.age-calc');
let dateDifference = document.querySelector('.date-difference');
let leapFinder = document.querySelector('.leap-finder');
document.addEventListener('keydown',function(event){
    if(event.key === 'Enter'){
        if(document.querySelector('.age-calc').style.display !== 'none'){
            calcAgeCalculator(event)
        }else if(document.querySelector('.date-difference').style.display !== 'none'){
            calcAgeDifference(event)
        }else if(document.querySelector('.leap-finder').style.display !== 'none'){
            calcLeapFinder(event)
        }
    }else if(event.key === 'Backspace'){
        if(document.querySelector('.result-leap').style.display !== 'none'){
            backLeapFinder()
        }else if(document.querySelector('.result-diff').style.display !== 'none'){
            backAgeDifference()
        }else if(document.querySelector('.result-age').style.display !== 'none'){
            backAgeCalculator()
        }
    }
})
function Msg(text){
    let msg = document.querySelector('.msg');
    msg.innerHTML = text;
    msg.style.removeProperty('display');
    setTimeout(function(){
        msg.style.display = 'none';
    }, 5000);
}
function is_leap(y){
    if(y % 4 !== 0){
        return false;
    }else if(y % 100 === 0 && y % 400 !== 0){
        return false;
    }else{
        return true
    }
}
function calcAgeCalculator(event){
    let gnDt = document.getElementById('acInput');
    const dob = new Date(gnDt.value);
    const now = new Date();
    if(gnDt.value === ''){
        Msg('Please Enter any Date !!');
        theSameClick(event);
        return;
    }else if(dob > now || String(dob).slice(0,15) === String(now).slice(0,15)){
        Msg('Plase Enter Date within Range !!')
        theSameClick(event);
        return;
    }
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.back-btn').style.display = 'none';
    document.querySelector('.age-calc').style.display = 'none';
    document.querySelector('.result-age').style.removeProperty('display');
    
    // Remove time portion
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const birthDate = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());

    // Age in years
    let ageYears = today.getFullYear() - dob.getFullYear();
    const birthdayThisYear = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

    // If birthday hasn't occurred yet this year, subtract one year
    if (today < birthdayThisYear) {
        ageYears--;
    }

    // Accurate age in years and days
    const lastBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today < lastBirthday) {
        lastBirthday.setFullYear(today.getFullYear() - 1);
    }
    const diffSinceLastBirthday = Math.floor((today - lastBirthday) / (1000 * 60 * 60 * 24));
    
    // Total days
    const totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));

    // Total months
    let totalMonths = ageYears * 12 + (today.getMonth() - dob.getMonth());
    if (today.getDate() < dob.getDate()) {
        totalMonths--;
    }

    // Total weeks
    const totalWeeks = Math.floor(totalDays / 7);

    // Days left for next birthday
    const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today >= nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysLeft = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    document.getElementById('Dob').innerHTML = String(dob).slice(4,15);
    document.getElementById('bornDay').innerHTML = String(dob).slice(0,4);
    document.getElementById('normalAge').innerHTML = ageYears;
    if(ageYears === 0){
        document.getElementById('accurateAge').innerHTML = `${ageYears} years and ${totalDays} days`;
    }else{
        document.getElementById('accurateAge').innerHTML = `${ageYears} years and ${diffSinceLastBirthday} days`;
    }
    document.getElementById('totalMonths').innerHTML = totalMonths
    document.getElementById('totalWeeks').innerHTML = totalWeeks;
    document.getElementById('totalDays').innerHTML = totalDays;
    document.getElementById('daysLeft').innerHTML = daysLeft;
}
function backAgeCalculator(){
    document.querySelector('.result-age').style.display = 'none';
    document.querySelector('.age-calc').style.removeProperty('display');
    document.querySelector('h1').style.removeProperty('display');
    document.querySelector('.back-btn').style.removeProperty('display');
}
function calcAgeDifference(event) {
    const d1 = new Date(document.getElementById('stDt').value);
    const d2 = new Date(document.getElementById('endDt').value);
    let start,end;
    if(d1 < d2){
        start = d1;
        end = d2;
    }else{
        Msg('Start Date should be Less than End Date !');
        theSameClick(event);
        return;
    }
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.back-btn').style.display = 'none';
    document.querySelector('.date-difference').style.display = 'none';
    document.querySelector('.result-diff').style.removeProperty('display');
    // Always start from the earlier date
    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((end - start) / msPerDay);

    // Total values with decimals
    const totalWeeks = (totalDays / 7).toFixed(2);
    const totalMonths = (totalDays / 30.44).toFixed(2);  // Avg days/month
    const totalYears = (totalDays / 365.25).toFixed(4);  // Leap years considered

    // Years + remaining days
    const fullYears = Math.floor(totalDays / 365.25);
    const remainingDaysAfterYears = totalDays - Math.floor(fullYears * 365.25);

    // Months + remaining days
    const fullMonths = Math.floor(totalDays / 30.44);
    const remainingDaysAfterMonths = totalDays - Math.floor(fullMonths * 30.44);

    // Weeks + remaining days
    const fullWeeks = Math.floor(totalDays / 7);
    const remainingDaysAfterWeeks = totalDays % 7;

    document.getElementById('StartDate').innerHTML = String(start).slice(4,15);
    document.getElementById('EndDate').innerHTML = String(end).slice(4,15);
    document.getElementById('dayDifference').innerHTML = totalDays;
    document.getElementById('exactWeekDifference').innerHTML = totalWeeks;
    document.getElementById('weekDifference').innerHTML = `${fullWeeks} weeks and ${remainingDaysAfterWeeks} days`;
    document.getElementById('exactMonthDifference').innerHTML = totalMonths;
    document.getElementById('monthDifference').innerHTML = `${fullMonths} months and ${remainingDaysAfterMonths} days`;
    document.getElementById('exactYearDifference').innerHTML = totalYears;
    document.getElementById('yearDifference').innerHTML = `${fullYears} years and ${remainingDaysAfterYears} days`;
}
function backAgeDifference(){
    document.querySelector('.result-diff').style.display = 'none';
    document.querySelector('.date-difference').style.removeProperty('display');
    document.querySelector('h1').style.removeProperty('display');
    document.querySelector('.back-btn').style.removeProperty('display');
}
function calcLeapFinder(event){
    let year = document.getElementById('year').value;
    if(isNaN(Number(year))){
        Msg('Invalid Year Specified !!')
        theSameClick(event);
    }else if(Number(year) === 0){
        Msg('No Year Specified !!');
        theSameClick(event);
    }
    else{
        document.querySelector('h1').style.display = 'none';
        document.querySelector('.back-btn').style.display = 'none';
        document.querySelector('.leap-finder').style.display = 'none';
        document.querySelector('.result-leap').style.removeProperty('display');
        event.target.style.boxShadow = 'inset -3px -3px 5px rgb(48, 104, 188), inset 3px 3px 15px #00000070';
        let gnYear = document.getElementById('gnYear');
        let resHead = document.querySelector('.res-head');
        gnYear.innerHTML = 'Given Year: ' + String(year);
        year = Number(year);
        if(is_leap(year)){
            resHead.innerHTML = String(year) + ' is a Leap Year !!';
        }else{
            resHead.innerHTML = String(year) + ' is NOT a Leap Year !!';
        }
        event.target.style.boxShadow = '-3px -3px 5px rgb(48, 104, 188), 3px 3px 15px #00000070';
    }
}
function theSameClick(event){
    event.target.style.boxShadow = 'inset -3px -3px 5px rgb(48, 104, 188), inset 3px 3px 15px #00000070';
        setTimeout(function(){
            event.target.style.boxShadow = '-3px -3px 5px rgb(48, 104, 188), 3px 3px 15px #00000070';
        },200);
}
function backLeapFinder(){
    document.querySelector('.leap-finder').style.display = 'flex';
    document.querySelector('.result-leap').style.display = 'none';
    document.querySelector('h1').style.removeProperty('display');
    document.querySelector('.back-btn').style.removeProperty('display');
}
function toDateDifference(){
    if(dateDifference.style.display === 'none'){
        ageFinder.style.display = 'none';
        leapFinder.style.display = 'none';
        dateDifference.style.removeProperty('display');
    }
}
function toAgeCalc(){
    if(ageFinder.style.display === 'none'){
        dateDifference.style.display = 'none';
        leapFinder.style.display = 'none';
        ageFinder.style.removeProperty('display');
    }
}
function toLeapFinder(){
    if(leapFinder.style.display === 'none'){
        ageFinder.style.display = 'none';
        dateDifference.style.display = 'none';
        leapFinder.style.removeProperty('display');
    }
}