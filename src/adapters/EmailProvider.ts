import { INotificationService } from "./inter/INotificationService";

export class EmailProvider implements INotificationService {
    async notifyUser(userId: string, message: string): Promise<void> {
        console.log(`Email to user ${userId}: ${message}`);
    }

    async notifyUsers(userIds: string[], message: string): Promise<void> {
        console.log(`Mass email to ${userIds.join(", ")}: ${message}`);
    }
}
