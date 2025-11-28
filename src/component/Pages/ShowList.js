
import React, { useState, useEffect } from 'react';
import { getStudents } from '../../services/studentApi';
import { Link } from 'react-router-dom';

const ShowList = () => {
    const [students, setStudents] = useState([]); 
    const [loading, setLoading] = useState(false);
    
    const fetchStudents = async () => {
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div>
            <h2>학생 목록 (/list)</h2>
            <button className="btn btn-info m-1" onClick={fetchStudents}>목록 새로고침</button>
            
            <div id="div_list1" className="p-3 mb-2 bg-light border">
                {loading && <p>로딩 중...</p>}
                {!loading && students.length === 0 && <p>조회된 학생이 없습니다. '목록 새로고침'을 눌러보세요.</p>}
                {!loading && students.map(s => (
                    <div key={s.id} className="border-bottom py-1">
                        {`${s.id} : ${s.name} (${s.age}, ${s.gender || "미입력"})`} 
                        {}
                        <Link to={`/update/${s.id}`} className="btn btn-sm btn-link">수정</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowList;