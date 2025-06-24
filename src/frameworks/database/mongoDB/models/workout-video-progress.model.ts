import { Document,Types, ObjectId, model } from "mongoose";
import { IWorkoutVideoProgressEntity } from "@/entities/models/workout.progress.entity";
import { WorkoutVideoProgressSchema } from "../schemas/workout-video-progress.schema";

export interface IWorkoutVideoProgressModel extends Omit<IWorkoutVideoProgressEntity, "id"| "workoutId" | "userId">, Document {
  _id: ObjectId;
  workoutId: Types.ObjectId;
  userId: Types.ObjectId;
}

export const WorkoutVideoProgressModel = model<IWorkoutVideoProgressModel>("WorkoutVideoProgress", WorkoutVideoProgressSchema);