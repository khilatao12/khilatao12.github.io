const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }

}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});
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