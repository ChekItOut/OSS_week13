
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShowList from "./component/Pages/ShowList";
import CreatePage from "./component/Pages/CreatePage";
import UpdatePage from "./component/Pages/UpdatePage";
import DeletePage from "./component/Pages/DeletePage"; // 💡 DeletePage 임포트

const App = () => {
    return (
        <Router>
            <div className="container mt-4">
                <h1>🔥학생정보 관리 (CRUD with Hooks)🔥</h1>
                <nav className="mb-3">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link text-primary" href="/list">목록 조회 (/list)</a> 
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-success" href="/detail">학생 생성 (/detail)</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-warning" href="/update">학생 수정 (/update)</a>
                        </li>
                        <li className="nav-item">
                            {}
                            <a className="nav-link text-danger" href="/delete">학생 삭제 (/delete)</a> 
                        </li>
                    </ul>
                </nav>
                <div className="card p-4">
                    <Routes>
                        <Route path="/" element={<Navigate to="/list" replace />} />
                        <Route path="/list" element={<ShowList />} />
                        <Route path="/detail" element={<CreatePage />} />
                        <Route path="/update" element={<UpdatePage />} /> 
                        <Route path="/update/:id" element={<UpdatePage />} />
                        
                        {}
                        <Route path="/delete" element={<DeletePage />} />
                        <Route path="/delete/:id" element={<DeletePage />} /> 
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;