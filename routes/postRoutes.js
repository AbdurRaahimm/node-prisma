import express from 'express';
const router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// add post 
router.post('/add', async(req, res) => {
    try {
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: req.body.authorId
            }
        });
        res.status(201).json({ message: 'Post created successfully', data: post });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}
);

// get all posts
router.get('/all-posts', async(req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// get post by id
router.get('/:id', async(req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// update post
router.put('/:id', async(req, res) => {
    try {
        const post = await prisma.post.update({
            where: {
                id: req.params.id
            },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });
        res.status(200).json({ message: 'Post updated successfully', data: post });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// delete post
router.delete('/:id', async(req, res) => {
    try {
        const post = await prisma.post.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Post deleted successfully', data: post });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});



export { router as postRouter}