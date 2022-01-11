import { collectionId, reqHeader, apiMethods, makeAPIOptions, masterKey } from './tt';
import { Entry } from './types';
// let collectionId = '61d596f839a33573b3237f90';
let binId = '61d7f57339a33573b324bf17';
// let reqHeader = {
//     'Content-Type': 'application/json',
//     'X-Master-Key': masterKey,
// };

describe('the apiMethods object', () => {
    it('makes the right routes', () => {
        expect(apiMethods['binsCreate'].route()).toEqual('/b');
        expect(apiMethods['binsRead'].route(binId)).toEqual(
            '/b/61d7f57339a33573b324bf17'
        );
        expect(apiMethods['binsUpdate'].route(binId)).toEqual(
            '/b/61d7f57339a33573b324bf17'
        );
        expect(apiMethods['binsDelete'].route(binId)).toEqual(
            '/b/61d7f57339a33573b324bf17'
        );
        expect(apiMethods['collectionsBins'].route(collectionId)).toEqual(
            '/c/61d596f839a33573b3237f90/bins'
        );
    });

    it('uses the right methods', () => {
        expect(apiMethods['binsCreate'].method).toEqual('POST');
        expect(apiMethods['binsRead'].method).toEqual('GET');
        expect(apiMethods['binsUpdate'].method).toEqual('PUT');
        expect(apiMethods['binsDelete'].method).toEqual('DELETE');
        expect(apiMethods['collectionsBins'].method).toEqual('GET');
    });

    it('makes the right headers', () => {
        expect({
            ...reqHeader,
            ...apiMethods['binsCreate'].headers(collectionId),
        }).toMatchObject({
            'Content-Type': 'application/json',
            'X-Collection-Id': '61d596f839a33573b3237f90',
            'X-Master-Key':
                '$2b$10$ZnO6WtBQRdK7T2XnA.SJFupmACGAApO62k3tMTc/AJTanAdJet4ye',
        });
        expect({
            ...reqHeader,
            ...apiMethods['binsRead'].headers(),
        }).toMatchObject(reqHeader);
        expect({
            ...reqHeader,
            ...apiMethods['binsUpdate'].headers(),
        }).toMatchObject(reqHeader);
        expect({
            ...reqHeader,
            ...apiMethods['binsDelete'].headers(),
        }).toMatchObject(reqHeader);
        expect({
            ...reqHeader,
            ...apiMethods['collectionsBins'].headers(),
        }).toMatchObject(reqHeader);
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

        let expected = {
            method: 'POST',
            url: 'https://api.jsonbin.io/v3/b',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': masterKey,
                'X-Collection-Id': collectionId
            },
            data: entry
        };

        let result = makeAPIOptions('binsCreate', entry);

        expect(expected).toMatchObject(result);
    });
});
