'use strict';

class PhotographerPageManager extends PhotographerManager {

    getPhotographer() {
        return super.getPhotographer();
    }

    /**
     *create photographer's description
     *
     * @param photographer
     */
    createPhotographDescription(photographer) {
        const photographDescription = document.createElement('div');
        const photographName = document.createElement('h2');
        const photographLocation = document.createElement('h3');
        const photographTagLine = document.createElement('p');
        const modalTitle=document.querySelector(".contact-button");

        photographDescription.classList.add('photographer-description');
        this.photographHeader.appendChild(photographDescription);

        photographDescription.appendChild(photographName);
        photographName.textContent = photographer.name;

        photographDescription.appendChild(photographLocation);
        photographLocation.classList.add();
        photographLocation.textContent = `${photographer.city}, ${photographer.country}`;

        photographDescription.appendChild(photographTagLine);
        photographTagLine.textContent = photographer.tagline;

        modalTitle.addEventListener("click", () => {
            displayModal(photographer);
        })
    }

    /**
     * create photographer's portrait
     *
     * @param photographer
     */
    createPhotographImg(photographer) {
        const photographPicture = document.createElement('img');

        this.photographHeader.appendChild(photographPicture);
        photographPicture.setAttribute("src", picture);
        photographPicture.setAttribute("alt", photographer.name);
        photographPicture.classList.add('photographer-picture');
    }

    /**
     * create article for media
     * create HTML structure
     * add css classes
     *
     * @param media
     * @param photographer
     * @returns {{mediaArticle: HTMLElement, mediaImg: HTMLImageElement | HTMLVideoElement}}
     */
    createMediaArticle(media, photographer) {
        const mediaSection = document.querySelector('.media-section');
        const mediaArticle = document.createElement('article');
        const mediaDetails = document.createElement('div');
        const mediaTitle = document.createElement('h3');
        const mediaLikes = document.createElement('div');
        const numberOfLikes = document.createElement('p');
        const heart = document.createElement('a');
        let mediaImg;

        //create img or video caption
        if (media.video) {
            mediaImg = document.createElement('video');
            mediaImg.setAttribute("src", `/assets/images/${photographer.asset}/${media.video}`);
            mediaImg.setAttribute("id", media.video);
        } else {
            mediaImg = document.createElement('img');
            mediaImg.setAttribute("src", `/assets/images/${photographer.asset}/${media.image}`);
            mediaImg.setAttribute("id", media.image);
        }

        mediaArticle.appendChild(mediaImg);

        mediaImg.setAttribute("alt", media.title);
        mediaImg.setAttribute("aria-label", `${media.title}, closeup view`);
        mediaImg.setAttribute("tabindex", "0");

        mediaArticle.classList.add("media-article");
        mediaDetails.classList.add("media-details");
        mediaLikes.classList.add("media-likes");
        mediaImg.classList.add("media-img");
        heart.classList.add("heart");

        mediaSection.appendChild(mediaArticle);
        mediaArticle.appendChild(mediaImg);
        mediaArticle.appendChild(mediaDetails);
        mediaDetails.appendChild(mediaTitle);
        mediaDetails.appendChild(mediaLikes);
        mediaLikes.appendChild(numberOfLikes);
        mediaLikes.appendChild(heart);

        heart.setAttribute("href", "#");
        heart.setAttribute("onclick", "return false");
        heart.setAttribute("aria-label", "likes");

        mediaTitle.textContent = media.title;
        numberOfLikes.textContent = media.likes;
        heart.textContent = '\u2665';

        //increase number of likes on click
        heart.addEventListener("click", () => {
            this.handleClick(media, numberOfLikes, heart);
            this.displayCounterAndPrice()
            return numberOfLikes
        });
        this.displayCounterAndPrice();

        return {mediaArticle, mediaImg};
    }

    /**
     * loop on each media to create articles
     *
     * @param photographerMedia
     * @returns {Promise<void>}
     */
    async displayDataMedia(photographerMedia) {
        let i=-1;
        const mediaSection = document.querySelector('.media-section');
        const mediaModal = new ModalMedia;

        mediaSection.innerHTML = "";

        photographerMedia.forEach((media) => {
            const mediaCardDOM = this.createMediaArticle(media, this.photographer);
            i++

            mediaCardDOM.mediaImg.addEventListener("click", () => {
                mediaModal.createMediaModal(media, this.photographer, photographerMedia);
                mediaModal.openMediaModal();
            });
            mediaSection.appendChild(mediaCardDOM.mediaArticle);
        });
        this.sortByPopularity(photographerMedia);
        this.sortByDate(photographerMedia);
        this.sortByTitle(photographerMedia);
        this.openSortMenu();
    }

