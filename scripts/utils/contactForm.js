'use strict';

function displayModal() {
    const modal = document.getElementById("contact_modal");
    const background = document.querySelector(".media-section");
    const filterDiv=document.querySelector(".filter-div");

	modal.style.display = "block";
    background.style.filter="blur(5px)";
    filterDiv.style.filter="blur(5px)";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const background = document.querySelector(".media-section");
    const filterDiv=document.querySelector(".filter-div");

    modal.style.display = "none";
    background.style.filter="blur(0)";
    filterDiv.style.filter="blur(0)";
}
