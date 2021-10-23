let switchTheme = document.querySelector('.change-theme')
let themeLink = document.getElementById('theme')
let addTask = document.querySelector('.create__button')
let createInput = document.querySelector('.create__input')
let todoList = document.querySelector('.todo__list')
let checkboxCreate = document.querySelector('.create__checkbox')
let checkboxTodo = document.querySelector('.todo__checkbox')
let activeElem = document.querySelector('.function__active')
let completedElem = document.querySelector('.function__completed')
let clearElems = document.querySelector('.footer__clear')
let footerElems = document.querySelector('.footer__function')
let calkNumber = document.querySelector('.calc__number')

console.log(checkboxTodo)

let light = 'light-theme.css'
let dark = 'dark-theme.css'
let tasks = []
let todoItemElems = []

// let activeTasks = []

// if (localStorage.getItem('tasks') !== null) {
//   tasks = JSON.parse(localStorage.getItem('activeTasks'))
// }

if (localStorage.getItem('tasks') !== null) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}

if (localStorage.getItem('theme') !== null) {
  themeLink.href = localStorage.getItem('theme')
}
function Task(description, completed) {
  this.description = description
  this.completed = completed
}
const calkTasks = (calk) => {
  calkNumber.innerHTML = calk
}

const taskAllLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// const taskActiveLocalStorage = () => {
//   localStorage.setItem('activeTasks', JSON.stringify(activeTasks))
// }

// const createList = (task, index) => {
//   return `

// <li class="todo__task ${task.completed ? 'checked' : ''}"  >
//     <input
//       type="checkbox"
//       onclick = completeTask(${index})
//       class="todo__checkbox"
//       id="${index}" ${task.completed ? 'checked' : ''}
//     />
//     <label
//       class="todo__item"
//       for="${index}">
//     </label>
//       ${task.description}
//       <img
//                                     class="todo__icon"
//                                     onclick = deleteTask(${index})
//                                     src="image/del.svg"
//                                     alt="delete icon"
//                                 />
//   </li>`
// }

const createList = (task, index) => {
  let li = document.createElement('li')
  li.classList.add('todo__task')
  let inputCheckbox = document.createElement('input')
  inputCheckbox.classList.add('todo__checkbox')
  inputCheckbox.setAttribute('type', 'checkbox')
  inputCheckbox.setAttribute('id', index)
  let label = document.createElement('label')
  label.classList.add('todo__item')
  label.setAttribute('for', index)
  let img = document.createElement('img')
  img.classList.add('todo__icon')
  img.setAttribute('src', 'image/del.svg')
  todoList.appendChild(li)
  li.appendChild(inputCheckbox)
  li.appendChild(label)
  li.appendChild(img)
  label.innerHTML = task.description

  if (task.completed == true) {
    li.classList.add('checked')
  }
}

function inputClean(createInput, checkboxCreate) {
  createInput.value = ''
  checkboxCreate.checked = false
}

const fillHtmlList = () => {
  todoList.innerHTML = ''
  if (tasks.length !== 0) {
    calkTasks(tasks.length)
    tasks.forEach((item, index) => {
      // todoList.innerHTML += createList(item, index)
      createList(item, index)
    })
    todoItemElems = document.querySelectorAll('.todo__task')
  }
}
fillHtmlList()

switchTheme.addEventListener('click', function () {
  if (themeLink.getAttribute('href') == dark) {
    themeLink.href = light
    localStorage.removeItem('theme')
  } else {
    themeLink.href = dark
    localStorage.setItem('theme', dark)
  }
})

const completeTask = (index) => {
  console.log(index)
  tasks[index].completed = !tasks[index].completed
  console.log(tasks[index].completed)
  if (tasks[index].completed === true) {
    todoItemElems[index].classList.add('checked')
  } else {
    todoItemElems[index].classList.remove('checked')
  }
  taskAllLocalStorage()
  fillHtmlList()
}

// const filterTasks = (activeTasks,completedTasks) => {
//   let activeTasks = tasks.filter((item) => item.completed == false)

//   let completedTasks = tasks.filter((item) => item.completed == true)
// }

activeElem.addEventListener('click', function () {
  let active = document.querySelector('.active')
  active.classList.remove('active')
  this.classList.add('active')
  let activeTasks = tasks.filter((item) => item.completed == false)
  tasks = [...activeTasks]
  // taskActiveLocalStorage()
  // taskAllLocalStorage()
  fillHtmlList()
})

completedElem.addEventListener('click', function () {
  let active = document.querySelector('.active')
  active.classList.remove('active')
  this.classList.add('active')
  let completedTasks = tasks.filter((item) => item.completed == true)
  tasks = [...completedTasks]
  // taskAllLocalStorag()
  fillHtmlList()
})

addTask.addEventListener('click', function () {
  let valueInput = createInput.value
  let valueCreateCheckbox = checkboxCreate.checked
  tasks.push(new Task(valueInput, valueCreateCheckbox))

  taskAllLocalStorage()
  fillHtmlList()
  inputClean(createInput, checkboxCreate)
})

const deleteTask = (index) => {
  todoItemElems[index].classList.add('delete')
  setTimeout(() => {
    tasks.splice(index, 1)
    taskAllLocalStorage()
    fillHtmlList()
  }, 500)
}

console.log(tasks)

// console.log(activeTasks)
