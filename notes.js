
showNodes();
// If user add a note, add it to localStorage
let addBtn= document.getElementById('addBtn');
addBtn.addEventListener("click",function(e){

    let addTxt=document.getElementById("addTxt");
    let addTitle=document.getElementById("addtitle");
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }

    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value="";
    addTitle.value="";
    console.log(notesObj);
    showNodes();
});

// function to show added element
function showNodes(){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index) {
        html+=`
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title"> ${element.title}</h5>
                  <p class="card-text">${element.text}</p>
                  <button  id ="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Node</button>
                </div>
            </div>`;
    });
    let notesElm=document.getElementById("notes");
    if(notesObj.length!=0){
         notesElm.innerHTML=html;
    }else{
        notesElm.innerHTML=`Nothing to show! Use Add node to add notes`;
    }

}
// function to delete a node 
function deleteNote(index){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNodes();
}

// function to search 
let search= document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputval=search.value.toLowerCase();
    let notecard=document.getElementsByClassName("notecard");

    Array.from(notecard).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerHTML;
        if(cardTxt.includes(inputval)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})