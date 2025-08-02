if (document.querySelector(".slider-playground")) {
    const swiper = new Swiper(".slider-playground", {
        slidesPerView: "auto",
        spaceBetween: 10,
        loop: true,
        speed: 1800,
        autoplay: {
            delay: 700,
            disableOnInteraction: false,
        },
        navigation: {
            clickable: true,
            nextEl: ".navigation-next-playground",
            prevEl: ".navigation-prev-playground",
        },
        pagination: {
            el: ".pagination-playground",
            clickable: true,
        },
    });

    swiper.autoplay.stop();
    const sliderElement = document.querySelector(".slider-playground");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, {
            threshold: 0.5,
        }
    );
    observer.observe(sliderElement);

    sliderElement.addEventListener("mouseenter", () => {
        swiper.autoplay.stop();
    });
    sliderElement.addEventListener("mouseleave", () => {
        swiper.autoplay.start();
    });
}

if (document.querySelector(".slider-tech-stack")) {
    const swiper = new Swiper(".slider-tech-stack", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".pagination-tech-stack",
            type: "progressbar"
        },
        breakpoints: {
            768: {
                slidesPerView: 1.5,
                spaceBetween: 0,
            },
            991: {
                slidesPerView: 1.775,
                spaceBetween: 0,
            },
        },
    });

    swiper.autoplay.stop();
    const sliderElement = document.querySelector(".slider-tech-stack");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, {
            threshold: 0.5,
        }
    );
    observer.observe(sliderElement);

    sliderElement.addEventListener("mouseenter", () => {
        swiper.autoplay.stop();
    });
    sliderElement.addEventListener("mouseleave", () => {
        swiper.autoplay.start();
    });
}

if (document.querySelector(".slider-tech-stack1")) {
    const swiper = new Swiper(".slider-tech-stack1", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".pagination-tech-stack1",
            type: "progressbar"
        },
        breakpoints: {
            768: {
                slidesPerView: 1.5,
            },
            991: {
                slidesPerView: 1.775,
            },
        },
    });

    swiper.autoplay.stop();
    const sliderElement = document.querySelector(".slider-tech-stack1");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, {
            threshold: 0.5,
        }
    );
    observer.observe(sliderElement);

    sliderElement.addEventListener("mouseenter", () => {
        swiper.autoplay.stop();
    });
    sliderElement.addEventListener("mouseleave", () => {
        swiper.autoplay.start();
    });
}

if (".section-testimonial".length > 0) {
    var swiper1 = new Swiper(".slider-testimonial", {
        slidesPerView: 1,
        spaceBetween: 15,
        speed: 1500,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        navigation: {
            clickable: true,
            nextEl: ".navigation-next-testimonial",
            prevEl: ".navigation-prev-testimonial",
        },
        pagination: {
            el: ".pagination-testimonial",
            type: "fraction"
        },
        thumbs: {
            swiper: swiper2,
        },
    });

    var swiper2 = new Swiper(".slider-customer", {
        spaceBetween: 0,
        speed: 1500,
    });

    swiper1.on("slideChange", function() {
        swiper2.slideTo(this.activeIndex);
    });

    swiper2.on("slideChange", function() {
        swiper1.slideTo(this.activeIndex);
    });

    $(".slider-testimonial").on("mouseenter", function() {
        this.swiper.autoplay.stop();
    }).on("mouseleave", function() {
        this.swiper.autoplay.start();
    });


}

if (document.querySelector(".slider-partners")) {
    const swiper = new Swiper(".slider-partners", {
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 700,
            disableOnInteraction: false,
        },
    });

    swiper.autoplay.stop();
    const sliderElement = document.querySelector(".slider-partners");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, {
            threshold: 0.5,
        }
    );
    observer.observe(sliderElement);

    sliderElement.addEventListener("mouseenter", () => {
        swiper.autoplay.stop();
    });
    sliderElement.addEventListener("mouseleave", () => {
        swiper.autoplay.start();
    });
}

if (document.querySelector(".slider-partners2")) {
    const swiper = new Swiper(".slider-partners2", {
        slidesPerView: "auto",
        spaceBetween: 16,
        loop: true,
        speed: 3000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
    });

    swiper.autoplay.stop();
    const sliderElement = document.querySelector(".slider-partners2");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, {
            threshold: 0.5,
        }
    );
    observer.observe(sliderElement);

    sliderElement.addEventListener("mouseenter", () => {
        swiper.autoplay.stop();
    });
    sliderElement.addEventListener("mouseleave", () => {
        swiper.autoplay.start();
    });
}

if (document.querySelector(".slider-process")) {
    const swiper = new Swiper(".slider-process", {
        slidesPerView: 1.165,
        spaceBetween: 16,
        loop: true,
        speed: 1700,
        autoplay: {
            delay: 1200,
            disableOnInteraction: false,
        },
    });

    swiper.autoplay.stop();
    const sliderElement = document.querySelector(".slider-process");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, {
            threshold: 0.5,
        }
    );
    observer.observe(sliderElement);

    sliderElement.addEventListener("mouseenter", () => {
        swiper.autoplay.stop();
    });
    sliderElement.addEventListener("mouseleave", () => {
        swiper.autoplay.start();
    });
}

if (document.querySelector(".slider-process1")) {
    const swiper = new Swiper(".slider-process1", {
        effect: "cards",
        grabCursor: true,
        direction: "vertical",
        speed: 800,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        cardsEffect: {
            perSlideOffset: 11.2,
        },
        on: {
            setTranslate: function() {
                this.slides.forEach((slide) => {
                    let transform = slide.style.transform;
                    if (transform.includes("rotateZ")) {
                        transform = transform.replace(
                            /rotateZ\([^)]+\)/,
                            "rotateZ(0deg)"
                        );
                    } else {
                        transform += " rotateZ(0deg)";
                    }
                    slide.style.transform = transform;
                });
            },
            init: function() {
                if (this.slides[0]) {
                    this.slides[0].classList.add("swiper-slide-thumb-active");
                    this.slides[0].classList.add("swiper-slide-fully-visible");
                }
            },
            transitionStart: function() {
                this.slides.forEach((slide) => {
                    slide.classList.remove("swiper-slide-thumb-active");
                    slide.classList.remove("swiper-slide-fully-visible");
                });
            },
            transitionEnd: function() {
                if (this.slides[this.activeIndex]) {
                    this.slides[this.activeIndex].classList.add(
                        "swiper-slide-thumb-active"
                    );
                    this.slides[this.activeIndex].classList.add(
                        "swiper-slide-fully-visible"
                    );
                }
            },
        },
    });

    swiper.autoplay.stop();
    const sliderElement = document.querySelector(".slider-process1");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, {
            threshold: 0.5,
        }
    );
    observer.observe(sliderElement);

    sliderElement.addEventListener("mouseenter", () => {
        swiper.autoplay.stop();
    });
    sliderElement.addEventListener("mouseleave", () => {
        swiper.autoplay.start();
    });
}