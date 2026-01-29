import Content from "./Content"
import Header from "./Header"

const Course = ({course}) =>{
    const total = course.parts.reduce((sum, part) => sum + part.exercises,0)
    return(
        <div>
            <Header courseName={course.name}/>
            <Content parts={course.parts}/>
            <b>total of {total} exercises.</b>
        </div>
    )
}

export default Course;