import { useEffect, useState } from "react";

const data=require('./models/studentModel')
const ContainerMain = () => {
  const tabs = ['posts', 'comments', 'albums']
  const [type, setType] = useState('')
  const [ToF,setToF]=useState(false)
  const [posts, setPosts] = useState([]);
  const [showToTop, setShowToTop] = useState(false)
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)

      .then(res => res.json())
      .then(contents => {
        setPosts(contents);
      })
  }, [type]
  )
  useEffect(() => {

    const handleScroll = () => {
      setShowToTop(window.scrollY >= 200);
    }
    window.addEventListener('scroll', handleScroll)

  }, []

  )

  function ClickToSee(tab)
  { 
    setType(tab); 
    setToF(!ToF);
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Thêm thuộc tính này để tạo hiệu ứng cuộn mượt
    });
  }
  
  
  return (
    <div className='titlePhoto'>
      {
        tabs.map(
          (tab, index) => {
            return (

              <ul key={index}>
                <li >
                  <button
                    value={tab}
                    style={type === tab ? {
                      color: '#F0000',
                      backgroundColor: '#C0C0C0',
                    } : {

                    }}
                    onClick={() => ClickToSee(tab)}>{tab}</button>
                </li>
              </ul>
            )
          }
        )

      }
      {
       ToF && posts.map(
          (content, index) => {
            return (
              <ul key={index}>
                <li >{content.title}</li>
              </ul>
            )
          }
        )
      }
    
      {
        showToTop &&
        (

          <button
            style={
              {
                position: 'fixed',
                top: '20px',
                left: '20px'
              }
            }
            id="scrollToTopButton"
            onClick={scrollToTop}
          > showToTop</button>
        )

      }

    </div>
  )
}
export default ContainerMain;