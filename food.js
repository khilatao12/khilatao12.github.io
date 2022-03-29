$(document).ready(function () {
    $(window).scroll(function () {

        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
    })
})
let progress = document.getElementById('progressbar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
}
$(document).ready(function () {
    $(window).scroll(function () {
        $('.two-columns-grid').each(function (i) {
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
$(document).ready(function () {
    $(window).scroll(function () {
        $('.grid-items').each(function (i) {
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
let setLi = async () => {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let log = document.querySelector("#account")
            log.innerHTML = `<a href="#" onclick="signOut()">SignOut</a>`

        } else {
            let log = document.querySelector("#account")
            log.innerHTML = `<a href="login.html">SignIn</a>`
        }
    }
    )
}
setLi()