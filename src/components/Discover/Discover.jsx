import './discover.css'
import worldImg from '../../assets/titleimg/fluent-mdl2_world.svg'
import filterImg from '../../assets/titleimg/mdi_filter-cog-outline.svg'

import { Quiz } from '../Quiz_list/Quiz'
import { useEffect, useState, useRef } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db, quizColRef } from '../../firebase/firebase'





// NOTE!!! FINISH THE FILTER FUNCTION LATER ON............................................!!!!!!!!!!!!!!!!


export const Discover = (props) => {

  const [quiz, setQuiz] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const filterMenu = useRef(null)


  useEffect(()=> {

      const q = query(collection(db, 'User', props.userData.id , 'Quizzes'), 
        where("name", ">=", searchTerm),
        where("name", "<", searchTerm + "\uf8ff"))

      onSnapshot(q, (snapshot)=>{
          const quizDb = []
          snapshot.docs.forEach((doc) => {
              quizDb.push({...doc.data(), id: doc.id})
          })
          setQuiz(quizDb)
      })
  
    }, [searchTerm])

  const mappedQuiz = quiz.map( x => <Quiz key={x.id} {...x} userId={props.userData.id}  />)

  const showFilterMenu = () => {
    filterMenu.current.classList.add("open")
  }

  return (
    <div className='Discover'>
      <span className='page-title'>
        DISCOVER 
        <img src={worldImg}/>
      </span>
      
      <>
      <form action="">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" name="Quiz-Name" placeholder='Solar System...' onInput={e => setSearchTerm(e.target.value)} />
        <div className="box"></div>
      </form>
      </>

      {/* <span className='filter-btn' onClick={showFilterMenu}>
        <img src={filterImg} alt="" />
        filter
      </span> */}
      <div className="quiz-ctn">
        {quiz.length === 0 ? <p className='no-quiz-error'>No Results ...</p> : mappedQuiz}
      </div>
    </div>
  )
}
