// // selecting dom elements
// let form = document.querySelector('form')
// let tasks = document.querySelector('.tasks')
// let input = document.querySelector('input')

// form.addEventListener('submit', (e) => {
//     // prevent default form behaviour
//     e.preventDefault();

//     // create new elements
//     let task = document.createElement('div')
//     task.classList.add('task')

//     let taskContent = `<div><i class="bx bx-circle"></i><h5>${input.value}</h5></div><button><i id='x' class="bx bx-x"></i></button>`

//     const myFragment = document.createRange().createContextualFragment(taskContent)
//     task.appendChild(myFragment)
//     tasks.lastElementChild.before(task)
//     input.value = '';
// })

// tasks.addEventListener('click', (e) => {
//     // remove todo item when x is clicked and mark checkbox and strikethrough text
//     if (e.target.classList.contains('bx-x')) {
//         e.target.closest('.task').remove()
//     } else if (e.target.classList.contains('bx')) {
//         e.target.classList.toggle('bx-check-circle')
//         e.target.classList.toggle('bx-circle')
//         e.target.nextElementSibling.classList.toggle('checked')
//     }

//     if (e.target.id == 'clear') {
//         let completed = document.querySelectorAll('.checked')

//         completed.forEach(todo => {
//             todo.parentElement.parentElement.remove()
//         });
//     }
// })

// document.querySelector('#count').textContent = tasks.children.length - 1

// // tasks.addEventListener('change', e => {
// //     console.log(tasks.children.length);
// // })

// let themeToggleBtn = document.querySelector("#toggleBtn");
// console.log(themeToggleBtn);

// themeToggleBtn.addEventListener("click", (e) => {
//   alert(themeToggleBtn.getAttributeNames());
// });

// todos array data
let todos = [
  {
    id: 1,
    title: "This is my first task",
    completed: true,
  },
  {
    id: 2,
    title: "This is my second task",
    completed: true,
  },
  {
    id: 3,
    title: "This is my third task",
    completed: false,
  },
];

let id = todos.length;

// selectors
const todosContainer = document.querySelector(".tasks");
const tasksLeft = document.getElementById("count");
const form = document.querySelector("form");
const input = document.querySelector("#newTodo");
const clear = document.querySelector("#clear");

loadTodos();

// event listeners
form.addEventListener("submit", addTodo);
todosContainer.addEventListener("click", deleteTodo);
todosContainer.addEventListener("click", checkTodo);
clear.addEventListener("click", clearCompleted);

// functions
function addTodo(e) {
  e.preventDefault();
  todosContainer.innerHTML += `<div class="task">
  <div>
  <i  class="bx bx-circle check"></i>

  <h5>${input.value}</h5>
  </div>
  <button id='${++id}'><i class="bx bx-x"></i></button>
</div>`;



  updateTodosArray();
  checkTaskLeft();
  input.value = ''
}

function updateTodosArray() {
  todos.push({
    id: id,
    title: input.value,
    completed: false,
  });
}

function loadTodos() {
  todos.forEach((todo) => {
    todosContainer.innerHTML += `<div class="task">
  <div>
  ${
    todo.completed
      ? '<i class="bx bx-check-circle check"></i>'
      : '<i class="bx bx-circle check"></i>'
  }
  <h5 ${todo.completed ? 'class="checked"' : 'class=""'}>${todo.title}</h5>
  </div>
  <button id='${todo.id}'><i class="bx bx-x"></i></button>
</div>`;
  });

  checkTaskLeft();
}

function checkTodo(e) {
  // task: refactor code below
  todos.forEach((todo) => {
    if (e.target.parentNode.nextElementSibling.id == todo.id.toString()) {
      todo.completed ? (todo.completed = false) : (todo.completed = true);
    }
  });

  clearAll();
  loadTodos();
}

function checkTaskLeft() {
  let count = 0;
  console.log(todos);
  todos.forEach((todo) => {
    if (!todo.completed) count++;
  });

  // checking for
  if (count == 1) {
    tasksLeft.textContent = `${count} todo left`;
  } else {
    tasksLeft.textContent = `${count} todos left`;
  }
}

function deleteTodo(e) {
  console.log(e.target.parentNode.id);
  if (e.target.classList.contains("bx-x")) {
    todos = todos.filter((todo) => {
      return todo.id != e.target.parentNode.id;
    });
    e.target.closest(".task").remove();
  }
  checkTaskLeft();
}

function clearAll() {
  todosContainer.innerHTML = "";
}

function clearCompleted() {
  todos = todos.filter((todo) => {
    return !todo.completed;
  });

  let selected = document.querySelectorAll(".bx-check-circle");
  selected.forEach((task) => {
    task.closest(".task").remove();
  });

  clearAll();
  loadTodos();
}
