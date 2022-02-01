import { Entry } from './types';
import {
    makeAPIOptions,
    makeAPICall,
    getLatestBin,
    updateBin,
    getLast10,
} from './jsonbin';

import { getCurrentTime } from '../../public/js/shared/functions';

import { onTimeAtDate, setHoursAndMinutes, validateTimeInput } from './tt-time';

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
                out = await ttStop(args);
                break;
            case 'note':
                out = await ttNote(args);
                break;
            case 'log':
                out = ttLog();
                break;
            case 'download':
                return ttDownload();
                break;
            default:
                out = `I don't know what that is`;
        }
    }

    return 'tt: ' + out;
}

export async function ttStart(args: Array<string>): Promise<string> {
    let project = args[0];

    let time: string = '';

    if (args[1]) {
        if (validateTimeInput(args[1])) {
            time = setHoursAndMinutes(args[1]);
        } else {
            return 'This time input is invalid';
        }
    } else {
        time = new Date().toISOString();
    }

    if (project == undefined || project.length === 0) {
        return `You have to set a project`;
    } else {
        let newEntry: Entry = {
            name: project,
            start: time,
        };

        console.log({ newEntry });

        let options = makeAPIOptions('binsCreate', newEntry);

        if (options.url.length !== 0) {
            let response = await makeAPICall(options);

            console.log({ response });

            if (
                // true
                response.statusText === 'OK'
            ) {
                return `Started ${project} at ${args[1] || getCurrentTime()}`;
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

async function ttStop(args: Array<string>): Promise<string> {
    // TODO handle time argument

    let time: string;

    const { latestBinId, latestBin } = await getLatestBin();

    if (latestBin.hasOwnProperty('end')) {
        return `The project ${latestBin.name} already ended ${onTimeAtDate(
            <string>latestBin.end
        )}`;
    } else {
        if (args[0]) {
            if (validateTimeInput(args[0])) {
                time = setHoursAndMinutes(args[0]);
            } else {
                return 'This time input is invalid';
            }
        } else {
            time = new Date().toISOString();
        }
        latestBin.end = time;
        await updateBin(latestBin, latestBinId);
        return `Stopped ${latestBin.name} at ${args[0] || getCurrentTime()}`;
    }
}

async function ttNote(args: Array<string>): Promise<string> {
    // is the latest task an open one?

    const { latestBinId, latestBin } = await getLatestBin();

    // if not, then bail

    if (latestBin.hasOwnProperty('end') || false) {
        return `You're not working on a task. Start one to add a note to it.`;
    } else {
        // add note
        const newNote = getCurrentTime() + args.join(' ') || '';

        if (args.length === 0 || newNote.length === 0) {
            console.log(newNote.length);
            return `You cannot have an empty note`;
        } else {
            const newBin = addNoteToEntry(latestBin, newNote);
            // update bin
            await updateBin(newBin, latestBinId);

            // respond to user
            return `Note added to ${latestBin.name}: '${newNote}'`;
        }
    }
}

async function ttStatus(): Promise<string> {
    // open up collection with collection ID
    // this will be the first 10 bins

    const { latestBin } = await getLatestBin();
    console.log({ latestBin });

    if (latestBin.hasOwnProperty('end')) {
        return `Last working on ${latestBin.name}, ended ${onTimeAtDate(
            latestBin.end!
        )}`;
    } else {
        return `Still working on ${latestBin.name}, started ${onTimeAtDate(
            latestBin.start
        )}`;
    }
}

export function addNoteToEntry(oldEntry: Entry, newNote: string): Entry {
    if (oldEntry.hasOwnProperty('end')) {
        return oldEntry;
    } else {
        const oldSetOfNotes = oldEntry.notes;
        let newSetOfNotes: Array<string>;
        if (oldSetOfNotes === undefined) {
            newSetOfNotes = [newNote];
        } else {
            newSetOfNotes = [...oldSetOfNotes, newNote];
        }

        const newEntry = {
            ...oldEntry,
            notes: newSetOfNotes,
        };
        return newEntry;
    }
}

export async function ttDownload(): Promise<string> {
    // var testObject = [
    //     {
    //         name: 'from-the-server',
    //         start: '2022-01-19T09:17:26.519Z',
    //         notes: [
    //             'change annamaria to yusi soryako',
    //             'need to change sessions annamaria',
    //         ],
    //         end: '2022-01-19T09:28:04.068Z',
    //     },
    //     {
    //         name: 'operations-assurance',
    //         start: '2022-01-19T07:57:04.790Z',
    //         notes: [
    //             'do change requests passed on from Heidi',
    //             'swap over tony drake-brockman',
    //         ],
    //         end: '2022-01-19T09:01:14.776Z',
    //     },
    //     {
    //         name: 'operations-assurance',
    //         start: '2022-01-19T06:13:06.477Z',
    //         notes: [
    //             'make hot to guide on updating monthly asset integrity meeting slides',
    //         ],
    //         end: '2022-01-19T07:41:36.701Z',
    //     },
    //     {
    //         name: 'consolidate-notes',
    //         start: '2022-01-19T02:44:03.551Z',
    //         end: '2022-01-19T06:12:48.914Z',
    //     },
    // ];

    let response = await getLast10();

    // this only takes the record IDs, but not the details
    // make an array of record IDs
    // go back and get all of them
    // set up output array
    // for each thing in record ID array, fetch the actual record, push it into the output array
    // stringify

    console.log(response);

    return (
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(response.data))
    );
}
