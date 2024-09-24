
import bcrypt from 'bcrypt'
import { model, Schema } from 'mongoose';
import { MODELS, ROLES, STATUS } from '../../src/utilies/enums.js';

const userSchema = new Schema({
    userName: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum:Object.values(ROLES),
        default: ROLES.USER,
    },
    status: {
        type: String,
        enum: Object.values(STATUS),
        trim: true,
        default: STATUS.OFFLINE,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    otp: {
        type: String,
        default: null
    },
    expiresAt: {
        type: Date,
        default: null
    }
},
    { timestamps: true }
)
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, +process.env.HASH_SALT_ROUNDS)
    }
    next();
})
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export const User = model(MODELS.USER, userSchema)