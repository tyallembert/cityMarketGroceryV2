import React, { useEffect, useState } from 'react';
import "./EmployeePicker.scss";

export const EmployeePicker = ({ handleChange }) => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/employees',
                {
                    'Content-Type': 'application/json'
                }
            );
            const data = await response.json();
            setEmployees(data);
        }
        fetchData();
    }, [])
    return (
        <label className="employeePicker" htmlFor='employeeId'>
            <p>Name</p>
            <select name='employeeId' onChange={handleChange}>
                <option>Choose</option>
                {
                    employees.map((user, index) => (
                        <option key={index} value={user.id}>{user.firstName}</option>
                    ))
                }
            </select>
        </label>
    )
}
