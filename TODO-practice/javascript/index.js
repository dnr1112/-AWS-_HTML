// 전체할일, 진행중, 완료 todo 보기
DisplayTodoCounts();

function DisplayTodoCounts(){
    const displayAllTodoCounts = document.querySelector(".display-all-todo");
    const displayRunningTodoCounts = document.querySelector(".display-running-todo");
    const displayFinishTodoCounts = document.querySelector(".display-finish-todo");

    displayAllTodoCounts = document.querySelectorAll(".todo-list-container li:not(.all-container)").length;
    displayRunningTodoCounts = document.querySelectorAll(".todo-list-container li:not(.all-container) .todo-checkbox:not(:checked)").length;
    displayFinishTodoCounts = displayAllTodoCounts - displayRunningTodoCounts;


}

// function displayTodoCounts() {
//     const allCount = document.querySelectorAll('.todo-list-container li:not(.all-container)').length;
//     const uncheckedCount = document.querySelectorAll('.todo-list-container li:not(.all-container) input[type="checkbox"]:not(:checked)').length;
//     const checkedCount = allCount - uncheckedCount;
  
//     const allCountText = `전체 할일: ${allCount}`;
//     const uncheckedCountText = `진행중: ${uncheckedCount}`;
//     const checkedCountText = `완료: ${checkedCount}`;
  
//     allTodoButton.textContent = allCountText;
//     runningTodoButton.textContent = uncheckedCountText;
//     finishTodoButton.textContent = checkedCountText;
//   }
  

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

    addButton.addEventListener("click", function() {
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
            displayTodoCounts();
        }
    });
}

// 체크 이벤트
addEventCheckTodo();

function addEventCheckTodo(){
    const checkBoxes = document.querySelectorAll(".todo-checkbox");
    for(let i = 0; i < checkBoxes.length; i++){
        checkBoxes[i].addEventListener("change", () => {
            if(checkBoxes[i].checked){
                checkBoxes[i].parentNode.style.color = 'red';
            }else{
                checkBoxes[i].parentNode.style.color = 'black';
            }
        });
    }
}

// 전체 체크
addEventCheckAll();

function addEventCheckAll() {
    const checkAllBox = document.querySelector(".all-select");
    const checkBoxes = document.querySelectorAll(".todo-checkbox");

    checkAllBox.addEventListener("change", function () {
        checkBoxes.forEach(function (checkbox) {
            checkbox.checked = checkAllBox.checked;
            if(checkbox.checked){
                checkbox.parentNode.style.color = 'red';
            }else{
                checkbox.parentNode.style.color = 'black';
            }
        });
    });
}


// 삭제 이벤트
addEventDeleteTodo();

function addEventDeleteTodo(){
    const deleteButtons = document.querySelectorAll(".delete-button");
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener("click", () => {
            deleteButtons[i].parentNode.remove();
        });
    }
}

// 전체 삭제
addEventDeleteAll();

function addEventDeleteAll(){
    const deleteAllButton = document.querySelector(".all-delete");
    const listContainer = document.querySelector(".todo-list-container");
    deleteAllButton.onclick = () => {
        listContainer.innerHTML = `<li class="all-container"><div><input type="checkbox" class="all-select">전체선택</div><button class="all-delete">전체삭제</button></li>`;
    }
}
