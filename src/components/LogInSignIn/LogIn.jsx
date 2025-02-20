import './login.css'
import passwordIcon from '../../assets/Log_Sign_Icons/passwordIcon.svg'
import emailIcon from '../../assets/Log_Sign_Icons/emailIcon.svg'
import passVis from '../../assets/icons/Passwordeyevisible.svg'
import passHid from '../../assets/icons/Passwordeyehidden.svg'


import { useState } from 'react'
import { signInUser  } from '../../firebase/firebase'

export const LogIn = (props) => {

    const [passVisible, setPassVisible] = useState(false)
    const [showError, setShowError] = useState(false)

    const onSubmit = async (data) => {
        setShowError(false)
        const email = data.get("email")
        const password = data.get("password")
        props.setLoader(true)
        
        // await signInUser(email, password)
        //     .then(()=>{
        //         console.log("User succesfully logged in")
        //     })
        //     .catch((err) =>{
        //         alert(err.code)
        //     } )

        try{
            await signInUser(email, password)
        }
        catch(err){
            setShowError(true)
            props.setLoader(false)
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
    <div className='Login'>
        <form action={onSubmit}>
            <p className='title'>Log In</p>
            <fieldset>
                <div className="login-details">
                    <img src={emailIcon} />
                    <label htmlFor="username">Email</label>
                    <input type="email" name='email' onChange={(e) => handleInputChange(e)}/>
                </div>
                <div className="login-details">
                    <img src={passwordIcon} />
                    <label htmlFor="password">Password</label>
                    <input type={passVisible ? "text": "password"} name='password' onChange={(e) => handleInputChange(e)} />
                    <button type='button' onClick={handlePassChange}>
                        <img src={passVisible ? passVis : passHid} />
                    </button>
                    { showError ? <p className='error'>Invalid Credentials...</p> : null}
                </div>
            </fieldset>
            <p className='swap'>Don't have account? <button type="button"  onClick={props.swap}>Create account</button></p>
            <button className='final'>Log In</button>
            <div className={`loader ${props.loader ? "active" : null}`}>
                        
            </div>
        </form>
    </div>
  )
}
