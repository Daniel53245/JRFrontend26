import React, { useEffect, useState } from 'react';
import LecturerCard from './LecturerCard';
import type { LecturerInfo } from './types';
import axios from 'axios';

type Props = {
}

const LectureerCatalog = (props: Props) => {

  const [lecturerList,setLecturerList] = useState<LecturerInfo[]>([])
  const [error,setError] = useState('')
  const fetchLecturerList = async() => {
    try{
      const response = await axios.get('https://my-json-server.typicode.com/JustinHu8/courseCardMock/lecturers');
      console.debug(response) 
      setLecturerList(response.data)
    } catch(error) {
      if(error instanceof Error){
        setError(error.message)
      }else{
        setError(String(error))
      }
    }
  }
  useEffect(
    ()=>{
      fetchLecturerList()
    },[]
  )

  return (
    <div>
      <h2>Lecturers:</h2>
      {!error ?
      lecturerList.map((lecturer)=>(
          <LecturerCard
            key = {lecturer.id}
            lecturerInfo = {lecturer}
          />
      )):
      <h2>error</h2>
      }
      
  
    </div>
  )
}

export default LectureerCatalog