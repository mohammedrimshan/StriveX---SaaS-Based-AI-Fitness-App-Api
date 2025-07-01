import { container, delay } from "tsyringe";

import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { PasswordBcrypt } from "../../frameworks/security/password.bcrypt";
import { OtpBcrypt } from "../security/otp.bcrypt";

import { IRegisterStrategy } from "@/useCases/auth/register-strategies/register-strategy.interface";
import { ClientRegisterStrategy } from "../../useCases/auth/register-strategies/client-register.stratergy";
import { ClientLoginStrategy } from "@/useCases/auth/login-strategies/client-login.strategy";
import { AdminRegisterStrategy } from "@/useCases/auth/register-strategies/admin-register.strategy";
import { AdminLoginStrategy } from "@/useCases/auth/login-strategies/admin-login.strategy";
import { TrainerRegisterStrategy } from "@/useCases/auth/register-strategies/trainer-register.strategy";
import { TrainerLoginStrategy } from "@/useCases/auth/login-strategies/trainer-login.strategy";

import { IOtpService } from "../../entities/services/otp-service.interface";
import { OtpService } from "../../interfaceAdapters/services/otp.service";
import { IEmailService } from "../../entities/services/email-service.interface";
import { EmailService } from "../../interfaceAdapters/services/emai.service";
import { IUserExistenceService } from "../../entities/services/user-exist-service.interface";
import { UserExistenceService } from "../../interfaceAdapters/services/user-existance.service";
import { ITokenService } from "../../entities/services/token-service.interface";
import { JWTService } from "../../interfaceAdapters/services/jwt.service";
import { ICloudinaryService } from "@/interfaceAdapters/services/cloudinary.service";
import { CloudinaryService } from "@/interfaceAdapters/services/cloudinary.service";
import { GeminiService } from "@/interfaceAdapters/services/gemini.service";
import { IStripeService } from "@/entities/services/stripe-service.interface";
import { StripeService } from "@/interfaceAdapters/services/stripe.service";
import { SocketService } from "@/interfaceAdapters/services/socket.service";
import ChatbotService from "@/interfaceAdapters/services/chatbot.service";
import { SocketNotificationService } from "@/interfaceAdapters/services/socket-notification.service";
import { NotificationService } from "@/interfaceAdapters/services/notification.service";
import { FCMService } from "@/interfaceAdapters/services/fcm.service";
import { IFCMService } from "@/entities/services/fcm-service.interface";
import { VideoSocketService } from "@/interfaceAdapters/services/video-socket.service";
import { ZegoTokenService } from "@/interfaceAdapters/services/zego-token.service";