    /**
     * count number of likes for all medias
     * @returns {number}
     */
    totalLikesCounter(){
        let counter = 0;
        let mediaCount;

        this.photographerMedia.forEach((media) => {
            mediaCount = Number(media.likes);
            counter = counter + mediaCount ;
        })

        return counter;
    }

    /**
     * display total like counter and price per day
     */
    displayCounterAndPrice() {
        const totalLikes = document.querySelector(".total-likes");
        const pricePerDay = document.querySelector(".price-per-day");
        let counter = this.totalLikesCounter();

        totalLikes.textContent = counter ;
        pricePerDay.textContent = `${this.photographer.price} € / jour`;
    }

    /**
     * limit click on like to 1 like
     *
     * @param media
     * @param likes
     */
    handleClick(media, likes) {
        if(!media.liked){
            media.likes++;
            likes.textContent = media.likes;
            media.liked=true;
            this.totalLikesCounter()
        }
    }

    /**
     * sort media by number of likes
     * sort by click on "popularité"
     * from most liked to less liked
     *
     * @param photographerMedia
     */
    sortByPopularity(photographerMedia){
        const popularityButton = document.querySelector("#popularity");
        const dateButton = document.querySelector("#date");
        const titleButton = document.querySelector("#title");
        const mediaSection = document.querySelector('.media-section');

        popularityButton.addEventListener("click", () => {
            popularityButton.setAttribute("aria-selected", "true");
            dateButton.setAttribute("aria-selected", "false");
            titleButton.setAttribute("aria-selected", "false");
            photographerMedia.sort(function(a, b){
                return b.likes - a.likes
            })
            while (mediaSection.firstChild) {
                mediaSection.firstChild.remove();
            }
            photographerMedia.forEach((media) => {
                const mediaCardDOM = this.createMediaArticle(media, this.photographer);
                this.displayDataMedia(photographerMedia);
                mediaSection.appendChild(mediaCardDOM.mediaArticle);
            });
        })
    }

    /**
     * sort media by date
     * sort by click on "date"
     * form most recent to oldest
     *
     * @param photographerMedia
     */
    sortByDate(photographerMedia){
        const popularityButton = document.querySelector("#popularity");
        const dateButton = document.querySelector("#date");
        const titleButton = document.querySelector("#title");
        const mediaSection = document.querySelector('.media-section');

        dateButton.addEventListener("click", () => {
            dateButton.setAttribute("aria-selected", "true");
            popularityButton.setAttribute("aria-selected", "false");
            titleButton.setAttribute("aria-selected", "false");
            photographerMedia.sort(function(a, b){
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                return dateB - dateA
            })
            while (mediaSection.firstChild) {
                mediaSection.firstChild.remove();
            }
            photographerMedia.forEach((media) => {
                const mediaCardDOM = this.createMediaArticle(media, this.photographer);
                this.displayDataMedia(photographerMedia);
                mediaSection.appendChild(mediaCardDOM.mediaArticle);
            });
        })
    }

    /**
     * sort media by title
     * sort by click on "titre"
     * from A to Z
     *
     * @param photographerMedia
     */
    sortByTitle(photographerMedia){
        const popularityButton = document.querySelector("#popularity");
        const dateButton = document.querySelector("#date");
        const titleButton = document.querySelector("#title");
        const mediaSection = document.querySelector('.media-section');

        titleButton.addEventListener("click", () => {
            titleButton.setAttribute("aria-selected", "true");
            popularityButton.setAttribute("aria-selected", "false");
            dateButton.setAttribute("aria-selected", "false");
            photographerMedia.sort(function(a, b){
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();

                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            })

            while (mediaSection.firstChild) {
                mediaSection.firstChild.remove();
            }
            photographerMedia.forEach((media) => {
                const mediaCardDOM = this.createMediaArticle(media, this.photographer);
                this.displayDataMedia(photographerMedia);
                mediaSection.appendChild(mediaCardDOM.mediaArticle);
            });
        })
    }

    /**
     * open sort menu by keypress enter or space
     * close sort menu by keypress escape
     */
    openSortMenu() {
        const filterButton = document.querySelector("#filter-button");
        filterButton.addEventListener("keydown", (event) => {
            if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                const isExpended =filterButton.getAttribute("aria-expended") === "true";
                const filterMenu = document.querySelector("#filter-menu");

                if(isExpended){
                    filterMenu.style.display = "none";
                    filterButton.setAttribute("aria-expanded", "false");
                }else{
                    filterMenu.style.display = "block";
                    filterButton.setAttribute("aria-expanded", "true");
                }
            } else if(event.keyCode === 27){
                event.preventDefault();
                // const isExpended =filterButton.getAttribute("aria-expended") === "false";
                const filterMenu = document.querySelector("#filter-menu");
                filterMenu.style.display = "none";
                filterButton.setAttribute("aria-expanded", "false");
            }
        })
    };


}

const photographerPage = new PhotographerPageManager();
photographerPage.getPhotographer()






