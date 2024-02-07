import {
    getAuth, createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";



const auth = getAuth();


var passwordElement = document.getElementById('password');
var weakPassword = document.getElementById('weakPassword');
var averagePassword = document.getElementById('averagePassword');
var strongPassword = document.getElementById('strongPassword');
var emptyError = document.getElementById('emptyError');
var lengthError = document.getElementById('lengthError');
var spaceError = document.getElementById('spaceError');
var maxLengthError = document.getElementById('maxLengthError');
var minUsernameError = document.getElementById('minUsernameError');
var usernameOnlyNumError = document.getElementById('usernameOnlyNumError');
var usernameSpecialCharError = document.getElementById('usernameSpecialCharError');

var passwordType = [];
var usernameType = '';

 document.getElementById("signupBtn").addEventListener("click",(e)=>{
    e.preventDefault()
    var username = document.getElementById('username').value.trim();
    var usernameElement = document.getElementById('username');
    var email = document.getElementById('email').value.trim();
    var emailElement = document.getElementById('email');
    var password = document.getElementById('password').value;
    var passwordElement = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword').value
    var confirmPasswordElement = document.getElementById('confirmPassword');
    var alreadyExsistError = document.getElementById('alreadyExsistError');
    var signedupSuccess = document.getElementById('signedupSuccess');
    var emailError = document.getElementById('emailError');
    var confirmPasswordError = document.getElementById('confirmPasswordError');
    var errorCheck = false;

    emptyError.classList.add('error');
    lengthError.classList.add('error');
    emailError.classList.add('error');
    confirmPasswordError.classList.add('error');
    alreadyExsistError.classList.add('error');
    signedupSuccess.classList.add('error');
    spaceError.classList.add('error');
    maxLengthError.classList.add('error');
    minUsernameError.classList.add('error');
    usernameOnlyNumError.classList.add('error');
    usernameSpecialCharError.classList.add('error');

    if (!username || !password || !email || !confirmPassword) {
        errorCheck = true;
        emptyError.classList.remove('error');
        return
    } else if (username.length < 3) {
        errorCheck = true;
        minUsernameError.classList.remove('error');
        return
    }
    else if (email.length > 40 || password.length > 20 || username.length > 20) {
        errorCheck = true;
        maxLengthError.classList.remove('error');
        return
    }
    else if (password.length < 7) {
        errorCheck = true;
        lengthError.classList.remove('error');
        return
    } else if (!email.includes("@") || !email.includes(".") || email.includes(' ') || email.length < 5) {
        errorCheck = true;
        emailError.classList.remove('error');
        return
    } else if (password.includes(' ')) {
        errorCheck = true;
        spaceError.classList.remove('error')
        return
    }
    else if (password != confirmPassword) {
        errorCheck = true;
        confirmPasswordError.classList.remove('error');
        return
    }

    var usernameArray = username.split('');
    usernameType = '';
    usernameArray.filter(function (element) {
        if ((element >= 'a' && element <= 'z') || (element >= 'A' && element <= 'Z')) {
            if (usernameType.includes('alpha')) {
            } else {
                usernameType += 'alpha'
            }
        }
        else if ((element >= '0' && element <= '9')) {
            if (usernameType.includes('num')) {
            } else {
                usernameType += 'num';
            }
        }
        else {
            if (usernameType.includes('sym')) {
            } else {
                usernameType += 'sym';
            }
        }
    })

    if (usernameType == 'num') {
        errorCheck = true;
        usernameOnlyNumError.classList.remove('error');
    } else if (usernameType.includes('sym')) {
        errorCheck = true;
        usernameSpecialCharError.classList.remove('error');
    }
    // var alreadyExsist = false;
    if (errorCheck == false) {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("Log In Successful", user)
                signedupSuccess.classList.remove('error');
                swal("Signup Successfully", "Now you can Log In Expense Management System", "success");
                weakPassword.classList.add('error');
                averagePassword.classList.add('error');
                strongPassword.classList.add('error');
                usernameElement.value = ''
                emailElement.value = ''
                passwordElement.value = ''
                confirmPasswordElement.value = ''
                setTimeout(function () {
                    window.location.href = "../dashboard/dashboard.html";
                }, 2000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                swal("Signup Failed", `${errorMessage}`, "error");
                weakPassword.classList.add('error');
                averagePassword.classList.add('error');
                strongPassword.classList.add('error');
                usernameElement.value = ''
                emailElement.value = ''
                passwordElement.value = ''
                confirmPasswordElement.value = ''


            });


    }
})



//Check whether the entered password is weak,average or strong, call when user go from password field

function checkPasswordType() {
    console.log("sad")
    weakPassword.classList.add('error');
    averagePassword.classList.add('error');
    strongPassword.classList.add('error');
    var password = document.getElementById('password').value;
    if (password.length < 7 || password.includes(' ') || !password || !emptyError.classList == 'error' || !lengthError.classList == 'error' || !spaceError.classList == 'error') {
        return
    } else {
        var passwordArray = password.split('');
        passwordType = [];
        passwordArray.filter(function (element) {
            if ((element >= 'a' && element <= 'z') || (element >= 'A' && element <= 'Z')) {
                if (passwordType.includes('alpha')) {
                } else {
                    passwordType.push('alpha');
                }
            }
            else if ((element >= '0' && element <= '9')) {
                if (passwordType.includes('num')) {
                } else {
                    passwordType.push('num');
                }
            }
            else {
                if (passwordType.includes('sym')) {
                } else {
                    passwordType.push('sym');
                }
            }
        })
    }

    if (passwordType.includes('num') && passwordType.includes('alpha') && passwordType.includes('sym')) {
        strongPassword.classList.remove('error');
    } else if ((passwordType.includes('num') && passwordType.includes('alpha')) || (passwordType.includes('num') && passwordType.includes('sym')) || (passwordType.includes('sym') && passwordType.includes('alpha'))) {
        averagePassword.classList.remove('error');
    } else {
        weakPassword.classList.remove('error');
    }
}

// Blur Event Listener on Password Field, triggered when you go from Password Input Field

passwordElement.addEventListener('input', function (e) {
    e.preventDefault();
    checkPasswordType();
})

// Click Event Listener on Sign Up Button