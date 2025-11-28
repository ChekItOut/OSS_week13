import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import ShowList from "./component/Pages/ShowList"; // 기존 코드 주석 또는 삭제
import App from "./App"; // App 컴포넌트 임포트

const root = ReactDOM.createRoot(document.getElementById('root'));
// const myComponent = <ShowList/>; // 기존 코드 주석 또는 삭제
// root.render(myComponent); // 기존 코드 주석 또는 삭제
root.render(<App/>); // App 컴포넌트 렌더링


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();