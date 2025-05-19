import React, { useState } from 'react'
import CourseCard from './CourseCard'
import { hashString } from '../utils/hash'

export const CourseCatalog = () => {
  let courseInfo = {
    courseName:"JR Forntend 26",
    price:"2500 AUD",
    language:"English",
    location:"Canberra",
    duration:"2 weeks",
    diffculty:"beginner",
    isNew:true,
    courseImage:null,
    enrollmentCount:0,
    isComplete:false,
    id: new Date() + hashString("JR Forntend 26")
  }
  let courseInfo2 = {
    courseName:"Extraaaaaaaaaaaaaa long titileeeeeeeeeeeeeeeeeeeeeee",
    price:"2500 AUD",
    language:"English",
    location:"Canberra",
    duration:"2 weeks",
    diffculty:"advanced",
    isNew:true,
    courseImage:null,
    isComplete:false,
    enrollmentCount:0,
    id: new Date() + hashString("Extraaaaaaaaaaaaaa long titileeeeeeeeeeeeeeeeeeeeeee")
  }

  const [courseList,setCourseList] = useState([courseInfo,courseInfo2])
  const handleEnrollment =(courseToEnrollID) => {
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
