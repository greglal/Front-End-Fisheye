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
    createMediaModal(mediaId, media, photographer, photographerMedia) {
        const mediaModal = document.querySelector(".full-media");
        let mediaDisplay;
        this.photographer = photographer;
        this.photographerMedia = photographerMedia;

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
        const previousArrow = document.querySelector(".previousArrow");
        this.photographer = photographer;

        previousArrow.addEventListener("click", () => {
            const currentIndex = photographerMedia.indexOf((media));
            const previousIndex = currentIndex - 1;

            if (previousIndex >= 0 && previousIndex <= photographerMedia.length){
                this.getMediaId(previousIndex, photographerMedia,photographer );
            }
        });
    }

    /**
     * pick media id
     *
     * @param i
     * @param media
     * @param photographer
     */
    getMediaId(i, media, photographer) {
        const allMedias = document.querySelectorAll(".media-img");
        const mediaId = allMedias[i].getAttribute("id");

        this. createMediaModal(mediaId, media[i], photographer, media);
        this. openMediaModal();
    }


    /**
     * display next media by click on right arrow
     *
     * @param media
     * @param photographerMedia
     * @param photographer
     */
    nextMedia(media, photographerMedia, photographer) {
        const nextArrow = document.querySelector(".nextArrow");
        this.photographer = photographer;

        nextArrow.addEventListener("click",
            () => {
                const currentIndex = photographerMedia.indexOf((media));
                const nextIndex = currentIndex + 1;

                if (nextIndex >= 0 && nextIndex <= photographerMedia.length - 1) {
                    this.getMediaId(nextIndex, photographerMedia, photographer);
                }
            });
        }
    }










