import { Account, Avatars, Client, Databases, ID, ImageGravity, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID!,
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID!,
    videoCollectionId: process.env.EXPO_PUBLIC_VIDEO_COLLECTION_ID!,
    storageId: process.env.EXPO_PUBLIC_STORAGE_ID!,
};

const client = new Client();

// prettier-ignore
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register / Sign up User
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

// Get all Video Posts
export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [
            Query.orderDesc("$createdAt"),
        ]);
        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Get latest created video posts
export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [
            Query.orderDesc("$createdAt"),
            Query.limit(7),
        ]);

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Get video posts that matches search query
export async function searchPosts(query: string) {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [
            // Query.search("title", query),
            Query.contains("title", query),
        ]);
        if (!posts) {
            throw new Error("Something went wrong");
        }
        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Get video posts created by user
export async function getUserPosts(userId: any) {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [
            Query.equal("users", userId),
        ]);

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Get File Preview
export async function getFilePreview(fileId: any, type: any) {
    let fileUrl;
    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, ImageGravity.Top, 100);
        } else {
            throw new Error("Invalid file type");
        }
        if (!fileUrl) {
            throw Error;
        }
        return fileUrl;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Upload File
export async function uploadFile(file: any, type: any) {
    if (!file) {
        return;
    }
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
    try {
        const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), asset);
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error: any) {
        throw new Error(error);
    }
}

// Create Video Post
export async function createVideoPost(form: any) {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                users: form.userId,
            }
        );
        return newPost;
    } catch (error: any) {
        throw new Error(error);
    }
}
