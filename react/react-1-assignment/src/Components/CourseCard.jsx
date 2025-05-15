import React from 'react' 
import './CourseCard.scss'
import FiberNewIcon from '@mui/icons-material/FiberNew';

//Properties
//price language  duration location diffculty
//TODO: add button for enroll 
//TODO: change button text based on diffuclty level passed in 
//TODO: add fucntion for button leave review
//add review button for leaving review
//Props
//courseName, price , language, duration,location,diffcult


const CourseCard=({
    courseName,
    price,
    language,
    duration,
    location,
    diffculty,
    isNew,
    courseImage
  }) =>{
return (
    <div className='course-card'>
      <div className='title'>
        {isNew && <FiberNewIcon className='new-icon'/>}
        <h2 className='course-name'>{courseName}</h2>
        <p className='enrollment-count'>Enrollment</p>
      </div>
      <div className='course-info'>
        <p>{price}</p>
        <p>{location}</p>
        <p>{duration}</p>
        <p>{language}</p>
      </div>
      <div className='course-image'>
        <img src={courseImage} alt='course image'></img>
      </div>
      <dib className='buttons-container'>
        <button className='enroll-button'>Enroll</button>
        <button className='review-button'>Review</button>
      </dib>
    </div>
  )
}


export default CourseCard