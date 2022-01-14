import { Entry } from './types';
import {
    makeAPIOptions,
    makeAPICall,
    getLatestBin,
    getLatestBinId,
    getBin,
} from './jsonbin';
import {
    getCurrentTime,
    convertDateToString,
} from '../../public/js/shared/functions';
import { format as date_format, parseISO } from 'date-fns';

/* 
    tt start
    tt stop
    tt note
    tt log
*/

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
            case 'status':
                out = await ttStatus();
                break;
            case 'start':
                out = await ttStart(args);
                break;
            case 'stop':
                out = await ttStop();
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

    // TODO this is wrong - args[1] needs to be an ISO string
    // TODO also need validation on args[1]
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

            if (response.statusText === 'OK') {
                return `Started ${project} ${
                    args[1] !== undefined ? 'now' : 'at ' + getCurrentTime()
                }`;
            } else {
                return 'Something went wrong server-side.';
            }
        } else {
            return 'The target URL was empty.';
        }
    }
}

function ttLog(): string {
    return 'The whole history is here';
}

async function ttStop(): Promise<string> {

    // TODO handle time argument
    
    const latestBinId = await getLatestBinId();
    const latestBin: Entry = await getBin(latestBinId);

    if (latestBin.hasOwnProperty('end')) {
        return `The project ${latestBin.name} already ended ${onTimeAtDate(
            <string>latestBin.end
        )}`;
    } else {
        latestBin.end = new Date().toISOString();
        makeAPICall(
            makeAPIOptions('binsUpdate', latestBin, latestBinId)
        );
        return `Stopped ${latestBin.name} at ${getCurrentTime()}`;
    }
}

function ttNote(args: Array<string>): string {
    let project = 'current project';
    if (args.length === 0) {
        return `You cannot have an empty note`;
    } else {
        return `Made a note for ${project}: '${getCurrentTime()} note note note'`;
    }
}

async function ttStatus(): Promise<string> {
    // open up collection with collection ID
    // this will be the first 10 bins

    const latestBin = await getLatestBin();

    return `Last working on ${latestBin.name}, started ${onTimeAtDate(
        latestBin.start
    )}`;
}

function onTimeAtDate(dateISOString: string): string {
    const date = parseISO(dateISOString);
    return `at ${convertDateToString(date)} on ${date_format(
        date,
        'eeee, do MMM, yyyy'
    )}`;
}
