let baseURL = 'https://todoo.5xcamp.us';

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
// 導覽列
const home = document.querySelector(".home");
const user = document.querySelector(".user");
const logOut = document.querySelector(".log-out");
// 新增待辦事項元素
const add = document.querySelector(".add");
// const addList = document.querySelector(".add-list");
const addBtn = document.querySelector(".add-btn");
// todolist 元素
const noEvent = document.querySelector(".no-event");
const haveEvent = document.querySelector(".event");
const listMenu = document.querySelector(".list-menu");
const listMenuButton = document.querySelectorAll(".list-menu button");
const toDoList = document.querySelector(".todolist");
// const listCheckbox = document.querySelectorAll(".state button");
const undoneNum = document.querySelector(".undone-count")

// 使用者的token
const config = {
  headers: { authorization: window.localStorage.getItem('token')},
};

// 取得 TODO 列表
const getList = () => {
  user.classList.remove('dphidden');
  user.textContent = `${window.localStorage.getItem('nickname')}的待辦`;

  axios.get(baseURL + "/todos",config)
  .then(response => {
    const todo = response.data.todos;

    // 判斷是否待辦事件
    if (todo.length){
      // 有待辦事件-移除無事件圖樣，新增有事件列表
      noEvent.classList.add('dphidden');
      haveEvent.classList.remove('dphidden');
      showList(todo);
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

// Test API，token未過期才初始化畫面，若已過期則回到首頁
(() => {
  axios.get(baseURL + '/check',config)
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

// 點擊 logo 清除 localStorage
home.addEventListener("click",e => {
  window.localStorage.clear();
  // 首頁應該要有判斷是否還有token
});

// 登出API
logOut.addEventListener("click",e => {
  e.preventDefault();
  
  axios.delete(baseURL + '/users/sign_out',config)
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
    axios.post(baseURL + '/todos',newData,config)
    .then(response => {
      getList();
    })
    .catch(error => {
      alert("連線異常");
    });
  }
});

// listMenu.addEventListener("click",e =>{
//   // 監聽清單選項列
//   e.preventDefault();
//   listMenuButton.forEach(item => item.classList.remove('list-menu-active'));
//   e.target.classList.add('list-menu-active');
//   if(e.target.name === "全部"){
//     getList();
//   }else{
//     const filterData = data.todos.filter(item => {
//       let itemState = '';
//       if(!item.completed_at){
//         itemState = '待完成';
//       }else{
//         itemState = '已完成';
//       }
//       return e.target.name === itemState;
//     });
//     showList(filterData);
//   }
// });
// 未作內容: 點擊左側狀態改變、刪除
// document.querySelectorAll(".state button").forEach(item => {
//   item.addEventListener("click",e => {
//     console.log(item);
//   });
// });
