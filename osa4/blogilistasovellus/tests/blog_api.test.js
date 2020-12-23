const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const { response } = require('express')

beforeEach(async() => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Identifying field is called id', async () => {
  const response = await api.get('/api/blogs')
  for (const i in response.body){
    expect(response.body[i].id).toBeDefined()
  }
})

test('a valid blog can be added', async () => {
  const newBlog =     {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const content = blogsAtEnd.map(blog => blog.title)
  expect(content).toContain(newBlog.title)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('No likes equals to 0', async () => {
  const newBlog =     {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const content = blogsAtEnd.map(blog => blog.title)
  expect(content).toContain(newBlog.title)
  expect(blogsAtEnd[blogsAtEnd.length-1].likes).toEqual(0)
})

test('POST with missing title and url returns 400 Bad Request', async () => {
  const newBlog =     {
    author: "Robert C. Martin",
    likes: 123
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})