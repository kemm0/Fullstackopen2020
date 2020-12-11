const { map } = require('lodash')

const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
const totalLikes = (blogs) => {
    return blogs.reduce((acc,blog) => {return acc + blog.likes},0)
}
const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog)
}
const mostBlogs = (blogs) => {
    const result = _(blogs.map(blog => blog.author))
    .countBy()
    .entries()
    .maxBy(_.last)
    result_obj = {
        author: result[0],
        blogs: result[1]
    }
    return result_obj
}
const mostLikes = (blogs) => {
    const authorLikes = blogs.reduce(({likesByAuthor,most},{author,likes}) => {
        likesByAuthor[author] = (likesByAuthor[author] || 0) + likes
        likes = likesByAuthor[author]
        if(likesByAuthor[author] > most.likes){
            most = {author,likes}
        }
        return {likesByAuthor,most}
    },{likesByAuthor: {}, most: {likes:0}})
    return authorLikes.most
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }