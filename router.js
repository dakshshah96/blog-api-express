const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models')

// add few sample blog posts
BlogPosts.create('How to Tie a Tie',
                 'This blog post is gonna teach you how to tie a tie — a lost art.',
                 'Harvey Specter',
                 '2017-05-10');
BlogPosts.create('How I Met Your Mother',
                 'This blog post outlines the plot of the famous TV series, How I Met Your Mother.',
                 'Ted Mosby',
                 '2014-02-23');

// JSON of all blog posts on GET request
router.get('/', (req, res) => res.json(BlogPosts.get()));

// add new blog post, ensure has all required fields
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
});

// Delete blog posts by ID
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post ${req.params.id}`);
    res.status(204).end();
});

// Update blog post with PUT request
router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'id'];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    if (req.params.id !== req.body.id) {
      const message = (
        `Request path id (${req.params.id}) and request body id `
        `(${req.body.id}) must match`);
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Updating blog post \`${req.params.id}\``);
    const updatedItem = BlogPosts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });
    res.status(204).json(updatedItem);
});

module.exports = router;