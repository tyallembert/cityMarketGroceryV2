import React, { useEffect, useState } from 'react';
import "./AdminLiveFreightDryGoods.scss";
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const AdminLiveFreightDryGoods = () => {
  const [tasks, setTasks] = useState([]);
  const [totalBoxes, setTotalBoxes] = useState(null);
  const [totalTotes, setTotalTotes] = useState(null);
  const [boxesPerAisle, setBoxesPerAisle] = useState([]);
  const [totesPerAisle, setTotesPerAisle] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async() => {
      const formattedDate = formatDate(date);
      const request = await fetch(process.env.REACT_APP_API_URL + "/admin/dryGoodsLive", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({date: formattedDate})
      })
      if(!request.ok) {
        console.log("Error retrieving tasks");
      } else {
        const data = await request.json();
        setBoxesPerAisle(data.boxesPerAisle)
        setTotesPerAisle(data.totesPerAisle)
        setTasks(data.tasks);
        setTotalBoxes(data.boxCount);
        setTotalTotes(data.toteCount);
      }
    }
    fetchData();
  }, [date])

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value.replace(/-/g, '/'));
    setDate(newDate);
  }
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
  const getDaysOld = () => {
    const today = new Date();
    const diffInTime = today - date;
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffInDays / 7);
    const days = diffInDays % 7;

    return { weeks, days };
  };

  const { weeks, days } = getDaysOld();
  return (
    <>
    <Header />
    <Navigation />
    <main className='adminpage'>
        <div className='dayBreakdownContainer'>
          <div className='infoBox totals'>
            <div className='boxesContainer'>
              <p className='boxesTitle'>Total Boxes</p>
              <h2 className='boxesAmount'>{totalBoxes}</h2>
            </div>
            <div className='totesContainer'>
              <p className='totesTitle'>Total Totes</p>
              <h2 className='totesAmount'>{totalTotes}</h2>
            </div>
            <table className='perAisleTable'>
              <tbody>
              <tr>
                <th colSpan="8">Total Per Aisle</th>
              </tr>
                <tr>
                  <th>Aisle</th>
                  {
                    [1,2,3,4,5,6,7].map((aisle, index) => <th key={index}>{aisle}</th>)
                  }
                </tr>
                <tr>
                  <th>Boxes</th>
                  {
                    boxesPerAisle.map((aisle, index) => {
                      return (
                        <td key={index}>{aisle.totalBoxes}</td>
                      )
                    })
                  }
                </tr>
                <tr>
                  <th>Totes</th>
                  {
                    totesPerAisle.map((aisle, index) => {
                      return (
                        <td key={index}>{aisle.totalTotes}</td>
                      )
                    })
                  }
                </tr>
              </tbody>
            </table>
          </div>
          <div className='infoBox datePicker'>
            {
              weeks === 0 && days === 0 ? (
                <h2>Today</h2>
              ): weeks < 0 || days < 0 ? (
                <h2>Whoops thats the future</h2>
              ): (
                <h2>{weeks !== 0 ? `${weeks} ${weeks === 1 ? "week": "weeks"} and`: null} {days} {days === 1 ? "day": "days"} ago</h2>
              )
            }
            <input 
            className='datePickerInput'
            type='date' 
            onChange={handleDateChange} 
            value={
              date.getFullYear().toString() +
              "-" +
              (date.getMonth() + 1).toString().padStart(2, 0) +
              "-" +
              date.getDate().toString().padStart(2, 0)
            }/>
          </div>
          <section className='tasksContainer'>
            <div className='titleRow'>
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
                      <p className='item name'>{task.employeeId.firstName}</p>
                      <p className='item aisle'>{task.aisle}</p>
                      <p className='item boxCount'>{task.boxCount}</p>
                      <p className='item toteCount'>{task.toteCount}</p>
                      <p className='item startTime'>{formatTime(task.startTime)}</p>
                      <p className='item endTime'>{task.endTime ? formatTime(task.endTime): "unfinished"}</p>
                    </div>
                ))
            ): (
                <h1 className='noTasks'>No Tasks Started Today</h1>
            )
        }
        </section>
        </div>
        <div className='graphsContainer'>
          <div className='graph'></div>
          <div className='graph'></div>
        </div>
    </main>
    </>
  )
}

export default AdminLiveFreightDryGoods