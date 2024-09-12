// Add personnel
let nameInput = document.getElementById("name-input");
let rankInput = document.getElementById("rank-input");
let positionInput = document.getElementById("position-input");
let platoonInput = document.getElementById("platoon-input");
let timeInput = document.getElementById("time-input");
let statusInput = document.getElementById("status-input");
let addButton = document.getElementById("add_button");
let soldierTable = document.getElementById("soldier-table");
let soldierForm = document.getElementById("soldier-form");
let editContainer = document.getElementById("edit_container");
let editTitle = document.getElementById("edit_title");
let editForm = document.getElementById("edit_form");
let editButton = document.getElementById("edit_button");
let cancelButton = document.getElementById("cancel_button");
let nameEdit = document.getElementById("name-edit");
let rankEdit = document.getElementById("rank-edit");
let positionEdit = document.getElementById("position-edit");
let platoonEdit = document.getElementById("platoon-edit");
let timeEdit = document.getElementById("time-edit");
let statusEdit = document.getElementById("status-edit");
let filter = document.getElementById("filter");


addButton.addEventListener('click', () => {
    let personnelObject = createPersonnel(input);
    addToStorage(personnelObject);
    let personnels = getPersonnel();
    displayPersonnel(personnels);
})

function createPersonnel(input) {
    let personnel = {
        name: nameInput.value,
        rank: rankInput.value,
        position: positionInput.value,
        platoon: platoonInput.value,
        time: timeInput.value,
        status: statusInput.value
    }
    return personnel;
}

function addToStorage(personnel) {
    let personnels = getPersonnel();
    personnels.push(personnel);
    localStorage.setItem('personnel', JSON.stringify(personnels));
}

function getPersonnel() {
    let personnels = JSON.parse(localStorage.getItem('personnel'));
    if (personnels == null) {
        personnels = [];
    }
    return personnels;
}

function displayPersonnel(personnels){
    let tbody = document.getElementsById("tbody_add");
    tbody.innerHTML = '';
    for(let i = 0; i < personnels.length; i++){
        let row = newRowGenerator(personnels[i]);
        tbody.appendChild(row);
    }
}

function newRowGenerator(personnel){
    let row = document.createElement('tr');
    let personnelName = document.createElement('td');
    let personnelRank = document.createElement('td');
    let personnelPosition = document.createElement('td');
    let personnelPlatoon = document.createElement('td');
    let personnelStatus = document.createElement('td');
    let actions = createActions(personnel);
    personnelName.textContent = personnel.name;
    personnelRank.textContent = personnel.rank;
    personnelPosition.textContent = personnel.position;
    personnelPlatoon.textContent = personnel.platoon;
    personnelStatus.textContent = personnel.status;
    row.appendChild(personnelName);
    row.appendChild(personnelRank);
    row.appendChild(personnelPosition);
    row.appendChild(personnelPlatoon);
    row.appendChild(personnelStatus);
    row.appendChild(actions);
    return row;
}

function createActions(personnel){
    let actions = document.createElement('td');
    let editButton = document.createElement('button');
    let missionButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    editButton.textContent = 'Edit';
    missionButton.textContent = 'Mission';
    deleteButton.textContent = 'Remove';
    missionButton.classList.add('actionBtn');
    editButton.classList.add('actionBtn');
    deleteButton.classList.add('actionBtn');
    completeButton.addEventListener('click', () => missionFunc(personnel, missionButton));
    deleteButton.addEventListener('click', () => deletePersonnel(personnel));
    editButton.addEventListener('click', () => editPersonnel(personnel));
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    if (personnel.status != 'Retired') {
        actions.appendChild(missionButton);
    }
    return actions;
}

function missionFunc(personnel, missionButton) {
    let counter = personnel.time;
    let interval = setInterval(() => {
        counter--;
        missionButton.textContent = 'Mission: ' + counter;
        if (counter == 0) {
            clearInterval(interval);
            missionButton.textContent = 'Mission Complete';
        }
    }, 1000); 
}

function deletePersonnel(personnel) {
    let personnels = getPersonnel();
    personnels = personnels.filter(p => p.name != personnel.name);
    localStorage.setItem('personnel', JSON.stringify(personnels));
    displayPersonnel(personnels);
}

function editPersonnel(personnel) {
    editContainer.style.display = 'block';
    nameEdit.value = personnel.name;
    rankEdit.value = personnel.rank;
    positionEdit.value = personnel.position;
    platoonEdit.value = personnel.platoon;
    timeEdit.value = personnel.time;
    statusEdit.value = personnel.status;
    editButton.addEventListener('click', () => {
        personnel.name = nameEdit.value;
        personnel.rank = rankEdit.value;
        personnel.position = positionEdit.value;
        personnel.platoon = platoonEdit.value;
        personnel.time = timeEdit.value;
        personnel.status = statusEdit.value;
        localStorage.setItem('personnel', JSON.stringify(personnels));
        displayPersonnel(personnels);
        editContainer.style.display = 'none';
    });
    cancelButton.addEventListener('click', () => {
        editContainer.style.display = 'none';
    });
}