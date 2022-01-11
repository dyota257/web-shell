export function getCurrentTime() {
    let today = new Date();
    return (
        today.getHours().toString().padStart(2, '0') +
        ':' +
        today.getMinutes().toString().padStart(2, '0')
    );
}