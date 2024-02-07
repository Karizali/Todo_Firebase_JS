import {
    getAuth, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { collection, addDoc, getFirestore, onSnapshot, query, doc,getDocs, } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


const auth = getAuth();
const db = getFirestore();
let uid;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        uid = user.uid;
        display()
    } else {
        // User is signed out
        // ...
    }
});





// Getting Elements from HTML using DOM
var titleError = document.getElementById('titleError');
var emptyError = document.getElementById('emptyError');
var descError = document.getElementById('descError');
var addBtn = document.getElementById('addBtn');
var mainItems = document.getElementById('mainItems');
var deleteAllItemsOfAUserBtn = document.getElementById('deleteAllItemsOfAUserBtn');

// Getting Data from Local Storage
var currentUserId = JSON.parse(localStorage.getItem('currentUserDetails')).userId;
var localStorageValues = JSON.parse(localStorage.getItem('todoItems'));

var todoItems = [];
var allDeleteIcons;

// Main Function in which Validation, Adding data, Deleting data, Displaying Items is done.

function addTask() {
    localStorageValues = JSON.parse(localStorage.getItem("todoItems"));
    var title = document.getElementById('title').value.trim();
    var titleElement = document.getElementById('title');
    var description = document.getElementById('description').value.trim();
    var descriptionElement = document.getElementById('description');
    var priority = document.getElementById('priority').value;
    var errorCheck = false;
    var todoId = 5000;

    emptyError.classList.add('error');
    titleError.classList.add('error');
    descError.classList.add('error');

    if (!title || !description) {
        errorCheck = true;
        emptyError.textContent = "Title or Description not be Empty"
        emptyError.classList.remove('error');
        return
    } else if (title.length < 3) {
        errorCheck = true;
        titleError.textContent = "Title must be greater than or equal to 3 letters."
        titleError.classList.remove('error');
        return
    } else if (title.length > 20) {
        errorCheck = true;
        titleError.textContent = "Title does not exceed from 20 letters."
        titleError.classList.remove('error');
        return
    } else if (description.length < 10) {
        errorCheck = true;
        descError.textContent = "Description must be greater than or equal to 10 letters."
        descError.classList.remove('error');
        return
    } else if (description.length > 500) {
        errorCheck = true;
        descError.textContent = "Description does not exceed from 500 letters."
        descError.classList.remove('error');
        return
    }

    if (errorCheck == false) {

        try {
            (async () => {
                const docRef = await addDoc(collection(db, "Items"), {
                    uid,
                    title,
                    description,
                    priority
                });
                new swal("Todo Item add Successfully", "Your Todo Item is added in your Todo list", "success");
                titleElement.value = '';
                descriptionElement.value = '';
                mainItems.textContent = "";
                display();
                console.log("Document written with ID: ", docRef.id);
            })()

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

// To Render Items On screen
let todoList=[]
function display() {
    let p=new Promise((resolve,reject)=>{
        (async()=>{const querySnapshot = await getDocs(collection(db, "Items"));
    querySnapshot.forEach(async(doc) => {
        let doci=await doc.data();
        todoList.push(doci)
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        console.log(`${todoList}`);
        resolve()
    });})()
    });
    
    p.then(()=>{
        if (todoList.length == 0) {
            mainItems.textContent = "No Item To Show";
        } else {
            mainItems.textContent = "";
            var showItems = todoList.filter(function (element) {
                if (element.uid == uid)
                    return element
            });
            console.log(showItems)
            showItems.forEach(function (e) {
                var todoItem = document.createElement('div');
                todoItem.setAttribute('class', 'todoItem');
                todoItem.classList = "col-md-3 col-sm-4 todoItem"
    
                var title = document.createElement('div');
                title.textContent = "Title : " + e.title;
                title.setAttribute('class', 'title');
                todoItem.appendChild(title);
    
                var desc = document.createElement('div');
                desc.textContent = "Description : " + e.description;
                desc.setAttribute('class', 'desc');
                todoItem.appendChild(desc);
    
                var prio = document.createElement('div');
                prio.textContent = "Priority : " + e.priority;
                prio.setAttribute('class', 'prio');
                todoItem.appendChild(prio);
    
                var options = document.createElement('div');
                options.setAttribute('class', 'options');
                todoItem.appendChild(options);
    
                var edit = document.createElement('i');
                edit.classList = "fa-solid fa-pen edit";
                edit.setAttribute('id', `${e.todoId}`);
                options.appendChild(edit);
    
                var del = document.createElement('i');
                del.classList = "fa-solid fa-trash del"
                del.setAttribute('id', `${e.todoId}`);
                options.appendChild(del);
    
                mainItems.appendChild(todoItem);
            });
            allDeleteIcons = Array.from(document.getElementsByClassName('del'));
            del()
            return;
        }
    })
    
}

// To Delete Item from the DataBase

function del() {
    if (!allDeleteIcons || allDeleteIcons.length == 0) {
        mainItems.textContent = "No Item To Show";
    } else {
        allDeleteIcons.forEach(function (element) {
            element.addEventListener('click', function (e) {
                var forDelete = e.target.id;
                Swal.fire({
                    title: 'Confirm to Delete?',
                    text: "It will permanently deleted !, Your Todo Item will not recover again.",
                    type: 'warning',
                    icon: "warning",
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Yes, delete it!',
                    showCancelButton: true,
                }).then(function (result) {
                    if (result.isConfirmed) {
                        var indexForDelete;
                        localStorageValues.filter(function (innerElement, index) {
                            if (innerElement.todoId == forDelete) {
                                indexForDelete = index;
                            }
                        })
                        localStorageValues.splice(indexForDelete, 1);
                        localStorage.setItem("todoItems", JSON.stringify(localStorageValues));
                        new swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        display();
                    }
                })
            })
        })
    }
}

function deleteAllItemsOfAUser() {
    localStorageValues = JSON.parse(localStorage.getItem('todoItems'));
    Swal.fire({
        title: 'Confirm to Delete All Items?',
        text: "It will permanently deleted !, Your Todo Item will not recover again.",
        type: 'warning',
        icon: "warning",
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, delete it!',
        showCancelButton: true,
    }).then(function (result) {
        if (result.isConfirmed) {
            // db.collection("Items").delete() 
            display();
        }
    })
}

document.getElementById("logOutBtn").addEventListener("click", () => {

    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = '../index.html';
    }).catch((error) => {
        // An error happened.
        console.log(error.message)
    });

})

deleteAllItemsOfAUserBtn.addEventListener('click', function (event) {
    event.preventDefault();
    deleteAllItemsOfAUser();
})

// Event Listener on Add Button

addBtn.addEventListener('click', function (event) {
    event.preventDefault();
    addTask();
})