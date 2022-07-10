// 初始變數
let list = document.querySelector('#my-todo')
let addBtn = document.querySelector('#add-btn')
let input = document.querySelector('#new-todo')

// 新增-Done List & 所有list的管理面板
let doneList = document.querySelector('#my-done')
let listPanel =  document.querySelector('#list-panel')

// 資料
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}

// 函式
function addItem (text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label>
      <input type="checkbox" name="todo"> ${text}
    </label>
    <i class="star fa fa-star"></i>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}

// write your code here
//要實作出的功能有以下
//1.add new Todo
addBtn.addEventListener('click', function () {
  const inputValue = input.value
  //進化-2.防止輸入空白內容(把inputValue內容裡的所有空格都換成空字符，如果長度為0代表輸入的內容全是空格)
  if (inputValue.replace(/\s*/g, "").length > 0) {
    addItem(inputValue)
  }
  input.value = ''
})
//進化-1.按Enter新增Todo
input.addEventListener('keydown', function (event) {
  const inputValue = input.value
  if (event.key === "Enter") {
    addBtn.click()
  }
})

//2.delete Todo
listPanel.addEventListener('click', function (event) {
  const target = event.target
  //另一種寫法: if (target.classList.contains('delete'))
  if (target.matches('.delete')) {
    const parentOfTarget = target.parentElement
    parentOfTarget.remove()
    //3.切換Todo的完成與否樣式
    //進化-3.當使用者checked完成的todo時，該項目會被送進Done清單，取消勾選則會加回Todo清單；同時Done清單中的項目也要能夠被刪除
  } else if (target.type === 'checkbox') {
    target.parentElement.classList.toggle('checked')
    target.parentElement.classList.contains('checked') 
      ? doneList.appendChild(target.parentElement.parentElement)
      : list.appendChild(target.parentElement.parentElement)
    if (target.parentElement.classList.contains('important')) {
      list.prepend(target.parentElement.parentElement)
    }
  } 
})
//進化-4.當使用者點擊star icon時，可以切換成重要項目樣式(星星和項目顏色變紅色且字體加粗)，並且移至清單首位項目
list.addEventListener('click', function(event) {
  const target = event.target
  if (target.matches('.star')) {
    target.classList.toggle('important')
    target.previousElementSibling.classList.toggle('important')
    target.classList.contains('important')
      ? list.prepend(target.parentElement)
      : list.append(target.parentElement)
  }
})