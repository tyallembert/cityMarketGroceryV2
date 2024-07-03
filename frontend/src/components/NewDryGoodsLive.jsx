import React, { useState } from 'react'
import { EmployeePicker } from './EmployeePicker'
import { useLiveFreight } from '../context/LiveFreightContext';
import { IconCheck, IconX } from '@tabler/icons-react';
import "./NewDryGoodsLive.scss";

export const NewDryGoodsLive = ({ setShowingNewTask }) => {
    const {newTaskOptions, saveNewTask} = useLiveFreight();
    const [newTask, setNewTask] = useState(
        {
            employeeId: null,
            aisle: null,
            boxCount: "0",
            toteCount: "0",
        }
    );
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        if(value === "Choose") {
            value = null;
        }
        setNewTask({...newTask, [name]: value});
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const completed = saveNewTask(newTask);
        if(completed) {
            setShowingNewTask(false)
        } 
    }
  return (
    <form className='newTaskForm'>
        <EmployeePicker handleChange={handleChange}/>
        <label htmlFor='aisle'>
            <p>Aisle</p>
            <select name='aisle' onChange={handleChange}>
                <option>Choose</option>
                {
                    newTaskOptions.aisles.map((aisle, index) => (
                        <option key={index} value={aisle}>{aisle}</option>
                    ))
                }
            </select>
        </label>
        <label htmlFor='boxCount'>
            <p>Boxes: {newTask.boxCount}</p>
            <input type="range" 
            name='boxCount'
            min="0" 
            max="120" 
            value={newTask.boxCount}
            onChange={handleChange} />
        </label>
        <label htmlFor='toteCount'>
            <p>Totes: {newTask.toteCount}</p>
            <input type="range" 
            name='toteCount'
            min="0" 
            max="25" 
            value={newTask.toteCount}
            onChange={handleChange} />
        </label>
        <button onClick={handleSubmit} 
        className='formButton submitButton'
        disabled={(!newTask.employeeId || !newTask.aisle)? true: false}><IconCheck /></button>
        <button onClick={() => setShowingNewTask(false)} className='formButton cancelButton'><IconX /></button>
    </form>
  )
}
