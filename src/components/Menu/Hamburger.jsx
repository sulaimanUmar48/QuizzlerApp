import './hamburger.css'

export const Hamburger = (props) => {

  const handleToggle = () => {
    props.Ref.current.classList.add("active")
  }


  return (
    <button className='hamburger-ctn' onClick={handleToggle}>
      <div className="hamburger-btn"></div>
    </button>
    
  )
}
