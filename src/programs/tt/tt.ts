import { Entry } from './types';

export function tt(commands: string): string {
    let command = commands.split(' ')[0];
    let args = commands.split(' ').slice(1);
    let out = '';

    if (command.length == 0) {
        out = `You should include a command`;
    } else {
        switch (command.toLowerCase()) {
            case 'start':
                let project = args[0];
                if (project == undefined) {
                    out = `You have to set a project`;
                } else {
                    out = `Started ${project} at ${getCurrentTime()}`;
                    let newEntry: Entry = {
                        name: project,
                        start: new Date().toISOString(),
                        notes: [],
                        end: '',
                    };
                    console.log({ newEntry });
                }
                break;
            case 'log':
                console.log('log');
                out = 'The whole history is here';
                break;
            default:
                out = `I don't know what that is`;
        }
    }

    return 'tt: ' + out;
}

function getCurrentTime() {
    let today = new Date();
    return (
        today.getHours().toString().padStart(2, '0') +
        ':' +
        today.getMinutes().toString().padStart(2, '0')
    );
}
