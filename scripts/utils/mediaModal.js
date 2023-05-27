'use strict';

class ModalMedia extends PhotographerPageManager {

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
     *
     * @param mediaId
     * @param media
     * @param photographer
     * @param photographerMedia
     */
    createMediaModal(media, photographer, photographerMedia) {
        const mediaModal = document.querySelector("#full-media");
        const closeButton = document.querySelector("#close_media");
        let mediaDisplay;
        this.photographer = photographer;
        this.photographerMedia = photographerMedia;

        if(media.video) {
            mediaDisplay = document.createElement("video");
            mediaDisplay.controls = true;
            mediaDisplay.setAttribute("src", `/assets/images/${photographer.asset}/${media.video}`);
            mediaDisplay.setAttribute("alt", media.title);
            mediaDisplay.classList.add("displayVideo");
        } else {
            mediaDisplay = document.createElement("img");
            mediaDisplay.setAttribute("src", `/assets/images/${photographer.asset}/${media.image}`);
            mediaDisplay.setAttribute("alt", media.title);
        }

        closeButton.addEventListener("click",() => {this.closeMediaModal()});

        mediaModal.appendChild(mediaDisplay);

        this.previousMedia(media, photographerMedia, photographer);
        this.nextMedia(media, photographerMedia, photographer);
    }

    /**
     * Display previous media by clicking on left arrow
     *
     * @param media
     * @param photographerMedia
     * @param photographer
     */
    previousMedia(media, photographerMedia, photographer) {
        const previousArrow = document.querySelector("#previousArrow");
        const mediaModal = document.querySelector("#full-media");
        this.photographer = photographer;

        previousArrow.addEventListener("click", () => {
            const currentIndex = photographerMedia.indexOf((media));
            const previousIndex = currentIndex - 1;
            mediaModal.innerHTML="";

            if (currentIndex > 0 && currentIndex < photographerMedia.length){
                this.createMediaModal(photographerMedia[previousIndex],photographer, photographerMedia);
                this.openMediaModal();
                console.log("currentIndex: ", currentIndex)
            } else {
                this.createMediaModal(photographerMedia[currentIndex],photographer, photographerMedia);
                this.openMediaModal();
            }
        });
    }

    /**
     * display next media by click on right arrow
     *
     * @param media
     * @param photographerMedia
     * @param photographer
     */
    nextMedia(media, photographerMedia, photographer) {
        const nextArrow = document.querySelector("#nextArrow");
        const mediaModal = document.querySelector("#full-media");
        this.photographer = photographer;

        nextArrow.addEventListener("click",
            () => {
                const currentIndex = photographerMedia.indexOf((media));
                const nextIndex = currentIndex + 1;
                mediaModal.innerHTML="";

                if (currentIndex >= 0 && currentIndex < photographerMedia.length - 1) {
                    this.createMediaModal(photographerMedia[nextIndex],photographer, photographerMedia);
                    this.openMediaModal();
                }else {
                    this.createMediaModal(photographerMedia[currentIndex],photographer, photographerMedia);
                    this.openMediaModal();
                }
            });
        }

}

