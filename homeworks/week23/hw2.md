## 為什麼我們需要 Redux？

Redux 可以協助管理會在不同地方被使用的 global state。透過 Redux 提供的工具可以讓人更容易去追蹤 state 是在什麼時候、因為什麼原因被更新，以及知道更新之後會有什麼行為。  
Redux 可透過 store 的概念將被不同 component 用到的 state 集中管理，像是 react Hooks 中的 `useContext`，讓 state 在有多層 components 的時候可以在各個 component 可以被拿到，解決必須將 state 當作 prop 一路傳下去的 prop drilling 的不方便。Redux 和 `useContext` 不同的是，Redux 只會重新渲染有 state 有更新的 components，使用 `useContext` 的 component 則會在 context 的值更新時重新全部渲染（可參考〈[Preventing rerenders with React.memo and useContext hook.](https://github.com/facebook/react/issues/15156#issuecomment-474590693)〉解決性能上的問題）。

使用時機：
1. 專案中有多個會在不同 component 被使用 state
2. state 會隨著時間頻繁更新
3. 更新 state 的邏輯可能很複雜
4. 中型/ 大型專案，且可能由很多人一起協作


**參考：**

1. [Using Redux and Context API](https://www.codehousegroup.com/insight-and-inspiration/tech-stream/using-redux-and-context-api)

---

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是可以利用 actions 來管理應用程式的 state 的狀態管理工具。提供統一的 store 去管理 global state，確保這些 state 只能透過特定的事件更新。

根據官網解釋的基本概念：

> This is the basic idea behind Redux: a single centralized place to contain the global state in your application, and specific patterns to follow when updating that state to make the code predictable. 

### **元件：**

**1. Actions**

會是純 JavaScript Object，可以想像成是描述發生的事件。像是新增 todo list 時（根據官網範例）：

```
const addTodoAction = {
  type: 'todos/todoAdded', // 描述發生了什麼事件
  payload: 'Buy milk' // 其他附加的資訊
}
```

**2. Action Creators**

是建立和回傳 action object 的 function，以利於不用每次都寫一次 action object。

```
const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}
```

**3. Reducers**

接收 state 和 action object 的 function，依需要決定要如何更新 state，並且回傳新的 state：`(state, action) => newState`。可以把 reducer 想成是依據收到的 action type 去處理事件的事件監聽。

```
const initialState = {
  todos: []
}

function todosReducer(state = initialState, action) {
  // 檢查 reducer 有沒有要管這個 action
  if (action.type === 'todos/todoAdded') {
    return {
      todos: [
        ...state.todos,
        action.payload
      ]
    }
  }
  // 如果沒有改變，就回傳原來的 state
  return state
}

```

Reducers 需要遵守的規定：
1. 只能根據 state 和 action 回傳新的 state
2. 不能改變已經存在的 state，只能使用 immutable updates
3. 不能做非同步的邏輯、計算隨機的值，或是其他會造成 side effects 的邏輯

**4. store**

Redux 會將 state 存取在 store 中。

**5. dispatch**

Redux store 其中之一的功能。在 Redux 中要更新 state 只能透過 `store.dispatch({type: 'addTodo'})`。store 便會去跑 reducer function 並存取新的 state，再呼叫 `getState()` 得到更新的值。可以將 dispatch 想像成是啟動事件。  
通常會傳入 action creators：

```
const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}

store.dispatch(increment())
```

**6. selectors**

從 store state 中提取特定的資料的 function。因為 components 會根據 selector 回傳的值而重新渲染，所以 components 最好能只選取必要的最小資料量。利用 selectors，在較大型的專案就可以避免回傳一堆沒必要的資料或是重複的邏輯。

### **資料流：**

Redux 使用單向資料流（one-way data flow）建構應用程式的架構。  
大方向的的單向資料流順序可分為以下四步驟：
1. 初始化 state
2. 根據 state 的變動渲染畫面
3. state 根據使用者操作特定功能而改變
4. 畫面會根據更新後的 state 重新渲染

而 Redux 可再更細分為：  
* Initial setup
1. 利用 root reducer function 建立 Redux store
2. store 會呼叫 root reducer 一次，並存取回傳的值當作初始的 state
3. 當第一次渲染畫面時，components 會存取並根據 Redux store 中最新的 state 決定要渲染什麼。並且也會訂閱（subscribe）未來任何 store 的變動，以便知道 state 有沒有改變。
Updates
1. 使用者操作特定功能->事件發生（例如使用者新增 todo list 的項目）
2. 分配（dispatch）action 到 Redux store（例如 `dispatch({type: 'add_todo'})`）
3. Redux store 根據前次的 state 和現在的 action 跑 reducer function，並跟回傳的值存取新的 state
4. Redux store 提醒有監聽 store 的 components 說 store 已經更新了
5. 各個 component 檢查各自有使用的 state 是否有變動
6. 如果使用的 state 有變動的話，component 會依據新的資料重新渲染，以確保畫面與資料一致

[請點此看 Redux 官網視覺化後的資料流](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

**參考：**
1. [Redux Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
2. [glossary](https://redux.js.org/understanding/thinking-in-redux/glossary)


---


## 該怎麼把 React 跟 Redux 串起來？

**利用 react-redux：**
1. 安裝 redux：`npm install redux`
2. 安裝 react-redux：`npm install react-redux`
3. 建立 store；
   
   ```
   import { createStore } from 'redux';
   import rootReducer from './reducers';

   export default createStore(rootReducer);
   ```

4. actionTypes（可選用，為防止因為打錯字 app 掛掉）
   
   ```
   export const ADD_TODO = 'add_todo';
   ```

5. actions (action creator)
   
   ```
   // 先引入 actionTypes
   import { ADD_TODO } from './actionTypes'

   export function addTodo(name) {
     return {
       type: ADD_TODO,
       payload: {
         name
       }
     }
   }
   ```

6. 建立 reducer
   
   ```
   import { ADD_TODO } from './actionTypes'

   let todoId = 0;

   const initialState = {
     todos: []
   }

   export default function todoReducer(state = initialState, action) {
     switch(action.type) {
       case ADD_TODO: {
         return {
           ...state,
           todos: [
             ...state.todos, {
               id: todoId++
             }
           ]
         }
       }
       default:
         return state
     }
   }
   ```

7. combineReducers：如果有多個 reducers 的話，可以利用 redux 提供的 combineReducers 整併
   
   ```
   import { combineReducers } from 'redux';

   import todos from './todos';

   export defualt combineReducers({ todoReducer: todos })
   ```

8. Provider：讓 store 的內容可以給 components 使用
   
   ```
   import { Provider } from 'react-redux';
   import store from './redux/store';

   ReactDom.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   );

   ```

9. 利用 hooks `useSelector` 拿資料：
    
    ```
    import { useSelector } from 'react-redux';

    function App {
      const todos = useSelector(store => store.todoReducer.todos)

      return (
        <div>{todos.name}</div>
      )
    }

    export default App;
    ```

10. 利用 `useDispatch` 使用 dispatch：
    
    ```
    import { useSelector, useDispatch } from 'react-redux';
    
    function App {
      const todos = useSelector(store => store.todoReducer.todos);
      const dispatch = useDispatch();

      return (
        <div>
          <button onClick={() => dispatch(addTodo('name'))}>add>/button>
        </div>
      )
    }
    ```

其他補充：  
1. 如果不用 hooks 用 `connect()`，因為沒有實際自己寫過，一切先參考[官網](https://react-redux.js.org/introduction/quick-start)。
2. useSelector 是 strict === reference comparison
3. connect 是 shallow equality

**參考：**
1. [React Redux - quick start](https://react-redux.js.org/introduction/quick-start)
2. [React Redux - hooks](https://react-redux.js.org/api/hooks)