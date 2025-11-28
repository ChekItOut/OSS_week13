// src/component/Pages/DeletePage.js
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteStudent } from '../../services/studentApi'; 

const DeletePage = () => {
    const navigate = useNavigate();
    const { id: routeId } = useParams(); 

    const [deleteId, setDeleteId] = useState(routeId || '');
    
    const idRef = useRef(null);

    const handleDelete = async () => {
        const id = deleteId;

        if (!id || isNaN(id) || Number(id) <= 0) {
            alert("유효한 학생 ID를 입력하세요.");
            if (idRef.current) idRef.current.focus();
            return;
        }

        if (window.confirm(`ID ${id} 학생을 정말 삭제하시겠습니까? `)) {
            try {
                await deleteStudent(id);
                alert(`ID ${id} 학생 삭제가 완료되었습니다.`);
                navigate('/list'); 
            } catch (e) {
               
            }
        }
    };

    return (
        <div>
            <h2>학생 삭제 (Delete - /delete)</h2>
            <div className="card p-3 bg-danger-subtle">
                
                <div className="mb-3">
                    ID : <input 
                        type="number" 
                        id="deleteId" 
                        className="form-control" 
                        value={deleteId} 
                        onChange={(e) => setDeleteId(e.target.value)} 
                        ref={idRef} 
                        placeholder="삭제할 학생 ID 입력"
                    />
                </div>
                <button className="btn btn-danger m-1" onClick={handleDelete}>학생 삭제</button>
            </div>
        </div>
    );
};

export default DeletePage;