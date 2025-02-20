import closeIcon from '../../assets/icons/close.svg'
import checkIcon from '../../assets/icons/Check.svg'

export const Filter = (props) => {


  const closeFilterMenu = () => {
    props.Ref.current.classList.remove("open")
  }

  return(
    <div className='filter-ctn' ref={props.Ref}>
      <div className="filter">
        <button className='close-btn' onClick={closeFilterMenu}>
          <img src={closeIcon} />
        </button>
        <p>Categories</p>
        <div className='line'></div>
        <div className='filter-cat'>
          <FilterCat />
        </div>
        <p>Difficulty</p>
        <div className='line'></div>
        <div className='filter-diff'>
          <FilterDiff />
        </div>
        <button className='result-btn'>Show 40 Results</button>
      </div>
    </div>
  )
}

// Filter Categories
const FilterCat = () => {
  return(
    <>
      {/* Cat-ctn = categories container, do not forget */}
      <div className="cat-ctn">
        <div className="cat-indicator"></div>
        <span>Math</span>
      </div>
      <div className="cat-ctn">
        <div className="cat-indicator"
        style={{backgroundColor: "#2872FA"}}
        ><img src={checkIcon} /></div>
        <span>Science</span>
      </div>
    </>
  )  
}

// Filter Difficulty 

const FilterDiff = () => {
  return(
    <>
       {/* diff-ctn = difficulty container, do not forget */}
       <div className="diff-ctn">
        <div className="diff-indicator"></div>
        <span>Easy</span>
      </div>
      <div className="diff-ctn">
        <div className="diff-indicator"
        style={{backgroundColor: "#2872FA"}}
        ><img src={checkIcon} /></div>
        <span>Medium</span>
      </div>
      <div className="diff-ctn">
        <div className="diff-indicator"></div>
        <span>Hard</span>
      </div>
    </>
  )
}