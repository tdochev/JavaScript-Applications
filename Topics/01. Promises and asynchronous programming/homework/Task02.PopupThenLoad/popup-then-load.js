/* globals Promise, document, window */
(() => {
    'use strict';

    const REDIRECTION_TARGET = 'http://telerikacademy.com';
    const TIME_OUT_IN_SECONDS = 2;

    let redirectPromise = new Promise(
        (resolve, reject) => {
            let msgDiv = document.createElement('div');
            msgDiv.id = 'message';
            msgDiv.innerHTML += 'You are going to be redirected to ' + REDIRECTION_TARGET + ' in ' + TIME_OUT_IN_SECONDS + ' seconds!';
            let body = document.getElementsByTagName('body')[0];
            body.appendChild(msgDiv);
            window.setTimeout(() => {
                resolve(REDIRECTION_TARGET);
            }, TIME_OUT_IN_SECONDS * 1000);
        }
    );

    let redirect = (value) => {
        console.log('Promise Resolved!');
        window.location.href = value;
    };

    redirectPromise.then(redirect)
        .catch(
            function(reason) {
                console.log('Promise rejected.' + reason);
            });
})();