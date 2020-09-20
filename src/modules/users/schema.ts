import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    sendTime: {
        type: {
            hour: Number,
            minute: Number
        },
        default: {
            hour: 8,
            minute: 0
        }
    },
    emailsEnabled: {
        type: Boolean,
        default: true
    },
    favoriteSubreddits: {
        type: [String],
        default: []
    }
});

export default mongoose.model('Users', schema);
