const Course = ({ course }) => {

    const { id, name } = course;

    return (
        <div>

            <h3>Course Name: {name}</h3>
            <h4>Course ID: {id}</h4>

        </div>
    );
};

export default Course;