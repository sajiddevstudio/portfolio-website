/**
 *animateText
 *tabs
 *ajaxContactForm
 *ajaxSubscribe
 *canvas
 *infiniteSlide
 *stickyTabs
 *active_item
 *settings_color
 **/

(function($) {
    ("use strict");

    // animateText
    var animateText = function() {
        if ($(".text-color-change").length) {
            let animatedTextElements = document.querySelectorAll(".text-color-change");

            animatedTextElements.forEach((element) => {
                if (element.wordSplit) {
                    element.wordSplit.revert();
                }
                if (element.charSplit) {
                    element.charSplit.revert();
                }

                element.wordSplit = new SplitText(element, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });

                element.charSplit = new SplitText(element.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set(element.charSplit.chars, {
                    color: "#DDDDDD4D",
                    opacity: 1,
                });

                element.animation = gsap.to(element.charSplit.chars, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        end: "bottom 35%",
                        toggleActions: "play none none reverse",
                        scrub: true,
                    },
                    color: "#ffffff",
                    stagger: {
                        each: 0.05,
                        from: "start",
                    },
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        }
        if ($(".text-fade-right").length > 0) {
            let animatedTextElements = document.querySelectorAll(".text-fade-right");
            animatedTextElements.forEach((element) => {
                if (element.animation) {
                    element.animation.progress(1).kill();
                    element.split.revert();
                }

                element.split = new SplitText(element, {
                    type: "lines"
                });

                gsap.set(element, {
                    perspective: 400
                });

                gsap.set(element.split.lines, {
                    opacity: 0,
                    y: 30,
                });

                element.animation = gsap.to(element.split.lines, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play reverse play reverse",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "back",
                    stagger: {
                        amount: 0.1,
                        from: "start",
                        ease: "sine.inOut",
                    },
                });
            });
        }

        if ($(".text-anime-clip").length > 0) {
            const textElements = document.querySelectorAll(".text-anime-clip");

            textElements.forEach((textElement) => {
                gsap.fromTo(
                    textElement, {
                        clipPath: "inset(0 0 100% 0)"
                    }, {
                        clipPath: "inset(0 0 0 0)",
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: textElement,
                            start: "top 90%",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            });
        }
    };

    // tabs
    var tabs = function() {
        $(".wg-tabs").each(function() {
            $(this).find(".widget-content-tab").children().hide();
            $(this).find(".widget-content-tab").children(".active").show();
            $(this)
                .find(".menu-tab")
                .children(".item")
                .on("click", function() {
                    var liActive = $(this).index();
                    var contentActive = $(this)
                        .siblings()
                        .removeClass("active")
                        .parents(".wg-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive);
                    contentActive.addClass("active").fadeIn("slow");
                    contentActive.siblings().removeClass("active");
                    $(this)
                        .addClass("active")
                        .parents(".wg-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive)
                        .siblings()
                        .hide();
                });
        });
    };

    // contact form
    var ajaxContactForm = function() {
        $('#form-contact').each(function() {
            $(this).validate({
                submitHandler: function(form) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', {
                            'class': 'loading'
                        });

                    $.ajax({
                        type: "POST",
                        url: $form.attr('action'),
                        data: str,
                        beforeSend: function() {
                            $form.find('.send-wrap').append(loading);
                        },
                        success: function(msg) {
                            var result, cls;
                            if (msg === 'Success') {
                                result = 'Message Sent Successfully To Email Administrator';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text': result
                                }).append(
                                    $('<a class="close d-flex" href="#"><i class="icon icon-times-solid"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function(xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        });
    };

    // subscribe mailchimp
    var ajaxSubscribe = {
        obj: {
            subscribeEmail: $("#subscribe-email"),
            subscribeButton: $("#subscribe-button"),
            subscribeMsg: $("#subscribe-msg"),
            subscribeContent: $("#subscribe-content"),
            dataMailchimp: $("#subscribe-form").attr("data-mailchimp"),
            success_message: '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message: '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError: '<div class="notification_error">{msg}</div>',
            noticeInfo: '<div class="notification_error">{msg}</div>',
            basicAction: "asset/mail/subscribe.php",
            mailChimpAction: "asset/mail/subscribe-mailchimp.php",
        },

        eventLoad: function() {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on("click", function() {
                if (window.ajaxCalling) return;
                var isMailchimp = objUse.dataMailchimp === "true";

                if (isMailchimp) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function(action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html("").hide();
            $.ajax({
                url: action,
                type: "POST",
                dataType: "json",
                data: {
                    subscribeEmail: objUse.subscribeEmail.val(),
                },
                success: function(responseData, textStatus, jqXHR) {
                    if (responseData.status) {
                        objUse.subscribeContent.fadeOut(500, function() {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(
                                    objUse.noticeError.replace("{msg}", "Error! <strong>Email is required.</strong>")
                                );
                                break;
                            case "email-err":
                                messageDiv.html(
                                    objUse.noticeError.replace("{msg}", "Error! <strong>Email invalid.</strong>")
                                );
                                break;
                            case "duplicate":
                                messageDiv.html(
                                    objUse.noticeError.replace("{msg}", "Error! <strong>Email is duplicate.</strong>")
                                );
                                break;
                            case "filewrite":
                                messageDiv.html(
                                    objUse.noticeInfo.replace(
                                        "{msg}",
                                        "Error! <strong>Mail list file is open.</strong>"
                                    )
                                );
                                break;
                            case "undefined":
                                messageDiv.html(
                                    objUse.noticeInfo.replace("{msg}", "Error! <strong>undefined error.</strong>")
                                );
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function() {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Connection error");
                },
                complete: function(data) {
                    window.ajaxCalling = false;
                },
            });
        },
    };

    // canvas
    var canvas = function() {
        $(".tf-btn-menu").on("click", function() {
            $(".tf-sidebar-menu").addClass("active");
        });
        $(".btn-setting-color").on("click", function() {
            $(".tf-setting-color").addClass("active");
        });

        $(".close-canvas").on("click", function() {
            $(this).closest('.tf-canvas').removeClass("active");
        });
        $(".overlay").on("click", function() {
            $(this).closest('.tf-canvas').removeClass("active");
        });

        $(".tf-sidebar-menu .sidebar-nav a").on("click", function() {
            $(this).closest('.tf-canvas').removeClass("active");
        });
    }

    // infiniteSlide
    var infiniteSlide = function() {
        $(".infiniteslide").each(function() {
            var $this = $(this);
            var style = $this.data("style") || "left";
            var clone = parseInt($this.data("clone"), 10) || 2;
            var speed = parseInt($this.data("speed"), 10) || 100;

            $this.infiniteslide({
                speed: speed,
                direction: style,
                clone: clone,
            });
        });
    };

    // stickyTabs
    var stickyTabs = function() {
        let sectionIds = $('a.scroll-to');
        $(document).scroll(function() {
            sectionIds.each(function() {
                let container = $(this).attr('href');
                let containerOffset = $(container).offset().top;
                let containerHeight = $(container).outerHeight();
                let containerBottom = containerOffset + containerHeight;
                let scrollPosition = $(document).scrollTop();
                if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        });
    }

    // active_item
    var active_item = function() {
        $(".choose-item").on("click", function() {
            $(this).closest(".list-choose").find(".choose-item").removeClass("active");
            $(this).addClass("active");
        });
    }

    // settings_color
    var settings_color = function() {
        $(".settings-color a").on("click", function() {
            var index = $(this).index() + 1;
            $("body").attr("data-color-primary", "color-primary-" + index);
        })
    }

    // Dom Ready
    $(function() {
        animateText();
        tabs();
        ajaxContactForm();
        ajaxSubscribe.eventLoad();
        canvas();
        infiniteSlide();
        stickyTabs();
        active_item();
        settings_color();
    });
})(jQuery);