import React, { useState } from 'react';
import "./LiveFreightDryGoods.scss";
import { LiveFreightProvider, useLiveFreight } from '../context/LiveFreightContext';
import { IconSquareRoundedCheck, IconRecycle, IconDoorExit, IconCheck, IconArrowForwardUp } from '@tabler/icons-react'
import { NewDryGoodsLive } from '../components/NewDryGoodsLive';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { EmployeePicker } from '../components/EmployeePicker';

const LiveFreightDryGoods = () => {
  return (
    <LiveFreightProvider>
        <LiveFreightDryGoodsComponent />
    </LiveFreightProvider>
  )
}

export default LiveFreightDryGoods;

const LiveFreightDryGoodsComponent = () => {
    const {tasks, finishTask, abandonTask, continueTask} = useLiveFreight();
    const [showingNewTask, setShowingNewTask] = useState(false);
    const [showingContinuePopup, setShowingContinuePopup] = useState(false);
    const [continueTaskInfo, setContinueTaskInfo] = useState({
        taskId: null,
        aisle: null,
        formerEmployee: null,
        employeeId: null
    });

    const continueEmployeeChange = (e) => {
        const value = e.target.value;
        setContinueTaskInfo({...continueTaskInfo, employeeId: value});
    }
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        return`${hours}:${minutes} ${ampm}`;
    }
    const getStatusAnimation = (status) => {
        switch(status) {
            case "IN PROGRESS":
                return (
                    <div className='item status inProgress'>
                        <IconRecycle className='icon' />
                        <p className='text'>In Progress</p>
                    </div>
                )
            case "FINISHED":
                return (
                    <div className='item status finished'>
                        <IconSquareRoundedCheck className='icon'/>
                        <p className='text'>Finished</p>
                    </div>
                )
            case "ABANDONED":
                return (
                    <div className='item status abandoned'>
                        <IconDoorExit className='icon' />
                        <p className='text'>Abandoned</p>
                    </div>
                )
            case "PICKED UP":
                return (
                    <div className='item status pickedUp'>
                        <IconSquareRoundedCheck className='icon' />
                        <p className='text'>Picked Up</p>
                    </div>
                )
            default:
                return <p className='item status'></p>
        }
    }
    const closeContinuePopup = () => {
        setShowingContinuePopup(false);
        setContinueTaskInfo({taskId: null, empoloyeeId: null});
    }
    const confirmContinue = async(taskId, employeeId) => {
        const complete = await continueTask(taskId, employeeId);
        if(complete) {
            setShowingContinuePopup(false);
        }
    }

    return (
        <>
        <Header />
        <Navigation />
        <main className='dryGoodsLive'>
            {
                showingContinuePopup ? (
                    <div className='abandonedPopup'>
                        <div className='abandonedContainer'>
                            <h2>Confirm!</h2>
                            <p className='text'>Continue aisle <span>{continueTaskInfo.aisle}</span> for <span>{continueTaskInfo.formerEmployee}</span></p>
                            <EmployeePicker handleChange={continueEmployeeChange}/>
                            <button className="button" 
                            disabled={(!continueTaskInfo.taskId || !continueTaskInfo.employeeId || continueTaskInfo.employeeId === "Choose") ? true: false} 
                            onClick={()=>confirmContinue(continueTaskInfo.taskId, continueTaskInfo.employeeId)}>Continue</button>
                            <button className="button cancelButton" onClick={closeContinuePopup}>Cancel</button>
                        </div>
                    </div>
                ): null
            }
            <section className='newTaskContainer'>
                {
                    showingNewTask ? (
                        <>
                        <h1 className='title'>New Aisle</h1>
                        <NewDryGoodsLive  setShowingNewTask={setShowingNewTask}/>
                        </>
                    ): (
                        <button className='newClassButton' onClick={()=>setShowingNewTask(!showingNewTask)}>Start Aisle</button>
                    )
                }
            </section>
            <section className='tasksContainer'>
                <div className='titleRow'>
                    <p className='item status'>Status</p>
                    <p className='item name'>Name</p>
                    <p className='item aisle'>Aisle</p>
                    <p className='item boxCount'>Boxes</p>
                    <p className='item toteCount'>Totes</p>
                    <p className='item startTime'>Start</p>
                    <p className='item endTime'>End</p>
                </div>
            {
                tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div key={index} className='row'>
                            {getStatusAnimation(task.status)}
                            <p className='item name'>{task.employeeId.firstName}</p>
                            <p className='item aisle'>{task.aisle}</p>
                            <p className='item boxCount'>{task.boxCount}</p>
                            <p className='item toteCount'>{task.toteCount}</p>
                            <p className='item startTime'>{formatTime(task.startTime)}</p>
                            {
                                task.status === "IN PROGRESS" ? (
                                    <div className='item endTime endTimeContainer'>
                                        <button className="button finishButton" onClick={() => finishTask(task.id)}>
                                            <IconCheck />
                                            <p>Finish</p>
                                        </button>
                                        <button className="button abandonButton" onClick={() => abandonTask(task.id)}>
                                            <IconDoorExit />
                                            <p>Abandon</p>
                                        </button>
                                    </div>
                                ): task.status === "ABANDONED" ? (
                                    <div className='item endTime endTimeContainer'>
                                        <button className="button continueButton" onClick={()=>{
                                            setShowingContinuePopup(true);
                                            setContinueTaskInfo({...continueTaskInfo, taskId: task.id, aisle: task.aisle, formerEmployee: task.employeeId.firstName})
                                            }}>
                                            <IconArrowForwardUp />
                                            <p>Continue</p>
                                        </button>
                                    </div>
                                ): (
                                    <p className='item endTime'>{formatTime(task.endTime)}</p>
                                )
                            }
                        </div>
                    ))
                ): (
                    <h1 className='noTasks'>No Tasks Started Today</h1>
                )
            }
            </section>
        </main>
        </>
    )
  }