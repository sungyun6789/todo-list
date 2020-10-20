import React, { useReducer, createContext, useContext, useRef } from 'react';

// initialTodos에 할 일 목록을 배열로 추가해줬다. done가 true면 체크되고 false면 아직 안끝났으니 아무표시도 안되도록 설정
const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false
    }
];


/*
    state, action 배열과 액션(행동) 이다
    액션에서 어떤 동작을 했는지 감지하는 부분
    CREATE라면 state 배열에 action.todo를 추가해서 반환
    map함수를 사용해 todo의 id와 action의 id가 같은지 다른지를 확인해서 todo의 참과 거짓을 반전시키는 코드이다.
    filter함수를 사용해 todo 매개변수를 받아서 todo.id 와 action.id가 같지 않은 경우를 제외하고 새로 반환시키는 코드이다.
*/
const todoReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}


// createContext() 를 통해서 ContextAPI를 사용하고 있다.
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


/* 
    useReducer Hook을 사용하고 있는데 state는 우리가 컴포넌트에서 사용 할 상태를 가리키고 dispatch는 액션을 발생시키는 함수이다.
    useReducer(todoReducer, initialTodos) 현재 상태가 CREATE인지 TOGGLE인지 REMOVE인지 확인하기 위한 함수를 가져왔고
    initialTodos를 가져온 이유는 파라미터의 초기 상태를 가리키는 것이다.
*/
export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);


    /*
        Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.
        Provider는 value prop를 받아서 이 값을 하위에 있는 컴포넌트들에게 전달하는데 value가 바뀔 때 마다 렌더링 된다.
        * Provider는 context를 생성할 때 사용하는 제공자 역할인데 TodoStateContext.Provider value={state}하면 
        다른 컴포넌트에서 TodoStateContext를 호출했을 때 value값 안에 있는 state를 사용할 수 있는 것이다. * - 한줄요약: state를 다른 컴포넌트에서 쓰고싶으면 provider해서 값을 넘겨줘야 함
        children을 매개변수로 가져와 넣은 이유는 태그와 태그 사이에 내용을 보여주기 위해서인데
        저걸 받아오지 않는다면 이 컴포넌트에 있는 내용은 뜨지 않을 것이다.
    */
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}


/*
아래 3개의 함수는 useContext를 이용한 커스텀 훅이다.
export 하면서 다른 컴포넌트에서도 가져다 쓸 수 있도록 설정해놨다.
const context = useContext(''); 이 부분은 위에 createContext 해둔 부분을 가져오는 것이고
if(!context) context를 가져오지 못할 때 throw(현재 함수의 실행지 중지) Error('')메세지를 띄워라 라는 코드이다.
*/
export const useTodoState = () => {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw Error('Cannot find TodoProvider');
    }
    return context;
}

export const useTodoDispatch = () => {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw Error('Cannot find TodoProvider');
    }
    return context;
}

export const useTodoNextId = () => {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw Error('Cannot find TodoProvider');
    }
    return context;
}