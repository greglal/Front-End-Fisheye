'use strict';

const photographHeader = document.querySelector('.photograph-header');
const contactButton = document.querySelector('.contact_button');
const mainSection = document.querySelector('#main');
const mediaSection = document.querySelector('.media-section');


async function getPhotographers() {
     const photographers = await fetch('../data/photographers.json')
        .then((data) => data.json())
    return photographers;
}

let photographer;
let photographerMedia;


// récupération de l'id du photographe
// récupération du photographe
// récupération des médias du photographe
async function getPhotographer() {
    const {photographers, media} = await getPhotographers();
    const query = window.location.search;
    const name = new URLSearchParams(query).get('name');
    const id = new URLSearchParams(query).get('id');

    photographerMedia = media.find((media) => {
        return media.photographerId === parseInt(id);
        });

    photographer = photographers.find((photographer) => {
            return photographer.name === name;
        });

    const {name: photographerName, portrait: photographerPortrait, altLabel, city, country, tagline, price: pricePhotograpger, id: idPhotographer, asset} = photographer;
    const {id: mediaId, photographerId, title: mediaTitle, video, image, likes, date, price: priceMedia} = photographerMedia;
    picture = `assets/photographers/${photographer.portrait}`;

    createPhotographDescription(photographer);
    photographHeader.appendChild(contactButton);
    createPhotographImg(photographer);
    createMediaArticle(photographerMedia, photographer);
    displayDataMedia(photographer);

    return photographer;
}

getPhotographer();

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

function createPhotographImg(photographer) {
    const photographPicture = document.createElement('img');

    photographHeader.appendChild(photographPicture);
    photographPicture.setAttribute("src", picture);
    photographPicture.setAttribute("alt", photographer.name);
    photographPicture.classList.add('photographer-picture');
}

let mediaImg;
function createMediaArticle(photographerMedia, photographer) {

    const mediaArticle = document.createElement('article');
    const mediaDetails = document.createElement('div');
    const mediaTitle = document.createElement('h3');
    const mediaLikes = document.createElement('p');

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

    mediaSection.appendChild(mediaArticle);
    mediaArticle.appendChild(mediaImg);
    mediaArticle.appendChild(mediaDetails);
    mediaDetails.appendChild(mediaTitle);
    mediaDetails.appendChild(mediaLikes);

    mediaTitle.textContent = photographerMedia.title;
    mediaLikes.textContent = `${photographerMedia.likes} ❤️`;



    return mediaArticle;
}

async function displayDataMedia(photograph) {
    if (photograph === photographer ) {
        photographer.media.forEach((media) => {
            const mediaCardDOM = createMediaArticle(media);
            mainSection.appendChild(mediaCardDOM);
        });
    }
}





