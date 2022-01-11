import { Entry, APIMethods, APIOptions } from './types';
import { getCurrentTime } from '../../public/js/shared/functions';
// @ts-ignore
import axios, { AxiosRequestConfig } from 'axios';
/* 
    tt start
    tt stop
    tt note
    tt log
*/
export const root = 'https://api.jsonbin.io/v3',
    masterKey = '$2b$10$ZnO6WtBQRdK7T2XnA.SJFupmACGAApO62k3tMTc/AJTanAdJet4ye',
    collectionId = '61d596f839a33573b3237f90';

// @ts-ignore
export let reqHeader = {
    'Content-Type': 'application/json',
    'X-Master-Key': masterKey,
};

export async function tt(commands: string): Promise<string> {
    let command = commands.split(' ')[0];
    console.log({ command });

    let args = commands.split(' ').slice(1);
    console.log({ args });

    let out = '';

    if (command.length == 0) {
        out = `You should include a command`;
    } else {
        switch (command.toLowerCase()) {
            case 'start':
                out = await ttStart(args);
                break;
            case 'stop':
                out = ttStop();
                break;
            case 'note':
                out = ttNote(args);
                break;
            case 'log':
                out = ttLog();
                break;
            default:
                out = `I don't know what that is`;
        }
    }

    return 'tt: ' + out;
}

async function ttStart(args: Array<string>): Promise<string> {
    let project = args[0];
    console.log({ project });

    let time: string = '';

    args[1] !== undefined
        ? (time = args[1])
        : (time = new Date().toISOString());

    if (project == undefined || project.length === 0) {
        return `You have to set a project`;
    } else {
        let newEntry: Entry = {
            name: project,
            start: time,
        };

        console.log({ newEntry });

        let options = makeAPIOptions('binsCreate', newEntry);

        console.log({ options });
        if (options.url.length !== 0) {
            let response = await makeAPICall(options);

            console.log({ response });

            if (response === 'OK') {
                return `Started ${project} ${
                    args[1] !== undefined ? 'now' : 'at ' + getCurrentTime()
                }`;
            } else {
                return 'Something went wrong server-side.';
            }
        } else {
            return 'The target URL was empty.'
        }
    }
}

export const apiMethods = {
    binsCreate: {
        // @ts-ignore
        route: (binId?: string) => '/b',
        method: 'POST',
        headers: (collectionId: string) => {
            return { 'X-Collection-Id': collectionId };
        },
    },
    binsRead: {
        route: (binId: string) => `/b/${binId}`,
        method: 'GET',
        headers: () => {
            return {};
        },
    },
    binsUpdate: {
        route: (binId: string) => `/b/${binId}`,
        method: 'PUT',
        headers: () => {
            return {};
        },
    },
    binsDelete: {
        route: (binId: string) => `/b/${binId}`,
        method: 'DELETE',
        headers: () => {
            return {};
        },
    },
    collectionsBins: {
        route: (collectionId: string) => `/c/${collectionId}/bins`,
        method: 'GET',
        headers: () => {
            return {};
        },
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

async function makeAPICall(options: APIOptions): Promise<string> {
    console.log(options);

    try {
        const response = await axios(<AxiosRequestConfig>options);
        return response.statusText;
    } catch (err) {
        console.log(err);
        return 'Error - something went wrong with Axios'
    }
    
    // @ts-ignore
    
    // axios(options)
    //     .then(function (response) {
    //         console.log(response.statusText);
    //         return response.statusText;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //         return error;
    //     });
}

function ttLog(): string {
    return 'The whole history is here';
}

function ttStop(): string {
    let project = 'current project';
    return `Stopped ${project} at ${getCurrentTime()}`;
}

function ttNote(args: Array<string>): string {
    let project = 'current project';
    if (args.length === 0) {
        return `You cannot have an empty note`;
    } else {
        return `Made a note for ${project}: '${getCurrentTime()} note note note'`;
    }
}
