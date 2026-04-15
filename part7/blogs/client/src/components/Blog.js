import Card from "@mui/material/Card"
import { CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"
//
const Blog = ({ blog }) => {
    return (
        <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "none" }}>
            <Card style={{ margin: "10px" }}>
                <CardContent>
                    <Typography variant="h5">{blog.title}</Typography>
                    <Typography variant="body2">
                        Author: {blog.author}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default Blog
