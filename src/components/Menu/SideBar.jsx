import './sidebar.css'
import closeImg from '../../assets/icons/Close.svg'

import homeIcon from '../../assets/Menu_icons/Menu_Home.svg'
import profileIcon from '../../assets/Menu_icons/Menu_Profile.svg'
import discoverIcon from '../../assets/Menu_icons/Menu_Discover.svg'
import favoriteIcon from '../../assets/Menu_icons/Menu_Favorite.svg'
import categoriesIcon from '../../assets/Menu_icons/Menu_Categories.svg'
import logoutIcon from '../../assets/Menu_icons/Menu_Logout.svg'
import { NavLink } from 'react-router'
import { signOutUser } from '../../firebase/firebase'

export const SideBar = (props) => {



    const closeMenu = () => {
        props.Ref.current.classList.remove("active")
    }

    const signOut = async () => {
        await signOutUser() 
        props.Ref.current.classList.remove("active")
        props.setLoader(false)
    }

  return (
    <div className='SideBar' ref={props.Ref}>
        <div className="page-title">
            <p><span>Q</span>uizller<span>.</span></p>
            <button onClick={closeMenu}>
                <img src={closeImg}/>
            </button>
        </div>
        <hr />
        <div className="nav-btns">
            <NavLink to="/" className="nav-btn-ctn" onClick={closeMenu}>
                Home
                <img src={homeIcon} />
            </NavLink>
            <NavLink to="Profile" className="nav-btn-ctn" onClick={closeMenu}>
                Profile
                <img src={profileIcon} />
            </NavLink>
            <NavLink to="Discover" className="nav-btn-ctn" onClick={closeMenu}>
                Discover
                <img src={discoverIcon} />
            </NavLink>
            <NavLink to="Favorite" className="nav-btn-ctn" onClick={closeMenu}>
                Favorite
                <img src={favoriteIcon} />
            </NavLink>
            <NavLink to="Category" className="nav-btn-ctn" onClick={closeMenu}>
                Categories
                <img src={categoriesIcon} />
            </NavLink>

            <hr />

            <div className="nav-btn-ctn"  
            onClick={signOut}
            >
                Log out
                <img src={logoutIcon} />
            </div>
        </div>
    </div>
  )
}
