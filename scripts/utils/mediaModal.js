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

        mediaModal  .addEventListener("keydown", (event) => {
            if(event.keyCode === 27){
                event.preventDefault();
                this.closeMediaModal();
            }
        })
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
        const media = document.querySelector("#full-media");

        mediaModal.style.display = "none";
        media.innerHTML="";
        overlay.classList.add("hidden");
        photographHeader.classList.remove("hidden");
        filter.classList.remove("hidden");
        mediaSection.classList.remove("hidden");
    }

    /**
     *
     * @param media
     * @param photographer
     * @param photographerMedia
     */
    createMediaModal(media, photographer, photographerMedia) {
        const mediaModal = document.querySelector("#full-media");
        const closeButton = document.querySelector("#close-media");
        const fullModal = document.querySelector("#media-modal");
        let mediaDisplay;
        const focusableMediaSelector = "a, img, video";
        let focusablesMedia =[];
        this.photographer = photographer;
        this.photographerMedia = photographerMedia;


            mediaDisplay = document.createElement(media.video ? "video":"img") ;
            mediaDisplay.setAttribute("src", `/assets/images/${photographer.asset}/${media.video || media.image}`);
            mediaDisplay.setAttribute("alt", media.title);
            mediaDisplay.setAttribute("aria-label", `${media.video ? "video" : "image"} closeup view`);
            mediaDisplay.setAttribute("tabindex", "0");
            this.currentMediaElement = mediaDisplay;

        if(media.video) {
            mediaDisplay.controls = true;
            mediaDisplay.classList.add("displayVideo");
        }

        closeButton.addEventListener("click",() => {this.closeMediaModal()});
        closeButton.addEventListener("keydown", (event) =>{
            if (event.keyCode === 13 || event.keyCode === 32) {
                this.closeMediaModal();
            }
        })

        mediaModal.appendChild(mediaDisplay);



        fullModal.addEventListener("keydown", (event) =>{
            if(event.keyCode === 27){
                event.preventDefault();
                this.closeMediaModal()
            }else if(event.keyCode === 9){
                event.preventDefault();
                focusablesMedia = Array.from (fullModal.querySelectorAll(focusableMediaSelector));
                let index = focusablesMedia.findIndex(f => f === fullModal.querySelector(":focus"));
                index++;

                if(index >= focusablesMedia.length){
                    index = 0;
                }
                focusablesMedia[index].focus();
            }
        })

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
                this.currentMediaElement.focus();
            } else {
                this.createMediaModal(photographerMedia[currentIndex],photographer, photographerMedia);
                this.openMediaModal();
                this.currentMediaElement.focus();
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
                    this.currentMediaElement.focus();
                }else {
                    this.createMediaModal(photographerMedia[currentIndex],photographer, photographerMedia);
                    this.openMediaModal();
                    this.currentMediaElement.focus();
                }
            });
        }
}

