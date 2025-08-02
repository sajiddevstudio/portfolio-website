gsap.registerPlugin(ScrollTrigger);
(function($) {
    ("use strict");

    /* animation_text
  -------------------------------------------------------------------------*/
    const animationText = () => {
        const splitTextElements = document.querySelectorAll(".split-text");
        if (!splitTextElements.length) return;
        gsap.registerPlugin(SplitText);
        splitTextElements.forEach((el) => {
            const $el = $(el);
            const $target =
                $el.find("p, a").length > 0 ? $el.find("p, a")[0] : el;

            const pxlSplit = new SplitText($target, {
                type: "words, chars, lines",
                lineThreshold: 0.5,
                wordsClass: "word",
                linesClass: "split-line",
            });

            const gradientChars = $el.find(".text-gradient > .word > *");
            if (gradientChars.length) {
                let offset = 0;
                gradientChars.each((i, char) => {
                    const $char = $(char);
                    const parent = $char.parent();
                    const parentWidth = parent.outerWidth();

                    $char.css("background-size", `${parentWidth}px 100%`);
                    offset += $char.prev().outerWidth() || 0;
                    $char.css(
                        "background-position",
                        `${parentWidth - offset}px 0%`
                    );
                });
            }

            let splitTypeSet = pxlSplit.chars;
            gsap.set($target, {
                perspective: 400
            });

            const settings = {
                scrollTrigger: {
                    trigger: $target,
                    start: "top 86%",
                    toggleActions: "play none none reset",
                    fastScrollEnd: true,
                    once: true,
                },
                duration: 0.9,
                stagger: 0.02,
                ease: "power3.out",
            };

            const hasClass = (className) => $el.hasClass(className);

            if (hasClass("effect-fade")) settings.opacity = 0;
            if (hasClass("effect-right")) {
                settings.opacity = 0;
                settings.x = "50";
            }
            if (hasClass("effect-left")) {
                settings.opacity = 0;
                settings.x = "-50";
            }
            if (hasClass("effect-up")) {
                settings.opacity = 0;
                settings.y = "80";
            }
            if (hasClass("effect-down")) {
                settings.opacity = 0;
                settings.y = "-80";
            }
            if (hasClass("effect-rotate")) {
                settings.opacity = 0;
                settings.rotateX = "50deg";
            }
            if (hasClass("effect-scale")) {
                settings.opacity = 0;
                settings.scale = "0.5";
            }

            if (
                hasClass("split-lines-transform") ||
                hasClass("split-lines-rotation-x")
            ) {
                pxlSplit.split({
                    type: "lines",
                    lineThreshold: 0.5,
                    linesClass: "split-line",
                });

                splitTypeSet = pxlSplit.lines;
                settings.opacity = 0;
                settings.stagger = 0.5;

                if (hasClass("split-lines-rotation-x")) {
                    settings.rotationX = -120;
                    settings.transformOrigin = "top center -50";
                } else {
                    settings.yPercent = 100;
                    settings.autoAlpha = 0;
                }
            }

            if (hasClass("split-words-scale")) {
                pxlSplit.split({
                    type: "words"
                });
                splitTypeSet = pxlSplit.words;

                splitTypeSet.forEach((elw, index) => {
                    gsap.set(
                        elw, {
                            opacity: 0,
                            scale: index % 2 === 0 ? 0 : 2,
                            force3D: true,
                            duration: 0.1,
                            ease: "power3.out",
                            stagger: 0.02,
                        },
                        index * 0.01
                    );
                });

                gsap.to(splitTypeSet, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 86%",
                    },
                    rotateX: "0",
                    scale: 1,
                    opacity: 1,
                });
            } else {
                gsap.from(splitTypeSet, settings);
            }
        });
    };

    /* scrolling_effect
  -------------------------------------------------------------------------*/
    var scrolling_effect = function() {
        if ($(".scrolling-effect").length > 0) {
            var st = $(".scrolling-effect");
            st.each(function(index, el) {
                var settings = {
                    scrollTrigger: {
                        trigger: el,
                        scrub: 3,
                        start: "30px bottom",
                        end: "bottom bottom",
                        delay: 3,
                        once: true,
                    },
                    duration: 0.9,
                    ease: "power3.out",
                };
                if ($(el).hasClass("effectRight")) {
                    settings.opacity = 0;
                    settings.x = "80";
                }
                if ($(el).hasClass("effectLeft")) {
                    settings.opacity = 0;
                    settings.x = "-80";
                }
                if ($(el).hasClass("effectBottom")) {
                    settings.opacity = 0;
                    settings.y = "100";
                }
                if ($(el).hasClass("effectTop")) {
                    settings.opacity = 0;
                    settings.y = "-80";
                }
                if ($(el).hasClass("effectZoomIn")) {
                    settings.opacity = 0;
                    settings.scale = 0.5;
                }
                gsap.from(el, settings);
            });
        }
    };

    /* scrollTransform
    -------------------------------------------------------------------------------------*/
    var scrollTransform = function() {
        const scrollTransformElements =
            document.querySelectorAll(".scroll-tranform");
        if (scrollTransformElements.length > 0) {
            scrollTransformElements.forEach(function(element) {
                const direction = element.dataset.direction || "up";
                const distance = element.dataset.distance || "10%";
                let animationProperty;
                switch (direction.toLowerCase()) {
                    case "left":
                        animationProperty = {
                            x: `-${distance}`
                        };
                        break;
                    case "right":
                        animationProperty = {
                            x: `${distance}`
                        };
                        break;
                    case "up":
                        animationProperty = {
                            y: `-${distance}`
                        };
                        break;
                    case "down":
                        animationProperty = {
                            y: `${distance}`
                        };
                        break;
                    default:
                        animationProperty = {
                            y: `-${distance}`
                        };
                }

                gsap.to(element, {
                    ...animationProperty,
                    scrollTrigger: {
                        trigger: element,
                        start: "top center",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            });
        }
    };

    /* animateImgScroll
    -------------------------------------------------------------------------------------*/
    const scrollBanners = () => {
        const bannerStripes = document.querySelectorAll(
            ".scroll-banners"
        );
        if (!bannerStripes.length) return;

        bannerStripes.forEach((element) => {
            const $element = $(element);

            const settings = {
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    markers: false,
                },
                ease: "none",
            };

            if (
                $element.hasClass("effect-left") ||
                $element.hasClass("effect-right")
            ) {
                settings.x = "-25%";
            }

            gsap.to(element, settings);
        });
    };

    // Dom Ready
    $(function() {
        scrollTransform();
        scrollBanners();
        scrolling_effect();
        animationText();
    });
})(jQuery);