const dummy = (blogs) => {
    return 1;
  }
  
const totalLikes = (blogs) =>{
    return blogs.reduce((sum, curr)=>sum+curr.likes,0)
}


const favoriteBlog = (blogs) =>{
    let favBlog = blogs[0]

    for(let i=0; i<blogs.length; i++){
        if(blogs[i].likes > favBlog.likes){
            favBlog = blogs[i]
        }
    }

    return favBlog;
}

const mostLikes = (blogs) => {
    const authorLikes = {}
    
    blogs.forEach(blog => {
        authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
    })
    
    let topAuthor = ''
    let maxLikes = 0
    
    for (const author in authorLikes) {
        if (authorLikes[author] > maxLikes) {
            maxLikes = authorLikes[author]
            topAuthor = author
        }
    }
    
    return {
        author: topAuthor,
        likes: maxLikes
    }
}

const mostBlogs = (blogs) =>{
    const authorCount = {}
    
    blogs.forEach(blog=>{
        authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
    })

    let topAuthor = ''
    let maxBlogs = 0

    for(const author in authorCount){
        if(authorCount[author] > maxBlogs){
            maxBlogs = authorCount[author]
            topAuthor = author
        }
    }

    return{
        author: topAuthor,
        blogs: maxBlogs
    }
}
module.exports = {
    dummy, totalLikes, favoriteBlog, mostLikes, mostBlogs
}