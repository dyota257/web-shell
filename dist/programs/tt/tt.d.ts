import { Entry, APIMethods, APIOptions } from './types';
export declare const root = "https://api.jsonbin.io/v3", masterKey = "$2b$10$ZnO6WtBQRdK7T2XnA.SJFupmACGAApO62k3tMTc/AJTanAdJet4ye", collectionId = "61d596f839a33573b3237f90";
export declare let reqHeader: {
    'Content-Type': string;
    'X-Master-Key': string;
};
export declare function tt(commands: string): Promise<string>;
export declare const apiMethods: {
    binsCreate: {
        route: (binId?: string | undefined) => string;
        method: string;
        headers: (collectionId: string) => {
            'X-Collection-Id': string;
        };
    };
    binsRead: {
        route: (binId: string) => string;
        method: string;
        headers: () => {};
    };
    binsUpdate: {
        route: (binId: string) => string;
        method: string;
        headers: () => {};
    };
    binsDelete: {
        route: (binId: string) => string;
        method: string;
        headers: () => {};
    };
    collectionsBins: {
        route: (collectionId: string) => string;
        method: string;
        headers: () => {};
    };
};
export declare function makeAPIOptions(action: APIMethods, entry?: Entry, binId?: string): APIOptions;
