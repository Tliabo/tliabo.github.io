/**
 * @author Tobia Prezioso
 */

const sliders = document.querySelectorAll('.slider');

for (let i = 0; i < sliders.length; i++) {
    let sliderObj = {
        slider: sliders[i],
        sliderId: `slider-${i}`,

        init() {
            this.sliderControls = this.slider.querySelectorAll('.slider-control');
            this.sliderItems = this.slider.querySelectorAll('.slider-item');
            this.autoslideBtn = this.slider.querySelector('.autoslide');
            this.slider.id = this.sliderId;
            this.slider.setAttribute('data-slider-play', true);
            this.initSliderControl();
            this.updateAutoplay();
        },
        initSliderControl() {
            for (let j = 0; j < this.sliderControls.length; j++) {
                let control = this.sliderControls[j];
                control.href = `#${this.sliderId}`;
                this.addEventListenerToControl(control);
            }
            this.autoslideBtn.href = `#${this.sliderId}`;
            this.addEventListenerToAutoslideBtn();
        },
        addEventListenerToControl(control) {
            control.addEventListener('click', e => {
                if (control.className.includes('next')) {
                    this.slideNext();
                }
                if (control.className.includes('prev')) {
                    this.slidePrev();
                }
            })
        },
        addEventListenerToAutoslideBtn() {
            this.autoslideBtn.addEventListener('click', e => {
                if (this.slider.getAttribute('data-slider-play') === "true") {
                    e.target.classList.replace('fa-pause-circle', 'fa-play-circle');
                    this.slider.setAttribute('data-slider-play', false);
                    this.updateAutoplay();
                } else {
                    e.target.classList.replace('fa-play-circle', 'fa-pause-circle');
                    this.slider.setAttribute('data-slider-play', true);
                    this.updateAutoplay();
                }
            })
        },
        slideNext() {
            let activeItem = this.slider.getAttribute('data-active-slide');

            if (activeItem < this.sliderItems.length) {
                activeItem++;
                this.updateActiveSlideData(activeItem)
                this.sliderItems.forEach(item => {
                    item.style.transform = `translateX(-${(activeItem - 1) * 100}%)`;
                })
            } else {
                activeItem = 1;
                this.updateActiveSlideData(activeItem)
                this.sliderItems.forEach(item => {
                    item.style.transform = `translateX(${0}%)`;
                })
            }

        },
        slidePrev() {
            let activeItem = this.slider.getAttribute('data-active-slide');

            if (activeItem > 1) {
                activeItem--;
                this.updateActiveSlideData(activeItem)
                this.sliderItems.forEach(item => {
                    item.style.transform = `translateX(-${(activeItem - 1) * 100}%)`;
                })
            } else {
                activeItem = this.sliderItems.length;
                this.updateActiveSlideData(activeItem)
                this.sliderItems.forEach(item => {
                    item.style.transform = `translateX(-${(this.sliderItems.length - 1) * 100}%)`;
                })
            }

        },
        updateAutoplay() {

            if (this.slider.getAttribute('data-slider-play') === "true") {
                this.interval = setInterval(e => {
                    this.slideNext();
                }, 5000)
            } else {
                clearInterval(this.interval);
            }
        },
        updateActiveSlideData(index) {
            this.slider.setAttribute('data-active-slide', index)
        }
    }

    sliderObj.init();

}
