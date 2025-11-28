import React, { useState, useRef } from 'react';
import { createStudent } from '../../services/studentApi'; // 올바른 상대 경로

const CreatePage = () => {
    const [inputs, setInputs] = useState({
        name: '',
        age: '',
        gender: ''
    });

    const nameRef = useRef(null);
    const ageRef = useRef(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleCreate = async () => {
        if (!inputs.name) {
            alert("이름을 입력하세요.");
            nameRef.current.focus(); 
            return;
        }
        if (!inputs.age || isNaN(inputs.age) || Number(inputs.age) <= 0) {
            alert("유효한 나이를 입력하세요.");
            ageRef.current.focus();
            return;
        }

        const data = { name: inputs.name, age: Number(inputs.age), gender: inputs.gender };
        
        try {
            await createStudent(data);
            alert(`학생 ${inputs.name} 추가 완료!`);
            
            setInputs({ name: '', age: '', gender: '' }); 
        } catch (e) {

        }
    };

    return (
        <div>
            <h2>학생 생성 (Create - /detail)</h2>
            <div className="card p-3">
                <div className="mb-2">
                    name : <input 
                        type="text" 
                        id="name" 
                        className="form-control" 
                        value={inputs.name} 
                        onChange={handleInputChange} 
                        ref={nameRef} 
                        placeholder="이름"
                    />
                </div>
                <div className="mb-2">
                    age : <input 
                        type="number" 
                        id="age" 
                        className="form-control" 
                        value={inputs.age} 
                        onChange={handleInputChange} 
                        ref={ageRef} 
                        placeholder="나이"
                    />
                </div>
                <div className="mb-2">
                    gender : <input 
                        type="text" 
                        id="gender" 
                        className="form-control" 
                        value={inputs.gender} 
                        onChange={handleInputChange} 
                        placeholder="성별 (선택 사항)"
                    />
                </div>
                <button className="btn btn-primary m-1" onClick={handleCreate}>학생 저장하기</button>
            </div>
        </div>
    );
};

export default CreatePage;