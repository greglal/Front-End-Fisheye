'use strict';


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

/**
 * create media Modal for photography or video
 *
 * @param mediaId
 * @param media
 */
function createMediaModal(mediaId, media) {
    const mediaModal = document.querySelector(".full-media");
    let mediaDisplay;

    if(media.video) {
        mediaDisplay = document.createElement("video");
        mediaDisplay.controls = true;
        mediaDisplay.setAttribute("src", `/assets/images/${photographer.asset}/${mediaId}`);
        mediaDisplay.setAttribute("alt", media.title);
        mediaDisplay.classList.add("displayVideo");
    } else {
        mediaDisplay = document.createElement("img");
        mediaDisplay.setAttribute("src", `/assets/images/${photographer.asset}/${mediaId}`);
        mediaDisplay.setAttribute("alt", media.title);
    }
    mediaModal.appendChild(mediaDisplay);

    previousMedia(media);
    nextMedia(media);
}

/**
 * get media id to display media modal
 * @param i
 */
function getMediaId(i) {
    const allMedias = document.querySelectorAll(".media-img");
    const mediaId = allMedias[i].getAttribute("id");

    createMediaModal(mediaId, photographerMedia[i]);
    openMediaModal();
}

/**
 * display previous media by click on left arrow
 * @param media
 */
function previousMedia(media) {
    const previousArrow = document.querySelector(".previousArrow");
    const mediaModal = document.querySelector(".full-media");
    const currentMediaDisplay = mediaModal.querySelector("img, video");

    previousArrow.addEventListener("click", () => {
        const currentIndex = photographerMedia.indexOf((media));
        const previousIndex = currentIndex - 1;
        mediaModal.removeChild(currentMediaDisplay);

        if (previousIndex > 0 && previousIndex <= photographerMedia.length){
            getMediaId(previousIndex);
        }
    });
}

/**
 * display next media by click on right arrow
 * @param media
 */
function nextMedia(media) {
    const nextArrow = document.querySelector(".nextArrow");
    const mediaModal = document.querySelector(".full-media");
    const currentMediaDisplay = mediaModal.querySelector("img, video");

    nextArrow.addEventListener("click", () => {
        const currentIndex = photographerMedia.indexOf((media));
        const nextIndex = currentIndex + 1;
        mediaModal.removeChild(currentMediaDisplay);

        if (nextIndex >= 0 && nextIndex < photographerMedia.length){
            getMediaId(nextIndex)
        }
    });
}
