const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here

// GET endpoint to fetch blogs
router.get('/blog', async (req, res) => {
    const { page = 1, search } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;
  
    try {
      const query = search ? { topic: { $regex: search, $options: 'i' } } : {};
      const blogs = await Blog.find(query).skip(skip).limit(limit);
  
      res.status(200).json({
        status: 'success',
        result: blogs,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch blogs',
      });
    }
  });
  
  // POST endpoint to create a new blog
  router.post('/blog', async (req, res) => {
    const { topic, description, posted_at, posted_by } = req.body;
  
    try {
      const blog = new Blog({ topic, description, posted_at, posted_by });
      const result = await blog.save();
  
      res.status(201).json({
        status: 'success',
        result,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to create blog',
      });
    }
  });
  
  // PUT endpoint to update a blog by id
  router.put('/blog/:id', async (req, res) => {
    const { id } = req.params;
    const { topic, description, posted_at, posted_by } = req.body;
  
    try {
      const result = await Blog.findByIdAndUpdate(id, { topic, description, posted_at, posted_by }, { new: true });
  
      res.status(200).json({
        status: 'success',
        result,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to update blog',
      });
    }
  });
  
  // DELETE endpoint to delete a blog by id
  router.delete('/blog/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await Blog.findByIdAndDelete(id);
  
      res.status(200).json({
        status: 'success',
        result,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete blog',
      });
    }
  });


router.get('/blog',(req,res)=>{
    res.json({ok:'blog'})
})


module.exports = router;