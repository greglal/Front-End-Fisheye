'use strict';

function displayModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.querySelector(".overlay");

	modal.style.display = "block";
    overlay.classList.remove("hidden");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.querySelector(".overlay");

    modal.style.display = "none";
    overlay.classList.add("hidden");
}
