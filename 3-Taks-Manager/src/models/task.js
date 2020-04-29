const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

//! Remove fields before sending back
taskSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Task', taskSchema);
