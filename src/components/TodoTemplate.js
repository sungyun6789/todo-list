import React from 'react';
import { TodoTemplateBlock } from './styledcomponents/TodoTemplateStyle';

// children 속성을 넣어주면서 TodoTemplate 사이에 내용을 보여주고 있다. 여기서는 확인이 잘 안되고 App.js에 가면 제대로 확인할 수 있다.
const TodoTemplate = ({ children }) => {
    return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

// 다른 파일에서도 TodoTemplate를 사용할 수 있도록 export 해주었다.
export default TodoTemplate;