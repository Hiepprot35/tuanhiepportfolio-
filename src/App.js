import './App.css';
import { useEffect, useState } from 'react';
import Header from './header';
import ChangeTitle from './TitleEff';
import ContainerMain from './ContainerMain'
import TimeCount from './TimeCount';
import ChatBox from './chatBox';
function App() {
  const LSListJob = JSON.parse(localStorage.getItem('jobs'));
  const [checked, setChecked] = useState([]);
  const [text, setText] = useState([]);

  const [todo, setToDo] = useState(LSListJob ?? []);
  const [job, setJob] = useState('')
  function ToDoComponent() {

    return (
      <div className='ContainerMain'>
        <div className='container'>{mapCheck()}</div>
        <div >
          {checktai()}

        </div>

        <div className='ToDoMain'>
          <input
            value={job}
            type='textbox'
            onChange={eventChange}
          />
        </div>
        <button onClick={confirmToDo} >TODOLIST</button>
        <div className='jobTodo_div'>
          {todo.map((element, index) => (
            <div key={index}>
              <ul>
                <li className='jobToDo'>{element}</li>

              </ul>


            </div>


          ))
          }

        </div>


      </div>)
  }
  const xx1 = () => {
    return Math.floor(Math.random() * 6 + 1)
  }
  const xx2 = () => {
    return Math.floor(Math.random() * 6 + 1)
  }

  const xx3 = () => {
    return Math.floor(Math.random() * 6 + 1)
  }
  const [header, SetHeader] = useState(true);

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

  function mapCheck() {
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
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)

      .then(res => res.json())
      .then(contents => {
        setText(contents);
      })
  }, []
  )
  const [textShow, setTextShow] = useState(true)
  const showHeader = () => {
    SetHeader(!header);
    setTextShow(!textShow);
  }
  const checktai = () => {
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

  const confirmToDo = () => {

    if (job[job.length - 1]) {
      setToDo(pre => {
        const jobsList = [...pre, job]
        const localJobsKey = JSON.stringify(jobsList)
        localStorage.setItem('jobs', localJobsKey)
        return jobsList
      })
      setJob('')
    }
  }

  return (
    <div className="App">




      <Header></Header>

      <div className='button_div'>
        <button onClick={showHeader}>{(textShow && 'hidden') || (!textShow && 'show')}</button>
        <button onClick={listSumbit}>Sumbit</button>
      </div>
      {/* <ToDoComponent>

      </ToDoComponent>
      
      {<ChangeTitle></ChangeTitle>} */}
      <ChatBox></ChatBox>
      {header && <ContainerMain></ContainerMain>
      }
    </div>
  )

}



export default App;
