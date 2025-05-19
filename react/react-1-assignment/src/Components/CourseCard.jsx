import React, { useState, useRef, useEffect } from 'react'
import './CourseCard.scss'
import FiberNewIcon from '@mui/icons-material/FiberNew';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';

//Properties
//price language  duration location diffculty
//TODO: add button for enroll 
//TODO: change button text based on diffuclty level passed in 
//TODO: add fucntion for button leave review
//add review button for leaving review
//Props
//courseName, price , language, duration,location,diffcult

const CourseDiffculty = {
  BEGINNER: "beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "advanced",
}


const CourseCard = ({
  id,
  courseName,
  price,
  language,
  duration,
  location,
  diffculty,
  isNew,
  courseImage,
  enrollmentCount,
  handleEnrollment,
  isComplete,
}) => {
  const [leavingReivew, setLeavingReview] = useState(false)
  const [reviewContent, setReviewContent] = useState("")
  const [titleScrollDuration, setTitleScrollDuration] = useState(0);
  const [titleScroll, setTitleScroll] = useState(false);
  const handleReviewContentChange = (event) => {
    setReviewContent(event.target.value)
  }

  const titleContentRef = useRef(null);
  useEffect(() => {
    if (!titleContentRef.current) {
      console.log("WTF ref does not exist")
    }
    const courseTitleWidth = titleContentRef.current.scrollWidth;
    const courseTitleSize = titleContentRef.current.offsetWidth;
    if (courseTitleWidth > courseTitleSize) {
      const pixelPerSecond = 50;
      const totalDistance = courseTitleWidth + courseTitleSize;
      setTitleScrollDuration(totalDistance / pixelPerSecond)
      setTitleScroll(true)
      console.log("Titile is going to scroll")
    } else {
      setTitleScroll(false)
      console.log("Titile is not going to roll")
    }
  }, [courseName])


  let enrollButtonText = "";
  
  switch (diffculty) {
    case CourseDiffculty.BEGINNER:
      enrollButtonText = "Satrt Learning Now!";
      break;
    case CourseDiffculty.ADVANCED|| CourseDiffculty.INTERMEDIATE:
      enrollButtonText = "Enroll Now";
      break;
    default:
      enrollButtonText = "Enroll";
      break;
  }


  const submitReivew = (event) => {
    console.debug("Review Submitte:" + reviewContent)
    setLeavingReview(false)
    setReviewContent("")
    event.preventDefault()
  }
  const cancelReview = (event) => {
    setLeavingReview(false)
    setReviewContent("")
    event.preventDefault()

  }

  return (
    <>
      <div className='course-card'>
        <div className='title'>
  {isNew && <FiberNewIcon className='new-icon' />}

  <div className="course-name-wrapper">
    <h2
      className={`course-name ${titleScroll ? "scroll-title" : ""}`}
      ref={titleContentRef}
      style={titleScroll ? { animationDuration: `${titleScrollDuration}s` } : {}}
    >
      {courseName}
    </h2>
  </div>

  <p className='enrollment-count'>Enroll#:{enrollmentCount}</p>
</div>
        <div className='course-info'>
          <p><LocationPinIcon className='icon' />{price}</p>
          <p><PriceChangeOutlinedIcon className='icon' />{location}</p>
          <p><AccessTimeIcon className='icon' />{duration}</p>
          <p><LanguageIcon className='icon' />{language}</p>
        </div>
        <div className='course-image'>
          <img src={courseImage} alt='course content'></img>
        </div>
        <div className='buttons-container'>
          <button className='enroll-button' onClick={() => {
            handleEnrollment(id)
          }}>{enrollButtonText}</button>
          <button className='review-button' onClick={() => setLeavingReview(true)}>Review</button>
        </div>
        {leavingReivew && <form className="review-form">
          <textarea name="Leave you review" placeholder='leave your reveiw' value={reviewContent} onChange={handleReviewContentChange}></textarea>
          <div className='review-buttons'>
            <button onClick={submitReivew}>Submit Reivew</button>
            <button onClick={cancelReview}>Cancel</button>
          </div>
        </form>}
      </div>

    </>
  )
}
export default CourseCard