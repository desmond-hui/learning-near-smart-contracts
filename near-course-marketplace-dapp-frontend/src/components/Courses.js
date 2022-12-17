import Course from './Course';

const Courses = ({ courses }) => {
  return (
    <div>
      <h5>All Courses</h5>
      {courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </div>
  );
};

export default Courses;
