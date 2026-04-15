const _ = require("lodash")

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = blogs.reduce(((total, blog) => { return total + blog.likes }), 0)
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    let favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    const arrayOfAuthors = blogs.map((blog) => { return blog.author })
    var result = _.flow(
        _.countBy,
        _.entries,
        _.partialRight(_.maxBy, _.last),

    )(arrayOfAuthors)
    return {
        "author": result[0],
        blogs: result[1]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    const arrayOfAuthors = blogs.map((blog) => { return { "author": blog.author, "likes": blog.likes } })

    const sum =
        _(arrayOfAuthors)
            .groupBy("author")
            .map((objs, key) => ({
                "author": key,
                "likes": _.sumBy(objs, "likes")
            }))
            .value()

    const result = _.maxBy(sum, "likes")

    return result
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }