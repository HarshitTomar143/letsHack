import mongoose, {Document, Model, Schema} from "mongoose";

interface IUser extends Document{
    email: string,
    password?: string,
    id: string
}

const UserSchema: Schema<IUser>= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: false
    },

})

const User: Model<IUser>= mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User