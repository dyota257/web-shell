import {
    validateTimeInput,
    convertInputTimeToHoursMinutes,
} from './tt-time';

import {
    addNoteToEntry,
} from './tt';
describe('addNoteToEntry function', () => {
    const newNote = 'This is a new note';

    const oldEntries = [
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
        },
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
            notes: ['Already has one note'],
        },
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
            notes: ['Already has one note', 'Already has two notes'],
        },
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
            notes: ['Already has one note', 'Already has two notes'],
            end: '2022-01-17T09:45:27.174Z',
        },
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
            end: '2022-01-17T09:45:27.174Z',
        },
    ];

    const newEntries = [
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
            notes: [newNote],
        },
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
            notes: ['Already has one note', newNote],
        },
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
            notes: ['Already has one note', 'Already has two notes', newNote],
        },
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
            notes: ['Already has one note', 'Already has two notes'],
            end: '2022-01-17T09:45:27.174Z',
        },
        {
            name: 'team-master-project-plan',
            start: '2022-01-17T08:45:27.174Z',
            end: '2022-01-17T09:45:27.174Z',
        },
    ];

    it('updates entries correctly', () => {
        oldEntries.forEach((e, i) => {
            expect(addNoteToEntry(e, newNote)).toMatchObject(newEntries[i]);
        });
    });
});

describe('validateTimeInput is allowing the right types of time input', () => {
    it('', () => {
        const tests: Array<[string, boolean, number]> = [
            ['01:30', true, 5],
            ['0137', true, 4],
            ['01A37', false, 4],
            ['112', false, 3],
            ['12', false, 2],
            ['1270', false, 4],
            ['abcd', false, 4],
            ['2612', false, 4],
            ['405', false, 4],
        ];

        tests.forEach((e) => {
            const question: string = e[0];
            const answer: boolean = e[1];
            // const length: number = e[2];
            // expect(validateTimeInput(question)).toBe(answer);
            expect({
                [question]: validateTimeInput(question),
            }).toMatchObject({
                [question]: answer,
            });
        });
    });
});

describe('convertInputTimeToHoursMinutes', () => {
    it('returns the right hours and minutes', () => {
        const tests = [
            ['2045', { hours: 20, minutes: 45 }],
            ['20:45', { hours: 20, minutes: 45 }],
        ];

        tests.forEach((e) => {
            expect(convertInputTimeToHoursMinutes(<string>e[0])).toMatchObject(
                e[1]
            );
        });
    });
});

describe('makeISOFromTime', () =>{
    it('', () => {
        const tests = [
            [new Date(2022, 1, 18, 11, 30), '2022-01-18T10:33:11.663Z']
        ]
    });
});