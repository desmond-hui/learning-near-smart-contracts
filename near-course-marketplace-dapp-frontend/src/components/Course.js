import { purchaseCourse } from '../utils/courses';

const Course = ({ course }) => {
  const buyButtonPressed = async (courseId, price) => {
    try {
      await purchaseCourse({
        courseId,
        price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Course Name: {course.name}</h3>
      <h3>Course ID: {course.id}</h3>
      <h3>Course Price: {course.price}</h3>
      <h3>Course Owner: {course.owner}</h3>

      <button onClick={() => buyButtonPressed(course.id, course.price)}>
        Buy Now
      </button>
    </div>
  );
};

export default Course;
