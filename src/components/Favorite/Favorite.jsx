import './favorite.css'
import likeIcon from '../../assets/icons/Like.svg'
import { collection, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Quiz } from '../Quiz_list/Quiz'
import { db } from '../../firebase/firebase'



export const Favorite = (props) => {

    const [quiz, setQuiz] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{

        const q = query(collection(db, 'User', props.userData.id , 'Quizzes'), where("isFavourite", "==", true))

        onSnapshot(q, (snapshot)=>{
            setQuiz(snapshot.docs.map( doc => ({...doc.data(), id: doc.id})))
        })
        
        setLoading(true)
    }, [])
    
    const mappedQuiz = quiz.map( x => <Quiz key={x.id} {...x} userId={props.userData.id}  />)

  return (
    <>
        {loading && <div className="Favorite">
            <div className="page-title">
                Favorite
                <img src={likeIcon} />
            </div>

            <div className="fav-ctn">
               {quiz.length > 0 ? mappedQuiz : <div className='no-favorite-result'>No favorite quiz selected...</div>}
            </div>
        </div>}
    </>
  )
}

