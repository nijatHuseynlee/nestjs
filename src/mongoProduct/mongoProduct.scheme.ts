import { Schema } from 'mongoose'


export const MongoProductSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, required: false},
    price: {type: Number, required: true},
});