'use strict';
import preloader from './modules/preloader';
import slider from './modules/slider';
import pageup from './modules/pageup';
import comments from './modules/comments';
import hamburger from './modules/hamburger';

preloader();

window.addEventListener('DOMContentLoaded', () => {
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    pageup();
    comments({
        container: '.comments__slider',
        slide: '.comments__slide',
        wrapper: '.comments__slider-wrapper',
        field: '.comments__slider-inner'
    });
    hamburger();

});
