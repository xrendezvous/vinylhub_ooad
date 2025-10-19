export interface INotificationService {
    notifyUser(userId: string, message: string): Promise<void>;
    notifyUsers(userIds: string[], message: string): Promise<void>;
}