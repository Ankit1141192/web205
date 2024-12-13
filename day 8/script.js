const userTableBody=document.querySelector("#userTable tbody");
    const prevButton=document.querySelector("#prevButton");
    const nextButton=document.querySelector("#nextButton");
    const pageNumber=document.querySelector("#pageNumber");
    const bloodGroupFilter=document.querySelector("#bloodGroupFilter");
    const searchQuery=document.querySelector("#searchQuery");
    const errorMessage=document.querySelector("#errorMessage");

    const itemsPerPage=10;
    let currentPage=1;


    document.addEventListener("DOMContentLoaded",()=>{
        loadPage();

        prevButton.addEventListener('click',()=>{
            if(currentPage>1){
                currentPage--;
                loadPage();
            }
        });

        nextButton.addEventListener('click',()=>{
            currentPage++;
            loadPage();
        });


        bloodGroupFilter.addEventListener('change',()=>{
            currentPage=1;
            loadPage();
        });

        searchQuery.addEventListener('input',()=>{
            currentPage=1;
            loadPage();
        });

       
    })


function loadPage(){
    fetchUsers()
    .then(data=>{
        console.log(data);
        displayUsers(data.users);
        updatedPagination(data.total);
    })
    .catch(error=>{
        console.log(error);
        errorMessage.textContent='Something went wrong';
    })
}

//function fetching API,logic for PAagination,Search,Filtering
    function fetchUsers(){
        const bloodGroup=bloodGroupFilter.value;
        const query=searchQuery.value;
        //url contains the pagination logic====>to get all the items

        let url=`https://dummyjson.com/users?limit=${itemsPerPage}&skip=${(currentPage-1)*itemsPerPage}`;


        //if i used some query then i will be using this url
        if(bloodGroup){
            url=`https://dummyjson.com/users/filter?key=bloodGroup&value=${bloodGroup}&limit=${itemsPerPage}&skip=${(currentPage-1)*itemsPerPage}`
        }

        if(query){
            url=`https://dummyjson.com/users/search?q=${query}&limit=${itemsPerPage}&skip=${(currentPage-1)*itemsPerPage}`
        }
        console.log(url)
        return fetch(url)
        .then(response=>response.json());
    }

 function  displayUsers(data){
    userTableBody.innerHTML='';
    data.forEach(user=>{
        const row=document.createElement('tr');
        row.innerHTML=`
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.gender}</td>
            <td>${user.bloodGroup}</td> 
        `;
        userTableBody.appendChild(row)
    })
}
    function updatedPagination(totalItems){
        pageNumber.textContent=`Page ${currentPage}`;
        prevButton.disabled= currentPage==1;
        nextButton.disabled=currentPage*itemsPerPage>=totalItems;
    }

    function displayError(){
        errorMessage.textContent='Something went wrong';
        errorMessage.style.display='block'
    }
 
//  displayUsers()