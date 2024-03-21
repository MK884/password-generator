let passLenght = document.querySelector('#pass-len'),
passIndicator = document.querySelector('.pass-indi'),
copyBtn = document.querySelector('.input span'),
genBtn = document.querySelector('.genBtn'),
inputBox = document.querySelector('.password'),
allOptions = document.querySelectorAll('.options .option input'),
passDisplay  = document.querySelector('.pass-len span');


// object of letters, numbers & symbols
const characters = { 
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = ()=>{
    let staticPasss = "",
    randomPass = "",
    excludeDuplicate = false;
    allOptions.forEach((option)=>{
        if(option.checked){
            if(option.id !== 'exe-duplicate' && option.id !== 'spaces'){
                staticPasss += characters[option.id];
            }else if(option.id === 'spaces'){
                staticPasss += ` ${staticPasss} `
            }else{
                excludeDuplicate = true;
            }
        }
    })
    for(let i=0; i< passLenght.value ;i++){
        let randomChar = staticPasss[Math.floor(Math.random() * staticPasss.length)];

        if(excludeDuplicate){
            !randomPass.includes(randomChar) || randomChar == " " ? randomPass += randomChar : i--;
        }else{
            randomPass += randomChar;
        }
    }
    inputBox.value = randomPass;
}

const copyPass = () =>{
    navigator.clipboard.writeText(inputBox.value);
    copyBtn.innerText = "check";
    copyBtn.style.color = "#4285F4";

    setTimeout(()=>{
        copyBtn.innerText = "copy_all";
        copyBtn.style.color = "#707070";

    },1500)
}


const updateSlider = () =>{
    passDisplay.innerText = passLenght.value;
    let id = passLenght.value <=8 ? 'week' : passLenght.value <=16 ? 'medium' : 'strong';
    passIndicator.id = id;
    passDisplay.id = id;
    generatePassword()
    
}
generatePassword()


copyBtn.addEventListener('click', copyPass)
genBtn.addEventListener("click", generatePassword);
passLenght.addEventListener('input',updateSlider)
