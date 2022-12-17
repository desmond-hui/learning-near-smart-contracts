import { addCourse } from '../utils/courses';

const AddCourse = () => {
  const addNewCourse = async (event) => {
    // Whenever you click onto the form, the page wouldn't be refreshed
    event.preventDefault();

    const courseId = document.getElementById('courseId').value;
    const courseName = document.getElementById('courseName').value;
    const coursePrice = document.getElementById('coursePrice').value;

    var course = { id: courseId, name: courseName, price: coursePrice };

    try {
      addCourse({ course: course });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={addNewCourse}>
        <label htmlFor="courseId"> Course ID:</label>
        <input type="text" id="courseId" name="courseId" />
        <br />
        <label htmlFor="courseName"> Course Name:</label>
        <input type="text" id="courseName" name="courseName" />
        <br />
        <label htmlFor="coursePrice"> Course Price:</label>
        <input type="text" id="coursePrice" name="coursePrice" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddCourse;
