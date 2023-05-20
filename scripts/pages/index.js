'use strict';

class IndexPageManager extends PhotographerManager {
    async displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async init() {
        // Récupère les datas des photographes
        const { photographers } = await this.getPhotographers();
        this.displayData(photographers);
    }
}

const indexPageManager = new IndexPageManager();
indexPageManager.init();
