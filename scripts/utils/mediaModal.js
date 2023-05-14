'use strict';

let mediaId;


/**
 * opening media modal
 * add blur on page's background
 */
function openMediaModal(){
    const mediaModal = document.querySelector(".media-carrousel");
    const overlay = document.querySelector(".overlay");

    mediaModal.style.display = "block";
    overlay.classList.remove("hidden");
    overlay.setAttribute("onclick","closeMediaModal()");

    createMediaModal();
}

/**
 * closing media modal
 * remove blur on page's background
 */
function closeMediaModal(){
    const mediaModal = document.querySelector(".media-carrousel");
    const overlay = document.querySelector(".overlay");

    mediaModal.style.display = "none";
    overlay.classList.add("hidden");
}

function createMediaModal() {
    const mediaModal = document.querySelector(".full-media");
    let mediaDisplay;


    if(photographerMedia.video) {

        console.log("*** video ***", photographerMedia)

        mediaDisplay = document.createElement("video");
        mediaDisplay.controls = true;
        mediaDisplay.setAttribute("src", `/assets/images/${photographer.asset}/${mediaId}`);
        mediaDisplay.setAttribute("alt", photographerMedia.title);
        mediaModal.appendChild(mediaDisplay);
    } else {

        console.log("*** img ***", photographerMedia)

        mediaDisplay = document.createElement("img");
        mediaDisplay.setAttribute("src", `/assets/images/${photographer.asset}/${mediaId}`);
        mediaDisplay.setAttribute("alt", photographerMedia.title);
        mediaModal.appendChild(mediaDisplay);
    }
}

function getMediaId(mediaImg) {
    mediaId = mediaImg.getAttribute("id");
    console.log("***** id ****", mediaId)
}