let form = document.getElementById("my-form");
let items = document.getElementById("itemsul");
let details = [];

form.addEventListener('submit', addUsers);

axios.get("https://crudcrud.com/api/caf4b41a6c6e4d57a00cf79803d058ad/appointmentDetails")
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
        li.innerHTML = `${user.name}-${user.phno}-${user.email}<button class="editbtn" id="edit" onclick="editUser('${user._id}')">Edit</button><button class="delbtn" id="del" onclick="deleteUser('${user._id}')">Delete</button>`;
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

    axios.post("https://crudcrud.com/api/caf4b41a6c6e4d57a00cf79803d058ad/appointmentDetails", userDetails)
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
    axios.delete(`https://crudcrud.com/api/caf4b41a6c6e4d57a00cf79803d058ad/appointmentDetails/${userId}`)
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
function editUser(userId){
    axios.get(`https://crudcrud.com/api/caf4b41a6c6e4d57a00cf79803d058ad/appointmentDetails/${userId}`)
        .then(response=>{
            for (let i = 0; i < details.length; i++) {
                if (details[i]._id === userId) {
                    document.getElementById("name").value=details[i].name;
                    document.getElementById("phno").value=details[i].phno;
                    document.getElementById("email").value=details[i].email;
                    deleteUser(userId)
                }
              }
            displayInfo();
        })
    
}