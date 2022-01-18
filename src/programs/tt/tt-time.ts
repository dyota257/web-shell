import {
    convertDateToString,
} from '../../public/js/shared/functions';
import {
    format as date_format,
    parseISO,
    isMatch as date_isMatch,
    setHours,
    setMinutes,
} from 'date-fns';
export function onTimeAtDate(dateISOString: string): string {
    const date = parseISO(dateISOString);
    return `at ${convertDateToString(date)} on ${date_format(
        date,
        'eeee, do MMM, yyyy'
    )}`;
}

export function setHoursAndMinutes(inputTime: string): string {
    if (validateTimeInput(inputTime)) {
        const { hours, minutes } = convertInputTimeToHoursMinutes(inputTime);

        const offset = (new Date).getTimezoneOffset() / 60 // -8 on the browser, 0 on the server
        
        let outputDate = setMinutes(
            setHours(new Date(), hours - offset - 8), 
            minutes
        );
        return outputDate.toISOString();
    } else {
        return `This is not a valid time input`;
    }
}

export function validateTimeInput(inputTime: string): boolean {
    // take in input of a format 20:34 or 2034
    // always two digits hours, always two digits minutes.
    return (
        [4, 5].includes(inputTime.length) &&
        (date_isMatch(inputTime, 'kk:mm') || date_isMatch(inputTime, 'kkmm'))
    );
}

export function convertInputTimeToHoursMinutes(inputTime: string): {
    hours: number;
    minutes: number;
} {
    if (inputTime.length === 4) {
        return {
            hours: Number(inputTime.slice(0, 2)),
            minutes: Number(inputTime.slice(2, 5)),
        };
    } else {
        return {
            hours: Number(inputTime.slice(0, 2)),
            minutes: Number(inputTime.slice(3, 5)),
        };
    }
}
