'use strict';
let picture;

function photographerFactory(data) {
    const { name, portrait, altLabel, city, country, tagline, price, id } = data;
    picture = `assets/photographers/${portrait}`;
    let article;

    function createIdCard() {
        // create div with name and portrait
        const divLink = document.createElement('a');
        divLink.classList.add('photographerId');
        divLink.setAttribute('href',"photographer.html?name=" + name + "&id=" + id);
        article.appendChild(divLink);

        const divImg = document.createElement( 'div' );
        divImg.classList.add('identity')
        divLink.appendChild(divImg);

        // portrait
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        divImg.appendChild(img);

        // photographer's name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        divLink.appendChild(h2);
    }

    function createDescriptionCard() {

        const divPresentation = document.createElement( 'div' );
        divPresentation.classList.add("presentation");
        article.appendChild( divPresentation );

        // photographer's location (city + country)
        const location = document.createElement('h3');
        location.textContent = `${city}, ${country}`;
        divPresentation.appendChild(location);

        // photographer's tag
        const tag = document.createElement('p');
        tag.textContent = tagline;
        divPresentation.appendChild(tag);

        // price per day
        const pricePerDay = document.createElement('p');
        pricePerDay.textContent = `${price}€/jour`;
        pricePerDay.classList.add('price');
        divPresentation.appendChild(pricePerDay);
    }

    function getUserCardDOM() {
        article = document.createElement( 'article' );

        createIdCard();
        createDescriptionCard();

        return (article);
    }
    return { name, picture, getUserCardDOM }
}


