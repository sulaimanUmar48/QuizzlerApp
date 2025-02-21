import './profile.css'

import userIcon from '../../assets/icons/User.svg'
import largeDummyImg from '../../assets/Dummy images/largedummyprof.png'
import whiteEditIcon from '../../assets/icons/Whiteedit.svg'
import { db, quizDocRef } from '../../firebase/firebase'
import { useEffect, useRef, useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'



export const Profile = (props) => {

  const [quiz, setQuiz] = useState("")
  const [editName, setEditName] = useState(false)
  const [onChangeUsername, setOnChangeUserName] = useState(props.userData.id)
  const [totalLevel, setTotalLevel] = useState(0)
  const [completedQuiz, setCompletedQuiz] = useState(null)

  const [ranks, setRanks] = useState()

  const [count, setCount] = useState(0)

  const input = useRef(null)

  useEffect(()=>{
    onSnapshot(collection(db, 'User', props.userData.id, 'Completed_Quizzes'), (snapshot)=>{
      setCompletedQuiz(snapshot.docs.length)
      updateDoc(doc(db, 'User', props.userData.id), {
        number_quiz_completed: snapshot.docs.length
      })
    })
  }, [])


 
  useEffect(()=>{

    // CODE FOR ORDERING THE QUERY FOR RANKS

    const q = query(collection(db, 'Ranks'), orderBy("total_points", "desc"))

    onSnapshot(q, (snapshot) =>{
      let ranksArray = []
      snapshot.docs.forEach((x) => { ranksArray.push({...x.data(), id: x.id}) })
      // console.log(ranksArray)

      const rank = (ranksArray.findIndex((user) => user.id === props.userData.id) + 1) 
      setRanks(rank)

    })

  }, [])


  // useEffect(()=>{
  //     const unsubscribe = onSnapshot(quizDocRef, (snapshot) => {
  //         let quizDb = {...snapshot.data(), id: snapshot.id}
  //         setQuiz(quizDb)

  //     })

  //     return unsubscribe
  // },[])

  const usernameEditFunction = () => {
    input.current.classList.toggle("active")
    setEditName( prev => !prev)

    if(editName){
      setCount(count + 1)
    }
  }

  useEffect(()=>{
    if(count > 0){
      updateDoc(doc(db, 'User', props.userData.id), {
        username: onChangeUsername
      })
    }
  }, [count])



  
  // console.log(onChangeUsername)



  return (
    <>
      {<div className="Profile">
          <div className="page-title">
              Profile
              <img src={userIcon} />
          </div>
          <div className="profile-img-ctn-outer">
              <div className="profile-img-ctn-inner">
                  <img src={largeDummyImg} />
              </div>
              {/* <button className="edit-btn">
                  <img src={editIcon}/>
              </button> */}
          </div>
          <div className='username'>

            <p ref={input} contentEditable={editName}
            suppressContentEditableWarning={true} 
            onInput = {(e)=>{setOnChangeUserName(e.target.innerText)}}
            >
              {editName ? null : props.userData.username}
            </p>
            <img src={whiteEditIcon} onClick={usernameEditFunction}/>
          </div>
          <p className='date-joined'>
            Joined {props.Date}
          </p>

          <div className="overview">
            <h3 className='page-title'>Overview</h3>
            <div className="stats-ctn">

              <div className="overview-ctn">
                <div className="overview-stats">{props.userData.level}</div>
                <span>Level</span>
              </div>
              <div className="overview-ctn">
                <div className="overview-stats">{props.userData.total_points}</div>
                <span>Total points</span>
              </div>
              <div className="overview-ctn">
                <div className="overview-stats">{completedQuiz}</div>
                <span>Quiz played</span>
              </div>
              <div className="overview-ctn">
                <div className="overview-stats">{ranks}</div>
                <span>Rank</span>
              </div>

            </div>
          </div>
      </div>}
    </>
  )
}

