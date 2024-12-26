const faqSwiper = new Swiper('.faqSwiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: '.faq-next',
        prevEl: '.faq-prev',
    },
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: 20
          },
        1044: {
            slidesPerView: 3,
            spaceBetween: 20
          },
    }
})