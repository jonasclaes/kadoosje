import { Appwrite } from 'appwrite';
import { Server } from '../utils/config';

let api = {
    sdk: null,

    provider: (): Appwrite => {
        if (api.sdk) return api.sdk;
        let appwrite = new Appwrite();
        // @ts-ignore
        appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
        // @ts-ignore
        api.sdk = appwrite;
        return appwrite;
    },

    createAccount: (email: string, password: string, name: string) => {
        return api.provider().account.create(email, password, name);
    },

    getAccount: () => {
        return api.provider().account.get();
    },

    createSession: (email: string, password: string) => {
        return api.provider().account.createSession(email, password);
    },

    deleteCurrentSession: () => {
        return api.provider().account.deleteSession('current');
    },

    createDocument: (collectionId: string, data: any, read: any, write: any) => {
        return api.provider().database.createDocument(collectionId, data, read, write);
    },

    // @ts-ignore
    listDocuments: (collectionId: string, { filters, limit, offset, orderField, orderType, orderCast, search }) => {
        return api
            .provider()
            .database.listDocuments(collectionId, filters, limit, offset, orderField, orderType, orderCast, search);
    },

    getDocument: (collectionId: string, documentId: string) => {
        return api.provider().database.getDocument(collectionId, documentId);
    },

    updateDocument: (collectionId: string, documentId: string, data: any, read: any, write: any) => {
        return api.provider().database.updateDocument(collectionId, documentId, data, read, write);
    },

    deleteDocument: (collectionId: string, documentId: string) => {
        return api.provider().database.deleteDocument(collectionId, documentId);
    },
};

export default api;
