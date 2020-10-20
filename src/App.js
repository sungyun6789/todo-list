import React from 'react';
import GlobalStyle from './components/styledcomponents/AppStyle';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';

/*
각 컴포넌트들의 역할
TodoProvider - Context 를 이용한 컴포넌트
GlobalStyle - 배경색을 바꿔주는 스타일드 컴포넌트
TodoTemplate - TodoList의 기본적인 틀을 잡음
TodoHead - 년, 월, 일 요일, 남은 할 일 등을 보여줌
TodoList - 할 일 목록을 보여주고 done라는 것을 통해서 true, false를 나눠가지고 값이 반전되게 만들어줌
TodoCreate - + 버튼을 누르면 새로운 할 일을 추가할 수 있게 만들어줌
*/

const App = () => {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;