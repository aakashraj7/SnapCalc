function changeTheme(){
    let themeButton = document.querySelector(".theme-btn");
    let iTag = themeButton.querySelector("i")
    if(iTag.className == "fa-solid fa-moon"){
        document.documentElement.style.setProperty("--default-color","white")
        iTag.className = "fa-solid fa-sun"
    }else{
        document.documentElement.style.setProperty("--default-color","rgb(51, 51, 190)")
        iTag.className = "fa-solid fa-moon"
    }
}