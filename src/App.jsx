import { Dashboard } from './components/Dashboard/Dashboard.jsx'
import { Discover } from './components/Discover/Discover.jsx';
import { Hamburger } from './components/Menu/Hamburger.jsx';
import { Favorite } from './components/Favorite/Favorite.jsx';
import { Profile } from './components/Profile/Profile.jsx';
import { PlayQuiz } from './components/Play_Quiz/PlayQuiz.jsx';
import { Category } from './components/Category/Category.jsx';
import { SideBar } from './components/Menu/SideBar.jsx';
import { LogIn } from './components/LogInSignIn/LogIn.jsx';
import { SignUp } from './components/LogInSignIn/SignUp.jsx';
import { IntroAnimation } from './components/Intro/IntroAnimation.jsx';


import './index.css'
import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, quizColRef } from './firebase/firebase.js';
import { onSnapshot, doc, collection, setDoc } from 'firebase/firestore';

import backImgSignBall from './assets/back/sign/SigningBackballs.svg'


function App() {  
  // const [loggedIn, setLoggedIn] = useState(false)

  const [showLogin, setShowLogin] = useState(false)
  const [userData, setUserData] = useState(null)
  const [quizData, setQuizData] = useState(null)

  const [currentPlayQuizId, setCurrentQuizPlayId] = useState(null)

  const Menu = useRef(null)
  const userDataRef = useRef(null)
  const [loading, setLoading] = useState(false)

  // const dashLoadRef = useRef(false)

  const [userState, setUserState] = useState(false)

  const [loader, setLoader] = useState(false)
  const [creationDate, setCreationDate] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      if(user){
        localStorage.setItem("userLoggedIn", JSON.stringify(true))
        setUserState(JSON.parse(localStorage.getItem("userLoggedIn")))
        // setLoggedIn(true)
        onSnapshot(doc(db, 'User', user.uid), (snapshot) => {
          let userDat = { ...snapshot.data(), id: snapshot.id}
          setUserData(userDat)
      
          userDataRef.current = userDat 
         

          setTimeout(()=>{
            // setLoading(true)
          }, 5000)
        })

        onSnapshot(quizColRef, (snapshot)=>{
          let quiz = []
          snapshot.docs.forEach( x => quiz.push({...x.data(), id: x.id}))
          
          quiz.forEach( x => {
            setDoc(doc(db, 'User', user.uid, 'Quizzes', x.id), {
              name: x.name,
              id: x.id,
              level: x.level,
              category: x.category,
              quiz: [...x.quiz],
              isFavourite: false
            })
          })
        })

        onSnapshot(collection(db, 'User', user.uid, 'Quizzes'), (snapshot)=>{
          let qy = []
          snapshot.docs.forEach( x => {qy.push({...x.data(), id: x.id})})
          setQuizData(qy)
        })

        // Get the creation time from Firebase Auth
        const creationTime = user.metadata.creationTime;
            
      
        const date = new Date(creationTime);
        
        const month = date.toLocaleString('default', { month: 'long' }); // e.g., "January"
        const year = date.getFullYear(); // e.g., 2023
        
        setCreationDate(`${month} ${year}`)

      }else {
        setTimeout(() => {
          setUserData(JSON.parse(localStorage.getItem("userLoggedIn")))
        }, 2000)
      }
    })
  }, [])



  const swapLogPage = () => {
    setShowLogin(prev => !prev)
  }

  // useEffect(()=>{
    
  // }, [currentPlayQuizId])

  return (
    <BrowserRouter>
      <main>

        { !userData ? <section className='signup-login'>
          <IntroAnimation />
          <img src={backImgSignBall} className='back-img-ball' />
          {!showLogin ? <LogIn swap={swapLogPage} setLoader={setLoader} loader={loader}  /> : <SignUp swap={swapLogPage} setLoader={setLoader} loader={loader} />}
        </section> : null}

        <Hamburger Ref={Menu}/>
        <SideBar Ref={Menu} setLoader={setLoader}/>

        {userData && quizData ? <Routes>
          <Route index element={<Dashboard userData={userData} quizData={quizData} />} />
          <Route path='/Profile' element={<Profile userData={userData} Date={creationDate}/>} />
          <Route path='/Discover' element={<Discover userData={userData} quizData={quizData}/>} />
          <Route path='/Favorite' element={<Favorite userData={userData} />} />
          <Route path='/Category' element={<Category userData={userData}/>} /> 
          <Route path='/PlayQuiz' element={<PlayQuiz userData={userData} quizData={quizData} />} />
        </Routes> : null}

      </main>
    </BrowserRouter>
  )
}

export default App
