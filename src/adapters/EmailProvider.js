export class EmailProvider {
    async notifyUser(userId, message) {
        console.log(`📧 Email to user ${userId}: ${message}`);
    }

    async notifyUsers(userIds, message) {
        console.log(`📢 Mass email to users [${userIds.join(", ")}]: ${message}`);
    }
}