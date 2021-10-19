const sweetAlert = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
};

const auth = firebase.auth();


function signIn() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      sweetAlert("success", "Đăng nhập thành công")
      open("./project.html", "_self")
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      sweetAlert("error", errorMessage)
    });
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