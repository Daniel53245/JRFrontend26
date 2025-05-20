export interface LectureInfo {
        id: number,
        courseTitile: string,
        lessons: number,
}

export interface LecturerInfo {
        id: number,
        name: string,
        title: string,
        biography: string,
        courseTaught: LectureInfo[]
}
