'use strict';

const photographHeader = document.querySelector('.photograph-header');
const contactButton = document.querySelector('.contact_button');
const mainSection = document.querySelector('#main');
const mediaSection = document.querySelector('.media-section');

/**
 * get photographers from json
 *
 * @returns {Promise<any>}
 */
async function getPhotographers() {
     const photographers = await fetch('../data/photographers.json')
        .then((data) => data.json())
    return photographers;
}

let photographer;
let photographerMedia;

/**
 * get all photographer details and all photographer medias details
 * create photographer's description
 * display all photographer's medias
 *
 * @returns {Promise<*>}
 */
async function getPhotographer() {
    const {photographers, media} = await getPhotographers();
    const query = window.location.search;
    const name = new URLSearchParams(query).get('name');
    const id = new URLSearchParams(query).get('id');

    //filter medias according to the photographer's id
    photographerMedia = media.filter((media) => {
        return media.photographerId === parseInt(id);
        });

    //give photographer according to his name
    photographer = photographers.find((photographer) => {
            return photographer.name === name;
        });

    const {name: photographerName, portrait: photographerPortrait, altLabel, city, country, tagline, price: pricePhotograpger, id: idPhotographer, asset} = photographer;
    const {id: mediaId, photographerId, title: mediaTitle, video, image, likes, date, price: priceMedia} = photographerMedia;
    picture = `assets/photographers/${photographer.portrait}`;

    createPhotographDescription(photographer);
    photographHeader.appendChild(contactButton);
    createPhotographImg(photographer);
    await displayDataMedia(photographerMedia);

    return photographer;
}

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

let mediaImg;

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

    const mediaArticle = document.createElement('article');
    const mediaDetails = document.createElement('div');
    const mediaTitle = document.createElement('h3');
    const mediaLikes = document.createElement('div');

    //create img or video caption
    if (photographerMedia.video) {
        mediaImg = document.createElement('video');
        mediaArticle.appendChild(mediaImg);
        mediaImg.setAttribute("src", `/assets/images/${photographer.asset}/${photographerMedia.video}`);
    } else {
        mediaImg = document.createElement('img');
        mediaArticle.appendChild(mediaImg);
        mediaImg.setAttribute("src", `/assets/images/${photographer.asset}/${photographerMedia.image}`);
    }

    mediaArticle.classList.add("media-article");
    mediaDetails.classList.add("media-details");
    mediaLikes.classList.add("media-likes");
    mediaImg.classList.add("media-img");

    mediaSection.appendChild(mediaArticle);
    mediaArticle.appendChild(mediaImg);
    mediaArticle.appendChild(mediaDetails);
    mediaDetails.appendChild(mediaTitle);
    mediaDetails.appendChild(mediaLikes);

    mediaTitle.textContent = photographerMedia.title;
    mediaLikes.textContent = `${photographerMedia.likes} \u2665`;

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

