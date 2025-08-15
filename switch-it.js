function onHover(event, purpose){
    let num = event.target.querySelector(".num");
    let des = event.target.querySelector(".des");
    let whole = event.target;
    if(purpose === true){
        hovered(whole,num,des);
    }else{
        deHovered(whole,num,des);
    }
}
function onHoverNum(event, purpose){
    let num = event.target;
    let whole = num.parentElement;
    let des = whole.querySelector('.des');
    if(purpose === true){
        hovered(whole,num,des);
    }else{
        deHovered(whole,num,des);
    }
}
function onHoverDes(event, purpose){
    let des = event.target;
    let whole = des.parentElement;
    let num = whole.querySelector('.num');
    if(purpose === true){
        hovered(whole,num,des);
    }else{
        deHovered(whole,num,des);
    }
}
function hovered(whole, num, des){
    num.style.background = 'darkblue';
    num.style.boxShadow = 'none';
    num.style.border = '1px solid aqua'
    des.style.background = 'darkblue';
    des.style.boxShadow = 'none';
    whole.style.background = 'darkblue';
    whole.style.border = '1px solid aqua';
    whole.style.borderLeft = 'none';
    whole.style.boxShadow = '25px 25px 75px rgba(30, 41, 59,0.25), 10px 10px 70px rgba(30, 41, 59,0.25), inset 5px 5px 10px rgba(30, 41, 59,0.5), inset 5px 5px 20px rgba(147, 197, 253,0.2), inset -5px -5px 15px rgba(30, 41, 59,0.75)';
}
function deHovered(whole,num,des){
    num.style.background = 'purple';
    num.style.boxShadow = '25px 25px 75px rgba(30, 41, 59,0.25), 10px 10px 70px rgba(30, 41, 59,0.25), inset 5px 5px 10px rgba(30, 41, 59,0.5), inset 5px 5px 20px rgba(147, 197, 253,0.2), inset -5px -5px 15px rgba(30, 41, 59,0.75)';
    num.style.border = 'none'
    des.style.background = 'purple';
    des.style.boxShadow = '25px 25px 75px rgba(30, 41, 59,0.25), 10px 10px 70px rgba(30, 41, 59,0.25), inset 5px 5px 10px rgba(30, 41, 59,0.5), inset 5px 5px 20px rgba(147, 197, 253,0.2), inset -5px -5px 15px rgba(30, 41, 59,0.75)';
    whole.style.background = 'transparent';
    whole.style.border = 'none';
    whole.style.borderLeft = 'none';
    whole.style.boxShadow = 'none';
}