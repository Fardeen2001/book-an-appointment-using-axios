let form = document.getElementById("my-form");
let items = document.getElementById("itemsul");
let details = [];

form.addEventListener('submit', addUsers);

axios.get("https://crudcrud.com/api/3d077a42c1a94a2c8ff09363efddb103/appointmentDetails")
    .then(response => {
        details = response.data;
        displayInfo();
    })
    .catch(err => {
        console.log("Something went wrong:", err);
        // document.body.innerHTML="<h4>Something went wrong</h4>"
    });

function displayInfo() {
    items.innerHTML = "";
    details.forEach(user => {
        let li = document.createElement('li');
        li.className = "item";
        li.innerHTML = `${user.name}-${user.phno}-${user.email}<button class="editbtn" id="edit">Edit</button><button class="delbtn" id="del" onclick="deleteUser('${user._id}')">Delete</button>`;
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

    axios.post("https://crudcrud.com/api/3d077a42c1a94a2c8ff09363efddb103/appointmentDetails", userDetails)
        .then(response => {
            userDetails._id = response.data._id;
            details.push(userDetails);
            displayInfo();
            form.reset();
        })
        .catch(err => {
            console.log("Something went wrong:", err);
             document.body.innerHTML="<h4>Something went wrong</h4>"
        });
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/3d077a42c1a94a2c8ff09363efddb103/appointmentDetails/${userId}`)
        .then(response => {
            for (let i = 0; i < details.length; i++) {
                if (details[i]._id === userId) {
                  details.splice(i, 1);
                  break;
                }
              }
            displayInfo();
        })
        .catch(err => {
            //console.log("Something went wrong:", err);
             document.body.innerHTML="<h4>Something went wrong</h4>"
        });
}
