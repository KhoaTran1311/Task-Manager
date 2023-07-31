import { useState, useEffect } from 'react'
import './App.css'
import { Input } from './components/Input.jsx';
import { RunningTask } from './components/RunningTask';
import { TaskList } from './components/TasksList';

function App() {
  const [newTask, setNewTask] = useState({});
  const [open, setOpen] = useState(false);

  // const [hours, setHours] = useState(JSON.parse(localStorage.getItem('running task'))['hours']);
  // const [minutes, setMinutes] = useState(JSON.parse(localStorage.getItem('running task'))['minutes']);
  // const [seconds, setSeconds] = useState(JSON.parse(localStorage.getItem('running task'))['seconds']);
  // const [ticks, setTicks] = useState(JSON.parse(localStorage.getItem('running task'))['ticks']);
  // const [runningTask, setRunningTask] = useState(JSON.parse(localStorage.getItem('running task')));
  // const [isActive, setIsActive] = useState(JSON.parse(localStorage.getItem('is Active')));  
  const [categoryArr, setCategoryArr] = useState(JSON.parse(localStorage.getItem('category array')));
  const [tasksArr, setTasksArr] = useState(JSON.parse(localStorage.getItem('task array')));
  
  
  // const [tasksArr, setTasksArr] = useState([]);
  // const [categoryArr, setCategoryArr] = useState([]);

  const [isActive, setIsActive] = useState(false);
  const [runningTask, setRunningTask] = useState({});
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [ticks, setTicks] = useState(0);
  const [checkedState, setCheckedState] = useState(
    new Array(tasksArr.length).fill(false)
  );
  
  

  
  const time = {
    ticks: ticks,
    seconds: seconds,
    minutes: minutes,
    hours: hours,
  }

  if (ticks >= 100) {
    setSeconds((prev) => prev +1);
    setTicks(0);
  };
  if (seconds >= 60) {
    setMinutes((prev) => prev + 1);
    setSeconds(0);
  };
  if (minutes >= 60) {
    setHours((prev) => prev + 1);
    setMinutes(0);
  };

  useEffect(() => {
    let intervalId = null;
    if (isActive) {
      intervalId = setInterval(() => {
        setTicks((prev) => prev + 1);
      }, 10);
    }
    else {
      clearInterval(intervalId);
    }
    return () => {
        clearInterval(intervalId);
    };
  }, [isActive]);



  const handleOnClick = (position, taskId) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    if (updatedCheckedState[position]){
      setIsActive(true);
      let foundTask = tasksArr.find(task => task.id === taskId);
      setTicks(foundTask.ticks);
      setSeconds(foundTask.seconds);
      setMinutes(foundTask.minutes);
      setHours(foundTask.hours);
      setRunningTask(foundTask);
    }
    else {
      setIsActive(false);
      runningTask.ticks = ticks;
      runningTask.seconds = seconds;
      runningTask.minutes = minutes;
      runningTask.hours = hours;
      setRunningTask({});
    }

  };


  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setNewTask((prev) => ({ ...prev, id: Date.now(), [name]: value, isRunning:false, ticks: 0, seconds: 0, minutes: 0, hours: 0}));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!newTask.title || (!newTask.category) || newTask.category === 'select') return;
    setTasksArr((prev) => [newTask, ...prev]);
    setNewTask({});
    location.reload();
  };

  const removeHandler = (taskId) => {
    let foundTask = tasksArr.find(task => task.id === taskId);
    const index = tasksArr.findIndex(task => task.id === taskId);
    setTasksArr((prev) => prev.filter(
      (task) => task.id !== taskId)
    );
    localStorage.setItem('task array', JSON.stringify(tasksArr));
    
    if (runningTask.id === foundTask.id) {
      setIsActive(false);
      setRunningTask({});
      
      const updatedCheckedState = checkedState.map((item, index) => {
        if (index === index) {
          return false;
        } else {
          return item;
        }
      })
      setCheckedState(updatedCheckedState)
    }
  }; 

  const handleOpen = (param) => {
    if (newTask.newCategory )return
    setOpen(param);
  }

  const clearCat = (catId) => {
    setCategoryArr((prev) => prev.filter(
      (cat) => cat.id !== catId)
    );
  }

  const selectCat = (value) => {
    setNewTask((prev) => ({...prev, category: value}));
    setOpen(false);
  }
  
  const addNewCat = () => {
    if (!newTask.newCategory) return; 
    setCategoryArr((prev) => [...prev, {name: newTask.newCategory, id: prev.length}]);
    setNewTask((prev) => ({...prev, category:'', newCategory:''}))
  }

  // const runningTaskDone = () => {
  //   setIsActive(false);
  //   // setIsPaused(true)
  //   runningTask.ticks = ticks;
  //   runningTask.seconds = seconds;
  //   runningTask.minutes = minutes;
  //   runningTask.hours = hours;
  //   // setTasksArr((prev) => [runningTask, ...prev]);
  //   setRunningTask({});
  //   localStorage.setItem('running task', JSON.stringify({}));
  // }

  // const clearTimeHandler = (taskId) => {
    // let foundTask = tasksArr.find(task => task.id === taskId);
    // const index = tasksArr.findIndex(task => task.id === taskId);
    // foundTask.ticks = 0;
    // foundTask.seconds = 0;
    // foundTask.minutes = 0;
    // foundTask.hours = 0;
    
    // setTasksArr((prev) => prev.filter(
    //   (task) => task.id !== taskId)
    // );
    // setTasksArr((prev) => [...prev.slice(0, index), foundTask, ...prev.slice(index)]);
    // if (runningTask.id === foundTask.id) {
    //   setIsActive(false);
    //   setRunningTask({});
      
    //   const updatedCheckedState = checkedState.map((c, i) => {
    //     if (i === index) {
    //       // Increment the clicked counter
    //       return false;
    //     } else {
    //       // The rest haven't changed
    //       return c;
    //     }
    //   })
    //   setCheckedState(updatedCheckedState)
    // }
  // }

  // const runTaskHandler = (taskId) => {
  //   let foundTask = tasksArr.find(task => task.id === taskId);
  //   if (runningTask.id !== undefined) {
  //     return;
  //   };
  //   setTicks(foundTask.ticks);
  //   setSeconds(foundTask.seconds);
  //   setMinutes(foundTask.minutes);
  //   setHours(foundTask.hours);
  //   setRunningTask(foundTask);
  //   // setTasksArr((prev) => prev.filter(
  //   //   (task) => task.id !== taskId)
  //   // );
  //   setIsActive(true);
  //   // setIsPaused(false);
    
  // }
  
  localStorage.setItem('task array', JSON.stringify(tasksArr));
  localStorage.setItem('category array',  JSON.stringify(categoryArr));
  localStorage.setItem('is Active', JSON.stringify(isActive));
  // localStorage.clear();
  
  return (
    <div>
      <h1 className="text-5xl font-bold text-zinc-800">
        TASK MANAGER 
      </h1>
      <Input 
        categoryArr={categoryArr}
        newTask={newTask} 
        submitHandler={submitHandler} 
        onChange={changeHandler}
        handleOpen={handleOpen}
        open={open}
        clearCat={clearCat}
        selectCat={selectCat}
        addNewCat={addNewCat}
        setOpen={setOpen}
      />
      {Object.keys(runningTask).length !== 0 ? 
        (<RunningTask 
          runningTask={runningTask}   
          isActive={isActive}
          ticks={ticks}
          seconds={seconds}
          minutes={minutes}
          hours={hours}
        />) : 
        (<div className='bg-zinc-800 w-[900px] list-none m-auto rounded-xl text-white p-7 my-5 font-bold text-xl'>NO RUNNING TASK</div>)}

      <TaskList 
        tasksArr={tasksArr}
        removeHandler={removeHandler}
        isRunningExist={isActive}
        handleOnClick={handleOnClick}
        checkedState={checkedState}
        isActive={isActive}
      />
    </div>
    
  )
}


export default App
