import { Entry, APIMethods, APIOptions } from './types';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export const root = 'https://api.jsonbin.io/v3',
    masterKey: string = <string>process.env.MASTER_KEY,
    collectionId: string = <string>process.env.COLLECTION_ID;

// @ts-ignore
export let reqHeader = {
    'Content-Type': 'application/json',
    'X-Master-Key': masterKey,
};

export const apiMethods = {
    binsCreate: {
        // @ts-ignore
        route: (binId?: string) => '/b',
        method: 'POST',
        headers: (collectionId?: string) => {
            return { 'X-Collection-Id': collectionId };
        },
        // {
        //     "record": {
        //       "sample": "Hello World"
        //     },
        //     "metadata": {
        //       "id": "<Bin Id>",
        //       "createdAt": "<Date & Time>",
        //       "private": <true or false>
        //     }
        // }
    },
    binsRead: {
        route: (binId?: string) => `/b/${binId}`,
        method: 'GET',
        headers: () => {
            return {};
        },
        // {
        //     "record": {
        //       "sample": "Hello World"
        //     },
        //     "metadata": {
        //         "id": "<BIN_ID>",
        //         "private": true
        //     }
        // }
    },
    binsUpdate: {
        route: (binId?: string) => `/b/${binId}`,
        method: 'PUT',
        headers: () => {
            return {};
        },
        // {
        //     "record": {
        //       "sample": "Hello World"
        //     },
        //     "metadata": {
        //       "parentId": "<BIN_ID>",
        //       "private": true
        //     }
        // }
    },
    binsDelete: {
        route: (binId?: string) => `/b/${binId}`,
        method: 'DELETE',
        headers: () => {
            return {};
        },
        // {
        //     "metadata": {
        //       "id": "<BIN_ID>",
        //       "versionsDeleted": 0
        //     },
        //     "message": "Bin deleted successfully"
        // }
    },
    collectionsBins: {
        // fetsh the first 10 bins from the specified collection ID
        route: (collectionId?: string) => `/c/${collectionId}/bins`,
        method: 'GET',
        headers: () => {
            return {};
        },
        // [
        //     {
        //         "snippetMeta": {},
        //         "private": true,
        //         "record": "<RECORD_ID>",
        //         "createdAt": "<DATE_TIME>"
        //     },
        //     ...
        //   ]
    },
};

export function makeAPIOptions(
    action: APIMethods,
    entry?: Entry,
    binId?: string
) {
    // @ts-ignore
    let target = root + apiMethods[action].route(binId);

    let options: APIOptions = {
        method: apiMethods[action].method,
        url: target,
        headers: {
            ...reqHeader,
            ...apiMethods[action].headers(collectionId),
        },
    };

    if (entry !== undefined) {
        options = {
            ...options,
            data: entry,
        };
    }

    return options;
}

export async function makeAPICall(
    options: APIOptions
): Promise<AxiosResponse<any, any>> {
    console.log(options);

    try {
        const response = await axios(<AxiosRequestConfig>options);
        return response;
    } catch (err) {
        // console.log(err);
        // @ts-ignore
        return 'Error - something went wrong with Axios';
    }
}

export async function getLatestBin(): Promise<{latestBinId: string, latestBin:Entry}> {
    const latestBinId = await getLatestBinId();
    const latestBin = await getBin(latestBinId);

    return { latestBinId, latestBin };
}

export async function getLatestBinId(): Promise<string> {
    const bins = (
        await makeAPICall(
            makeAPIOptions('collectionsBins', undefined, collectionId)
        )
    ).data;
    return bins[0].record;
}

export async function getBin(binId: string): Promise<Entry> {
    const response = await makeAPICall(
        makeAPIOptions('binsRead', undefined, binId)
    );

    return response.data.record;
}

export async function updateBin(entry: Entry, binId: string): Promise<Entry> {
    const response = await makeAPICall(
        makeAPIOptions('binsUpdate', entry, binId)
    );
    return response.data.record;
}
