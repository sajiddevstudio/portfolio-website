function isElementInViewport($el) {
    var top = $el.offset().top;
    var bottom = top + $el.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return bottom > viewportTop && top < viewportBottom;
}
if ($(".counter-scroll").length > 0) {
    $(window).on("scroll", function() {
        $(".wg-counter").each(function() {
            var $counter = $(this);
            if (isElementInViewport($counter) && !$counter.hasClass("counted")) {
                $counter.addClass("counted");
                var targetNumber = $counter.find(".odometer").data("number");
                setTimeout(function() {
                    $counter.find(".odometer").text(targetNumber);
                }, 0);
            }
        });
    });
}