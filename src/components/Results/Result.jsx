import './result.css'
import Resulthome from '../../assets/icons/Resulthome.svg'
import Retry from '../../assets/icons/retry.svg'
import { NavLink } from 'react-router'
import { doc, onSnapshot, setDoc, updateDoc} from 'firebase/firestore'
import { useEffect, useState, useRef } from 'react'
import { db } from '../../firebase/firebase'


export const Result = (props) => {

  useEffect(()=>{
    updateDoc(doc(db, 'User', props.userData.id), {
      total_points: props.userData.total_points + props.score,
      level: Math.floor(props.userData.total_points / 500)
    })
  }, [])

  useEffect(()=>{
    onSnapshot(doc(db, 'User', props.userData.id), ()=>{
      setDoc(doc(db, 'Ranks', props.userData.id), {
        total_points: props.userData.total_points 
      })
    })
  }, [])

  // Come here and update the count total score function

  return (
    <div className="Result">
        <div className="result-backround">
            <div className="display-result-ctn">
              <div className='display-result-inner-ctn'>
                <div className="result-value-ctn">
                  <p>your Score</p>
                  <p><span>{props.score}</span>pt</p>
                </div>
              </div>
            </div>
        </div>
        <div className="accuracy-ctn">
          {/* Used gotten and missed here cause I already used correct and wrong for the quiz question's answers */}
          <p><span className='gotten'>{props.correct}</span><br/>Correct</p>
          <p><span className='missed'>{props.wrong}</span><br/>Wrong</p>
        </div>
        <div className="result-action">
          <NavLink to='/'>
            <div className='result-home'><img src={Resulthome}/></div>
            Home
          </NavLink>
          <a href="#">
            <div className='retry'><img src={Retry} onClick={props.retry}/></div>
            Play Again
          </a>
        </div>
        
    </div>
  )
}
