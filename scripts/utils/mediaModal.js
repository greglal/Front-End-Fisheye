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

function createMediaModal(mediaId, photographerMedia) {
    const mediaModal = document.querySelector(".full-media");
    let mediaDisplay;

    if(photographerMedia.video) {
        console.log("*** video ***", photographerMedia)

        mediaDisplay = document.createElement("video");
        mediaDisplay.controls = true;
        mediaDisplay.setAttribute("src", `/assets/images/${photographer.asset}/${mediaId}`);
        mediaDisplay.setAttribute("alt", photographerMedia.title);
        mediaDisplay.classList.add("displayVideo");
        mediaModal.appendChild(mediaDisplay);
    } else {
        console.log("*** img ***", photographerMedia)

        mediaDisplay = document.createElement("img");
        mediaDisplay.setAttribute("src", `/assets/images/${photographer.asset}/${mediaId}`);
        mediaDisplay.setAttribute("alt", photographerMedia.title);
        mediaModal.appendChild(mediaDisplay);

        console.log("*** photographerMedia ***", mediaId);
    }
}


function getMediaId(i) {
    const allMedias = document.querySelectorAll(".media-img");
    mediaId = allMedias[i].getAttribute("id");
console.log(photographerMedia[i])
    createMediaModal(mediaId, photographerMedia[i]);
    openMediaModal();
}


