import './App.css';
import CourseCard from './Components/CourseCard';
import { CourseCatalog } from './Components/CourseCatalog';
import image from './images/Image_created_with_a_mobile_phone.png'

function App() {
  let courseName = "JR Front End";
  let price = "2500$";
  let language = "English";
  let location = "Canberra";
  let duration = "5 weeks"
  let diffculty = "beginner";
  let isNew = true;
  let courseImage = image
  return (
    <>

    <CourseCatalog></CourseCatalog>
    <CourseCard
      courseName={courseName}
      courseImage={courseImage}
      price={price}
      language={language}
      location={location}
      duration={duration}
      diffculty={diffculty}
      isNew={isNew}
    ></CourseCard>
    </>
  );
}

export default App;
