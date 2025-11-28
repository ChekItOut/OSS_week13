import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudents, updateStudent } from '../../services/studentApi'; 

const UpdatePage = () => {
    const { id: routeId } = useParams(); 
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        id: routeId || '', 
        name: '',
        age: '',
        gender: ''
    });
    
    const initialLoadRef = useRef(true); 
    const updateCountRef = useRef(0); 

    const idRef = useRef(null);
    const nameRef = useRef(null);
    const ageRef = useRef(null);

    useEffect(() => {
        if (routeId) {
            const fetchStudentData = async () => {
                const allStudents = await getStudents(); 
                const student = allStudents.find(s => String(s.id) === routeId);
                
                if (student) {
                    setInputs({
                        id: student.id,
                        name: student.name,
                        age: student.age,
                        gender: student.gender || '',
                    });
                } else {
                    alert(`ID ${routeId}인 학생 데이터를 찾을 수 없습니다.`);
                    navigate('/list'); 
                }
            };
            fetchStudentData();
        }
    }, [routeId, navigate]);

    useEffect(() => {

        if (initialLoadRef.current) {
            initialLoadRef.current = false;
            return;
        }
        if (!inputs.id || !inputs.name || !inputs.age) return; 

        const performUpdate = async () => {
            const dataToUpdate = { 
                name: inputs.name, 
                age: Number(inputs.age), 
                gender: inputs.gender 
            };
            
            try {
                updateCountRef.current += 1;
               
                setInputs(prev => ({ ...prev })); 
                
                await updateStudent(inputs.id, dataToUpdate);
                console.log(`ID ${inputs.id} 학생 정보 수정 완료 (총 ${updateCountRef.current}회)`);

            } catch (e) {
                console.error("실시간 업데이트 실패:", e);
            }
        };

        const handler = setTimeout(() => {
            performUpdate();
        }, 500); 

        return () => {
            clearTimeout(handler);
        };
        
    }, [inputs.name, inputs.age, inputs.gender, inputs.id]); 


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };
    
    const checkAndFocus = () => {
        if (!inputs.id || isNaN(inputs.id) || Number(inputs.id) <= 0) {
            alert("유효한 학생 ID를 입력하세요.");
            idRef.current.focus();
            return false;
        }
        if (!inputs.name) {
            alert("이름을 입력하세요.");
            nameRef.current.focus();
            return false;
        }
        if (!inputs.age || isNaN(inputs.age) || Number(inputs.age) <= 0) {
            alert("유효한 나이를 입력하세요.");
            ageRef.current.focus();
            return false;
        }
        alert("모든 필드가 유효합니다!");
        return true;
    };
    
    return (
        <div>
            <h2>학생 수정 (Update - /update)</h2>
            
            {}
            <p className="text-primary">
                페이지 로딩 후 총 수정 횟수: {updateCountRef.current}회
            </p>
            <button className="btn btn-primary mb-3" onClick={checkAndFocus}>유효성 검사 실행 (useRef 확인)</button>

            <div className="card p-3">
                <div className="mb-2">
                    ID : <input 
                        type="number" 
                        id="id" 
                        className="form-control" 
                        value={inputs.id} 
                        onChange={handleInputChange}
                        ref={idRef}
                        placeholder="수정할 학생 ID"
                        disabled={!!routeId}
                    />
                </div>
                <div className="mb-2">
                    Name : <input 
                        type="text" 
                        id="name" 
                        className="form-control" 
                        value={inputs.name} 
                        onChange={handleInputChange} 
                        ref={nameRef}
                        placeholder="수정할 이름"
                    />
                </div>
                <div className="mb-2">
                    Age : <input 
                        type="number" 
                        id="age" 
                        className="form-control" 
                        value={inputs.age} 
                        onChange={handleInputChange} 
                        ref={ageRef} 
                        placeholder="수정할 나이"
                    />
                </div>
                <div className="mb-2">
                    Gender : <input 
                        type="text" 
                        id="gender" 
                        className="form-control" 
                        value={inputs.gender} 
                        onChange={handleInputChange} 
                        placeholder="수정할 성별"
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdatePage;