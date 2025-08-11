//input.value=''; yapıcan .
let counter=1;
let plannedTasks= JSON.parse(localStorage.getItem('plannedTasks')) || [];
let doingTasks= JSON.parse(localStorage.getItem('doingTasks')) || [];
let doneTasks= JSON.parse(localStorage.getItem('doneTasks')) || [];


let usersName = localStorage.getItem("userName");

function showNameInput() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('container', 'mt-3', 'text-center');
    inputContainer.id = 'nameInputContainer';
    
    inputContainer.innerHTML = `
        <div class="card" style="max-width: 400px; margin: 0 auto;">
            <div class="card-body">
                <h5 class="card-title">Hoş Geldiniz!</h5>
                <div class="mb-3">
                    <input type="text" class="form-control" id="tempNameInput" placeholder="Adınızı girin..." maxlength="20">
                </div>
                <button class="btn btn-primary" id="tempSaveBtn">Kaydet</button>
            </div>
        </div>
    `;
    
    document.body.insertBefore(inputContainer, document.body.firstChild);
    
    document.getElementById('tempSaveBtn').addEventListener('click', function() {
        const name = document.getElementById('tempNameInput').value.trim();
        if(name !== '') {
            localStorage.setItem("userName", name);
            inputContainer.remove();
            addNameFromStorage();
        }
    });
    
    // Enter tuşuna basınca da kaydet
    document.getElementById('tempNameInput').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            document.getElementById('tempSaveBtn').click();
        }
    });
}

if(!usersName || usersName === "") { 
    showNameInput();
}

// input=document.getElementById("input");
// console.log(input.value);



window.addEventListener("load", function() {
    plannedTasks.forEach(task => addPlannedFromStorage(task));
    doingTasks.forEach(task => addDoingFromStorage(task));
    doneTasks.forEach(task => addDoneFromStorage(task));
    addNameFromStorage();
});

document.querySelector("#inputButton").addEventListener("click",function(e){
    e.preventDefault();
    input=document.getElementById("input");
    console.log(input.value);
    addPlanned(input.value);
    document.getElementById("input").value='';
});


function addNameFromStorage(){
    const userName = localStorage.getItem("userName");
    if(userName) {
        usersName = userName;        
        const nameElement = document.createElement("p");
        nameElement.classList.add("fs-3", "text-light", "mb-3");
        const formList = document.getElementById("formMain");
        
        nameElement.id = "nameinput";
        nameElement.textContent = "Hoşgeldin " + userName;
        formList.insertBefore(nameElement, formList.firstChild);
        
        let deleteName = document.createElement("button");
        deleteName.textContent = "Adımı unut.";
        deleteName.classList.add("btn", "btn-dark", "text-danger", "btn-sm");
        formList.appendChild(deleteName);
        
        deleteName.addEventListener("click", function() {
            localStorage.removeItem("userName");
            nameElement.remove(); // İsim elementini kaldır
            deleteName.remove();  // Butonu kaldır
            showNameInput();      // Input'u tekrar göster
        });
    }
}
function addPlanned(task){
    if(task.length<1) return;
    plannedTasks.push(task);
    localStorage.setItem('plannedTasks', JSON.stringify(plannedTasks));
    
    const newLi = document.createElement("li");
    newLi.classList.add("mb-2", "p-2", "bg-dark","text-light", "rounded", "d-flex", "justify-content-between", "align-items-center");
    newLi.id = `plannedButton${counter}`;
    
    const taskText = document.createElement("span");
    taskText.textContent = task;
    
    const tickButton = document.createElement("button");
    tickButton.innerHTML = "✓";
    tickButton.classList.add("btn", "btn-success", "btn-sm");
    
    tickButton.addEventListener("click", function(e) {
        console.log(`Yapılanlara taşınıyor: ${task}`);
        const index = plannedTasks.indexOf(task);
        plannedTasks.splice(index, 1);
        localStorage.setItem('plannedTasks', JSON.stringify(plannedTasks));
        addDoing(task);
        newLi.remove();
    });
    
    newLi.appendChild(taskText);
    newLi.appendChild(tickButton);
    
    const plannedList = document.getElementById("planned-ul");
    plannedList.appendChild(newLi);
    counter++;
}
function addDoing(task){
    if(task.length<1) return;
    doingTasks.push(task);
    localStorage.setItem('doingTasks', JSON.stringify(doingTasks));
    
    const newLi = document.createElement("li");
    newLi.classList.add("mb-2", "p-2", "bg-dark","text-light", "rounded", "d-flex", "justify-content-between", "align-items-center");
    newLi.id = `doingButton${counter}`;
    
    const taskText = document.createElement("span");
    taskText.textContent = task;

    const backButton = document.createElement("button");
    backButton.innerHTML = "←";
    backButton.classList.add("btn", "btn-warning", "btn-sm");
    
    const tickButton = document.createElement("button");
    tickButton.innerHTML = "✓";
    tickButton.classList.add("btn", "btn-success", "btn-sm");
    
    tickButton.addEventListener("click", function(e) {
        console.log(`Bitmiş olanlara taşınıyor: ${task}`);
        const index = doingTasks.indexOf(task);
        doingTasks.splice(index, 1);
        localStorage.setItem('doingTasks', JSON.stringify(doingTasks));
        addDone(task);
        newLi.remove();
    });

    backButton.addEventListener("click",function(e){
        const index= doingTasks.indexOf(task);
        doingTasks.splice(index,1);
        localStorage.setItem('doingTasks',JSON.stringify(doingTasks));
        addPlanned(task);
        newLi.remove();
    });

    newLi.appendChild(backButton);
    newLi.appendChild(taskText);
    newLi.appendChild(tickButton);
    
    const doingList = document.getElementById("doing-ul");
    doingList.appendChild(newLi);
    counter++;
}
function addDone(task){
    if(task.length<1) return;
    doneTasks.push(task);
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    
    const newLi = document.createElement("li");
    newLi.classList.add("mb-2", "p-2", "bg-success","text-light", "rounded", "d-flex", "justify-content-between", "align-items-center");
    newLi.id = `doneButton${counter}`;
    
    const backButton = document.createElement("button");
    backButton.innerHTML = "←";
    backButton.classList.add("btn", "btn-warning", "btn-sm");
    
    const taskText = document.createElement("span");
    taskText.textContent = task;
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "✗ ";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    
    deleteButton.addEventListener("click", function(e) {
        const index = doneTasks.indexOf(task);
        doneTasks.splice(index, 1);
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
        newLi.remove();
    });
    backButton.addEventListener("click",function(e){
        const index= doneTasks.indexOf(task);
        doneTasks.splice(index,1);
        localStorage.setItem('doneTasks',JSON.stringify(doneTasks));
        addDoing(task);
        newLi.remove();
    });
    newLi.appendChild(backButton);
    newLi.appendChild(taskText);
    newLi.appendChild(deleteButton);
    
    
    const doneList = document.getElementById("done-ul");
    doneList.appendChild(newLi);
    counter++;
}

