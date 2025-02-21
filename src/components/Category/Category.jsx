import './category.css'
import folderImage from '../../assets/icons/Folder.svg'
import cheveron from '../../assets/icons/Cheveron.svg'

import { Quiz } from '../Quiz_list/Quiz'
import { useState, useRef, useEffect } from 'react'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

export const Category = (props) => {

    const [hide, setHide] = useState(false)
    const [current, setCurrent] = useState("Math")
    const [loading, setLoading] = useState(false)
    const [quiz, setQuiz] = useState([])

    const button = useRef(null)
    const menu = useRef(null)


    useEffect(()=>{
    
            const q = query(collection(db, 'User', props.userData.id, 'Quizzes'), where("category", "==", current))
    
            onSnapshot(q, (snapshot)=>{
                setQuiz(snapshot.docs.map( doc => ({...doc.data(), id: doc.id})))
            })
            
            setLoading(true)
    }, [current])

    const mappedQuiz = quiz.map( x => <Quiz key={x.id} {...x} userId={props.userData.id} />)

    function toggle(){
        button.current.classList.toggle("active")
        menu.current.classList.toggle("active")
    }

    

    // Message to you future me, I apologize for the amount of bugs you're going to have to debug, cause right now I cannot be bothered. Also the use state above is used to hide the pop up menu, another function I cannot be bothered to handle at the moment

  return (
    <div className='Category'>
        <span className='page-title'>
            CATEGORIES
            <img src={folderImage}/>
        </span>
        <div className="category-name">
            {current}
            <img src={cheveron} ref={button} onClick={toggle}/>
            <ul className="category-list" ref={menu}>
                <li onClick={(e) => {setCurrent(e.target.textContent)}}>Math</li>
                <hr />
                <li onClick={(e) => {setCurrent(e.target.textContent)}}>Solar System</li>
                <hr />
                <li onClick={(e) => {setCurrent(e.target.textContent)}}>Entertainment</li>
                <hr />
                <li onClick={(e) => {setCurrent(e.target.textContent)}}>Mythology</li>
            </ul>        
        </div>
        <div className="quiz-ctn">
            {mappedQuiz}
        </div>
    </div>
  )
}
