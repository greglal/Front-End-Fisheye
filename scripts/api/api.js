'use strict';

class PhotographerManager {

    /**
     * get photographers from json
     *
     * @returns {Promise<any>}
     */
    async getPhotographers() {
        const photographers = await fetch('../data/photographers.json')
            .then((data) => data.json())
        return photographers;
    }

    /**
     * get all photographer details and all photographer medias details
     * create photographer's description
     * display all photographer's medias
     *
     * @returns {Promise<*>}
     */
    async getPhotographer() {
        const {photographers, media} = await this.getPhotographers();
        const query = window.location.search;
        const name = new URLSearchParams(query).get('name');
        const id = new URLSearchParams(query).get('id');
        photographHeader = document.querySelector('.photograph-header');
        contactButton = document.querySelector('.contact_button');

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

        this.createPhotographDescription(photographer);
        photographHeader.appendChild(contactButton);
        this.createPhotographImg(photographer);
        await this.displayDataMedia(photographerMedia);
        //createMediaModal(photographerMedia, photographer);

        return photographer;
    }
}



