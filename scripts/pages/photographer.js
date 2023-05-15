'use strict';

let photographer;
let photographerMedia;
let photographHeader;
let contactButton;
let mediaSection;
let mediaImg;


getPhotographer();

/**
 *create photographer's description
 *
 * @param photographer
 */
function createPhotographDescription(photographer) {
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
function createPhotographImg(photographer) {
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
 * @param photographerMedia
 * @param photographer
 * @returns {HTMLElement}
 */
function createMediaArticle(photographerMedia, photographer) {
    mediaSection = document.querySelector('.media-section');
    const mediaArticle = document.createElement('article');
    const mediaDetails = document.createElement('div');
    const mediaTitle = document.createElement('h3');
    const mediaLikes = document.createElement('div');
    const numberOfLikes = document.createElement('p');
    const heart = document.createElement('a');

    //create img or video caption
    if (photographerMedia.video) {
        mediaImg = document.createElement('video');
        mediaArticle.appendChild(mediaImg);
        mediaImg.setAttribute("src", `/assets/images/${photographer.asset}/${photographerMedia.video}`);
        mediaImg.setAttribute("alt", photographerMedia.title);
        mediaImg.setAttribute("id", photographerMedia.video);
        mediaImg.setAttribute("onclick",`; getMediaId(); openMediaModal() ; createMediaModal()`);
    } else {
        mediaImg = document.createElement('img');
        mediaArticle.appendChild(mediaImg);
        mediaImg.setAttribute("src", `/assets/images/${photographer.asset}/${photographerMedia.image}`);
        mediaImg.setAttribute("alt", photographerMedia.title);
        mediaImg.setAttribute("id", photographerMedia.image);
        mediaImg.setAttribute("onclick",`; getMediaId(); openMediaModal() ; createMediaModal()`);
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

    mediaTitle.textContent = photographerMedia.title;
    numberOfLikes.textContent = photographerMedia.likes;
    heart.textContent = '\u2665';

    //increase number of likes on click
    heart.addEventListener("click", ()=>{
        photographerMedia.likes++;
        numberOfLikes.textContent = photographerMedia.likes;
    })


    return mediaArticle;
}

/**
 * loop on each media to create articles
 *
 * @param photographerMedia
 * @returns {Promise<void>}
 */
async function displayDataMedia(photographerMedia) {
    photographerMedia.forEach((media) => {
        const mediaCardDOM = createMediaArticle(media, photographer);
        mediaSection.appendChild(mediaCardDOM);
    });
}


// function sortByPopularity() {
//     const medias = photographers.media;
//     const numberOfLikes = photographerMedia.likes;
//     const byValue = (a,b) => a - b;
//     const sortedByPopularity = [...numberOfLikes].sort(byValue);
//     const popularity = document.querySelector("#popularity");
//     popularity.setAttribute("onclick",sortedByPopularity);
//
//     console.log(medias);
// }
