import express from 'express';

const app = express();

const port = 8000;

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'));

const // @ts-ignore
    root = 'https://api.jsonbin.io/v3',
    masterKey = '$2b$10$ZnO6WtBQRdK7T2XnA.SJFupmACGAApO62k3tMTc/AJTanAdJet4ye',
    collectionId = '61d596f839a33573b3237f90';

// @ts-ignore
let reqHeader = {
    'Content-Type': 'application/json',
    'X-Master-Key': masterKey,
    'X-Collection-Id': collectionId,
};

// ROUTES

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/htmx', (_req, res) => {
    res.sendFile(__dirname + '/htmx.html');
});

app.post('/command', (req, res) => {
    // input: string
    // return string
    let program = req.body.command.split(' ')[0];
    let commands = req.body.command.split(' ').slice(1).join(' ');
    let out: string = '';

    switch (program) {
        case 'tt':
            // @ts-ignore
            out = `This is tt, and the commands are ${commands}`;
            break;
        case 'htmx':
            window.location.href = '/htmx';
            break;
        default:
            out = 'I do not know what that is';
            break;
    }

    console.log('received');
    console.log(req.headers);
    console.log(req.body);

    // send this body to the API

    res.send(out);

    console.log(res)
});

/* 

    tt start
    tt stop
    tt note
    tt log

*/

// @ts-ignore
app.post('/htmx', (req, res) => {
    res.send('hello');
});

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

// @ts-ignore
function processInput(input: string): string {
    // input: string
    // return string
    let program = input.split(' ')[0];
    // @ts-ignore
    let commands = input.split(' ').slice(1).join(' ');
    let out: string = '';
    switch (program) {
        case 'tt':
            out = 'tt';
            break;
        case 'htmx':
            window.location.href = '/htmx';
            break;
        default:
            out = 'I do not know what that is';
            break;
    }
    return `# ` + out;
}
