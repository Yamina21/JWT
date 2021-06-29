require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')


app.use = (express.json())

const posts = [
{
    username : 'yamina guenez',
    title : 'post one'
},
{
    username : 'zaineb',
    title : 'post two'
}   

]
app.get('/posts', authenticateToken, (req, res)=>{
    
    res.json(posts.filter(posts => posts.username === req.user.name))
})

app.post('/login', (req, res)=> {
    //Authenticate User
  const username = req.params.username
   const user = {name : username}
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({accessToken: accessToken})
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"] 
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

app.listen(3000)