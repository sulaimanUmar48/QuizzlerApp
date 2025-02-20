import './quiz.css'

import favouriteOff from "../../assets/icons/Favouriteoff.svg" 
import favouriteOn from "../../assets/icons/Favouriteon.svg" 
import { useEffect, useState, useRef } from 'react'
import { deleteDoc, doc, onSnapshot, setDoc, updateDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { NavLink } from 'react-router'

export const Quiz = (props) => {

    const [favourite, setFavourite] = useState(props.isFavourite)
    const favBtn = useRef(null)
    const [monitor, setMonitor] = useState(false)


    

    const setFavControls = () => {
        setFavourite(prev => !prev)
        updateDoc(doc(db, 'User', props.userId, 'Quizzes', props.id), {
            isFavourite: favourite
        })
    }


    const setQuizID = () => {
        localStorage.setItem("quizId", props.id)
    }

  return (
    
    <div className="quiz">
        <div className="quiz-image">

        </div>
        <div className="quiz-info">
            <span className='quiz-name'>
                {props.name}
            </span>
            <span className='quiz-diff'>
                {props.level}
            </span>
        </div>
        {props.id && <img 
        ref={favBtn}
        src={ props.isFavourite ? favouriteOn : favouriteOff } className='favourite' 
        onClick={setFavControls}
        />}
        
        <NavLink to='/PlayQuiz'>
            <i className="fa-solid fa-chevron-right" onClick={setQuizID}></i>
        </NavLink>
        
    </div>    
  )
}
