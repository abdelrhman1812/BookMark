let inputName=document.getElementById('inputName')
let inputUrl=document.getElementById('inputUrl')
let btnAdd=document.getElementById('btnAdd')
let clearall=document.getElementById("clearall")

/* table */
let tbody=document.getElementById('tbody')

// console.log(inputName , inputUrl ,btnAdd ,tbody)


let mood="add"
/* localstorage */
let helper;

let allUrl;
if(localStorage.getItem('localUrl') !== null){
  allUrl=JSON.parse(localStorage.getItem('localUrl'))
  
}else{
  allUrl=[]
}

displayUrl()

/* add url */
btnAdd.addEventListener('click', function() {
 if(validitionName() === true && validitioUrl() === true){
    if(mood === "add"){

        let newUrl = {
          name: inputName.value,
          url: inputUrl.value
        };
      
        allUrl.push(newUrl);
        localStorage.setItem('localUrl', JSON.stringify(allUrl));
    }else{
        allUrl[helper].name=inputName.value
        allUrl[helper].url=inputUrl.value
        mood="update"
        btnAdd.innerHTML="Add"
    }
    swal({
        title: "Good job!",
        // text: "You clicked the button!",
        icon: "success",
        button: "Add Again !",
      });
    displayUrl();
    clearInput()
     

}
});

/* create row */

function displayUrl() {
    let empty = '';
    for (let i = 0; i < allUrl.length; i++) {
      empty += `
        <tr>
          <td>${i}</td>
          <td>${allUrl[i].name}</td>
          
          <td>
           <button class="btn-vist">
           <a href=${allUrl[i].url} class="text-light text-decoration-none"  target="_blank">Vist</a>
              <span></span>
              <svg width="15" height="15" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" stroke-linejoin="round" stroke-linecap="round"></path>
              </svg>
              </button>
             </td>


          <td>
          <button class="btn btn-danger" onclick=deleteUrl(${i})>Delete</button> 

          <button class="btn bg" onclick=upDate(${i})>update</button>
          
          </td>
         
        </tr>
      `;
    }
    tbody.innerHTML = empty;
    if (allUrl.length >0){
      clearall.classList.remove('d-none')
    }else{
      clearall.classList.add('d-none')

    }
  }

  /* clear */

  function clearInput(){

    inputName.value=""
    inputUrl.value=""


  }


  /* Delete */
  function deleteUrl(id){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
          
        });
        allUrl.splice(id,1)
        localStorage.setItem('localUrl', JSON.stringify(allUrl));
        displayUrl()
    
      } else {
        swal("Your imaginary file is safe!");
      }
    });
 

  }

clearall.addEventListener('click',function(){

  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
        
      });
      allUrl.splice(0)
      localStorage.setItem('localUrl', JSON.stringify(allUrl));
      displayUrl()
  
    } else {
      swal("Your imaginary file is safe!");
    }
  });
})





  function upDate(idx){
helper=idx
// allUrl[fake].name=inputName.value
inputName.value=  allUrl[idx].name
inputUrl.value=  allUrl[idx].url
    console.log(allUrl[idx].url)
    mood='update'

    btnAdd.innerHTML="update"


  }



  function validitionName(){


    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/
    if(  regex.test(inputName.value) === true && inputName.value !== ""){

        return true
    }else{


        swal ( "Oops" ,  "must name consists 3 or 10 characters" ,  "error" )
        return false


    }


  }

  function validitioUrl(){


    let regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if(  regex.test(inputUrl.value) === true && inputUrl.value !== ""){

        return true
    }else{


        swal ( "Oops" ,  "must be like this https://www.example.com" ,  "error" )
        return false


    }


  }