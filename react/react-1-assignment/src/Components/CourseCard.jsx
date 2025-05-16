import React, { useState } from 'react'
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
}) => {
  const [leavingReivew, setLeavingReview] = useState(false)

  let enrollButtonText = ""
  switch (diffculty) {
    case CourseDiffculty.BEGINNER:
      enrollButtonText = "Satrt Learning Now!";
      break;
    case CourseDiffculty.ADVANCED, CourseDiffculty.INTERMEDIATE:
      enrollButtonText = "Enroll Now";
      break;
    default:
      enrollButtonText = "Enroll";
      break;
    }

    const submitReivew = (event) =>{
      event.preventDefault()
    }
    const cancelReview = (event) => {
      event.preventDefault()
    }
    
  return (
    <>
      <div className='course-card'>
        <div className='title'>
          {isNew && <FiberNewIcon className='new-icon' />}
          <h2 className='course-name'>{courseName}</h2>
          <p className='enrollment-count'>Enrollment:{enrollmentCount}</p>
        </div>
        <div className='course-info'>
          <p><LocationPinIcon className='icon' />{price}</p>
          <p><PriceChangeOutlinedIcon className='icon' />{location}</p>
          <p><AccessTimeIcon className='icon' />{duration}</p>
          <p><LanguageIcon className='icon' />{language}</p>
        </div>
        <div className='course-image'>
          <img src={courseImage} alt='course image'></img>
        </div>
        <div className='buttons-container'>
          <button className='enroll-button' onClick={() => {
            console.debug("Clicked Enrollbutton")
            handleEnrollment(id)
          }}>{enrollButtonText}</button>
          <button className='review-button'>Review</button>
        </div>
      </div>
      <form className="review-form">
        <textarea name="Leave you review" placeholder='leave your reveiw' content=''></textarea>
        <button onClick={submitReivew}>Submit Reivew</button>
        <button onClick={cancelReview}>Cancel</button>
      </form>
    </>
  )
}
export default CourseCard