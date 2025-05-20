import React from 'react'
import type { LecturerInfo } from './types'


type Props = {
  lecturerInfo:LecturerInfo
}
const LecturerCard = (props: Props) => {
  return (
    <div>
      <p>{props.lecturerInfo.name}</p>
      <p>{props.lecturerInfo.title}</p>
      <p>{props.lecturerInfo.biography}</p>
    </div>
  )
}
export default LecturerCard