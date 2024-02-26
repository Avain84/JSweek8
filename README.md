# JSweek8
 [設計稿](https://xd.adobe.com/view/3b957757-f50b-4a73-be01-16393e53f49b-6ec6/)
產品功能：

- 自行切版
- 呈現目前尚無待辦事項畫面
- [串接 API](https://todoo.5xcamp.us/api-docs/index.html?fbclid=IwAR2k20zfzmWok6NTDX_S45KvBAzpqWaRazPGHg8K2Zb0FsmkF4FmK4WYwTE)
- 篩選全部、待完成、已完成的項目
- 計算完成項目

作業規範：

- 請用箭頭函式
- 多嘗試 map()、filter() 等等其他陣列方法去處理

<aside>
💡 作業提醒事項
 1. 打 API 成功跟失敗的 response 結構不太一樣，如果有要取出 message 的話要留意一下物件結構

1. 設計稿上有畫**"清除已完成"**按鈕，但 API 沒開此方法，此功能可不做
2. Todos 的 PATCH 在發請求的時候需要傳一個空物件，否則會失敗（這是後端的問題）
</aside>