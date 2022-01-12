export function getCurrentTime() {
    let today = new Date();
    let offset = today.getTimezoneOffset()/60 // GMT +8 returns -8

    return (
        (today.getHours() - offset).toString().padStart(2, '0') +
        ':' +
        today.getMinutes().toString().padStart(2, '0')
    );
}