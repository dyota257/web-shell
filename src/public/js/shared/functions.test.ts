import { wrapMidnight, formatTime } from './functions';

describe('wrapMidnight', () => {
    it('wraps around midnight correctly', () => {
        let questions = [12, 16, 18, 20, 23, 24];

        let answers = [20, 0, 2, 4, 7, 8];

        questions.forEach((e, i) => {
            expect(wrapMidnight(e, 8)).toEqual(answers[i]);
        });
    });
});

describe('formatTime', () => {
    let questions = [
        [2, 2],
        [4, 12],
        [10, 5],
        [13, 16],
        [20, 36],
        [50, 12],
        [3, 120],
    ];

    it('formats time correctly by itself', () => {
        let answers = [
            '02:02',
            '04:12',
            '10:05',
            '13:16',
            '20:36',
            'Error: formatTime()',
            'Error: formatTime()',
        ];
        questions.forEach((e, i) => {
            let hour = e[0],
                minutes = e[1];
            expect(formatTime(hour, minutes)).toEqual(answers[i]);
        });
    });

    it('formats time correctly through wrapMidnight', () => {
        let answers = [
            '10:02',
            '12:12',
            '18:05',
            '21:16',
            '04:36',
            'Error: formatTime()',
            'Error: formatTime()',
        ];
        questions.forEach((e, i) => {
            let hour = e[0],
                minutes = e[1],
                offset = 8
            expect(formatTime(wrapMidnight(hour, offset), minutes)).toEqual(answers[i]);
        });
    });
});
