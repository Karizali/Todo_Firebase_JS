import {
    getAuth,signInWithPopup, GoogleAuthProvider   
  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
  
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  
  const auth = getAuth();
  document.getElementById("googleLogIn").addEventListener("click", (e) => {
      e.preventDefault();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          swal("Signup Successfully", "Now you can Log In Expense Management System", "success");
                setTimeout(function () {
                    window.location.href = "../dashboard/dashboard.html";
                }, 2000);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          swal("Login Failed", `${errorMessage}`, "error");
          // ...
        });
  });