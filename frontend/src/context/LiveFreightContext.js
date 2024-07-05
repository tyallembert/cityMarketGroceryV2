import { createContext, useContext, useEffect, useState } from 'react';

const LiveFreightContext = createContext(null);

function LiveFreightProvider({ children }) {
    const [tasks, setTasks] = useState([])
    const [newTaskOptions, setNewTaskOptions] = useState({});

    useEffect(() => {
        fetchTasks();
        fetchOptions();
    }, [])
    
    /*
        This function will send a POST request to the server to save the new task element to the database.
        Then it will populate the task object with the new task.
    */
    const saveNewTask = async(newTask) => {
        // setTasks([...tasks, newTask]);
        const data = await fetch("http://localhost:8000/dryGoodsLive/new", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        if(data.ok) {
            console.log("SUCCESS");
            fetchTasks();
            return true;
        } else {
            console.log("ERROR")
            return false;
        }
    }
    /*
        This function will send a POST request to the server to update the task element.
        Then it will populate the task object with the new task.
    */
    const finishTask = async(taskId) => {
        const data = await fetch(`http://localhost:8000/dryGoodsLive/finish/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(data.ok) {
            console.log("SUCCESS");
            fetchTasks();
            return true;
        } else {
            console.log("ERROR")
            return false;
        }
    }
    /*
        This function will send a POST request to the server to update the task element.
        Then it will populate the task object with the new task.
    */
    const abandonTask = async(taskId) => {
        const data = await fetch(`http://localhost:8000/dryGoodsLive/abandon/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(data.ok) {
            console.log("SUCCESS");
            fetchTasks();
            return true;
        } else {
            console.log("ERROR")
            return false;
        }
    }
    /*
        This function will cretae a new task but will populate the type with CONTINUED and the abandonedId with the current tasks id.
        Then it will update the old task to have a type of ABANDONED so it is not shown in the current tasks.
        Then it will populate the task object with the new task.
    */
        const continueTask = async(abandonedTaskId, employeeId) => {
            const data = await fetch(`http://localhost:8000/dryGoodsLive/continue/${abandonedTaskId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({employeeId: employeeId})
            })
            if(data.ok) {
                console.log("SUCCESS");
                fetchTasks();
                return true;
            } else {
                console.log("ERROR")
                return false;
            }
        }
    /*
        This function will retrieve the options associated with a new live freight aisle.
        These may include all the users(employees) and the aisle options.
    */
    const fetchOptions = () => {
        const options = {
            users: [
                {
                    id: 1,
                    firstName: "Ty",
                },
                {
                    id: 2,
                    firstName: "Issy"
                },
                {
                    id: 3,
                    firstName: "Jordy"
                }
            ],
            aisles: [1, 2, 3, 4, 5, 6, 7]
        }
        setNewTaskOptions(options);
    }
    const fetchTasks = async() => {
        
        const resData = await fetch('http://localhost:8000/dryGoodsLive/today',
            {
                'Content-Type': 'application/json'
            }
        );
        const data = await resData.json();
        setTasks(data);
    }
    return (
        <LiveFreightContext.Provider value={{tasks, newTaskOptions, saveNewTask, finishTask, abandonTask, continueTask}}>
            {children}
        </LiveFreightContext.Provider>
    )
}

function useLiveFreight() {
	const context = useContext(LiveFreightContext)
	if (context === undefined) {
		throw new Error('useCount must be used within a CountProvider')
	}
	return context
}

export { LiveFreightProvider, useLiveFreight }