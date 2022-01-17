import { addNoteToEntry } from './tt';

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
