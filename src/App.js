import './App.css';
import { useState } from 'react';

function App() {

  const LSListJob = JSON.parse(localStorage.getItem('jobs'));
  const [checked, setChecked] = useState([])
  const [todo, setToDo] = useState([...LSListJob]??'')
  console.log(LSListJob)
  console.log(todo)

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
  // const deleteElemnt = (stt) => {
  //   const arrayNew = []
  //   for (let i = 0; i < todo.length; i++) {
  //     if (i < stt) {
  //       arrayNew.push(todo[i])
  //     }
  //     if (i > stt) {
  //       arrayNew.push(todo[i+1])
  //     }
  //   }
  //   setToDo([arrayNew])
  // }
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
  function deleteElement(stt)
  {
    for(let i=0;i<todo.length;i++)
    {
      if(i!=stt)
      {
        setToDo(pre=>[...pre,todo[i]])
      }
    }
  }
  const confirmToDo = () => {

    if (job[job.length - 1]) {
      setToDo(pre => {
        const jobsList = [...pre, job]
        const localJobsKey = JSON.stringify(todo)
        localStorage.setItem('jobs', localJobsKey)
        return jobsList
      })
      setJob('')
    }
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
          <div className='NotificationDiv hidden'> cak</div>
          {todo.map((element, index) => (
            <div key={index}>
              <ul>
                <li>{element}</li>
                <li>      
</li>
              </ul>
              <button onClick={() => deleteElement(index)} >{index}</button>

            </div>


          ))
          }

        </div>
        <div className='animation'>HIHIHIHI</div>
      </div>

      <button onClick={listSumbit}>Sumbit</button>

    </div>
  );

}

export default App;
