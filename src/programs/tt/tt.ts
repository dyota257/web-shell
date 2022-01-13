import { Entry } from './types';
import { makeAPIOptions, makeAPICall, collectionId } from './jsonbin';
import { getCurrentTime } from '../../public/js/shared/functions';

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

async function ttStatus(): Promise<string> {
    // open up collection with collection ID
    // this will be the first 10 bins

    const bins = (
        await makeAPICall(
            makeAPIOptions('collectionsBins', undefined, collectionId)
        )
    ).data;
    const latestBinId: string = bins[0].record;
    console.log(latestBinId);

    const response = await makeAPICall(
        makeAPIOptions('binsRead', undefined, latestBinId)
    );
    const latestBin = response.data.record;
    console.log({ latestBin }); 

    // get the first item (that should be the latest)
    // read off the data, the name of the project
    // if there are any notes, display them
    return `Last working on ${latestBin.name}, started at ${latestBin.start}`;
}
