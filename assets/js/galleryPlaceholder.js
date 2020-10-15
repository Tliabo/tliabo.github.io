/**
 * @author Tobia Prezioso
 */

let closeBtn;
let modalContent;
const paintingDetails = `
<div class="painting-details">
    <div class="row painting-name">
        <p>Name:</p>
        <h3>Germanus elevatuss ducunt ad mineralis.</h3>
    </div>
    <div class="row painting-description">
        <p>Beschreibung:</p>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores</p>
    </div>
    <div class="row painting-year">
        <p>Jahr:</p>
        <p>${getRandomInt(2000, 2020)}</p>
    </div>
    <div class="row painting-price">
        <p>Preis:</p>
        <p><a href="mailto:verena_prezioso@yahoo.de?subject=Preisanfrage&body=Ich interessiere mich für:">
            <strong>Auf Anfrage</strong></a>
        </p>
    </div>
</div>
`

function createPlaceholder(amount = 1, keywords, minMaxSize) {
    for (let i = 0; i < amount; i++) {

        const paintingWrapper = document.createElement('li');
        paintingWrapper.classList.add('painting-wrapper');

        const imgWrapper = document.createElement('figure');
        imgWrapper.classList.add('img-wrapper');

        const paintingImg = document.createElement('img');
        paintingImg.classList.add('painting-img', 'img-responsive');
        paintingImg.src = getImageLink(keywords, minMaxSize);
        paintingImg.alt = 'Random image from unsplashed';

        imgWrapper.appendChild(paintingImg);
        paintingWrapper.appendChild(imgWrapper);

        paintingImg.addEventListener('click', function (e) {
            modalContent = imgWrapper.outerHTML;
            modalContent += paintingDetails;
            initModal();
        })

        document.querySelector('.paintings-list').appendChild(paintingWrapper)
    }
}

function getImageLink(keywordsArray = ['art'], minMaxSize = [200, 500]) {
    let keywords = '?';
    let size;

    keywordsArray.forEach(keyword => {
        keywords += `${keyword},`;
    })

    if (minMaxSize.length >= 2) {
        size = getRandomInt(minMaxSize[0], minMaxSize[1])
    } else {
        size = getRandomInt(200, 500)
    }

    return `https://source.unsplash.com/random/${size}${keywords}`;
}

function getRandomInt(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function initModal() {
    const modal = document.createElement('div');
    let modalModel = `
    <div class="inner">
        <span class="close"><i class="fas fa-times"></i></span>
        <div class="content">
            ${modalContent}
        </div>
    </div>`;

    modal.classList.add('modal');
    modal.innerHTML = modalModel;
    document.querySelector('#footer-main').appendChild(modal);

    closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', e => {
        modal.style.display = 'none';
        modal.remove();
    });

    modal.addEventListener('click', function (e) {

        if (e.target === this) {
            modal.style.display = 'none';
            modal.remove();
        }
    });
}
