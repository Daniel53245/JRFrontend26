import React, { useState } from 'react'
import CourseCard from './CourseCard'

export const CourseCatalog = () => {
  let courseInfo = {
    courseName:"JR Forntend 26",
    price:"2500 AUD",
    language:"English",
    location:"Canberra",
    duration:"2 weeks",
    diffculty:"beginner",
    isNew:true,
    courseImage:"",
    enrollmentCount:0,
    id: new Date()
  }

  const [courseList,setCourseList] = useState([courseInfo])
  const handleEnrollment =(courseToEnrollID) => {
    console.debug("Enter handle Enrollment")
    setCourseList((prev)=>{
      return prev.map((course)=>{
        return course.id === courseToEnrollID ? {...course,'enrollmentCount':course.enrollmentCount+1}: course
      })
    })
  }
  return (
    <div className='CourseCatalog'>
      {courseList.map(
        (course,index)=> {
          return <CourseCard
            key = {course.id}
            id = {course.id}
            courseName={course.courseName}
            price = {course.price}
            language = {course.language}
            location = {course.location}
            duration = {course.duration}
            diffculty={course.diffculty}
            isNew = {course.isNew}
            courseImage={course.courseImage}
            enrollmentCount = {course.enrollmentCount}
            handleEnrollment = {handleEnrollment}
          />
        }
      )}
    </div>
  )
}
