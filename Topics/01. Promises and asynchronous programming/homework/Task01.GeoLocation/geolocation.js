/* globals Promise, document, navigator, window */
(function() {
    'use strict';

    const locationElement = document.getElementById('location-element');
    const msgElement = document.createElement('p');
    msgElement.id = 'message-element';
    msgElement.innerHTML = 'Getting an image for your location...';
    locationElement.appendChild(msgElement);

    function getGeolocationPositionPromise() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => { resolve(position); },
                (error) => { reject(error); });
        });
    }

    function parseLatAndLongCoords(geolocationPosition) {
        if (geolocationPosition.coords) {
            const lat = geolocationPosition.coords.latitude;
            const long = geolocationPosition.coords.longitude;
            msgElement.innerHTML = `Your location is ${lat}, ${long}.`;
            return { lat, long };
        } else {
            throw Error('An error just happened!');
        }
    }

    function createGeolocationImage(coordsObj, imageOptionsObj) {
        if (typeof imageOptionsObj === 'undefined') {
            imageOptionsObj = {};
        }
        const zoom = imageOptionsObj.zoom || 18;
        const width = imageOptionsObj.width || window.innerWidth / 1.5 | 0;
        const height = imageOptionsObj.height || window.innerHeight / 1.5 | 0;
        const color = imageOptionsObj.color || 'red';
        const label = imageOptionsObj.label || 'None';

        const imgElement = document.createElement('img');
        const imgSrc = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
            coordsObj.lat +
            ',' +
            coordsObj.long +
            '&zoom=' +
            zoom +
            '&size=' +
            width +
            'x' +
            height +
            '&markers=color:' +
            color +
            '|label:' +
            label +
            '|' +
            coordsObj.lat + ',' + coordsObj.long;

        imgElement.setAttribute('src', imgSrc);
        imgElement.width = width;
        imgElement.height = height;
        locationElement.appendChild(imgElement);
    }

    getGeolocationPositionPromise()
        .then((x) => parseLatAndLongCoords(x))
        .then((x) => createGeolocationImage(x))
        .catch(x => msgElement.innerHTML = x.message);
}());