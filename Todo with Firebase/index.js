import {
    getAuth, signInWithEmailAndPassword,onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";


const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    window.location.href = "./dashboard/dashboard.html";
    // ...
  } else {
    // User is signed out
    // ...
  }
});



document.getElementById("logInBtn").addEventListener("click", (e) => {

    e.preventDefault();
    
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var emailElement = document.getElementById('email');
    var passwordElement = document.getElementById('password');
    var userNotExsist = document.getElementById('userNotExsist');
    var wrongPasswordError = document.getElementById('wrongPasswordError');
    var loginSuccess = document.getElementById('loginSuccess');
    var emptyError = document.getElementById('emptyError');
    var emailError = document.getElementById('emailError');
    
    userNotExsist.classList.add('error');
    wrongPasswordError.classList.add('error');
    emptyError.classList.add('error');
    loginSuccess.classList.add('error');
    emailError.classList.add('error');


    if ((!email || !password)) {
        emptyError.classList.remove('error')
    } else if (email.includes(' ') || !email.includes('@') || !email.includes('.')) {
        emailError.classList.remove('error')
    }
    else {


        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                swal("Login Successfully", "Now you can use Expense Management System", "success");
                emailElement.value = '';
                passwordElement.value = '';
                setTimeout(function () {
                    window.location.href = "./dashboard/dashboard.html";
                }, 2000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                swal("Login Failed", `${errorMessage}`, "error");
            });
        
    }
})
