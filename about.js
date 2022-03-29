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