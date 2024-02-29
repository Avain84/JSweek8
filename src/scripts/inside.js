let urlDomain = 'https://todoo.5xcamp.us';

// 變數區
let data = {
  "todos" : [
    // {
    //   "id": "38e700e69b48876505df573bc79e3495",
    //   "content": "test22",
    //   "completed_at": null
    // },
    // {
    //   "id": "8b3a9e028f62bf29ecb47f9d11f41770",
    //   "content": "test11",
    //   "completed_at": 1
    // },
    // {
    //   "id": "11d5ce31fee731db103b08194a291623",
    //   "content": "test",
    //   "completed_at": null
    // }
  ]
};


// DOM 元素
// 登出
const logOut = document.querySelector(".log-out");
// 新增待辦事項元素
const add = document.querySelector(".add");
const addList = document.querySelector(".add-list");
const addBtn = document.querySelector(".add-btn");
// todolist 元素
const noEvent = document.querySelector(".no-event");
const haveEvent = document.querySelector(".event");
const listMenu = document.querySelector(".list-menu");
const listMenuButton = document.querySelectorAll(".list-menu button");
const toDoList = document.querySelector(".todolist");
// const listCheckbox = document.querySelectorAll(".state button");
const undoneNum = document.querySelector(".undone-count")

const init = data => {
  // 判斷是否待辦事件
  if (data.todos.length){
    // 有待辦事件-移除無事件圖樣，新增有事件列表
    noEvent.classList.add('dphidden');
    haveEvent.classList.remove('dphidden');
    showList(data.todos);
  }else{
    // 無待辦事件-新增無事件圖樣，移除有事件列表
    noEvent.classList.remove('dphidden');
    haveEvent.classList.add('dphidden');
  }
}

const showList = dataList => {
  // 處理資料渲染
  let listStr = '';
  let undoneCount = 0;
  dataList.forEach(item => {
    if(!item.completed_at){
      // 未完成
      undoneCount++;
      listStr += `<li>
        <div class="state">
          <button class="undone"><i class="fa-regular fa-square"></i></button>
        </div>
        <p class="undone-event">${item.content}</p>
        <button class="list-del"><i class="fa-solid fa-xmark"></i></button>
      </li>`;
    }else{
      listStr += `<li>
        <div class="state">
          <button class="done"><i class="fa-solid fa-check"></i></button>
        </div>
        <p class="done-event">${item.content}</p>
        <button class="list-del"><i class="fa-solid fa-xmark"></i></button>
      </li>`;
    }
  });
  toDoList.innerHTML = listStr;
  undoneNum.textContent = `${undoneCount} 個待完成項目`;
}


// 初始化畫面
init(data);

// 登出API
logOut.addEventListener("click",e => {
  e.preventDefault();
  const config = {
    headers : {
      authorization: window.localStorage.getItem('token'),
    }
  };
  axios.delete(urlDomain + '/users/sign_out',config)
  .then(response => {
    alert(response.data.message);
    window.localStorage.clear();
    window.location.href = '/index.html';
  })
  .catch(error => {
    console.log(error);
  })

});


addBtn.addEventListener("click",e => {
  // 監聽新增待辦事項
  e.preventDefault();
  if(!addList.value){
    alert("請輸入待辦事項");
    return;
  }
  // 接API之後可能要用POST吧?
  let newTodo = {
    "id": "",
    "content": addList.value,
    "completed_at": null
  }
  data.todos.push(newTodo);
  add.reset();
  init(data);
});

listMenu.addEventListener("click",e =>{
  // 監聽清單選項列
  e.preventDefault();
  listMenuButton.forEach(item => item.classList.remove('list-menu-active'));
  e.target.classList.add('list-menu-active');
  if(e.target.name === "全部"){
    init(data);
  }else{
    const filterData = data.todos.filter(item => {
      let itemState = '';
      if(!item.completed_at){
        itemState = '待完成';
      }else{
        itemState = '已完成';
      }
      return e.target.name === itemState;
    });
    showList(filterData);
  }
})
// 未作內容: 點擊左側狀態改變、刪除
// document.querySelectorAll(".state button").forEach(item => {
//   item.addEventListener("click",e => {
//     console.log(item);
//   });
// });
