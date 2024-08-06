
import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            // Create user account
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                await this.login({ email, password });

                await this.sendVerificationEmail();
                return userAccount;
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error ", error);
            throw error;
        }
    }

    async sendVerificationEmail() {
        try {
            return await this.account.createVerification("http://localhost:5173/verify-email");
        } catch (error) {
            console.log("Appwrite service :: sendVerificationEmail :: error ", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite service :: login :: error ", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
            throw error;
        }
    }

    async verifyEmail(userId, secret) {
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            console.log("Appwrite service :: verifyEmail :: error ", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
