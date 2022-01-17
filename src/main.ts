import express from 'express';
import { tt } from './programs/tt/tt';
import { help } from './programs/help/help';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

// const port = 8000;

app.use(express.json());
app.use(express.urlencoded());

// app.use(express.static('public'));
// app.use(express.static('../public'));
app.use(express.static('dist/public'));

app.set('view engine', 'ejs');

// ROUTES

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/htmx', (_req, res) => {
    res.sendFile(__dirname + '/htmx.html');
});

app.post('/command', async (req, res) => {
    // input: string
    // return string
    let program = req.body.command.split(' ')[0];
    let commands = req.body.command.split(' ').slice(1).join(' ');
    let out: string = '';

    switch (program) {
        case 'tt':
            out = await tt(commands);
            break;
        case 'help':
            out = help();
            break;
        default:
            out = 'I do not know what that is';
            break;
    }

    // send this body to the API

    res.send(out);
});

// @ts-ignore
app.post('/htmx', (req, res) => {
    res.send('hello');
});

// start the express server
const port = process.env.PORT;
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
