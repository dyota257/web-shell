export function getCurrentTime(): string {
    let today = new Date();
    // sets a timezone offset of +8
    let offset = 8;
    return formatTime(
        wrapMidnight(today.getHours(), offset),
        today.getMinutes()
    );
}

export function formatTime(hours: number, minutes: number): string {
    if (hours >= 24 || hours < 0 || minutes > 60 || minutes < 0) {
        return 'Error: formatTime()';
    } else {
        return twoDigits(hours) + ':' + twoDigits(minutes);
    }
}

export function wrapMidnight(hour: number, offset: number): number {
    let sum = hour + offset;

    if (sum >= 24) {
        return sum - 24;
    } else {
        return sum;
    }
}

function twoDigits(number: number): string {
    return number.toString().padStart(2, '0');
}
