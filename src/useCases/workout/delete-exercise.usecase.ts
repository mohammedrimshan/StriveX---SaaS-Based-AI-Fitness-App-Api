import { inject, injectable } from "tsyringe";
import { IDeleteExerciseUseCase } from "@/entities/useCaseInterfaces/workout/delete-exercise-usecase.interface";
import { IWorkoutRepository } from "@/entities/repositoryInterfaces/workout/workout-repository.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { HTTP_STATUS, ERROR_MESSAGES } from "@/shared/constants";
import { IWorkoutEntity } from "@/entities/models/workout.entity";

@injectable()
export class DeleteExerciseUseCase implements IDeleteExerciseUseCase {
  constructor(
    @inject("IWorkoutRepository") private _workoutRepository: IWorkoutRepository
  ) {}

  async execute(workoutId: string, exerciseId: string): Promise<IWorkoutEntity> {
    if (!workoutId || !exerciseId) {
      throw new CustomError(ERROR_MESSAGES.INVALID_INPUT, HTTP_STATUS.BAD_REQUEST);
    }

    try {
      const workout = await this._workoutRepository.findById(workoutId);
      if (!workout) {
        throw new CustomError(ERROR_MESSAGES.WORKOUT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      }

      const exerciseExists = workout.exercises.some(
        (ex) => ex._id?.toString() === exerciseId
      );
      if (!exerciseExists) {
        throw new CustomError(ERROR_MESSAGES.EXERCISE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      }

      const updatedWorkout = await this._workoutRepository.deleteExercise(workoutId, exerciseId);

      if (!updatedWorkout) {
        throw new CustomError(
          ERROR_MESSAGES.FAILED_TO_DELETE_EXERCISE,
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }

      return updatedWorkout;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        ERROR_MESSAGES.FAILED_TO_DELETE_EXERCISE,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}
