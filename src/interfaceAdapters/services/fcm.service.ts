import { injectable, inject } from "tsyringe";
import { getMessaging, Message } from "firebase-admin/messaging";
import { IFCMService } from "@/entities/services/fcm-service.interface";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { ITrainerRepository } from "@/entities/repositoryInterfaces/trainer/trainer-repository.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { HTTP_STATUS } from "@/shared/constants";
import { INotificationEntity } from "@/entities/models/notification.entity";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";

interface IFCMTokenHolder {
  fcmToken?: string;
}

@injectable()
export class FCMService implements IFCMService {
  constructor(
    @inject("IClientRepository") private clientModel: IClientRepository,
    @inject("ITrainerRepository") private trainerModel: ITrainerRepository,
    @inject("IAdminRepository") private adminModel: IAdminRepository
  ) {}

  async sendPushNotification(
    userId: string,
    title: string,
    message: string,
    notificationId: string,
    type: INotificationEntity["type"] = "INFO"
  ): Promise<void> {
    try {
      let user: IFCMTokenHolder | null = await this.clientModel.findById(
        userId
      );
      if (!user) {
        user = await this.trainerModel.findById(userId);
      }

      if (!user) {
        user = await this.adminModel.findById(userId);
      }

      if (!user?.fcmToken) {
        console.warn(`[DEBUG] No FCM token for user ${userId}`);
        return;
      }

      console.log(
        `[DEBUG] Found FCM token for user ${userId}: ${user.fcmToken}`
      );
      // Send FCM message
      const fcmMessage: Message = {
        token: user.fcmToken,
        notification: { title, body: message },
        data: {
          id: notificationId,
          type,
        },
      };
      await getMessaging().send(fcmMessage);
      console.log(`[DEBUG] Push sent successfully to ${userId}`);
      console.log(
        `[DEBUG] Push notification sent to ${userId}, ID: ${notificationId}`
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        "Failed to send push notification",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}
