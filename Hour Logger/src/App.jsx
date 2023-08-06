import { useState, useEffect, useCallback } from 'react'
import './App.css'
import  Input  from './components/Input.jsx';
import RunningTask  from './components/RunningTask';
import  TaskList from './components/TasksList';
import dayjs from 'dayjs';



function App() {
  const [newTask, setNewTask] = useState({});
  const [open, setOpen] = useState(false);  
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
  const [isRunningArr, setIsRunningArr] = useState(
    new Array(tasksArr.length).fill(false)
  );
  const [taskExpandArr, setTaskExpandArr] = useState(
    new Array(tasksArr.length).fill(false)
  );
  const [timeLog, setTimeLog] = useState([]);


  const color = ['#D02570', '#2588d0', '#25d034', '#B97514']


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
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isActive]);



  const handleOnExpand = (position) => {
    const updatedTaskExpandArr = taskExpandArr.map((item, index) => 
      index === position ? !item : false
    );
    setTaskExpandArr(updatedTaskExpandArr);
  };

  
  const [currentDate, setCurrentDate] = useState(dayjs());

  const handleOnClick = (position, taskId) => {
    const updatedIsRunningArr = isRunningArr.map((item, index) =>
      index === position ? !item : item
    );
    setIsRunningArr(updatedIsRunningArr);
    const updatedTaskExpandArr = taskExpandArr.map((item, index) => 
      index === position ? false : false
    );
    setTaskExpandArr(updatedTaskExpandArr);
    if (updatedIsRunningArr[position]){
      setCurrentDate(dayjs());
      let foundTask = tasksArr.find(task => task.id === taskId);
      setTimeLog(foundTask.timeLog)
      if ((foundTask.timeLog.length === 0) || 
        ((dayjs(foundTask.timeLog[foundTask.timeLog.length - 1].startDate).date() !== dayjs(currentDate).date()) && 
          (dayjs(foundTask.timeLog[foundTask.timeLog.length - 1].startDate).day() !== dayjs(currentDate).day()))) {
        setTimeLog([...foundTask.timeLog, {startDate: currentDate, duration: 0}])
      }
      setTicks(foundTask.ticks);
      setSeconds(foundTask.seconds);
      setMinutes(foundTask.minutes);
      setHours(foundTask.hours);
      setRunningTask(foundTask);
      setIsActive(true);
      // console.log(currentDate)
    }
    else {
      var timeWorked = dayjs().diff(currentDate, "seconds")
      runningTask.timeLog = timeLog;
      // let updatedTimeLog = timeLog.map((item, index) => {
      //   item.duration = index === (timeLog.length - 1) ?  timeWorked : item.duration
      // })
      // setTimeLog(updatedTimeLog)
      runningTask.timeLog[timeLog.length - 1].duration += timeWorked;
      runningTask.ticks = ticks;
      runningTask.seconds = seconds;
      runningTask.minutes = minutes;
      runningTask.hours = hours;
      setRunningTask({});
      setIsActive(false);
    }
  }

  const isRunningHandleClick = (position, taskId) => {
    alert('a task is running');
  }
  // console.log(timeLog)
  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setNewTask((prev) => ({ ...prev, id: Date.now(), [name]: value, isRunning:false, ticks: 0, seconds: 0, minutes: 0, hours: 0, timeLog: []}));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setTaskExpandArr((prev) => [false, ...prev])
    if (!newTask.title || (!newTask.category) || newTask.category === 'select') return;
    setTasksArr((prev) => [newTask, ...prev]);
    setNewTask({});
    location.reload();
  };

  const removeHandler = (taskId) => {
    let foundTask = tasksArr.find((task) => task.id === taskId);
    const position = tasksArr.findIndex((task) => task.id === taskId);
    setTasksArr((prev) => prev.filter(
      (task) => task.id !== taskId)
    );

    let updatedTaskExpandArr = taskExpandArr.map((item, index) => {
      index === position ? false : item
    });

    updatedTaskExpandArr = [
      ...updatedTaskExpandArr.slice(0, position),
      ...updatedTaskExpandArr.slice(position + 1)
    ];

    setTaskExpandArr(updatedTaskExpandArr);

    if (runningTask.id === foundTask.id) {
      setIsActive(false);
      setRunningTask({});
      const updatedIsRunningArr = isRunningArr.map((item, index) => 
        index === position ? false : item
      );
      setIsRunningArr(updatedIsRunningArr);
    }
    localStorage.setItem('task array', JSON.stringify(tasksArr));
  }; 

  const handleOpen = (param) => {
    if (newTask.newCategory || newTask.category)return
    setOpen(param);
  }

  const clearCat = (catId, e) => {
    let catInUsed = false;
    let foundCat = categoryArr.find((cat)=>(cat.id===catId))
    tasksArr.forEach((task) => {
      if (task.category === foundCat.name) {
        catInUsed = true;
      }
    });
    if (catInUsed) {
      alert('category in use')
      return
    }
    setCategoryArr((prev) => prev.filter(
      (cat) => cat.id !== catId)
    );
    if (newTask.category === foundCat.name) {
      setNewTask((prev) => ({...prev, category:'', newCategory:''}))
    }
  }

  const selectCat = (value) => {
    setNewTask((prev) => ({...prev, category: value}));
    setOpen(false);
    
  }
  
  const addNewCat = () => {
    if (!newTask.newCategory) return; 
    const colorChose = color[Math.floor(Math.random() * 4)]
    setCategoryArr((prev) => [...prev, {name: newTask.newCategory, id: Date.now(), color: colorChose}]);
    setNewTask((prev) => ({...prev, category:'', newCategory:''}))
  }

  localStorage.setItem('task array', JSON.stringify(tasksArr));
  localStorage.setItem('category array',  JSON.stringify(categoryArr));
  localStorage.setItem('is Active', JSON.stringify(isActive));
  // localStorage.clear();

  
  
  return (
    <div className='m-0'>
      <h1 className="text-5xl font-bold text-white saturate-50 my-3 mb-7 ">
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
          categoryArr={categoryArr}
        />) : 
        (<div className='bg-[#FAE3E9] w-[900px] list-none m-auto rounded-xl text-black p-7 my-5 font-bold text-xl  h-[88px]'>NO RUNNING TASK</div>)}

      <TaskList 
        tasksArr={tasksArr}
        removeHandler={removeHandler}
        isRunningExist={isActive}
        handleOnClick={handleOnClick}
        isRunningArr={isRunningArr}
        isActive={isActive}
        handleOnExpand={handleOnExpand}
        taskExpandArr={taskExpandArr}
        categoryArr={categoryArr}
        isRunningHandleClick={isRunningHandleClick}
      />
      
      
         
      
    </div>
    
  )
}


export default App
