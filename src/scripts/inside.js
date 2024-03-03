// 變數區
let data = {};
let undoneCount = 0;
let clickCount = 0;

// DOM 元素
// 導覽列
const home = document.querySelector(".home");
const user = document.querySelector(".user");
const logOut = document.querySelector(".log-out");
// 新增待辦事項元素
const add = document.querySelector(".add");
const addBtn = document.querySelector(".add-btn");
// todolist 元素
const noEvent = document.querySelector(".no-event");
const haveEvent = document.querySelector(".event");
const listMenu = document.querySelector(".list-menu");
const all = document.querySelector(".all");
const listMenuButton = document.querySelectorAll(".list-menu button");
const toDoList = document.querySelector(".todolist");
const undoneNum = document.querySelector(".undone-count");

let deleteBtn; // 刪除按鍵的DOM，在渲染後才抓取DOM元素

// 使用者的token
const config = {
  headers: { authorization: window.localStorage.getItem('token')},
};

// 取得 TODO 列表
const getList = () => {
  user.classList.remove('dphidden');
  user.textContent = `${window.localStorage.getItem('nickname')}的待辦`;

  axios.get(`${baseURL}/todos`,config)
  .then(response => {
    const todo = response.data.todos;
    data = response.data;
    // 判斷是否待辦事件
    if (todo.length){
      // 有待辦事件-移除無事件圖樣，新增有事件列表
      noEvent.classList.add('dphidden');
      haveEvent.classList.remove('dphidden');
      showList(todo);
      undoneNum.textContent = `${undoneCount} 個待完成項目`;
    }else{
      // 無待辦事件-新增無事件圖樣，移除有事件列表
      noEvent.classList.remove('dphidden');
      haveEvent.classList.add('dphidden');
    }
  })
  .catch(error => {
    alert(error.response.data.message);
    window.location.href = window.localStorage.getItem('loginPage');
    window.localStorage.clear();
  })
}

// 處理資料渲染
const showList = dataList => {
  let listStr = '';
  undoneCount = 0;
  dataList.forEach(item => {
    if(!item.completed_at){
      // 未完成
      undoneCount++;
      listStr += `<li class="listitem" id="${item.id}">
        <div class="state state-btn">
          <button class="undone state-btn"><i class="state-btn fa-regular fa-square"></i></button>
        </div>
        <p class="undone-event">${item.content}</p>
        <button class="list-del"><i class="list-del fa-solid fa-xmark"></i></button>
      </li>`;
    }else{
      listStr += `<li class="listitem" id="${item.id}">
        <div class="state state-btn">
          <button class="done state-btn"><i class="state-btn fa-solid fa-check"></i></button>
        </div>
        <p class="done-event">${item.content}</p>
        <button class="list-del"><i class="list-del fa-solid fa-xmark"></i></button>
      </li>`;
    }
  });
  toDoList.innerHTML = listStr;
  deleteBtn = document.querySelectorAll('.list-del');
}

// Test API，token未過期才初始化畫面，若已過期則回到首頁
(() => {
  axios.get(`${baseURL}/check`,config)
  .then(response => {
    alert(`${window.localStorage.getItem('nickname')}您好！`);
    // 初始化畫面
    getList();
  })
  .catch(error => {
    alert(error.response.data.message);
    window.location.href = window.localStorage.getItem('loginPage');
    window.localStorage.clear();
  })
})();

// 登出API
logOut.addEventListener("click",e => {
  e.preventDefault();
  
  axios.delete(`${baseURL}/users/sign_out`,config)
  .then(response => {
    alert(response.data.message);
    window.location.href = window.localStorage.getItem('loginPage');
    window.localStorage.clear();
  })
  .catch(error => {
    alert("登出失敗，請重新嘗試！");
  })

});

// 新增TODO API
add.addEventListener("submit",e => {
  e.preventDefault();
  const newData = {
    "todo": {
      "content": addList.value
    }
  };
  if(!addList.value){
    alert("請輸入待辦事項");
    return;
  }else{    
    axios.post(`${baseURL}/todos`,newData,config)
    .then(response => {
      getList();
      listMenuButton.forEach(item => item.classList.remove('list-menu-active'));
      all.classList.add('list-menu-active');
    })
    .catch(error => {
      alert("連線異常");
    })
    .finally(() => add.reset());
  }
});

// 監聽清單選項列
listMenu.addEventListener("click",e =>{
  e.preventDefault();

  listMenuButton.forEach(item => item.classList.remove('list-menu-active'));
  e.target.classList.add('list-menu-active');
  if(e.target.name === "alltodo"){
    getList();
  }else{
    const filterData = data.todos.filter(item => {
      let itemState = '';
      if(!item.completed_at){
        itemState = 'undonetodo';
      }else{
        itemState = 'donetodo';
      }
      return e.target.name === itemState;
    });
    showList(filterData);
  }
});

// 指定資料處理
toDoList.addEventListener("click",e => {
  const listItem = e.target.closest('.listitem'); // 找到最近的父層<li class=".listitem">元素
  const itemId = listItem.getAttribute('id'); // 取得<li>的屬性值
  if(e.target.classList.contains('list-del')){
    clickCount = 0;
    // 刪除指定資料
    if (listItem) {
      axios.delete(`${baseURL}/todos/${itemId}`,config)
      .then(response => {
        alert(`${response.data.message}成功`);
        getList();
      })
      .catch(error => {
        alert(`${error.response.data.message}刪除`);
      })
    }
  }else if(e.target.classList.contains('state-btn')){
    clickCount = 0;
    // 切換指定資料狀態
    if (listItem) {
      axios.patch(`${baseURL}/todos/${itemId}/toggle`,itemId,config)
      .then(response => {
        if(response.data.completed_at){
          alert(`恭喜您完成<${response.data.content}>`);
        }else{
          alert(`切換<${response.data.content}>至待完成清單`);
        }
        getList();
        listMenuButton.forEach(item => item.classList.remove('list-menu-active'));
        all.classList.add('list-menu-active');
      })
      .catch(error => {
        alert(`${error.response.data.message}成功`);
      })
    }
  }else{
    clickCount++;
    if(clickCount > 5){
      alert(`不要亂點RRRRR`);
      clickCount = 0;
    }
  } 
});