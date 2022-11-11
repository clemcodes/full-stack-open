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

module.exports = {
  dummy,
  totalLikes
}