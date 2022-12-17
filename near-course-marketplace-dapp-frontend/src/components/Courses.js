const Courses = ({ courses }) => {
  return (
    <div>
      <h5>All Courses</h5>
      {courses.map((course) => (
        <div key={course.id}>
          <h4>Course name: {course.name}</h4>
          <h4>Course ID: {course.id}</h4>
          <h4>Price: {course.price}</h4>
          <h4>Owner: {course.owner}</h4>
        </div>
      ))}
    </div>
  );
};

export default Courses;
