/*'use strict';*/

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
        this.photographHeader = document.querySelector('.photograph-header');
        this.contactButton = document.querySelector('.contact-button');


        //filter medias according to the photographer's id
        this.photographerMedia = media.filter((media) => {
            return media.photographerId === parseInt(id);
        });

        //give photographer according to his name
        this.photographer = photographers.find((photographer) => {
            return photographer.name === name;
        });

        const {name: photographerName, portrait: photographerPortrait, altLabel, city, country, tagline,
            price: pricePhotograpger, id: idPhotographer, asset} = this.photographer;
        const {id: mediaId, photographerId, title: mediaTitle, video, image, likes, date, price: priceMedia} = this.photographerMedia;
        picture = `assets/photographers/${this.photographer.portrait}`;

        photographerPage.createPhotographDescription(this.photographer);
        photographerPage.photographHeader.appendChild(this.contactButton);
        photographerPage.createPhotographImg(this.photographer);
        await photographerPage.displayDataMedia(this.photographerMedia);


        return this.photographer;
    }
}



