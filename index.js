let username = document.getElementById('username')
let email =  document.getElementById('email')
let phone = document.getElementById('phone')
let adduser = document.getElementById('adduser')
let deletealluser = document.getElementById('deletealluser')

adduser.addEventListener('click', (e) => {
    e.preventDefault();
    
    usernameVal = username.value;
    emailVal = email.value;
    phoneVal = phone.value;

    if(usernameVal.trim()!=0 && emailVal.trim()!=0 && phoneVal.trim()!=0) {
        let localStore = localStorage.getItem('localTask')
        if(localStore == null) {
            userObj = [];
        } else {
            userObj = JSON.parse(localStore)
        }
        userObj.push({
            username : usernameVal,
            email : emailVal, 
            phone : phoneVal
        })
        localStorage.setItem('localTask', JSON.stringify(userObj))
        username.value = ''
        email.value = ''
        phone.value = ''
    }
    listUser();
})

function listUser() {
    let localStore = localStorage.getItem('localTask')
    if(localStore == null) {
        userObj = [];
    } else {
        userObj = JSON.parse(localStore)
    }

    let users = ''
    let adduserlist = document.getElementById('adduserlist')
    userObj.forEach((user, index) => {
        users += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td class="text-center"><i class="fas fa-user-edit" onclick="editUser(${index})"></i></td>
                <td class="text-center"><i class="fas fa-trash" onclick="deleteUser(${index})"></i></td>
            </tr>
        `
    })
    adduserlist.innerHTML = users
}
listUser();

function editUser(index) {
    let saveusernameindex = document.getElementById('saveusernameindex')
    let saveemailindex = document.getElementById('saveemailindex')
    let savephoneindex = document.getElementById('savephoneindex')

    saveusernameindex.value = index
    saveemailindex.value = index
    savephoneindex.value = index

    let localStore = localStorage.getItem('localTask')
    let userObj = JSON.parse(localStore)

    username.value = userObj[index].username
    email.value = userObj[index].email
    phone.value = userObj[index].phone
}

let updateuser = document.getElementById('updateuser')
updateuser.addEventListener('click', () => {
    let localStore = localStorage.getItem('localTask')
    let userObj = JSON.parse(localStore)

    let saveusernameindex = document.getElementById('saveusernameindex').value
    let saveemailindex = document.getElementById('saveemailindex').value
    let savephoneindex = document.getElementById('savephoneindex').value

    userObj[saveusernameindex].username = username.value;
    userObj[saveemailindex].email = email.value;
    userObj[savephoneindex].phone = phone.value;

    localStorage.setItem('localTask', JSON.stringify(userObj))

    username.value = ''
    email.value = ''
    phone.value = ''
    
    listUser()
})

function deleteUser(index) {
    let localStore = localStorage.getItem('localTask')
    let userObj = JSON.parse(localStore)
    userObj.splice(index, 1)
    localStorage.setItem('localTask', JSON.stringify(userObj))
    listUser()
}

deletealluser.addEventListener('click', () => {
    let localStore = localStorage.getItem('localTask')
    let userObj = JSON.parse(localStore)
    if(localStore == null) {
        userObj = [];
    } else {
        userObj = JSON.parse(localStore)
        userObj = [];
    }
    localStorage.setItem('localTask', JSON.stringify(userObj))
    listUser()
})