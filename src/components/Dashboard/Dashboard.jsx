import dummyProfImg from '../../assets/Dummy images/dummyprofimg.png'
import './Dashboard.css'
import { Quiz } from '../Quiz_list/Quiz'
import { useEffect, useRef, useState } from 'react'

import ballTop from '../../assets/back/Dashboard/dashboardbackballtop.png'
import ballBottom from '../../assets/back/Dashboard/dashboardbackballbottom.png'



export const Dashboard = (props) => {
    const [time, setTime] = useState(0)
    

    const mappedQuiz = props.quizData.map((x) => { 
        return <Quiz key={x.id} {...x} userId={props.userData.id}  />
    })

    useEffect(()=>{
        const timeInterval = setInterval(()=>{
            const currentTime = new Date().getHours()
            setTime(currentTime)
            console.log(currentTime)
        }, 1000)
        return () => {clearInterval(timeInterval)}
    }, [])



  return (
    <>
        <div className="dashboard" >
            <img src={ballTop} className='ball-top'/>
            <img src={ballBottom} className='ball-bottom'/>
            <div className="greet-ctn">
                <div className="greeting">
                    <p className='greet-time'><i className="fa-solid fa-sun"></i>
                        {
                        time > 0 && time < 12 ? "GOODMORING" :
                        time >= 12 && time < 17 ? "GOODAFTERNOON" :
                         "GOODEVENING"
                        }
                     </p>
                    <h3>{props.userData.username}</h3>
                </div>
                <div className="img-ctn-outer">
                    <div className="img-ctn-inner">
                        <img src={dummyProfImg} alt='User Profile Image' aria-label='User Profile Image'/>
                    </div>
                </div>
            </div>

            {/* Now this was supposed to be a recent quiz feature that allows you to continue from where last you stopped but heaven knows I'm not making that convulated bullshit */}

            {/* <div className="recent-quiz">
                <div className="recent-quiz-text">
                    <span>RECENT QUIZ</span>
                    <p><i></i>A Basic Music Quiz</p>
                </div>
                <div className="quiz-com-percentage">
                    <div className="outer-circle">
                        <div className="inner-circle">
                            <span>65%</span>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className='classification' >
                <div className="class">
                    <span className='active'>Quiz</span>
                </div>
                <div className="quiz-container" >
                    {mappedQuiz}
                </div>
            </div>
            
        </div>
    </>
  )
}
