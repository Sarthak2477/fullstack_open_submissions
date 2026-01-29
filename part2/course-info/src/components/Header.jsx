const Header = ({courseName}) =>{
    console.log("course name: " + courseName);
    return (
        <div>
            <h1>{courseName}</h1>
        </div>
    )
}

export default Header;
