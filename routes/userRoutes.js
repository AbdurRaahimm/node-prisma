import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


//  signup route
router.post('/signup', async(req, res) => {
    try {
        // user exists in the database or not
        const user = await prisma.user.findUnique({ where: {email: req.body.email}  });
        if (user) {
            // return res.status(400).json({ error: 'User already exists' });
           throw new Error('User already exists');
        }

        // create user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        });
        res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// login route
router.post('/login', async(req, res) => {
    try {
        // check if user exists
        const user = await prisma.user.findUnique({ where: { email: req.body.email } });
        if (!user) {
            // return res.status(400).json({ error: 'Invalid credentials' });
            throw new Error('Invalid credentials');
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            // return res.status(400).json({ error: 'Invalid credentials' });
            throw new Error('Invalid credentials');
        }

        res.status(200).json({ message: 'Login successful', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// get all users
router.get('/', async(req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// update user 
router.put('/:id', async(req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name: req.body.name,
                email: req.body.email
            }
        });
        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});


// user add comments 
router.post('/:id/add-comment', async(req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.params.id } });
        if (!user) {
            throw new Error('User not found');
        }

        const comment = await prisma.comment.create({
            data: {
                content: req.body.content,
                postId: req.body.postId,
            }
        });
        res.status(201).json({ message: 'Comment added successfully', data: comment });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// get user comments
router.get('/:id/comments', async(req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: req.params.id
            }
        });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});


export { router as userRouter};