var typed = new Typed(".typing", {
    strings: ["..."],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});
$(document).ready(function () {
    $(window).scroll(function () {
        $('.object').each(function (i) {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {
                $(this).addClass('showme');
            }
            if (bottom_of_window < bottom_of_object) {
                $(this).removeClass('showme');
            }
        });
    });
});