
const listForm = document.getElementById('listForm');
const nameInput = document.getElementById('name');
const selectInput = document.getElementById('select');
const searchBox = document.getElementById('searchBox');
const userList = document.getElementById('userList');

//Vendosja e user list ne page load nga LocalStorage
window.addEventListener('load', function(){
    const savedUserList = JSON.parse(this.localStorage.getItem('userList')) || [];
    savedUserList.forEach((user) => {
        addUserToUserList(user.name, user.select);
    });
});
 

listForm.addEventListener('submit', function (event) {
    event.preventDefault();

    //Marrja e vlerave 
    const name = nameInput.value.trim();
    const select = selectInput.value; 

     //Kushti per vendosjen e emrit
     if( name.length < 2){
        alert('Name must contain at least 2 characters.');
        return;
     }

     //Shtimi i nje useri ne liste
     addUserToUserList(name, select);

      //Pastrimi i inputit
     nameInput.value = '';
     selectInput.value = '...';

     //Ruajtja e listes ne localStorage
     saveUserListToLocalStorage();
    });
    
    //Funksioni per krijimin e nje user item ne user list
    function addUserToUserList(name, select){
     const userItem = document.createElement('li');
     userItem.classList.add("card")
     userItem.innerHTML = `
       <img src="img/avatar.png" alt="Avatar">
      <div class="lt">
       <span>${name}</span>
        <span>${select}</span>
     </div>

        <button class="delete">X</button>
     `;
      
        //Vendosja e user item ne liste
        userList.appendChild(userItem);
}
    //Funlsion qe ruan user list ne local Storage
    function saveUserListToLocalStorage(){
        const userItems = userList.querySelectorAll('.card');
        const savedUserList = [];

        userItems.forEach((userItem) => {
            const userName = userItem.querySelector('span:nth-child(1)').textContent;
            const userType = userItem.querySelector('span:nth-child(2)').textContent;
            savedUserList.push({ name: userName, select: userType });
        });
    
        localStorage.setItem('userList', JSON.stringify(savedUserList));
    }

   
//Searchi i input-eve
searchBox.addEventListener('input', function () {
const searchText = searchBox.value.toLowerCase();
const  userItem = userList.querySelectorAll('.card');

userItem.forEach((userItem) => {
    const userName = userItem.querySelector('span:nth-child(1)').textContent.toLocaleLowerCase();
    const userType = userItem.querySelector('span:nth-child(2)').textContent.toLowerCase();
    if (userName.includes(searchText) || userType.includes(searchText) || userItem.querySelector('img').alt.toLowerCase().includes(searchText)) {
        userItem.style.display = 'block';
    } else {
        userItem.style.display = 'none';
    }
});
});

//fshirja
userList.addEventListener('click', function (event){
    if(event.target.classList.contains('delete')){
        const userItem = event.target.parentElement;
        userList.removeChild(userItem);
    // e fshin nga localStorage
    const userName = userItem.querySelector('span:nth-child(1)').textContent;
    const userType = userItem.querySelector('span:nth-child(2)').textContent;
    const savedUserList = JSON.parse(localStorage.getItem('userList')) || [];
    const updatedUserList = savedUserList.filter((user) => user.name !== userName || user.select !== userType);
    localStorage.setItem('userList', JSON.stringify(updatedUserList));
    }
    
});


