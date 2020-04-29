const User = require('../models/user');
const Task = require('../models/task');
const { createJWT } = require('../middlewares/auth');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');

const getUsers = async (req, res) => {
    try {
        res.send(await User.find({}));
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const newUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await createJWT(user);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const updateUser = async (req, res) => {
    const bodyFields = Object.keys(req.body);
    const allowedFields = ['name', 'email', 'password', 'age'];
    const isValidOperation = bodyFields.every((field) => allowedFields.includes(field));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid Updates!' });

    try {
        //! the find by id and update method bypasses moongose
        //! It performs a direct operation on the database
        //+ this means that our middleware won't be executed
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // });

        const user = await User.findOne({ _id: req.user._id });
        bodyFields.forEach((field) => (user[field] = req.body[field]));
        await user.save();

        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.user._id });
        if (!user) return res.status(404).send({ error: 'User not found' });
        await Task.deleteMany({ user: req.user._id });
        sendCancelationEmail(user.email, user.name);
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send({ message: "User doesn't exist" });
        user.comparePassword(req.body.password, async (error, isMatch) => {
            if (!isMatch || error) return res.status(400).send({ message: 'Unable to login' });
            const token = await createJWT(user);
            res.send({ user, token });
        });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const uploadUserAvatar = async (req, res) => {
    try {
        const bufferImage = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(404).send({ message: "User doesn't exist" });
        user.avatar = bufferImage;
        await user.save();
        res.send('File uploaded successfully');
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const deleteUserAvatar = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(404).send({ message: "User doesn't exist" });
        user.avatar = undefined;
        res.send(await user.save());
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong', error });
    }
};

const getUserAvatar = async (req, res) => {
    try {
        const id = req.params.id ? { _id: req.params.id } : { _id: req.user._id };
        const user = await User.findOne(id);
        if (!user) return res.status(404).send({ message: "User doesn't exist" });
        if (!user.avatar) return res.status(404).send({ message: "User doesn't have an avatar" });
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getUsers,
    getUser,
    getUserProfile,
    newUser,
    updateUser,
    deleteUser,
    loginUser,
    uploadUserAvatar,
    deleteUserAvatar,
    getUserAvatar
};
