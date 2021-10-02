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
  const firebaseConfig = {
    apiKey: "AIzaSyD7oZbReYJne-XsDcfO9ha5N3q4VC71eV4",
    authDomain: "project-17993.firebaseapp.com",
    projectId: "project-17993",
    storageBucket: "project-17993.appspot.com",
    messagingSenderId: "80591307234",
    appId: "1:80591307234:web:bee455b9588945af7939bb",
    measurementId: "G-LK78LTNV0D"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth =  firebase.auth();


function  signIn(){
    var email = document.getElementById("email").value;
    var password  = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    sweetAlert("success","Đăng nhập thành công")
    open("./project.html", "_self")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    sweetAlert("error", errorMessage)
  });
  }