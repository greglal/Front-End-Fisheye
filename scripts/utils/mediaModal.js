'use strict';

class ModalMedia extends PhotographerManager {
    /**
     * opening media modal
     * add blur on page's background
     */
    openMediaModal(){
        const mediaModal = document.querySelector(".media-carrousel");
        const overlay = document.querySelector(".overlay");
        const photographHeader = document.querySelector(".photograph-header");
        const filter = document.querySelector(".filter-div");
        const mediaSection = document.querySelector(".media-section");

        mediaModal.style.display = "block";
        overlay.classList.remove("hidden");
        photographHeader.classList.add("hidden");
        filter.classList.add("hidden");
        mediaSection.classList.add("hidden");
        overlay.setAttribute("onclick",() => {this.closeMediaModal()});
    }

    /**
     * closing media modal
     * remove blur on page's background
     */
    closeMediaModal(){
        const mediaModal = document.querySelector(".media-carrousel");
        const overlay = document.querySelector(".overlay");
        const photographHeader = document.querySelector(".photograph-header");
        const filter = document.querySelector(".filter-div");
        const mediaSection = document.querySelector(".media-section");

        mediaModal.style.display = "none";
        overlay.classList.add("hidden");
        photographHeader.classList.remove("hidden");
        filter.classList.remove("hidden");
        mediaSection.classList.remove("hidden");
    }

    /**
     * create media Modal for photography or video
     *
     * @param mediaId
     * @param media
     */
    createMediaModal(mediaId, media) {
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

        this.previousMedia(media);
        this.nextMedia(media);
    }

    /**
     * get media id to display media modal
     * @param i
     */
    getMediaId(i) {
        const allMedias = document.querySelectorAll(".media-img");
        const mediaId = allMedias[i].getAttribute("id");

        this.createMediaModal(mediaId, photographerMedia[i]);
        this.openMediaModal();
    }

    /**
     * display previous media by click on left arrow
     * @param media
     */
    previousMedia(media) {
        const previousArrow = document.querySelector(".previousArrow");
        const mediaModal = document.querySelector(".full-media");
        const currentMediaDisplay = mediaModal.querySelector("img, video");

        previousArrow.addEventListener("click", () => {
            const currentIndex = photographerMedia.indexOf((media));
            const previousIndex = currentIndex - 1;
            mediaModal.removeChild(currentMediaDisplay);

            if (previousIndex >= 0 && previousIndex <= photographerMedia.length){
                this.getMediaId(previousIndex);
            }
        });
    }

    /**
     * display next media by click on right arrow
     * @param media
     */
    nextMedia(media) {
        const nextArrow = document.querySelector(".nextArrow");
        const mediaModal = document.querySelector(".full-media");
        const currentMediaDisplay = mediaModal.querySelector("img, video");

        nextArrow.addEventListener("click", () => {
            const currentIndex = photographerMedia.indexOf((media));
            const nextIndex = currentIndex + 1;
            mediaModal.removeChild(currentMediaDisplay);

            if (nextIndex >= 0 && nextIndex < photographerMedia.length-1){
                this.getMediaId(nextIndex)
            }
        });
    }
}












