/**
 * @file Mongoose model and schema for the Video entity.
 * @module models/video.model
 */

import { Schema, model, Document } from 'mongoose';
import { Video as IVideo } from '../schemas/video.schema';

// Interface for the Mongoose document, extending our base Video type
export interface IVideoDocument extends IVideo, Document {}

const VideoSchema = new Schema<IVideoDocument>(
  {
    title: { type: String, required: true },
    creator: { type: String, required: true },
    duration: { type: Number, required: true },
    uploadTime: { type: Date, default: Date.now },
    description: { type: String, required: true },
    targetAudience: {
      type: String,
      enum: ['children', 'teens', 'adults'],
      required: true,
    },
    language: { type: String, required: true, length: 2 },
  },
  {
    // Mongoose options
    timestamps: false, // We use our own uploadTime
    toJSON: {
      virtuals: true, // Ensure virtuals are included in JSON output
      transform(doc, ret) {
        ret.id = ret._id; // Map _id to id
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const Video = model<IVideoDocument>('Video', VideoSchema);
