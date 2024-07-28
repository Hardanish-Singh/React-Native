import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.aora", // BundleId
    projectId: "66a0ef3f00197b533375",
    databaseId: "66a0f0ac0023fb75d512",
    userCollectionId: "66a0f0cc0004220d7044",
    videoCollectionId: "66a0f0fd0034224014bb",
    storageId: "66a5656b0011c2c947c8",
};

// Init your React Native SDK
const client = new Client();

// prettier-ignore
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register/Sign up User
export async function createUser(email: string, password: string, username: string) {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) {
            throw Error;
        }
        const avatarUrl = avatars.getInitials(username);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );
        return newUser;
    } catch (error: any) {
        console.error("Error creating user", error);
        throw new Error(error);
    }
}

// Sign In User
export async function signIn(email: string, password: string) {
    try {
        const isUserLoggedIn = await getAccount();
        if (isUserLoggedIn) {
            await account.deleteSession("current");
        }
        const session: any = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error: any) {}
}

// Get Current User
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) {
            throw Error;
        }
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
            Query.equal("accountId", currentAccount.$id),
        ]);
        if (!currentUser) {
            throw Error;
        }
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Sign Out
export async function signOut() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
}
