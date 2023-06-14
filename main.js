let form = document.getElementById("my-form");
let items = document.getElementById("itemsul");
let details = [];

form.addEventListener('submit', addUsers);

axios.get("https://crudcrud.com/api/b719015445ee4735998344ad9fae424e/appointmentDetails")
    .then(response => {
        details = response.data;
        //console.log(details)
        displayInfo();
    })
    .catch(err => {
        //console.log("Something went wrong:", err);
        document.body.innerHTML="<h4>Something went wrong</h4>"
    });

function displayInfo() {
    items.innerHTML = "";
    details.forEach(user => {
        let li = document.createElement('li');
        li.className = "item";
        li.innerHTML = `${user.name}-${user.phno}-${user.email}<button class="editbtn" id="edit">Edit</button><button class="delbtn" id="del">Delete</button>`;
        items.appendChild(li);
    });
}

function addUsers(e) {
    e.preventDefault();
    let username = document.getElementById("name").value;
    let userphno = document.getElementById("phno").value;
    let useremail = document.getElementById("email").value;

    let userDetails = {
        "name": username,
        "phno": userphno,
        "email": useremail
    };

    axios.post("https://crudcrud.com/api/b719015445ee4735998344ad9fae424e/appointmentDetails", userDetails)
        .then(response => {
            details.push(userDetails);
            displayInfo();
            form.reset();
        })
        .catch(err => {
            //console.log("Something went wrong:", err);
             document.body.innerHTML="<h4>Something went wrong</h4>"
        });
}
