'use strict';

/**
 * display contact form modal
 */
function displayModal(photographer) {
    const modal = document.getElementById("contact-modal");
    const overlay = document.querySelector(".overlay");
    const modalTitle=document.querySelector("#modal-title");
    const focusableSelector = "button, a, input, textarea, img";
    let focusables =[];
    const closeCross = document.querySelector("#close-cross");

    modalTitle.innerHTML =`Contactez-moi </br> ${photographer.name}`;
	modal.style.display = "block";
    overlay.classList.remove("hidden");
    modal.setAttribute("aria-modal", "true");

    modal.addEventListener("keydown", (event) => {
        if(event.keyCode === 27){
            event.preventDefault();
            closeModal();
        }else if(event.keyCode === 9){
            event.preventDefault();
            focusables = Array.from (modal.querySelectorAll(focusableSelector));
            let index = focusables.findIndex(f => f === modal.querySelector(":focus"));
            index++;

            console.log(focusables)
            if(index >= focusables.length){
                index = 0;
            }
            focusables[index].focus();
        }
    })

    closeCross.addEventListener("click", () => {
        closeModal();
    })

    closeCross.addEventListener("keydown", (event) => {
        if (event.keyCode === 13 || event.keyCode === 32){
            closeModal();
        }
    })
}

/**
 *
 * @param event
 */
function focusInModal(event){

    event.preventDefault();

}

/**
 * close contact form modal
 */
function closeModal() {
    const modal = document.getElementById("contact-modal");
    const overlay = document.querySelector(".overlay");

    modal.style.display = "none";
    overlay.classList.add("hidden");

    modal.removeAttribute("aria-modal");
}

/**
 * display invalid message when incorrect input
 * @param element
 * @param message
 */
function isInvalid(element, message) {
    const invalidMessage = document.createElement("span");
    invalidMessage.classList.add("invalid");

    element.style.border = "4px solid red";
    invalidMessage.style.color="red";
    invalidMessage.innerHTML = message;
    element.parentElement.appendChild(invalidMessage);
}

/**
 * remove error message and red border when correct input
 */
function removeErrorMessage(element){
    const invalidMessage=document.querySelector(".invalid");
    if (invalidMessage){
        invalidMessage.classList.add("hidden");
        element.style.border= "0px";
    }
}

/**
 * test is first name input is completed
 * @returns {boolean}
 */
function testFirstName() {
    const firstName = document.querySelector("#firstName");
    const errorFirstNameMessage = "Veuillez renseigner votre prénom";

    if(firstName.value.length <= 2){
        isInvalid(firstName, errorFirstNameMessage);
        return false;
    } else {
        removeErrorMessage(firstName);
        console.log("firstName :", firstName.value);
        return true;
    }
}

/**
 * test if last name is completed
 * @returns {boolean}
 */
function testLastName() {
    const lastName = document.querySelector("#lastName");
    const errorLastNameMessage = "Veuillez renseigner votre nom";

    if(lastName.value.length <= 2) {
        isInvalid(lastName, errorLastNameMessage);
        return false;
    }else {
        removeErrorMessage(lastName);
        console.log("lastName :", lastName.value);
        return true;
    }
}

/**
 * test if eMail input is completed
 * @returns {boolean}
 */
function testEMail() {
    const eMail = document.querySelector("#e-Mail");
    const errorEMailMessage = "Veuillez renseigner votre adresse mail";

    if (eMail.value.length <= 2){
        isInvalid(eMail, errorEMailMessage);
        return false;
    }else {
        removeErrorMessage(eMail);
        console.log("eMail :", eMail.value);
        return true;
    }

    }

/**
 * test if message input is completed
 * @returns {boolean}
 */
function testMessage() {
    const message = document.querySelector("#message");
    const errorEmptyMessage = "Veuillez me laisser un message";

    if (message.value.length <= 2){
        isInvalid(message, errorEmptyMessage);
        return false;
    }else {
        removeErrorMessage(message);
        console.log("message :", message.value);
        return true;
    }
}

/**
 * contact form validation on click
 */
function validate(){
    const validButton = document.querySelector("#validate");
    validButton.addEventListener("click",(event) => {
        event.preventDefault();
        let isValid = true;
        if(!testFirstName()){
            return
        }
        if(!testLastName()){
            return
        }
        if(!testEMail()){
            return
        }
        if(!testMessage()){
            return
        }
        if(isValid){
            document.querySelector("#contact-modal").style.display="none";
            document.querySelector(".overlay").style.display="none";
        }
    });
}

validate();