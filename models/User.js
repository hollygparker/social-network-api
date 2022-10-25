const {Schema, model } = require('mongoose')

const userSchema = new Schema (
    {
      
        username: {
            type: String,
            required: "please enter a username",
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: "please enter an email",
            unique: true,
            // using regex generic for email matching
            match: [/.+@.+\..+/, "Email must match correct formatting! abc@email.com"]
        },
        thoughts: [
            {
                type:Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length
    })
const User = model('User', userSchema)
// exporting the user variable
module.exports = User;