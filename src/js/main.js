import $ from 'jquery';
import Swiper from "swiper";
import {Navigation, Pagination, Virtual} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

$(document).ready(function() {
    console.log('ready');

    const heroSwiper = new Swiper(".hero-swiper", {
        modules: [
            Navigation,
            Pagination,
        ],
        pagination: {
            el: ".hero-swiper__pagination",
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".hero-swiper-button-next",
            prevEl: ".hero-swiper-button-prev",
        },
    });

    const modelsSwiper = new Swiper(".models-swiper", {
        slidesPerView: 1.8,
        centeredSlides: true,
        slideToClickedSlide: true,
        loopFillGroupWithBlank: true,
    });

    const researchSwiper = new Swiper(".research-swiper", {
        modules: [
            Pagination
        ],
        slidesPerView: "auto",
        spaceBetween: 5,
        slidesOffsetBefore: 50,
        slidesOffsetAfter: 50,
        freeMode: true,
        pagination: {
            el: ".research-swiper__pagination",
            dynamicBullets: true,
        },
    })
});
