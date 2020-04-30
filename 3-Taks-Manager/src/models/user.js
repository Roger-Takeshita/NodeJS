const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 8;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: async (value) => {
                if (!(await validator.isEmail(value))) {
                    throw new Error('Email is invalid');
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a positive number');
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
            }
        },
        avatar: {
            type: Buffer
        }
    },
    {
        timestamps: true
    }
);

//! Virtual relationship
//+ 1st argument is the name (this could be any name)
//+ 2nd argument is an object, which we need to configure each field
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', //- local field on User schema
    foreignField: 'user' //- foreign field on  Task schema
});

//! Create a custom mongoose method
userSchema.methods.comparePassword = async function (tryPassword, callback) {
    const user = this;
    await bcrypt.compare(tryPassword, user.password, callback);
};

//! Just before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS);
    next();
});

//! Remove fields before sending back
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.age;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.avatar;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('User', userSchema);
