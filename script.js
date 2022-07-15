"use strict"



let button = document.querySelector(".button");

let form = document.querySelector(".form");
let inputList = document.querySelectorAll(".input");
let errorImg = document.querySelectorAll(".error-image");
let errorText = document.querySelectorAll(".error-text");

let email = inputList[2];

let mediaQuery = window.matchMedia("(min-width: 40rem)");

let emailValidation = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;





button.addEventListener("click", function() {
    handleSubmission();
});





function handleSubmission() {
    handleRegularInput();
    handleEmail();

    if(handleRegularInput() && handleEmail()) {
        toggleValidState();
    }
}





function handleRegularInput() {
    let count = 0;


    for(let i = 0; i < inputList.length; i++) {
        if(i == 2) {
            continue;
        } else if (inputList[i].value == "" && isErrorStateToggled(i)) {
            continue;
        } else if(inputList[i].value == "") {
            toggleErrorState(i);
        } else {
            count ++;
        }
    }

    if(count == 3) {
        return true;
    }
}





function handleEmail() {
    if((email.value == "" || !isEmailValid()) && isErrorStateToggled(2)) {
        return;
    } else if(email.value == "" || !isEmailValid()) {
        toggleErrorState(2);
        emailPlaceholderError();
    } else if(isEmailValid) {
        return true;
    }
}


/* Functions used in handleEmail() */
function emailPlaceholderError() {
    email.placeholder = "email@example/com";
    email.style.setProperty("--c", "red");
}

function emailPlaceholderRegular() {
    email.placeholder = "Email Address";
    email.style.setProperty("--c", "#2c1313");
}

function isEmailValid() {
    return emailValidation.test(email.value.toLowerCase());
}





/* Functions used by both handleRegularInput() and handleEmail() */
function isErrorStateToggled(i) {
    return errorImg[i].classList.contains("show");
}

function toggleErrorState(i) {
    toggleCorrectErrorBorder(i);
    errorImg[i].classList.toggle("show");
    errorText[i].classList.toggle("show");
}


function toggleCorrectErrorBorder(i) {
    if(mediaQuery.matches) {
        inputList[i].classList.toggle("border-desktop");
    } else if(!mediaQuery.matches) {
        inputList[i].classList.toggle("border-mobile")
    }
}





function toggleValidState() {
    alert("Redirecting to the Free Trial page... (not really)");
    document.location.reload(true);
}





/* Keydown untoggles error state. Focus and blur fix problems with the border color */
for(let i = 0; i < inputList.length; i++) {
    inputList[i].addEventListener("keydown", function() {
        if(isErrorStateToggled(i)) {
            toggleErrorState(i);
        }
        if(i == 2) {
            emailPlaceholderRegular();
        }
    });

    inputList[i].addEventListener("focus", function() {
        if(isErrorStateToggled(i) && isBorderBlue(i)) {
            toggleBlueBorder(i);
        } else {
            toggleBlueBorder(i);
        }
    });

    inputList[i].addEventListener("blur", function() {
        if(isBorderBlue(i)) {
            toggleBlueBorder(i);
        }
    });
}



/* Functions used by the eventListeners' "focus" and "blur" */
function toggleBlueBorder(i) {
    inputList[i].classList.toggle("blue-border");
}

function isBorderBlue(i) {
    return inputList[i].classList.contains("blue-border");
}





/* This eventListener changes the border type depending on the page size (if you swap between different page widths (mobile and desktop) ) */
mediaQuery.addEventListener("change", function(e) {
    for(let i = 0; i < inputList.length; i++) {
        if(e.matches && inputList[i].classList.contains("border-mobile")) {
            inputList[i].classList.toggle("border-mobile");
            inputList[i].classList.toggle("border-desktop");
        } else if(inputList[i].classList.contains("border-desktop")) {
            inputList[i].classList.toggle("border-desktop");
            inputList[i].classList.toggle("border-mobile");
        }
    }
})





/* Prevents page from reloading when form is submitted */
form.onsubmit = function() {
    return false;
}