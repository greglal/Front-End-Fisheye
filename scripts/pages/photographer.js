'use strict';

class PhotographerPageManager extends ModalMedia {

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

        photographDescription.classList.add('photographer-description');
        photographHeader.appendChild(photographDescription);

        photographDescription.appendChild(photographName);
        photographName.textContent = photographer.name;

        photographDescription.appendChild(photographLocation);
        photographLocation.classList.add();
        photographLocation.textContent = `${photographer.city}, ${photographer.country}`;

        photographDescription.appendChild(photographTagLine);
        photographTagLine.textContent = photographer.tagline;
    }

    /**
     * create photographer's portrait
     *
     * @param photographer
     */
    createPhotographImg(photographer) {
        const photographPicture = document.createElement('img');

        photographHeader.appendChild(photographPicture);
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
     * @returns {HTMLElement}
     */
    createMediaArticle(media, photographer) {
        const mediaSection = document.querySelector('.media-section');
        const mediaArticle = document.createElement('article');
        const mediaDetails = document.createElement('div');
        const mediaTitle = document.createElement('h3');
        const mediaLikes = document.createElement('div');
        const numberOfLikes = document.createElement('p');
        const heart = document.createElement('a');

        //create img or video caption
        if (media.video) {
            const mediaImg = document.createElement('video');
            mediaArticle.appendChild(mediaImg);
            mediaImg.setAttribute("src", `/assets/images/${photographer.asset}/${media.video}`);
            mediaImg.setAttribute("alt", media.title);
            mediaImg.setAttribute("id", media.video);
        } else {
            const mediaImg = document.createElement('img');
            mediaArticle.appendChild(mediaImg);
            mediaImg.setAttribute("src", `/assets/images/${photographer.asset}/${media.image}`);
            mediaImg.setAttribute("alt", media.title);
            mediaImg.setAttribute("id", media.image);
        }

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

        return mediaArticle;
    }

    /**
     * loop on each media to create articles
     *
     * @param photographerMedia
     * @returns {Promise<void>}
     */
    async displayDataMedia(photographerMedia) {
        let i=-1;
        photographerMedia.forEach((media) => {
            const mediaCardDOM = this.createMediaArticle(media, photographer);
            i++
            mediaImg.setAttribute("onclick",`getMediaId(${i})`);
            mediaSection.appendChild(mediaCardDOM);
        });
    }

    /**
     * count nulber of likes for all medias
     * @returns {number}
     */
    totalLikesCounter(){
        let counter = 0;
        let mediaCount;

        photographerMedia.forEach((media) => {
            mediaCount = Number(media.likes);
            counter = counter + mediaCount ;
        })

        return counter;
    }

    /**
     * display total like counter and price per day
     */
    displayCounterAndPrice() {
        const totalLikes = document.querySelector(".total_likes");
        const pricePerDay = document.querySelector(".price_per_day");
        let counter = this.totalLikesCounter();

        totalLikes.textContent = counter ;
        pricePerDay.textContent = `${photographer.price} € / jour`;

        console.log("**** counter ****", counter)
    }

    handleClick(media, likes, element) {
        if(!media.liked){
            media.likes++;
            likes.textContent = media.likes;
            media.liked=true;
            this.totalLikesCounter()
        }
    }
}

const photographerPage = new PhotographerPageManager();

function createPhotographDescription() {
    photographerPage.createPhotographDescription();
}

function displayDataMedia() {
    photographerPage.displayDataMedia();
}

function createPhotographImg() {
    photographerPage.createPhotographImg();
}










