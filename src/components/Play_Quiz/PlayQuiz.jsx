import { useEffect, useRef, useState } from 'react'
import './playquiz.css'
import { quizDocRef, userDocRef } from '../../firebase/firebase';
import { collection, onSnapshot, addDoc, setDoc, doc, getDoc, updateDoc} from 'firebase/firestore';
import { Result } from '../Results/Result'
import { db } from '../../firebase/firebase';
import playQuizBall from '../../assets/back/playquiz/playquizbackback.svg'

export const PlayQuiz = (props) => {

    const [quiz, setQuiz] = useState(null)
    const [index, setIndex] = useState(0)

    const [correctScore, setCorrectScore] = useState(0)
    const [wrongScore, setWrongScore] = useState(0)
    const [finalPoints, setFinalpoints] = useState(0)

    const [optionActive, setOptionActive] = useState(true)

    const [loading, setLoading] = useState(false)
    const [pageDisplay, setPageDisplay] = useState(true)

    const ansOne = useRef(null)
    const ansTwo = useRef(null)
    const ansThree = useRef(null)
    const ansFour = useRef(null)

    const answerDisplay = [ansOne, ansTwo, ansThree, ansFour]

    useEffect(()=>{
        setQuiz(props.quizData.find(item => item.id === localStorage.getItem("quizId")))
        setLoading(true)
    }, [])


    useEffect(() => {
        if (finalPoints !== 0) { // Avoid running on initial mount
            addCompletedQuiz()
                .then(() => console.log("Successfully added quiz"))
                .catch((err) => console.log(err.message));
        }
       
    }, [finalPoints])

    const checkAnswer = (e, ans) => {
        if(optionActive){
            if (quiz.quiz[index].ans === ans){
                setCorrectScore(prev => prev + 1)

                e.target.classList.add("correct")

            }
            else {
                setWrongScore(prev => prev + 1) 
                e.target.classList.add("wrong")
                answerDisplay[quiz.quiz[index].ans - 1].current.classList.add("correct")
            }
            setOptionActive(false)
        } 
    }

    const handleNext = () => {
        if (index < quiz.quiz.length - 1){
            if (optionActive === false) {
                setOptionActive(true)

                answerDisplay.forEach((display) => {
                    display.current.classList.remove("correct")
                    display.current.classList.remove("wrong")
                })
            
                setIndex(prev => prev + 1)
            }
            else{
                alert("You have to pick an option")
            }
        } else {
            setPageDisplay(false)
            setFinalpoints(Math.floor((correctScore / quiz.quiz.length) * 100))

            answerDisplay.forEach((display) => {
                display.current.classList.remove("correct")
                display.current.classList.remove("wrong")
            })
        }
    }

    const addCompletedQuiz = async () => {
        console.log("hEYYYYYYYYYYYYYYY", finalPoints)
        console.log(quiz.id)
        console.log(quiz.name)
        await setDoc(doc(db, 'User', props.userData.id, 'Completed_Quizzes', localStorage.getItem("quizId")), {
            quiz_id: quiz.id,
            quiz_points: finalPoints,
            quiz_name: quiz.name
        })
        
        
    }
    
    const reset = () => {
        setIndex(0)
        setCorrectScore(0)
        setWrongScore(0)
        setFinalpoints(0)
        setOptionActive(true)
        
    }

    const retryEvent = () => {
        reset()
        setPageDisplay(true)
    }

  return (
    <>
        {loading && quiz ? <div className='did'>
            {pageDisplay && <div className="Play-quiz"> 
                <img src={playQuizBall} />
                <div className="quiz-background">
                    <div className="quiz-question">
                        <p className='quest-num'>
                            {`${index + 1} / ${quiz.quiz.length}`}
                        </p>
                        <p className='question'>
                            {quiz.quiz[index].question}
                        </p>
                    </div>
                </div>
                <div className="options-ctn">
                    <div ref={ansOne} className={'option'} onClick={(e) => {checkAnswer(e, 1)}}>
                        {quiz.quiz[index].answers.A}
                    </div>
                    <div ref={ansTwo} className='option' onClick={(e) => {checkAnswer(e, 2)}}>
                        {quiz.quiz[index].answers.B}
                    </div>
                    <div ref={ansThree} className='option' onClick={(e) => {checkAnswer(e, 3)}}>
                        {quiz.quiz[index].answers.C}
                    </div>
                    <div ref={ansFour} className='option' onClick={(e) => {checkAnswer(e, 4)}}>
                        {quiz.quiz[index].answers.D}
                    </div>

                </div>
                <button onClick={handleNext}>{index < quiz.quiz.length - 1 ? "Next" : "Results"}</button>
            </div>}
            {pageDisplay ? null : < Result correct={correctScore} wrong={wrongScore} score={finalPoints} retry={retryEvent} userData={props.userData}/>}
        </div>: null}
    </>
  )
}

