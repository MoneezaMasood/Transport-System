import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate replaces useHistory in v6

function LoginComponent() {
    const navigate = useNavigate();  // Changed from useHistory to useNavigate

    const handleSelectRole = (role) => {
        navigate(`/${role}`);
    };

    return (
        <div>
            <h1>Select Your Role</h1>
            <button onClick={() => handleSelectRole('admin')}>Admin</button>
            <button onClick={() => handleSelectRole('faculty')}>Faculty</button>
            <button onClick={() => handleSelectRole('student')}>Student</button>
        </div>
    );
}

export default LoginComponent;
