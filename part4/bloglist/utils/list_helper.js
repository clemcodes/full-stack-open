const dummy = (blogs) => {
    return 1
  }

const totalLikes = (bloglist) => {   
    if(bloglist.length === 0){
      return 0
    } else {
      let sumOfLikes = 0
      bloglist.forEach(blog => {
        sumOfLikes += blog.likes
      });
      return sumOfLikes
    }  
}

const favoriteBlog = (bloglist) => {
  return bloglist.reduce((prev, current) => (prev.likes > current.likes ? prev : current))
}

const mostBlogs = (bloglist) => {
  const authorsBlog = {}

  bloglist.map((blog) => {
    if(!authorsBlog[blog.author]) {
      authorsBlog[blog.author] = 1
    } else {
      authorsBlog[blog.author] = authorsBlog[blog.author] + 1
    }
  })

  const authorWithMostBlogs = Object.keys(authorsBlog).reduce((a,b) => authorsBlog[a] > authorsBlog[b] ? a : b)

  return {
    author: authorWithMostBlogs,
    blogs: authorsBlog[authorWithMostBlogs]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}