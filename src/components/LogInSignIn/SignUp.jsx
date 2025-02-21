import './signup.css'
import passwordIcon from '../../assets/Log_Sign_Icons/passwordIcon.svg'
import emailIcon from '../../assets/Log_Sign_Icons/emailIcon.svg'
import userIcon from '../../assets/Log_Sign_Icons/userIcon.svg'
import passVis from '../../assets/icons/Passwordeyevisible.svg'
import passHid from '../../assets/icons/Passwordeyehidden.svg'

import { auth, db, quizColRef, signUpUser } from '../../firebase/firebase'
import { useEffect, useState, useRef } from 'react'
import { collection, setDoc, doc, onSnapshot } from 'firebase/firestore'




export const SignUp = (props) => {

    const [passVisible, setPassVisible] = useState(false)
    const [userId, setUserId] = useState(null)
    const ref = useRef(null)

    


    const onSubmit = async (data) => {
        const email = data.get("email")
        const password = data.get("password")
        const username = data.get("username")
        props.setLoader(true)

        try{
            const userCredentials = await signUpUser(email, password)
            ref.current = userCredentials.user.uid
            
            await setDoc(doc(db, 'User', ref.current),{
                username: username,
                level: 0,
                number_quiz_completed: 0,
                total_points: 0,
                current_quiz_id: "here",
                signed_in: true
            })
            .then(()=>{
                console.log("Data succesfully created")
            })
            .catch((err)=> {err.code})

            await setDoc(doc(db, 'Ranks', ref.current), {
                total_points: 0,
            })


        }
        catch(err){
            alert(err.code)
        }
    }

    const handlePassChange = () => {
        setPassVisible(prev => !prev)
    }

    const handleInputChange = (e) => {
        if(e.target.value.length > 0 && e.target.value.length < 2){
            e.target.classList.add("active")
        }
        else if(e.target.value.length < 1){
            e.target.classList.remove("active")
        }

    }
    

  return (
    <div className='Signup'>

        <form action={onSubmit}>
            <p className='title'>Sign Up</p>
            <fieldset>
                <div className="signup-details">
                    <img src={userIcon} />
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' required onChange={(e) => handleInputChange(e)}/>
                </div>
                <div className="signup-details">
                    <img src={emailIcon} />
                    <label htmlFor="Email">Email</label>
                    <input type="email" name='email' required onChange={(e) => handleInputChange(e)}/>
                </div>
                <div className="signup-details">
                    <img src={passwordIcon} />
                    <label htmlFor="password">Password</label>
                    <input type={passVisible ? "text" : "password"} name='password' required onChange={(e) => handleInputChange(e)}/>
                    <button type='button' onClick={handlePassChange}>
                        <img src={passVisible ? passVis : passHid} />
                    </button>
                    
                </div>
            </fieldset>
            <p className='swap'>Have an account? <button  type="button" onClick={props.swap}>Sign In</button></p>
            <button className='final'>Sign Up</button>
            <div className={`loader ${props.loader ? "active" : null}`}>
                        
            </div>
        </form>
    </div>
    
  )
}
