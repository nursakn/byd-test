import $ from 'jquery';
import MicroModal from 'micromodal';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {Swiper} from './swiper-bundle.min.js';

gsap.registerPlugin(ScrollTrigger);


$(document).ready(function () {
    MicroModal.init();

    let pinSections = gsap.utils.toArray(".pinned-section");

    pinSections.forEach((panel, i) => {
        ScrollTrigger.create({
            trigger: panel,
            start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
            pin: true,
            pinSpacing: false,
        });
    });

    const heroSwiper = new Swiper(".hero-swiper", {
        pagination: {
            el: ".hero-swiper__pagination",
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".hero-swiper-button-next",
            prevEl: ".hero-swiper-button-prev",
        },
    });

    let isLarge = window.matchMedia("(min-width: 2300px)").matches;
    let isSmall = window.matchMedia("(max-width: 1280px)").matches;

    let isMd = window.matchMedia("(max-width: 1024px)").matches;
    let isSm = window.matchMedia("(max-width: 768px)").matches;

    const modelMobileElement = $('.tab-select-label');
    const modelDesktopElement = $('.model__tabs-wrapper');

    modelMobileElement.remove();
    modelDesktopElement.remove();

    if (isSmall) {
        modelMobileElement.insertAfter($('.model__tabs-logo'));
    } else {
        modelDesktopElement.insertAfter($('.model__tabs-logo'));
    }

    window.addEventListener('resize', function () {
        isLarge = window.matchMedia("(min-width: 2300px)").matches;
        isSmall = window.matchMedia("(max-width: 1280px)").matches;
        isMd = window.matchMedia("(max-width: 1024px)").matches;
        isSm = window.matchMedia("(max-width: 768px)").matches;

        modelMobileElement.remove();
        modelDesktopElement.remove();

        if (isSmall) {
            modelMobileElement.insertAfter($('.model__tabs-logo'));
        } else {
            modelDesktopElement.insertAfter($('.model__tabs-logo'));
        }
    })

    const modelsSwiper = new Swiper(".models-swiper", {
        slidesPerView: isLarge ? 1.8 : isSm ? 1.2 : isSmall ? 1.4 : 1.6,
        loop: true,
        spaceBetween: 25,
        centeredSlides: true,
        slideToClickedSlide: true,
        loopFillGroupWithBlank: true,

        on: {
            slideChange: function () {
                let currentSlide = this.slides[this.activeIndex];
                let model = $(currentSlide).data('model');

                $('.models__selector-button').removeClass('models__selector-button--active');
                $('.models__selector-button[data-model="' + model + '"]').addClass('models__selector-button--active');
            }
        }
    });

    $('.models__selector-button').on('click', function () {
        let model = $(this).data('model');
        let slideIndex = $('.models-swiper .swiper-slide[data-model="' + model + '"]').index();
        modelsSwiper.slideTo(slideIndex);

        $('.models__selector-button').removeClass('models__selector-button--active');
        $(this).addClass('models__selector-button--active');
    });

    const researchSwiper = new Swiper(".research-swiper", {
        slidesPerView: isSm ? 1 : "auto",
        spaceBetween: 5,
        slidesOffsetBefore: isSm ? 0 : 50,
        slidesOffsetAfter: isSm ? 0 : 50,
        freeMode: !isSm,
        pagination: {
            el: ".research-swiper__pagination",
            dynamicBullets: true,
        },
    })

    if (isMd) {
        $(".header__nav-wrapper").on("click", function () {
            $(".header__nav").toggleClass("active");
        })
    }

    if (isMd) {
        const langEl = $(".header__lang");

        langEl.insertAfter($(".header__nav a:last-child"));
    }

    $('.footer__up').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    })

    if (isSm) {
        $('.footer__disclaimer').insertAfter($('.footer__middle'))
    } else {
        $('.footer__disclaimer').insertAfter($('.footer__logo'))
    }

    if (isSm) {
        $('.models__data').toggleClass('wrapper')
    }

    const designSection = $('#design-section');
    const warrantySection = $('#warranty-section');
    const exteriorSection = $('#exterior-section');
    const interiorSection = $('#interior-section');
    const technologiesSection = $('#technologies-section');

    // warrantySection.remove()
    // exteriorSection.remove()
    // interiorSection.remove()
    // technologiesSection.remove()

    const modelTabSelectEl = $('#tab-select');

    const modelTabs = {
        design: designSection,
        warranty: warrantySection,
        exterior: exteriorSection,
        interior: interiorSection,
        technologies: technologiesSection,
    }

    const modelTabButtons = {
        design: $('.tab-button[data-tab="design"]'),
        warranty: $('.tab-button[data-tab="warranty"]'),
        exterior: $('.tab-button[data-tab="exterior"]'),
        interior: $('.tab-button[data-tab="interior"]'),
        technologies: $('.tab-button[data-tab="technologies"]'),
    }

    let currentTab = new Proxy({
        value: 'design',
    }, {
        set(target, p, newValue, receiver) {
            if (newValue === target.value) return true;

            // const currentTabEl = modelTabs[target.value];
            //
            // currentTabEl.replaceWith(modelTabs[newValue]);
            //
            // modelTabButtons[target.value].removeClass('active');
            // modelTabButtons[newValue].toggleClass('active');
            //
            // target.value = newValue;
            return true;
        }
    })

    modelTabSelectEl.on('change', function (e) {
        currentTab.value = e.target.value;
    });

    modelDesktopElement.on('click', function (e) {
        e.stopPropagation();
        const value = e.target.dataset.tab;

        if (value) {
            currentTab.value = value;
        }
    })

    const sideViewButton = $('#design-side-view');
    const frontViewButton = $('#design-front-view');

    const activeDesignView = new Proxy({
        value: 'side',
    }, {
        set(target, p, newValue, receiver) {
            if (newValue === target.value) return true;

            target.value = newValue;

            if (newValue === 'side') {
                sideViewButton.addClass('active')
                frontViewButton.removeClass('active')
            } else {
                sideViewButton.removeClass('active')
                frontViewButton.addClass('active')
            }

            return true;
        }
    })

    sideViewButton.on('click', function () {
        activeDesignView.value = 'side';
    })

    frontViewButton.on('click', function () {
        activeDesignView.value = 'front';
    })

    const colorButtons = {
        white: $('.color-button[data-color="white"]'),
        beige: $('.color-button[data-color="beige"]'),
        black: $('.color-button[data-color="black"]'),
        gray: $('.color-button[data-color="gray"]'),
    }

    const activeDesignColor = new Proxy({
        value: 'white',
    }, {
        set(target, p, newValue, receiver) {
            if (newValue === target.value) return true;

            colorButtons[target.value].removeClass('active');
            colorButtons[newValue].addClass('active');

            target.value = newValue;
            return true;
        }
    })

    $('#color-buttons').on('click', function (e) {
        e.stopPropagation();

        const value = e.target.dataset.color;

        if (!value) {
            return;
        }

        activeDesignColor.value = value;
    })
});
