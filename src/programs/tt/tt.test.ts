import {
    collectionId,
    reqHeader,
    apiMethods,
    makeAPIOptions,
    masterKey,
} from './tt';
import { Entry, APIOptions, APIMethods } from './types';

const binId = '61d7f57339a33573b324bf17';

const actions: Array<APIMethods> = [
    'binsCreate',
    'binsRead',
    'binsUpdate',
    'binsDelete',
    'collectionsBins',
];

const routes: Array<string | undefined> = [
    undefined,
    binId,
    binId,
    binId,
    collectionId,
];

const answers: Array<string> = [
    '/b',
    '/b/61d7f57339a33573b324bf17',
    '/b/61d7f57339a33573b324bf17',
    '/b/61d7f57339a33573b324bf17',
    '/c/61d596f839a33573b3237f90/bins',
];

const methods: Array<string> = ['POST', 'GET', 'PUT', 'DELETE', 'GET'];

const headers = [
    {
        'Content-Type': 'application/json',
        'X-Collection-Id': '61d596f839a33573b3237f90',
        'X-Master-Key':
            '$2b$10$ZnO6WtBQRdK7T2XnA.SJFupmACGAApO62k3tMTc/AJTanAdJet4ye',
    },
    reqHeader,
    reqHeader,
    reqHeader,
    reqHeader,
];

describe('the apiMethods object', () => {
    actions.forEach((e: APIMethods, i: number) => {
        it('makes the right routes', () => {
            expect(apiMethods[e].route(routes[i])).toEqual(answers[i]);
        });
    
        it('uses the right methods', () => {
            expect(apiMethods[e].method).toEqual(methods[i]);
        });
    
        it('makes the right headers', () => {
            let headersArg: string | undefined;
            e === 'binsCreate' ? (headersArg = collectionId) : false;

            expect({
                ...reqHeader,
                ...apiMethods[e].headers(headersArg),
            }).toMatchObject(headers[i]);
        });
    });
});

describe('makeAPIOptions', () => {
    it('makes the right options objects to create a task', () => {
        let entry: Entry = {
            name: 'test task',
            start: '2022-01-11T13:21:41.631Z',
            notes: [],
            end: '',
        };

        let expected: APIOptions = {
            method: 'POST',
            url: 'https://api.jsonbin.io/v3/b',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': masterKey,
                'X-Collection-Id': collectionId,
            },
            data: entry,
        };

        let result = makeAPIOptions('binsCreate', entry);

        expect(expected).toMatchObject(result);
    });

    it('makes the right options objects to read a task', () => {
        let expected: APIOptions = {
            method: 'GET',
            url: 'https://api.jsonbin.io/v3/b/61d7f57339a33573b324bf17',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': masterKey,
            },
        };

        let result = makeAPIOptions(
            'binsRead',
            undefined,
            '61d7f57339a33573b324bf17'
        );

        expect(expected).toMatchObject(result);
    });

    it('makes the right options object to update a task', () => {
        let initial: Entry = {
            name: 'test task',
            start: '2022-01-11T13:21:41.631Z',
            notes: [],
            end: '',
        };

        let middle: Entry = {
            ...initial,
            notes: ['I did some stuff just now'],
        };

        let final: Entry = {
            ...middle,
            end: '2022-01-11T14:21:41.631Z',
        };

        let expected: APIOptions = {
            method: 'PUT',
            url: 'https://api.jsonbin.io/v3/b/61d7f57339a33573b324bf17',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': masterKey,
            },
            data: final,
        };

        let result = makeAPIOptions(
            'binsUpdate',
            final,
            '61d7f57339a33573b324bf17'
        );

        expect(expected).toMatchObject(result);
    });

    it('makes the right options object to delete a task', () => {
        let expected: APIOptions = {
            method: 'DELETE',
            url: 'https://api.jsonbin.io/v3/b/61d7f57339a33573b324bf17',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': masterKey,
            },
        };
        let result = makeAPIOptions(
            'binsDelete',
            undefined,
            '61d7f57339a33573b324bf17'
        );

        expect(expected).toMatchObject(result);
    });

    it('makes the right options object to get a collection of bins', () => {
        let expected: APIOptions = {
            method: 'GET',
            url: 'https://api.jsonbin.io/v3/c/61d596f839a33573b3237f90/bins',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': masterKey,
            },
        };
        let result = makeAPIOptions(
            'collectionsBins',
            undefined,
            '61d596f839a33573b3237f90'
        );

        expect(expected).toMatchObject(result);
    });
});
