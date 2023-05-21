import './App.css';
import { useState } from 'react';

function App() {

  const LSListJob=JSON.parse(localStorage.getItem('jobs'));
  const [checked, setChecked] = useState([])
  const [todo, setToDo] = useState([LSListJob])
  console.log(LSListJob.split(','))
  console.log(LSListJob)

  const [job, setJob] = useState('')

  const xx1 = () => {
    return Math.floor(Math.random() * 6 + 1)
  }
  const xx2 = () => {
    return Math.floor(Math.random() * 6 + 1)
  }

  const xx3 = () => {
    return Math.floor(Math.random() * 6 + 1)
  }
  function taixiu() {
    if (checked[checked.length - 1]) {
      return checked[checked.length - 1].reduce((total, cur) => {
        return total + cur
      })
    }

  }
  function xuxxac(number) {
    if (number === 1) {
      return <div>O</div>
    }
    if (number === 2) {
      return <div>O O</div>
    }
    if (number === 3) {
      return <div>O O O</div>
    }
    if (number === 4) {

      return <div>
        <div>O  O</div>
        <div>O  O</div>
      </div>

    }
    if (number === 5) {
      return <div>
        <div>O O</div>
        <div> O</div>
        <div>O O</div>

      </div>
    } if (number === 6) {
      return <div className='div6'>
        <div >O O O</div>
        <div>O O O</div></div>
    }

  }
  const listCheck = (id) => {
    const isChecked = checked.includes(id)
    const cek = checked
    setChecked(pre => {



      if (isChecked) {
        return checked.filter(item => item !== id)

      }
      else
        return [...pre, id]
    }
    )
  }
  const listSumbit = () => {
    setChecked(pre => [...pre, [xx1(), xx2(), xx3()]])

  }

const mapCheck = () => {
  if (checked[checked.length - 1]) {
    return (
      checked[checked.length - 1].map(element => {
        return (
          <div className=''>
            <div className="divNumber">
              {element}
            </div>
            <div className="divXucXac">
              {xuxxac(element)}
            </div>

          </div>

        )
      })
    )
  }
  else
    return <p> Không có chuỗi</p>
}

const checktai = () => {
  const tai = "tai"
  let message;

  if (taixiu(checked[checked.length - 1]) >= 11) {
    return message = <p>Tài.</p>;
  }
  if (taixiu(checked[checked.length - 1]) < 11)
    return message = <p>Xỉu.</p>;
}
const eventChange = (event) => {
  
    
    setJob([event.target.value])

}
const todoList=(arr)=>
{
  setToDo([arr])
  console.log(todo)
}
const confirmToDo=()=>
{
  if(job[job.length-1])
  {
    setToDo(pre=>
      {
        const jobsList=[...pre,job]
        console.log(typeof(jobsList))
        localStorage.setItem('jobs',jobsList)
        return jobsList
      })
      setJob('')
  }
  else
  console.log("Lỗi")

}
return (

  <div className="App">




    <div className='container'>{mapCheck()}</div>
    <div >
      {checktai()}

    </div>

    <div>
      <input
      value={job}
        type='textbox'
        onChange={eventChange}
      />
    </div>
    <button onClick={confirmToDo} >TODOLIST</button>
  <div>
  <div>
          {todo.map((element, index) => (
            <div key={index}>
              <ul>
                <li>{element}</li>
              </ul>
            </div>
          ))}
        </div>
  </div>

    <button onClick={listSumbit}>Sumbit</button>

  </div>
);

}

export default App;
