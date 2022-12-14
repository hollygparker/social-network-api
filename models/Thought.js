const { Schema, Types, model, Mongoose, default: mongoose } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema (
    {
      
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 300
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })
const Thought = model('Thought', thoughtSchema)
// exporting the thought variable
module.exports = Thought;