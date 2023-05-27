'use strict';

/**
 * display contact form modal
 */
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.querySelector(".overlay");

	modal.style.display = "block";
    overlay.classList.remove("hidden");
}

/**
 * close contact form modal
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.querySelector(".overlay");

    modal.style.display = "none";
    overlay.classList.add("hidden");
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
    invalidMessage.classList.add("hidden");
    element.style.border= "0px";
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
    const eMail = document.querySelector("#eMail");
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
            document.querySelector("#contact_modal").style.display="none";
            document.querySelector(".overlay").style.display="none";
        }
    });
}

validate();