import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface";
import { RegisterUserUseCase } from "../../useCases/auth/register-user.usecase";
import { ISendOtpEmailUseCase } from "../../entities/useCaseInterfaces/auth/send-otp-usecase.interface";
import { SendOtpEmailUseCase } from "../../useCases/auth/send-otp-email.usecase";
import { IVerifyOtpUseCase } from "../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { VerifyOtpUseCase } from "../../useCases/auth/verify-otp.usecase";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserUseCase } from "../../useCases/auth/login-user.usecase";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/auth/generate-token-usecase.interface";
import { GenerateTokenUseCase } from "../../useCases/auth/generate-token.usecase";
import { IBlackListTokenUseCase } from "../../entities/useCaseInterfaces/auth/blacklist-token-usecase.interface";
import { BlackListTokenUseCase } from "../../useCases/auth/blacklist-token.usecase";
import { IRevokeRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/revoke-refresh-token-usecase.interface";
import { RevokeRefreshTokenUseCase } from "../../useCases/auth/revoke-refresh-token.usecase";
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/refresh-token-usecase.interface";
import { RefreshTokenUseCase } from "../../useCases/auth/refresh-token.usecase";
import { IGetAllUsersUseCase } from "@/entities/useCaseInterfaces/admin/get-all-users-usecase.interface";
import { GetAllUsersUseCase } from "@/useCases/user/get-all-users.usecase";
import { UpdateUserStatusUseCase } from "@/useCases/user/update-user-status.usecase";
import { IUpdateUserStatusUseCase } from "@/entities/useCaseInterfaces/admin/update-user-status-usecase.interface";
import { TrainerVerificationUseCase } from "@/useCases/trainer/trainer-verification.usecase";
import { ITrainerVerificationUseCase } from "@/entities/useCaseInterfaces/admin/trainer-verification-usecase.interface";
import { GoogleUseCase } from "@/useCases/auth/google-auth.usecase";
import { IGoogleUseCase } from "@/entities/useCaseInterfaces/auth/google-auth.usecase.interface";
import { IForgotPasswordUseCase } from "@/entities/useCaseInterfaces/auth/forgot-password-usecase.interface";
import { ForgotPasswordUseCase } from "@/useCases/auth/forgot-password.usecase";
import { IResetPasswordUseCase } from "@/entities/useCaseInterfaces/auth/reset-password-usecase.interface";
import { ResetPasswordUseCase } from "@/useCases/auth/reset-password.usecase";
import { IUpdateUserProfileUseCase } from "@/entities/useCaseInterfaces/users/update-user-profile-usecase.interface";
import { UpdateUserProfileUseCase } from "@/useCases/user/update-user-profile.usecase";
import { UpdateClientPasswordUseCase } from "@/useCases/user/change-logged-in-user-password.usecase";
import { IUpdateClientPasswordUseCase } from "@/entities/useCaseInterfaces/users/change-logged-in-user-password-usecase.interface";
import { IUpdateTrainerProfileUseCase } from "@/entities/useCaseInterfaces/trainer/update-trainer-profile.usecase.interface";
import { UpdateTrainerProfileUseCase } from "@/useCases/trainer/update-trainer-profile.usecase";
import { IGetAllCategoriesUseCase } from "@/entities/useCaseInterfaces/common/get-all-category.interface";
import { GetAllCategoriesUseCase } from "@/useCases/common/get-all-categories.usecase";
import { ICreateNewCategoryUseCase } from "@/entities/useCaseInterfaces/admin/create-new-category.interface";
import { CreateNewCategoryUseCase } from "@/useCases/admin/create-new-category.usecase";
import { IGetAllPaginatedCategoryUseCase } from "@/entities/useCaseInterfaces/admin/get-all-paginated-category-usecase.interface";
import { GetAllPaginatedCategoryUseCase } from "@/useCases/admin/get-all-paginated-category.usecase";
import { IUpdateCategoryStatusUseCase } from "@/entities/useCaseInterfaces/admin/update-category-status-usecase.interface";
import { UpdateCategoryStatusUseCase } from "@/useCases/admin/update-category-status.usecase";
import { IUpdateCategoryUseCase } from "@/entities/useCaseInterfaces/admin/update-category-usecase.interface";
import { UpdateCategoryUseCase } from "@/useCases/admin/update-category.usecase";
import { IGenerateWorkoutPlanUseCase } from "@/entities/useCaseInterfaces/users/generate-workout-plans.usecase.interface";
import { GenerateWorkoutPlanUseCase } from "@/useCases/user/generate-workoutplan.usecase";
import { IGenerateDietPlanUseCase } from "@/entities/useCaseInterfaces/users/generate-diet-plans.usecase.interface";
import { GenerateDietPlanUseCase } from "@/useCases/user/generate-dietplan.usecase";
import { IGetWorkoutPlanUseCase } from "@/entities/useCaseInterfaces/users/get-workout-plans.usecase.interface";
import { GetWorkoutPlanUseCase } from "@/useCases/user/get-workoutplan.usecase";
import { IGetDietPlanUseCase } from "@/entities/useCaseInterfaces/users/get-diet-plans.usecase.interface";
import { GetDietPlanUseCase } from "@/useCases/user/get-dietplan.usecase";
import { IUpdateTrainerPasswordUseCase } from "@/entities/useCaseInterfaces/trainer/update-trainer-password.usecase.interface";
import { UpdateTrainerPasswordUseCase } from "@/useCases/trainer/change-logged-in-trainer-password.usecase";
import { IAddWorkoutUseCase } from "@/entities/useCaseInterfaces/workout/add-workout-usecase.interface";
import { AddWorkoutUseCase } from "@/useCases/workout/add-workout.usecase";
import { IUpdateWorkoutUseCase } from "@/entities/useCaseInterfaces/workout/update-workout-usecase.interface";
import { UpdateWorkoutUseCase } from "@/useCases/workout/update-workout.usecase";
import { IToggleWorkoutStatusUseCase } from "@/entities/useCaseInterfaces/workout/toggle-workout-usecase.interface";
import { ToggleWorkoutStatusUseCase } from "@/useCases/workout/toggle-workout-status.usecase";
import { IDeleteWorkoutUseCase } from "@/entities/useCaseInterfaces/workout/delete-workout-usecase.interface";
import { DeleteWorkoutUseCase } from "@/useCases/workout/delete-workout.usecase";
import { IGetWorkoutsUseCase } from "@/entities/useCaseInterfaces/workout/get-workout-usecase.interface";
import { GetWorkoutsUseCase } from "@/useCases/workout/get-workouts.usecase";
import { IGetWorkoutsByCategoryUseCase } from "@/entities/useCaseInterfaces/workout/get-workout-by-category-usecase.interface";
import { GetWorkoutsByCategoryUseCase } from "@/useCases/workout/get-workouts-by-category.usecase";
import { IRecordProgressUseCase } from "@/entities/useCaseInterfaces/workout/record-progress-usecase.interface";
import { RecordProgressUseCase } from "@/useCases/workout/record-progress.usecase";
import { IGetUserProgressUseCase } from "@/entities/useCaseInterfaces/workout/get-user-progress-usecase.interface";
import { GetUserProgressUseCase } from "@/useCases/workout/get-user-progress.usecase";
import { IGetAllAdminWorkoutsUseCase } from "@/entities/useCaseInterfaces/workout/get-all-workouts-usecase.interface";
import { GetAllAdminWorkoutsUseCase } from "@/useCases/workout/get-all-admin-workouts.usecase";
import { IGetAllTrainersUseCase } from "@/entities/useCaseInterfaces/users/get-all-trainers.usecase.interface";
import { GetAllTrainersUseCase } from "@/useCases/user/get-all-trainers.usecase";
import { IGetTrainerProfileUseCase } from "@/entities/useCaseInterfaces/users/get-trainer-profile.usecase.interface";
import { GetTrainerProfileUseCase } from "@/useCases/user/get-trainer-profile.usecase";
import { IAddExerciseUseCase } from "@/entities/useCaseInterfaces/workout/add-exercise-usecase.interface";
import { AddExerciseUseCase } from "@/useCases/workout/add-exercise-usecase";
import { IDeleteExerciseUseCase } from "@/entities/useCaseInterfaces/workout/delete-exercise-usecase.interface";
import { DeleteExerciseUseCase } from "@/useCases/workout/delete-exercise.usecase";
import { IUpdateExerciseUseCase } from "@/entities/useCaseInterfaces/workout/update-exercise-usecase.interface";
import { UpdateExerciseUseCase } from "@/useCases/workout/update-exercise-usecase";
import { IGetWorkoutByIdUseCase } from "@/entities/useCaseInterfaces/workout/get-workout-by-id.usecase.interface";
import { GetWorkoutByIdUseCase } from "@/useCases/workout/get-workout-by-id.usecase";
import { ICreateStripeConnectAccountUseCase } from "@/entities/useCaseInterfaces/stripe/create-stripe-connect-account.usecase.interface";
import { CreateStripeConnectAccountUseCase } from "@/useCases/trainer/create-stripe-connect-account.usecase";
import { ICreateCheckoutSessionUseCase } from "@/entities/useCaseInterfaces/stripe/create-checkout-session.usecase.interface";
import { CreateCheckoutSessionUseCase } from "@/useCases/stripe/create-checkout-session.usecase";
import { IGetTrainerRequestsUseCase } from "@/entities/useCaseInterfaces/admin/get-user-trainer-request-usecase.interface";
import { GetTrainerRequestsUseCase } from "@/useCases/admin/get-trainer-request-usecase";
import { IUpdateTrainerRequestUseCase } from "@/entities/useCaseInterfaces/admin/update-user-trainer-request-usecase.interface";
import { UpdateTrainerRequestUseCase } from "@/useCases/admin/update-trainer-request.usecase";
import { IGetTrainerClientsUseCase } from "@/entities/useCaseInterfaces/trainer/get-clients-usecase.interface";
import { GetTrainerClientsUseCase } from "@/useCases/trainer/get-trainer-clients.usecase";
import { IAutoMatchTrainerUseCase } from "@/entities/useCaseInterfaces/users/automatch-trainer-usecase.interface";
import { AutoMatchTrainerUseCase } from "@/useCases/user/automatch-trainer-usecase";
import { IManualSelectTrainerUseCase } from "@/entities/useCaseInterfaces/users/manual-trainer-select-usecase.interface";
import { ManualSelectTrainerUseCase } from "@/useCases/user/manual-select-trainer-usecase";
import { ISaveTrainerSelectionPreferencesUseCase } from "@/entities/useCaseInterfaces/users/save-trainer-selection-preference-usecase.interface";
import { SaveTrainerSelectionPreferencesUseCase } from "@/useCases/user/save-trainer-selection-preferences.usecase";
import { IGetMatchedTrainersUseCase } from "@/entities/useCaseInterfaces/users/get-match-trainer.usecase.interface";
import { GetMatchedTrainersUseCase } from "@/useCases/user/get-matched-trainer-usecase";
import { ISelectTrainerFromMatchedListUseCase } from "@/entities/useCaseInterfaces/users/select-trainer-matched-list.usecase.interface";
import { SelectTrainerFromMatchedListUseCase } from "@/useCases/user/select-trainer-matched-list.usecase";
import { IGetPendingClientRequestsUseCase } from "@/entities/useCaseInterfaces/trainer/get-pending-request-usecase.interface";
import { GetPendingClientRequestsUseCase } from "@/useCases/trainer/get-pending-request-usecase";
import { ITrainerAcceptRejectRequestUseCase } from "@/entities/useCaseInterfaces/trainer/trainer-accept-reject-request-usecase.interface";
import { TrainerAcceptRejectRequestUseCase } from "@/useCases/trainer/trainer-accept-reject-request.usecase";
import { IBookSlotUseCase } from "@/entities/useCaseInterfaces/slot/book-slot-usecase.interface";
import { BookSlotUseCase } from "@/useCases/slot/book-slot.usecase";
import { ICreateSlotUseCase } from "@/entities/useCaseInterfaces/slot/create-slot-usecase.interface";
import { CreateSlotUseCase } from "@/useCases/slot/create-slot.usecase";
import { IGetTrainerSlotsUseCase } from "@/entities/useCaseInterfaces/slot/get-trainer-slots-usecase.interface";
import { GetTrainerSlotsUseCase } from "@/useCases/slot/get-trainer-slots.usecase";
import { ICancelBookingUseCase } from "@/entities/useCaseInterfaces/slot/cancel-booking-usecase.interface";
import { CancelBookingUseCase } from "@/useCases/slot/cancel-booking.usecase";
import { IGetSelectedTrainerSlotsUseCase } from "@/entities/useCaseInterfaces/slot/get-selected-trainer-slots-usecase.interface";
import { GetSelectedTrainerSlotsUseCase } from "@/useCases/slot/get-selected-trainer-slots.usecase";
import { IToggleSlotAvailabilityUseCase } from "@/entities/useCaseInterfaces/slot/chage-slot-status-usecase.interface";
import { ToggleSlotAvailabilityUseCase } from "@/useCases/slot/update-slot-status.usecase";
import { IGetUserBookingsUseCase } from "@/entities/useCaseInterfaces/slot/get-user-bookings.usecase.interface";
import { GetUserBookingsUseCase } from "@/useCases/slot/get-user-bookings.usecase";
import { IGetChatHistoryUseCase } from "@/entities/useCaseInterfaces/chat/get-chat-history-usecase.interface";
import { GetChatHistoryUseCase } from "@/useCases/chat/get-chat-history.usecase";
import { IGetChatParticipantsUseCase } from "@/entities/useCaseInterfaces/chat/get-chat-participants-usecase.interface";
import { GetChatParticipantsUseCase } from "@/useCases/chat/get-chat-participants.usecase";
import { IGetRecentChatsUseCase } from "@/entities/useCaseInterfaces/chat/get-recent-chats-usecase.interface";
import { GetRecentChatsUseCase } from "@/useCases/chat/get-recent-chats.usecase";
import { IValidateChatPermissionsUseCase } from "@/entities/useCaseInterfaces/chat/validate-chat-permissions-usecase.interface";
import { ValidateChatPermissionsUseCase } from "@/useCases/chat/validate-chat-permissions.usecase";
import { IDeleteMessageUseCase } from "@/entities/useCaseInterfaces/chat/delete-message-usecase.interface";
import { DeleteMessageUseCase } from "@/useCases/chat/delete-message.usecase";
import { ICreateWorkoutProgressUseCase } from "@/entities/useCaseInterfaces/progress/create-workout-progress.usecase.interface";
import { CreateWorkoutProgressUseCase } from "@/useCases/progress/create-workout-progress.usecase";
import { IUpdateWorkoutProgressUseCase } from "@/entities/useCaseInterfaces/progress/update-workout-progress.usecase.interface";
import { UpdateWorkoutProgressUseCase } from "@/useCases/progress/update-workout-progress.usecase";
import { IGetWorkoutProgressByUserAndWorkoutUseCase } from "@/entities/useCaseInterfaces/progress/get-workout-progress-by-user-and-workout.usecase.interface";
import { GetWorkoutProgressByUserAndWorkoutUseCase } from "@/useCases/progress/get-workout-progress-by-user-and-workout.usecase";
import { IUpdateVideoProgressUseCase } from "@/entities/useCaseInterfaces/progress/update-video-progress.usecase.interface";
import { UpdateVideoProgressUseCase } from "@/useCases/progress/update-video-progress.usecase";
import { IGetVideoProgressByUserAndWorkoutUseCase } from "@/entities/useCaseInterfaces/progress/get-video-progress-by-user-and-workout.usecase.interface";
import { GetVideoProgressByUserAndWorkoutUseCase } from "@/useCases/progress/get-video-progress-by-user-and-workout.usecase";
import { IGetUserVideoProgressUseCase } from "@/entities/useCaseInterfaces/progress/get-user-video-progress.usecase.interface";
import { GetUserVideoProgressUseCase } from "@/useCases/progress/get-user-video-progress.usecase";
import { IGetUserWorkoutProgressUseCase } from "@/entities/useCaseInterfaces/progress/get-user-workout-progress.usecase.interface";
import { GetUserWorkoutProgressUseCase } from "@/useCases/progress/get-user-workout-progress.usecase";
import { IGetUserProgressMetricsUseCase } from "@/entities/useCaseInterfaces/progress/get-user-progress-metrics.usecase.interface";
import { GetUserProgressMetricsUseCase } from "@/useCases/progress/get-user-progress-metrics.usecase";
import { ICreateCommentUseCase } from "@/entities/useCaseInterfaces/community/create-comment-usecase.interface";
import { CreateCommentUseCase } from "@/useCases/community/create-comment.usecase";
import { ICreatePostUseCase } from "@/entities/useCaseInterfaces/community/create-post-usecase.interface";
import { CreatePostUseCase } from "@/useCases/community/create-post.usecase";
import { IDeleteCommentUseCase } from "@/entities/useCaseInterfaces/community/delete-comment-usecase.interface";
import { DeleteCommentUseCase } from "@/useCases/community/delete-comment.usecase";
import { IDeletePostUseCase } from "@/entities/useCaseInterfaces/community/delete-post-usecase.interface";
import { DeletePostUseCase } from "@/useCases/community/delete-post.usecase";
import { IGetPostUseCase } from "@/entities/useCaseInterfaces/community/get-post-usecase.interface";
import { GetPostUseCase } from "@/useCases/community/get-post.usecase";
import { IGetPostsUseCase } from "@/entities/useCaseInterfaces/community/get-posts-usecase.interface";
import { GetPostsUseCase } from "@/useCases/community/get-posts.usecase";
import { IGetReportedPostsUseCase } from "@/entities/useCaseInterfaces/community/get-reported-posts-usecase.interface";
import { GetReportedPostsUseCase } from "@/useCases/community/get-reported-posts.usecase";
import { IGetReportedCommentsUseCase } from "@/entities/useCaseInterfaces/community/get-reported-comments-usecase.interface";
import { GetReportedCommentsUseCase } from "@/useCases/community/get-reported-comments.usecase";
import { ILikePostUseCase } from "@/entities/useCaseInterfaces/community/like-post-usecase.interface";
import { LikePostUseCase } from "@/useCases/community/like-post.usecase";
import { ILikeCommentUseCase } from "@/entities/useCaseInterfaces/community/like-comment-usecase.interface";
import { LikeCommentUseCase } from "@/useCases/community/like-comment.usecase";
import { IReportPostUseCase } from "@/entities/useCaseInterfaces/community/report-post-usecase.interface";
import { ReportPostUseCase } from "@/useCases/community/report-post.usecase";
import { IReportCommentUseCase } from "@/entities/useCaseInterfaces/community/report-comment-usecase.interface";
import { ReportCommentUseCase } from "@/useCases/community/report-comment.usecase";
import { IHardDeletePostUseCase } from "@/entities/useCaseInterfaces/community/hard-delete-post-usecase.interface";
import { HardDeletePostUseCase } from "@/useCases/community/hard-delete-post.usecase";
import { IHardDeleteCommentUseCase } from "@/entities/useCaseInterfaces/community/hard-delete-comment-usecase.interface";
import { HardDeleteCommentUseCase } from "@/useCases/community/hard-delete-comment.usecase";
import { IGetTransactionHistoryUseCase } from "@/entities/useCaseInterfaces/admin/get-transaction-history.interface";
import { GetTransactionHistoryUseCase } from "@/useCases/admin/get-transaction-history.usecase";
import { IGetCommentsUseCase } from "@/entities/useCaseInterfaces/community/get-comments-usecase.interface";
import { GetCommentsUseCase } from "@/useCases/community/get-comments.usecase";
import { IGetNotifications } from "@/entities/useCaseInterfaces/Notification/getnotification.usecase.interface";
import { GetNotifications } from "@/useCases/notification/get-notifications";
import { IUpdateFCMTokenUseCase } from "@/entities/useCaseInterfaces/Notification/update-fcm-token-usecase.interface";
import { UpdateFCMTokenUseCase } from "@/useCases/notification/update-fcm-token.usecase";
import { IStartVideoCallUseCase } from "@/entities/useCaseInterfaces/videocall/startvideo-usecase.interface";
import { StartVideoCallUseCase } from "@/useCases/videocall/start-video-call.usecase";
import { IJoinVideoCallUseCase } from "@/entities/useCaseInterfaces/videocall/join-video-usecase.interface";
import { JoinVideoCallUseCase } from "@/useCases/videocall/join-video-call.usecase";
import { IEndVideoCallUseCase } from "@/entities/useCaseInterfaces/videocall/end-video-usecase.interface";
import { EndVideoCallUseCase } from "@/useCases/videocall/end-video-call.usecase";
import { IGetBookedTrainerSlotsUseCase } from "@/entities/useCaseInterfaces/slot/get-booked-slots.usecase.interface";
import { GetBookedTrainerSlotsUseCase } from "@/useCases/slot/get-booked-slots.usecase";
import { IGetVideoCallDetailsUseCase } from "@/entities/useCaseInterfaces/videocall/get-video-call-details.usecase.interface";
import { GetVideoCallDetailsUseCase } from "@/useCases/videocall/get-video-call-details.usecase";
import { IGetSessionHistoryUseCase } from "@/entities/useCaseInterfaces/session/get-session-history-usecase.interface";
import { GetSessionHistoryUseCase } from "@/useCases/session/get-session-history.usecase";
import { IGetTrainerWalletUseCase } from "@/entities/useCaseInterfaces/trainer/get-trainer-wallet-usecase.interface";
import { GetTrainerWalletUseCase } from "@/useCases/trainer/get-trainer-wallet.usecase";
import { IHandleWebhookUseCase } from "@/entities/useCaseInterfaces/stripe/handle-webhook.usecase.interface";
import { HandleWebhookUseCase } from "@/useCases/stripe/handle-webhook.usecase";
import { IUpgradeSubscriptionUseCase } from "@/entities/useCaseInterfaces/stripe/upgrade-subscription-usecase.interface";
import { UpgradeSubscriptionUseCase } from "@/useCases/stripe/upgrade-subscription.usecase";
import { IGetClientProfileUseCase } from "@/entities/useCaseInterfaces/users/get-client-profile.usecase.interface";
import { GetClientProfileUseCase } from "@/useCases/user/get-client-profile.usecase";
import { IGetDashboardStatsUseCase } from "@/entities/useCaseInterfaces/admin/dashboard/getdashboard-stats.usecase.interface";
import { GetDashboardStatsUseCase } from "@/useCases/admin/dashboard/get-dashboard-stats.use-case";
import { IGetPopularWorkoutsUseCase } from "@/entities/useCaseInterfaces/admin/dashboard/get-popular-workout.usecase";
import { GetPopularWorkoutsUseCase } from "@/useCases/admin/dashboard/get-popular-workouts.use-case";
import { IGetTopPerformingTrainersUseCase } from "@/entities/useCaseInterfaces/admin/dashboard/get-top-performing-trainer.usecase.interface";
import { GetTopPerformingTrainersUseCase } from "@/useCases/admin/dashboard/get-top-performing-trainers.use-case";
import { IGetUserAndSessionDataUseCase } from "@/entities/useCaseInterfaces/admin/dashboard/get-user-and-session-data.usecase.interface";
import { GetUserAndSessionDataUseCase } from "@/useCases/admin/dashboard/get-user-and-session-data.use-case";
import { IGetRevenueReportUseCase } from "@/entities/useCaseInterfaces/admin/dashboard/get-revenue-report.usecase.interface";
import { GetRevenueReportUseCase } from "@/useCases/admin/dashboard/get-revenue-report.use-case";
import { IGetSessionReportUseCase } from "@/entities/useCaseInterfaces/admin/dashboard/get-session-report.usecase.interface";
import { GetSessionReportUseCase } from "@/useCases/admin/dashboard/get-session-report.use-case";
import { ICreateReviewUseCase } from "@/entities/useCaseInterfaces/review/create-review-usecase.interface";
import { CreateReviewUseCase } from "@/useCases/review/create-review.usecase";
import { IUpdateReviewUseCase } from "@/entities/useCaseInterfaces/review/update-review-usecase.interface";
import { UpdateReviewUseCase } from "@/useCases/review/update-review.usecase";
import { IGetTrainerReviewsUseCase } from "@/entities/useCaseInterfaces/review/get-trainer-reviews-usecase.interface";
import { GetTrainerReviewsUseCase } from "@/useCases/review/get-trainer-reviews.usecase";
import { IGetTrainerDashboardStatsUseCase } from "@/entities/useCaseInterfaces/trainer/Dashboard/get-dashboard-stats.usecase.interface";
import { GetTrainerDashboardStatsUseCase } from "@/useCases/trainer/Dashboard/get-dashboard-stats.usecase";
import { IGetUpcomingSessionsUseCase } from "@/entities/useCaseInterfaces/trainer/Dashboard/get-upcoming-sessions.usecase.interface";
import { GetUpcomingSessionsUseCase } from "@/useCases/trainer/Dashboard/get-upcoming-sessions.usecase";
import { IGetWeeklySessionStatsUseCase } from "@/entities/useCaseInterfaces/trainer/Dashboard/get-weekly-session-stats.usecase.interface";
import { GetWeeklySessionStatsUseCase } from "@/useCases/trainer/Dashboard/get-weekly-session-stats.usecase";
import { IGetClientFeedbackUseCase } from "@/entities/useCaseInterfaces/trainer/Dashboard/get-client-feedback.usecase.interface";
import { GetClientFeedbackUseCase } from "@/useCases/trainer/Dashboard/get-client-feedback.usecase";
import { IGetEarningsReportUseCase } from "@/entities/useCaseInterfaces/trainer/Dashboard/get-earnings-report.usecase.interface";
import { GetEarningsReportUseCase } from "@/useCases/trainer/Dashboard/get-earnings-report.usecase";
import { IGetClientProgressUseCase } from "@/entities/useCaseInterfaces/trainer/Dashboard/get-client-progress.usecase.interface";
import { GetClientProgressUseCase } from "@/useCases/trainer/Dashboard/get-client-progress.usecase";
import { IGetTrainerSessionHistoryUseCase } from "@/entities/useCaseInterfaces/trainer/Dashboard/get-session-history.usecase.interface";
import { GetTrainerSessionHistoryUseCase } from "@/useCases/trainer/Dashboard/get-session-history.usecase";
import { IGetUserSubscriptionsUseCase } from "@/entities/useCaseInterfaces/admin/get-usersubscriptions-useCase.interface";
import { GetUserSubscriptionsUseCase } from "@/useCases/admin/get-user-subscriptions.usecase";
import { ITrainerSlotCancellationUseCase } from "@/entities/useCaseInterfaces/slot/trainer-slot-cancellation-usecase.interface";
import { TrainerSlotCancellationUseCase } from "@/useCases/slot/trainer-cancelation-usecase";
import { IReassignTrainerUseCase } from "@/entities/useCaseInterfaces/slot/reassign-trainer-usecase.interface";
import { ReassignTrainerUseCase } from "@/useCases/slot/reassign-trainer.usecase";
import { IAcceptRejectBackupInvitationUseCase } from "@/entities/useCaseInterfaces/backtrainer/accept-reject-backup-invitation.usecase.interface";
import { AcceptRejectBackupInvitationUseCase } from "@/useCases/backuptrainer/accept-reject-backup-invitation.usecase";
import { AssignBackupTrainerUseCase } from "@/useCases/backuptrainer/assign-backup-trainer.usecase";
import { IAssignBackupTrainerUseCase } from "@/entities/useCaseInterfaces/backtrainer/assign-backup-trainer.usecase.interface";
import { IGetAllChangeRequestsUseCase } from "@/entities/useCaseInterfaces/backtrainer/get-all-change-requests-usecase.interface";
import { GetAllChangeRequestsUseCase } from "@/useCases/backuptrainer/get-all-change-requests.usecase";
import { IGetClientChangeRequestsUseCase } from "@/entities/useCaseInterfaces/backtrainer/get-client-change-requests-usecase.interface";
import { GetClientChangeRequestsUseCase } from "@/useCases/backuptrainer/get-client-change-requests.usecase";
import { IGetPendingChangeRequestsUseCase } from "@/entities/useCaseInterfaces/backtrainer/get-pending-change-requests-usecase.interface";
import { GetPendingChangeRequestsUseCase } from "@/useCases/backuptrainer/get-pending-change-requests.usecase";
import { IGetClientBackupInvitationsUseCase } from "@/entities/useCaseInterfaces/backtrainer/get-client-backup-invitations-usecase.interface";
import { GetClientBackupInvitationsUseCase } from "@/useCases/backuptrainer/get-client-backup-invitations.usecase";
import { IGetClientBackupTrainerUseCase } from "@/entities/useCaseInterfaces/backtrainer/get-client-backup-trainer-usecase.interface";
import { GetClientBackupTrainerUseCase } from "@/useCases/backuptrainer/get-client-backup-trainer.usecase";
import { IGetTrainerBackupInvitationsUseCase } from "@/entities/useCaseInterfaces/backtrainer/get-trainer-backup-invitations-usecase.interface";
import { IGetTrainerBackupClientsUseCase } from "@/entities/useCaseInterfaces/backtrainer/get-trainer-backup-clients-usecase.interface";
import { GetTrainerBackupClientsUseCase } from "@/useCases/backuptrainer/get-trainer-backup-clients.usecase";
import { GetTrainerBackupInvitationsUseCase } from "@/useCases/backuptrainer/get-trainer-backup-invitations.usecase";
import { IGetClientsBackupOverviewUseCase } from "@/entities/useCaseInterfaces/backtrainer/get-clients-backup-overview-usecase.interface";
import { GetClientsBackupOverviewUseCase } from "@/useCases/backuptrainer/get-clients-backup-overview.usecase";
import { HandleExpiredInvitationsUseCase } from "@/useCases/backuptrainer/handle-expired-invitations.usecase";
import { IHandleExpiredInvitationsUseCase } from "@/entities/useCaseInterfaces/backtrainer/handle-expired-invitations.usecaseinterface";
import { IRequestBackupTrainerChangeUseCase } from "@/entities/useCaseInterfaces/backtrainer/request-backup-trainer-change.usecase.interface";
import { RequestBackupTrainerChangeUseCase } from "@/useCases/backuptrainer/request-backup-trainer-change.usecase";
import { IResolveBackupTrainerChangeRequestUseCase } from "@/entities/useCaseInterfaces/backtrainer/resolve-backup-trainer-change-request.usecase";
import { ResolveBackupTrainerChangeRequestUseCase } from "@/useCases/backuptrainer/resolve-backup-trainer-change-request.usecase.interface";
import { IGetClientTrainersInfoUseCase } from "@/entities/useCaseInterfaces/users/get-client-trainers-info.usecase.interface";
import { GetClientTrainersInfoUseCase } from "@/useCases/user/get-client-trainers-info.usecase";
import { IGetClientWalletDetailsUseCase } from "@/entities/useCaseInterfaces/wallet/get-client-wallet-details-usecase.interface";
import { GetClientWalletDetailsUseCase } from "@/useCases/wallet/get-client-wallet-details.usecase";
import { ICreateSlotsFromRuleUseCase } from "@/entities/useCaseInterfaces/slot/create-slots-from-rule.usecase.interface";
import { CreateSlotsFromRuleUseCase } from "@/useCases/slot/create-slots-from-rule.usecase";

import { SlotExpiryProcessor } from "../queue/bull/slot-expiry.processor";
import { SubscriptionExpiryProcessor } from "../queue/bull/subscription-expiry.processor";
import { DailyUnusedSessionProcessor } from "../queue/bull/daily-unused-session.processor";
export class UseCaseRegistry {
  static registerUseCases(): void {
    //* ====== Register Bcrypts ====== *//
    container.register<IBcrypt>("IPasswordBcrypt", {
      useClass: PasswordBcrypt,
    });

    container.register<IBcrypt>("IOtpBcrypt", {
      useClass: OtpBcrypt,
    });

    //* ====== Register Services ====== *//
    container.register<IEmailService>("IEmailService", {
      useClass: EmailService,
    });

    container.register<IOtpService>("IOtpService", {
      useClass: OtpService,
    });

    container.register<IUserExistenceService>("IUserExistenceService", {
      useClass: UserExistenceService,
    });

    container.register<ITokenService>("ITokenService", {
      useClass: JWTService,
    });

    container.register<ICloudinaryService>("ICloudinaryService", {
      useClass: CloudinaryService,
    });

    container.register<GeminiService>("GeminiService", {
      useClass: GeminiService,
    });

    container.register<IStripeService>("IStripeService", {
      useClass: StripeService,
    });

    container.register<SocketService>("SocketService", {
      useClass: SocketService,
    });

    container.register<IFCMService>("IFCMService", {
      useClass: FCMService,
    });

    container.register("INotificationSocketService", {
      useClass: delay(() => SocketNotificationService),
    });

    container.register<NotificationService>("NotificationService", {
      useClass: NotificationService,
    });

    container.register<VideoSocketService>("VideoSocketService", {
      useClass: VideoSocketService,
    });

    container.register<ZegoTokenService>("ZegoTokenService", {
      useClass: ZegoTokenService,
    });

    container.register<ChatbotService>("ChatbotService", {
      useClass: ChatbotService,
    });

    //* ====== Register Slot Expiry Processor ====== *//

    container.register<SlotExpiryProcessor>("SlotExpiryProcessor", {
      useClass: SlotExpiryProcessor,
    });

    //* ====== Register Subscription Expiry Processor ====== *//
    container.register<SubscriptionExpiryProcessor>(
      "SubscriptionExpiryProcessor",
      {
        useClass: SubscriptionExpiryProcessor,
      }
    );

    container.register<DailyUnusedSessionProcessor>(
      "DailyUnusedSessionProcessor",
      {
        useClass: DailyUnusedSessionProcessor,
      }
    );

    //* ====== Register Strategies ====== *//
    container.register("ClientRegisterStrategy", {
      useClass: ClientRegisterStrategy,
    });

    container.register("ClientLoginStrategy", {
      useClass: ClientLoginStrategy,
    });

    container.register<IRegisterStrategy>("AdminRegisterStrategy", {
      useClass: AdminRegisterStrategy,
    });

    container.register("AdminLoginStrategy", {
      useClass: AdminLoginStrategy,
    });

    container.register<IRegisterStrategy>("TrainerRegisterStrategy", {
      useClass: TrainerRegisterStrategy,
    });

    container.register("TrainerLoginStrategy", {
      useClass: TrainerLoginStrategy,
    });

    //* ====== Register UseCases ====== *//
    container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
      useClass: RegisterUserUseCase,
    });

    container.register<ISendOtpEmailUseCase>("ISendOtpEmailUseCase", {
      useClass: SendOtpEmailUseCase,
    });

    container.register<IVerifyOtpUseCase>("IVerifyOtpUseCase", {
      useClass: VerifyOtpUseCase,
    });

    container.register<ILoginUserUseCase>("ILoginUserUseCase", {
      useClass: LoginUserUseCase,
    });

    container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
      useClass: GenerateTokenUseCase,
    });

    container.register<IBlackListTokenUseCase>("IBlackListTokenUseCase", {
      useClass: BlackListTokenUseCase,
    });

    container.register<IRevokeRefreshTokenUseCase>(
      "IRevokeRefreshTokenUseCase",
      {
        useClass: RevokeRefreshTokenUseCase,
      }
    );

    container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase", {
      useClass: RefreshTokenUseCase,
    });

    container.register<IGetAllUsersUseCase>("IGetAllUsersUseCase", {
      useClass: GetAllUsersUseCase,
    });

    container.register<IUpdateUserStatusUseCase>("IUpdateUserStatusUseCase", {
      useClass: UpdateUserStatusUseCase,
    });

    container.register<IGoogleUseCase>("IGoogleUseCase", {
      useClass: GoogleUseCase,
    });

    container.register<ITrainerVerificationUseCase>(
      "ITrainerVerificationUseCase",
      { useClass: TrainerVerificationUseCase }
    );

    container.register<IForgotPasswordUseCase>("IForgotPasswordUseCase", {
      useClass: ForgotPasswordUseCase,
    });

    container.register<IResetPasswordUseCase>("IResetPasswordUseCase", {
      useClass: ResetPasswordUseCase,
    });

    container.register<IUpdateUserProfileUseCase>("IUpdateUserProfileUseCase", {
      useClass: UpdateUserProfileUseCase,
    });

    container.register<IUpdateClientPasswordUseCase>(
      "IUpdateClientPasswordUseCase",
      {
        useClass: UpdateClientPasswordUseCase,
      }
    );

    container.register<IUpdateTrainerProfileUseCase>(
      "IUpdateTrainerProfileUseCase",
      {
        useClass: UpdateTrainerProfileUseCase,
      }
    );

    container.register<IGetAllCategoriesUseCase>("IGetAllCategoriesUseCase", {
      useClass: GetAllCategoriesUseCase,
    });

    container.register<ICreateNewCategoryUseCase>("ICreateNewCategoryUseCase", {
      useClass: CreateNewCategoryUseCase,
    });

    container.register<IGetAllPaginatedCategoryUseCase>(
      "IGetAllPaginatedCategoryUseCase",
      {
        useClass: GetAllPaginatedCategoryUseCase,
      }
    );

    container.register<IUpdateCategoryStatusUseCase>(
      "IUpdateCategoryStatusUseCase",
      {
        useClass: UpdateCategoryStatusUseCase,
      }
    );

    container.register<IUpdateCategoryUseCase>("IUpdateCategoryUseCase", {
      useClass: UpdateCategoryUseCase,
    });

    container.register<IGenerateWorkoutPlanUseCase>(
      "IGenerateWorkoutPlanUseCase",
      {
        useClass: GenerateWorkoutPlanUseCase,
      }
    );

    container.register<IGenerateDietPlanUseCase>("IGenerateDietPlanUseCase", {
      useClass: GenerateDietPlanUseCase,
    });

    container.register<IGetWorkoutPlanUseCase>("IGetWorkoutPlanUseCase", {
      useClass: GetWorkoutPlanUseCase,
    });

    container.register<IGetDietPlanUseCase>("IGetDietPlanUseCase", {
      useClass: GetDietPlanUseCase,
    });

    container.register<IUpdateTrainerPasswordUseCase>(
      "IUpdateTrainerPasswordUseCase",
      {
        useClass: UpdateTrainerPasswordUseCase,
      }
    );

    container.register<IAddWorkoutUseCase>("IAddWorkoutUseCase", {
      useClass: AddWorkoutUseCase,
    });

    container.register<IUpdateWorkoutUseCase>("IUpdateWorkoutUseCase", {
      useClass: UpdateWorkoutUseCase,
    });

    container.register<IDeleteWorkoutUseCase>("IDeleteWorkoutUseCase", {
      useClass: DeleteWorkoutUseCase,
    });

    container.register<IToggleWorkoutStatusUseCase>(
      "IToggleWorkoutStatusUseCase",
      {
        useClass: ToggleWorkoutStatusUseCase,
      }
    );

    container.register<IGetWorkoutsUseCase>("IGetWorkoutsUseCase", {
      useClass: GetWorkoutsUseCase,
    });

    container.register<IGetWorkoutsByCategoryUseCase>(
      "IGetWorkoutsByCategoryUseCase",
      {
        useClass: GetWorkoutsByCategoryUseCase,
      }
    );

    container.register<IRecordProgressUseCase>("IRecordProgressUseCase", {
      useClass: RecordProgressUseCase,
    });

    container.register<IGetUserProgressUseCase>("IGetUserProgressUseCase", {
      useClass: GetUserProgressUseCase,
    });

    container.register<IGetAllAdminWorkoutsUseCase>(
      "IGetAllAdminWorkoutsUseCase",
      {
        useClass: GetAllAdminWorkoutsUseCase,
      }
    );

    container.register<IGetAllTrainersUseCase>("IGetAllTrainersUseCase", {
      useClass: GetAllTrainersUseCase,
    });

    container.register<IGetTrainerProfileUseCase>("IGetTrainerProfileUseCase", {
      useClass: GetTrainerProfileUseCase,
    });

    container.register<IAddExerciseUseCase>("IAddExerciseUseCase", {
      useClass: AddExerciseUseCase,
    });

    container.register<IUpdateExerciseUseCase>("IUpdateExerciseUseCase", {
      useClass: UpdateExerciseUseCase,
    });

    container.register<IDeleteExerciseUseCase>("IDeleteExerciseUseCase", {
      useClass: DeleteExerciseUseCase,
    });

    container.register<IGetWorkoutByIdUseCase>("IGetWorkoutByIdUseCase", {
      useClass: GetWorkoutByIdUseCase,
    });

    container.register<ICreateStripeConnectAccountUseCase>(
      "ICreateStripeConnectAccountUseCase",
      {
        useClass: CreateStripeConnectAccountUseCase,
      }
    );

    container.register<ICreateCheckoutSessionUseCase>(
      "ICreateCheckoutSessionUseCase",
      {
        useClass: CreateCheckoutSessionUseCase,
      }
    );

    container.register<IGetTrainerRequestsUseCase>(
      "IGetTrainerRequestsUseCase",
      {
        useClass: GetTrainerRequestsUseCase,
      }
    );

    container.register<IUpdateTrainerRequestUseCase>(
      "IUpdateTrainerRequestUseCase",
      {
        useClass: UpdateTrainerRequestUseCase,
      }
    );

    container.register<IGetTrainerClientsUseCase>("IGetTrainerClientsUseCase", {
      useClass: GetTrainerClientsUseCase,
    });

    container.register<IAutoMatchTrainerUseCase>("IAutoMatchTrainerUseCase", {
      useClass: AutoMatchTrainerUseCase,
    });

    container.register<IManualSelectTrainerUseCase>(
      "IManualSelectTrainerUseCase",
      {
        useClass: ManualSelectTrainerUseCase,
      }
    );

    container.register<ISaveTrainerSelectionPreferencesUseCase>(
      "ISaveTrainerSelectionPreferencesUseCase",
      {
        useClass: SaveTrainerSelectionPreferencesUseCase,
      }
    );

    container.register<IGetMatchedTrainersUseCase>(
      "IGetMatchedTrainersUseCase",
      {
        useClass: GetMatchedTrainersUseCase,
      }
    );

    container.register<ISelectTrainerFromMatchedListUseCase>(
      "ISelectTrainerFromMatchedListUseCase",
      {
        useClass: SelectTrainerFromMatchedListUseCase,
      }
    );

    container.register<IGetPendingClientRequestsUseCase>(
      "IGetPendingClientRequestsUseCase",
      {
        useClass: GetPendingClientRequestsUseCase,
      }
    );

    container.register<ITrainerAcceptRejectRequestUseCase>(
      "ITrainerAcceptRejectRequestUseCase",
      {
        useClass: TrainerAcceptRejectRequestUseCase,
      }
    );

    container.register<IBookSlotUseCase>("IBookSlotUseCase", {
      useClass: BookSlotUseCase,
    });

    container.register<ICreateSlotUseCase>("ICreateSlotUseCase", {
      useClass: CreateSlotUseCase,
    });

    container.register<ICancelBookingUseCase>("ICancelBookingUseCase", {
      useClass: CancelBookingUseCase,
    });

    container.register<IGetTrainerSlotsUseCase>("IGetTrainerSlotsUseCase", {
      useClass: GetTrainerSlotsUseCase,
    });

    container.register<IGetSelectedTrainerSlotsUseCase>(
      "IGetSelectedTrainerSlotsUseCase",
      {
        useClass: GetSelectedTrainerSlotsUseCase,
      }
    );

    container.register<IToggleSlotAvailabilityUseCase>(
      "IToggleSlotAvailabilityUseCase",
      {
        useClass: ToggleSlotAvailabilityUseCase,
      }
    );

    container.register<IGetUserBookingsUseCase>("IGetUserBookingsUseCase", {
      useClass: GetUserBookingsUseCase,
    });

    container.register<IGetChatHistoryUseCase>("IGetChatHistoryUseCase", {
      useClass: GetChatHistoryUseCase,
    });

    container.register<IGetChatParticipantsUseCase>(
      "IGetChatParticipantsUseCase",
      {
        useClass: GetChatParticipantsUseCase,
      }
    );

    container.register<IGetRecentChatsUseCase>("IGetRecentChatsUseCase", {
      useClass: GetRecentChatsUseCase,
    });

    container.register<IValidateChatPermissionsUseCase>(
      "IValidateChatPermissionsUseCase",
      {
        useClass: ValidateChatPermissionsUseCase,
      }
    );

    container.register<IDeleteMessageUseCase>("IDeleteMessageUseCase", {
      useClass: DeleteMessageUseCase,
    });

    container.register<ICreateWorkoutProgressUseCase>(
      "ICreateWorkoutProgressUseCase",
      {
        useClass: CreateWorkoutProgressUseCase,
      }
    );

    container.register<IUpdateWorkoutProgressUseCase>(
      "IUpdateWorkoutProgressUseCase",
      {
        useClass: UpdateWorkoutProgressUseCase,
      }
    );

    container.register<IGetWorkoutProgressByUserAndWorkoutUseCase>(
      "IGetWorkoutProgressByUserAndWorkoutUseCase",
      {
        useClass: GetWorkoutProgressByUserAndWorkoutUseCase,
      }
    );

    container.register<IUpdateVideoProgressUseCase>(
      "IUpdateVideoProgressUseCase",
      {
        useClass: UpdateVideoProgressUseCase,
      }
    );

    container.register<IGetVideoProgressByUserAndWorkoutUseCase>(
      "IGetVideoProgressByUserAndWorkoutUseCase",
      {
        useClass: GetVideoProgressByUserAndWorkoutUseCase,
      }
    );

    container.register<IGetUserVideoProgressUseCase>(
      "IGetUserVideoProgressUseCase",
      {
        useClass: GetUserVideoProgressUseCase,
      }
    );

    container.register<IGetWorkoutProgressByUserAndWorkoutUseCase>(
      "IGetWorkoutProgressByUserAndWorkoutUseCase",
      {
        useClass: GetWorkoutProgressByUserAndWorkoutUseCase,
      }
    );

    container.register<IGetVideoProgressByUserAndWorkoutUseCase>(
      "IGetVideoProgressByUserAndWorkoutUseCase",
      {
        useClass: GetVideoProgressByUserAndWorkoutUseCase,
      }
    );

    container.register<IGetUserVideoProgressUseCase>(
      "IGetUserVideoProgressUseCase",
      {
        useClass: GetUserVideoProgressUseCase,
      }
    );

    container.register<IGetWorkoutProgressByUserAndWorkoutUseCase>(
      "IGetWorkoutProgressByUserAndWorkoutUseCase",
      {
        useClass: GetWorkoutProgressByUserAndWorkoutUseCase,
      }
    );

    container.register<IGetUserWorkoutProgressUseCase>(
      "IGetUserWorkoutProgressUseCase",
      {
        useClass: GetUserWorkoutProgressUseCase,
      }
    );

    container.register<IGetUserProgressMetricsUseCase>(
      "IGetUserProgressMetricsUseCase",
      {
        useClass: GetUserProgressMetricsUseCase,
      }
    );

    container.register<ICreateCommentUseCase>("ICreateCommentUseCase", {
      useClass: CreateCommentUseCase,
    });

    container.register<ICreatePostUseCase>("ICreatePostUseCase", {
      useClass: CreatePostUseCase,
    });

    container.register<ICreateCommentUseCase>("ICreateCommentUseCase", {
      useClass: CreateCommentUseCase,
    });

    container.register<IDeleteCommentUseCase>("IDeleteCommentUseCase", {
      useClass: DeleteCommentUseCase,
    });

    container.register<IDeletePostUseCase>("IDeletePostUseCase", {
      useClass: DeletePostUseCase,
    });

    container.register<IGetPostUseCase>("IGetPostUseCase", {
      useClass: GetPostUseCase,
    });

    container.register<IGetPostsUseCase>("IGetPostsUseCase", {
      useClass: GetPostsUseCase,
    });

    container.register<IGetReportedPostsUseCase>("IGetReportedPostsUseCase", {
      useClass: GetReportedPostsUseCase,
    });

    container.register<IGetReportedCommentsUseCase>(
      "IGetReportedCommentsUseCase",
      { useClass: GetReportedCommentsUseCase }
    );

    container.register<ILikePostUseCase>("ILikePostUseCase", {
      useClass: LikePostUseCase,
    });

    container.register<ILikeCommentUseCase>("ILikeCommentUseCase", {
      useClass: LikeCommentUseCase,
    });

    container.register<IReportPostUseCase>("IReportPostUseCase", {
      useClass: ReportPostUseCase,
    });

    container.register<IReportCommentUseCase>("IReportCommentUseCase", {
      useClass: ReportCommentUseCase,
    });

    container.register<IHardDeletePostUseCase>("IHardDeletePostUseCase", {
      useClass: HardDeletePostUseCase,
    });

    container.register<IHardDeleteCommentUseCase>("IHardDeleteCommentUseCase", {
      useClass: HardDeleteCommentUseCase,
    });

    container.register<IGetTransactionHistoryUseCase>(
      "IGetTransactionHistoryUseCase",
      {
        useClass: GetTransactionHistoryUseCase,
      }
    );

    container.register<IGetCommentsUseCase>("IGetCommentsUseCase", {
      useClass: GetCommentsUseCase,
    });

    container.register<IGetNotifications>("IGetNotifications", {
      useClass: GetNotifications,
    });

    container.register<IUpdateFCMTokenUseCase>("IUpdateFCMTokenUseCase", {
      useClass: UpdateFCMTokenUseCase,
    });

    container.register<IStartVideoCallUseCase>("IStartVideoCallUseCase", {
      useClass: StartVideoCallUseCase,
    });

    container.register<IJoinVideoCallUseCase>("IJoinVideoCallUseCase", {
      useClass: JoinVideoCallUseCase,
    });

    container.register<IEndVideoCallUseCase>("IEndVideoCallUseCase", {
      useClass: EndVideoCallUseCase,
    });

    container.register<IGetBookedTrainerSlotsUseCase>(
      "IGetBookedTrainerSlotsUseCase",
      {
        useClass: GetBookedTrainerSlotsUseCase,
      }
    );

    container.register<IGetVideoCallDetailsUseCase>(
      "IGetVideoCallDetailsUseCase",
      {
        useClass: GetVideoCallDetailsUseCase,
      }
    );

    container.register<IGetSessionHistoryUseCase>("IGetSessionHistoryUseCase", {
      useClass: GetSessionHistoryUseCase,
    });

    container.register<IGetTrainerWalletUseCase>("IGetTrainerWalletUseCase", {
      useClass: GetTrainerWalletUseCase,
    });

    container.register<IHandleWebhookUseCase>("IHandleWebhookUseCase", {
      useClass: HandleWebhookUseCase,
    });

    container.register<IUpgradeSubscriptionUseCase>(
      "IUpgradeSubscriptionUseCase",
      {
        useClass: UpgradeSubscriptionUseCase,
      }
    );

    container.register<IGetClientProfileUseCase>("IGetClientProfileUseCase", {
      useClass: GetClientProfileUseCase,
    });

    container.register<IGetDashboardStatsUseCase>("IGetDashboardStatsUseCase", {
      useClass: GetDashboardStatsUseCase,
    });

    container.register<IGetTopPerformingTrainersUseCase>(
      "IGetTopPerformingTrainersUseCase",
      {
        useClass: GetTopPerformingTrainersUseCase,
      }
    );

    container.register<IGetPopularWorkoutsUseCase>(
      "IGetPopularWorkoutsUseCase",
      {
        useClass: GetPopularWorkoutsUseCase,
      }
    );

    container.register<IGetUserAndSessionDataUseCase>(
      "IGetUserAndSessionDataUseCase",
      {
        useClass: GetUserAndSessionDataUseCase,
      }
    );

    container.register<IGetRevenueReportUseCase>("IGetRevenueReportUseCase", {
      useClass: GetRevenueReportUseCase,
    });

    container.register<IGetSessionReportUseCase>("IGetSessionReportUseCase", {
      useClass: GetSessionReportUseCase,
    });

    container.register<ICreateReviewUseCase>("ICreateReviewUseCase", {
      useClass: CreateReviewUseCase,
    });

    container.register<IGetTrainerReviewsUseCase>("IGetTrainerReviewsUseCase", {
      useClass: GetTrainerReviewsUseCase,
    });

    container.register<IUpdateReviewUseCase>("IUpdateReviewUseCase", {
      useClass: UpdateReviewUseCase,
    });

    container.register<IGetTrainerDashboardStatsUseCase>(
      "IGetTrainerDashboardStatsUseCase",
      {
        useClass: GetTrainerDashboardStatsUseCase,
      }
    );

    container.register<IGetUpcomingSessionsUseCase>(
      "IGetUpcomingSessionsUseCase",
      {
        useClass: GetUpcomingSessionsUseCase,
      }
    );

    container.register<IGetWeeklySessionStatsUseCase>(
      "IGetWeeklySessionStatsUseCase",
      {
        useClass: GetWeeklySessionStatsUseCase,
      }
    );

    container.register<IGetClientFeedbackUseCase>("IGetClientFeedbackUseCase", {
      useClass: GetClientFeedbackUseCase,
    });

    container.register<IGetEarningsReportUseCase>("IGetEarningsReportUseCase", {
      useClass: GetEarningsReportUseCase,
    });

    container.register<IGetClientProgressUseCase>("IGetClientProgressUseCase", {
      useClass: GetClientProgressUseCase,
    });

    container.register<IGetTrainerSessionHistoryUseCase>(
      "IGetTrainerSessionHistoryUseCase",
      {
        useClass: GetTrainerSessionHistoryUseCase,
      }
    );

    container.register<IGetUserSubscriptionsUseCase>(
      "IGetUserSubscriptionsUseCase",
      {
        useClass: GetUserSubscriptionsUseCase,
      }
    );

    container.register<ITrainerSlotCancellationUseCase>(
      "ITrainerSlotCancellationUseCase",
      {
        useClass: TrainerSlotCancellationUseCase,
      }
    );

    container.register<IReassignTrainerUseCase>("IReassignTrainerUseCase", {
      useClass: ReassignTrainerUseCase,
    });

    container.register<IAcceptRejectBackupInvitationUseCase>(
      "IAcceptRejectBackupInvitationUseCase",
      {
        useClass: AcceptRejectBackupInvitationUseCase,
      }
    );

    container.register<IAssignBackupTrainerUseCase>(
      "IAssignBackupTrainerUseCase",
      {
        useClass: AssignBackupTrainerUseCase,
      }
    );

    container.register<IGetClientBackupTrainerUseCase>(
      "IGetClientBackupTrainerUseCase",
      {
        useClass: GetClientBackupTrainerUseCase,
      }
    );

    container.register<IGetClientBackupInvitationsUseCase>(
      "IGetClientBackupInvitationsUseCase",
      {
        useClass: GetClientBackupInvitationsUseCase,
      }
    );

    container.register<IGetPendingChangeRequestsUseCase>(
      "IGetPendingChangeRequestsUseCase",
      {
        useClass: GetPendingChangeRequestsUseCase,
      }
    );

    container.register<IGetAllChangeRequestsUseCase>(
      "IGetAllChangeRequestsUseCase",
      {
        useClass: GetAllChangeRequestsUseCase,
      }
    );

    container.register<IGetClientChangeRequestsUseCase>(
      "IGetClientChangeRequestsUseCase",
      {
        useClass: GetClientChangeRequestsUseCase,
      }
    );

    container.register<IGetTrainerBackupInvitationsUseCase>(
      "IGetTrainerBackupInvitationsUseCase",
      {
        useClass: GetTrainerBackupInvitationsUseCase,
      }
    );

    container.register<IGetTrainerBackupClientsUseCase>(
      "IGetTrainerBackupClientsUseCase",
      {
        useClass: GetTrainerBackupClientsUseCase,
      }
    );

    container.register<IGetClientsBackupOverviewUseCase>(
      "IGetClientsBackupOverviewUseCase",
      {
        useClass: GetClientsBackupOverviewUseCase,
      }
    );

    container.register<IHandleExpiredInvitationsUseCase>(
      "IHandleExpiredInvitationsUseCase",
      {
        useClass: HandleExpiredInvitationsUseCase,
      }
    );

    container.register<IRequestBackupTrainerChangeUseCase>(
      "IRequestBackupTrainerChangeUseCase",
      {
        useClass: RequestBackupTrainerChangeUseCase,
      }
    );

    container.register<IResolveBackupTrainerChangeRequestUseCase>(
      "IResolveBackupTrainerChangeRequestUseCase",
      {
        useClass: ResolveBackupTrainerChangeRequestUseCase,
      }
    );

    container.register<IGetClientTrainersInfoUseCase>(
      "IGetClientTrainersInfoUseCase",
      {
        useClass: GetClientTrainersInfoUseCase,
      }
    );

    container.register<IGetClientWalletDetailsUseCase>(
      "IGetClientWalletDetailsUseCase",
      {
        useClass: GetClientWalletDetailsUseCase,
      }
    );

    container.register<ICreateSlotsFromRuleUseCase>(
      "ICreateSlotsFromRuleUseCase",
      {
        useClass: CreateSlotsFromRuleUseCase,
      }
    );
  }
}