function addPlannedFromStorage(task){
    const newLi = document.createElement("li");
    newLi.classList.add("mb-2", "p-2", "bg-dark","text-light", "rounded", "d-flex", "justify-content-between", "align-items-center");
    newLi.id = `plannedButton${counter}`;
    
    const taskText = document.createElement("span");
    taskText.textContent = task;
    
    const tickButton = document.createElement("button");
    tickButton.innerHTML = "✓";
    tickButton.classList.add("btn", "btn-success", "btn-sm");
    
    tickButton.addEventListener("click", function(e) {
        const index = plannedTasks.indexOf(task);
        plannedTasks.splice(index, 1);
        localStorage.setItem('plannedTasks', JSON.stringify(plannedTasks));
        addDoing(task);
        newLi.remove();
    });
    
    newLi.appendChild(taskText);
    newLi.appendChild(tickButton);
    
    const plannedList = document.getElementById("planned-ul");
    plannedList.appendChild(newLi);
    counter++;
}

function addDoingFromStorage(task){
    const newLi = document.createElement("li");
    newLi.classList.add("mb-2", "p-2", "bg-dark","text-light", "rounded", "d-flex", "justify-content-between", "align-items-center");
    newLi.id = `doingButton${counter}`;
    
    const taskText = document.createElement("span");
    taskText.textContent = task;
    
    const backButton = document.createElement("button");
    backButton.innerHTML = "←";
    backButton.classList.add("btn", "btn-warning", "btn-sm");
    
    const tickButton = document.createElement("button");
    tickButton.innerHTML = "✓";
    tickButton.classList.add("btn", "btn-success", "btn-sm");
    
    tickButton.addEventListener("click", function(e) {
        const index = doingTasks.indexOf(task);
        doingTasks.splice(index, 1);
        localStorage.setItem('doingTasks', JSON.stringify(doingTasks));
        addDone(task);
        newLi.remove();
    });

    backButton.addEventListener("click",function(e){
        const index= doingTasks.indexOf(task);
        doingTasks.splice(index,1);
        localStorage.setItem('doingTasks',JSON.stringify(doingTasks));
        addPlanned(task);
        newLi.remove();
    });
    
    newLi.appendChild(backButton);
    newLi.appendChild(taskText);
    newLi.appendChild(tickButton);
    
    const doingList = document.getElementById("doing-ul");
    doingList.appendChild(newLi);
    counter++;
}

function addDoneFromStorage(task){
    const newLi = document.createElement("li");
    newLi.classList.add("mb-2", "p-2", "bg-success","text-light", "rounded", "d-flex", "justify-content-between", "align-items-center");
    newLi.id = `doneButton${counter}`;
    
    const backButton = document.createElement("button");
    backButton.innerHTML = "←";
    backButton.classList.add("btn", "btn-warning", "btn-sm");
    
    const taskText = document.createElement("span");
    taskText.textContent = task;
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "✗";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");

    deleteButton.addEventListener("click", function(e) {
        const index = doneTasks.indexOf(task);
        doneTasks.splice(index, 1);
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
        newLi.remove();
    });
    
    backButton.addEventListener("click",function(e){
        const index= doneTasks.indexOf(task);
        doneTasks.splice(index,1);
        localStorage.setItem('doneTasks',JSON.stringify(doneTasks));
        addDoing(task);
        newLi.remove();
    });
    
    newLi.appendChild(backButton);
    newLi.appendChild(taskText);
    newLi.appendChild(deleteButton);
    
    const doneList = document.getElementById("done-ul");
    doneList.appendChild(newLi);
    counter++;
}
