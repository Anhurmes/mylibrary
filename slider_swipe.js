function slider({ container, slide, nextArrow, prevArrow, wrapper, field }) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
        indicators = [];
    dots.classList.add('carousels-dots');
    dots.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        indicators.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }


        indicators.forEach(dot => dot.style.opacity = 0.5);
        indicators[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }


        indicators.forEach(dot => dot.style.opacity = 0.5);
        indicators[slideIndex - 1].style.opacity = 1;
    });

    indicators.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            indicators.forEach(dot => dot.style.opacity = 0.5);
            indicators[slideIndex - 1].style.opacity = 1;
        });
    });

    function swipedetect(el, callback) {

        let touchsurface = el,
            swipedir,
            startX,
            startY,
            distX,
            distY,
            threshold = 50,
            restraint = 30,
            allowedTime = 300,
            elapsedTime,
            startTime,
            handleswipe = callback || function(swipedir) {};

        touchsurface.addEventListener('touchstart', function(e) {
            let touchobj = e.changedTouches[0];
            swipedir = 'none';
            distX = 0;
            distY = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime();
        }, false);

        touchsurface.addEventListener('touchend', function(e) {
            let touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    swipedir = (distX < 0) ? 'left' : 'right';
                }
            }
            handleswipe(swipedir);
        });
    }

    let el = document.querySelector('.offer__slider-wrapper');
    
    swipedetect(el, function(swipedir) {
        if (swipedir == 'left') {
            if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.slice(0, width.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }


            indicators.forEach(dot => dot.style.opacity = 0.5);
            indicators[slideIndex - 1].style.opacity = 1;
        }
        if (swipedir == 'right') {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            } else {
                offset -= +width.slice(0, width.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }


            indicators.forEach(dot => dot.style.opacity = 0.5);
            indicators[slideIndex - 1].style.opacity = 1;
        }
    });
}
export default slider;