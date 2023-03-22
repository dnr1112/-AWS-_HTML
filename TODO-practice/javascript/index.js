// 전체할일, 진행중, 완료 todo 보기
DisplayTodoCounts();

function DisplayTodoCounts() {
    const displayAllTodo = document.querySelector(".all-todo-button");
    const allTodo = document.querySelectorAll(".todo-checkbox");
    displayAllTodo.textContent = `전체할일: ${allTodo.length}`;
    console.log("전체할일:" + allTodo.length);
    const displayRunningTodo = document.querySelector(".running-todo-button");
    const runningTodo = document.querySelectorAll(".todo-checkbox:not(:checked)");
    displayRunningTodo.textContent = `진행중: ${runningTodo.length}`;
    console.log("진행중:" + runningTodo.length);
    const displayFinishTodo = document.querySelector(".finish-todo-button");
    const finishTodo = document.querySelectorAll(".todo-checkbox:checked");
    displayFinishTodo.textContent = `완료: ${finishTodo.length}`;
    console.log("완료:" + finishTodo.length);
    
}

// 모든 list 보기
ClickAllTodo();

function ClickAllTodo(){
    const allTodoButton = document.querySelector(".all-todo-button");
    allTodoButton.addEventListener("click", function () {
        const todoListItems = document.querySelectorAll(".todo-list-container li");
        todoListItems.forEach(function (item) {
            item.style.display = "flex";
        });
    });
}

// 진행중 list 보기
ClickRunningTodo();

function ClickRunningTodo(){
    const runningTodoButton = document.querySelector(".running-todo-button");
    runningTodoButton.addEventListener("click", function () {
        const todoListItems = document.querySelectorAll(".todo-list-container li");
        todoListItems.forEach(function (item) {
            const checkbox = item.querySelector(".todo-checkbox");
            if (checkbox && !checkbox.checked) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });
}

// 완료 list 보기
ClickFinishTodo();

function ClickFinishTodo(){
    const finishTodoButton = document.querySelector(".finish-todo-button");
    finishTodoButton.addEventListener("click", function () {
        const todoListItems = document.querySelectorAll(".todo-list-container li");
        todoListItems.forEach(function (item) {
            const checkbox = item.querySelector(".todo-checkbox");
            if (checkbox && checkbox.checked) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });
}

// 할 일 추가
addEventAddTodo();

function addEventAddTodo(){
    const addButton = document.querySelector(".add-todo-button");
    const todoInput = document.querySelector(".todo-input");
    const warning = document.querySelector(".warning");
    const todoList = document.querySelector(".todo-list-container");

    addButton.onclick = () => {
        if (todoInput.value === ""){
            warning.style.display = "block";
        } else {
            warning.style.display = "none";
            const newTodo = document.createElement("li");
            newTodo.classList.add("todo-list");
            newTodo.innerHTML = `
                <div><input type="checkbox" class="todo-checkbox">${todoInput.value}</div>
                <button class="delete-button">×</button>
            `;
            todoList.appendChild(newTodo);
            todoInput.value = "";
            addEventCheckTodo();
            addEventDeleteTodo();
            addEventCheckAll();
            addEventDeleteAll();
            DisplayTodoCounts();
        }
    }  
}

// 엔터키로 작동
addEventAddTodoKeyUp();

function addEventAddTodoKeyUp(){
    const todoInput = document.querySelector(".todo-input");
    todoInput.onkeyup = () => {
        if(window.event.keyCode == 13) {
            const addTodoButton = document.querySelector(".add-todo-button");
            addTodoButton.click();
        }
    }
}

// 체크 이벤트
addEventCheckTodo();

function addEventCheckTodo(){
    const checkBoxes = document.querySelectorAll(".todo-checkbox");
    for(let i = 0; i < checkBoxes.length; i++){
        checkBoxes[i].onclick = () => {
            if(checkBoxes[i].checked){
                checkBoxes[i].parentNode.style.color = 'red';
            }else{
                checkBoxes[i].parentNode.style.color = 'black';
            }
            DisplayTodoCounts();
        }};
}

// 전체 체크
addEventCheckAll();

function addEventCheckAll() {
    const checkAllBox = document.querySelector(".all-select");
    const checkBoxes = document.querySelectorAll(".todo-checkbox");

    checkAllBox.onclick = () => {
        checkBoxes.forEach(function (checkbox) {
            checkbox.checked = checkAllBox.checked;
            if(checkbox.checked){
                checkbox.parentNode.style.color = 'red';
            }else{
                checkbox.parentNode.style.color = 'black';
            }
            DisplayTodoCounts();
        });
    }
}


// 삭제 이벤트
addEventDeleteTodo();

function addEventDeleteTodo(){
    const deleteButtons = document.querySelectorAll(".delete-button");
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].onclick = () => {
            deleteButtons[i].parentNode.remove();
            DisplayTodoCounts();
        }
    }
}

// 전체 삭제
addEventDeleteAll();

function addEventDeleteAll(){
    const deleteAllButton = document.querySelector(".all-delete");
    const listContainer = document.querySelector(".todo-list-container");
    deleteAllButton.onclick = () => {
        listContainer.innerHTML = `<li class="all-container"><div><input type="checkbox" class="all-select">전체선택</div><button class="all-delete">전체삭제</button></li>`;
        DisplayTodoCounts();
    }
}