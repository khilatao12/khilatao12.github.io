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


function signUp() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (password.length < 8) {
    sweetAlert("error", "Mật khẩu phải có 8 kí tự")
  }
else{
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
      sweetAlert("success", "Đăng kí thành công")
      open("./login.html", "_self")
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      sweetAlert("error", errorMessage)
    });}
}