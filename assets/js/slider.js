/**
 * @author Tobia Prezioso
 */

const sliders = document.querySelectorAll('.slider');
let interval;

for (let i = 0; i < sliders.length; i++) {
    let slider = sliders[i];
    let sliderControls = slider.querySelectorAll('.slider-control');
    let sliderItems = slider.querySelectorAll('.slider-item');
    let autoslideBtn = slider.querySelector('.autoslide');
    let sliderId = `slider-${i}`;

    addIdToSlider(slider, sliderId);
    slider.setAttribute('data-slider-play', true);
    updateAutoplay(slider, sliderItems);

    for (let j = 0; j < sliderControls.length; j++) {
        let control = sliderControls[j];
        addSliderIdToControl(control, sliderId);
        addEventListenerToControl(slider, control, sliderItems);
    }

    autoslideBtn.addEventListener('click', e => {
        if (slider.getAttribute('data-slider-play') === "true") {
            e.target.classList.replace('fa-pause-circle', 'fa-play-circle');
            slider.setAttribute('data-slider-play', false);
            updateAutoplay(slider, sliderItems);
        } else {
            e.target.classList.replace('fa-play-circle', 'fa-pause-circle');
            slider.setAttribute('data-slider-play', true);
            updateAutoplay(slider, sliderItems);
        }
    })
}

function addIdToSlider(slider, sliderId) {
    slider.id = sliderId;
}

function addSliderIdToControl(control, sliderId) {
    control.href = `#${sliderId}`;
}

function addEventListenerToControl(slider, control, sliderItems) {

    control.addEventListener('click', e => {
        if (control.className.includes('next')) {
            slideNext(slider, sliderItems);
        }
        if (control.className.includes('prev')) {
            slidePrev(slider, sliderItems);
        }

    })

}

function slideNext(slider, sliderItems) {
    let activeItem = slider.getAttribute('data-active-slide');

    if (activeItem < sliderItems.length) {
        activeItem++;
        updateActiveSlideData(slider, activeItem)
        sliderItems.forEach(item => {
            item.style.transform = `translateX(-${(activeItem - 1) * 100}%)`;
        })
    } else {
        activeItem = 1;
        updateActiveSlideData(slider, activeItem)
        sliderItems.forEach(item => {
            item.style.transform = `translateX(${0}%)`;
        })
    }

}

function slidePrev(slider, sliderItems) {
    let activeItem = slider.getAttribute('data-active-slide');

    if (activeItem > 1) {
        activeItem--;
        updateActiveSlideData(slider, activeItem)
        sliderItems.forEach(item => {
            item.style.transform = `translateX(-${(activeItem - 1) * 100}%)`;
        })
    } else {
        activeItem = sliderItems.length;
        updateActiveSlideData(slider, activeItem)
        sliderItems.forEach(item => {
            item.style.transform = `translateX(-${(sliderItems.length - 1) * 100}%)`;
        })
    }

}

function updateAutoplay(slider, sliderItems) {

    if (slider.getAttribute('data-slider-play') === "true") {
        interval = setInterval(function (){
            slideNext(slider, sliderItems);
        }, 3500)
    } else {
        clearInterval(interval);
    }
}

function updateActiveSlideData(slider, number) {
    slider.setAttribute('data-active-slide', number)
}
