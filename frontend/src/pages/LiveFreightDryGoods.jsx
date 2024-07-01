import React, { useState } from 'react';
import "./LiveFreightDryGoods.scss";
import { LiveFreightProvider, useLiveFreight } from '../context/LiveFreightContext';
import { IconSquareRoundedCheck, IconRecycle, IconDoorExit } from '@tabler/icons-react'
import { NewDryGoodsLive } from '../components/NewDryGoodsLive';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const LiveFreightDryGoods = () => {
  return (
    <LiveFreightProvider>
        <LiveFreightDryGoodsComponent />
    </LiveFreightProvider>
  )
}

export default LiveFreightDryGoods;

const LiveFreightDryGoodsComponent = () => {
    const {tasks, finishTask, pauseTask} = useLiveFreight();
    const [showingNewTask, setShowingNewTask] = useState(false);
    const [showingContinuePopup, setShowingContinuePopup] = useState(false);

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
            default:
                return <p className='item status'></p>
        }
    }
    const continueAbandonedTask = (taskId, aisle, boxCount, toteCount) => {
        setShowingContinuePopup(true);
        // setNewTask((prevTask) => {
        //     const task = {...prevTask};
        //     task.abandonedId = taskId;
        //     task.aisle = aisle;
        //     task.boxCount = boxCount;
        //     task.toteCount = toteCount;
        //     task.status = "IN PROGRESS"
        //     return task;
        // })
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
                            {/* <select name='userId' onChange={handleChange}>
                                {
                                    newTaskOptions.users.map((user, index) => (
                                        <option key={index} value={user.id}>{user.firstName}</option>
                                    ))
                                }
                            </select>
                            <button onClick={() => {
                                continueTask(newTask);
                                setShowingContinuePopup(false);
                                }}>Continue</button>
                            <button onClick={handleClose}>Cancel</button> */}
                        </div>
                    </div>
                ): null
            }
            <section className='newTaskContainer'>
                {
                    showingNewTask ? (
                        <NewDryGoodsLive  setShowingNewTask={setShowingNewTask}/>
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
                                    <button onClick={() => finishTask(task.id)}>Finished</button>
                                    <button onClick={() => pauseTask(task.id)}>Abandon</button>
                                </div>
                            ): task.status === "ABANDONED" ? (
                                <div className='item endTime endTimeContainer'>
                                    <button onClick={() => continueAbandonedTask(task.id, task.aisle, task.boxCount, task.toteCount)}>Continue</button>
                                </div>
                            ): (
                                <p className='item endTime'>{formatTime(task.endTime)}</p>
                            )
                        }
                    </div>
                ))
            }
            </section>
        </main>
        </>
    )
  }