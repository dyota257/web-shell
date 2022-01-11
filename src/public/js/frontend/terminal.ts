// let screenPrompt = $$('prompt');
// let screenHistory = $$('history');
// let terminalHistory = []; // Array<string>
// let ttsheet = []; // Array<Entry>

// displayPrompt();
// screenPrompt !== null ? (<HTMLInputElement>screenPrompt).value = ''

// document.addEventListener('keydown', async () => {
//     if (event!.key == 'Enter' && screenPrompt == document.activeElement && (<HTMLInputElement>screenPrompt).value.length !== 0) {
//         terminalHistory.push((<HTMLInputElement>screenPrompt).value);
//         await submitInput((<HTMLInputElement>screenPrompt).value);
//         // clear the textbox
//         (<HTMLInputElement>screenPrompt).value = '';
//         displayPrompt();
//     };
// });

// // terminal screenHistory
// // ArrowUp
// // ArrowDown

// document.addEventListener('click', () => { $$('prompt')!.focus(); });

// function $(selector:string): NodeListOf<Element> { return document.querySelectorAll(selector) };
// function $$(selector:string): HTMLElement | null { return document.getElementById(selector) };

// async function submitInput(input:string) {
//     // input: string
//     // return void

//     if (input == 'cls') {
//         clearConsole()
//     } else {
//         printToConsole(input);
//         screenHistory!.innerHTML += await processInput(input)
//     };

// }

// async function processInput(input:string) {
//     // FETCH
//     let response = await fetch('/command', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ command: input })
//     });


//     if (response.ok) { // if HTTP-status is 200-299
//         return `<div class='output'># ${await response.text()}</div>`;

//     } else {
//         alert("HTTP-Error: " + response.status);
//     }

// }


// function printToConsole(input:string) {
//     // input: string
//     // return void
//     screenHistory!.innerHTML += `<div><span class="output">> </span><span class="input">${input}</span></div>`
// }

// function displayPrompt() {
//     // return void
//     screenHistory!.innerHTML += `<div>
//         <div>[${getCurrentTime()}]</div><br>
//         </div>`
//     // <span class="prompt">What can I do for you?</span>
// }

// function clearConsole() {
//     // return void
//     screenHistory!.innerHTML = ''
// }


// // function getCurrentTime() {
// //     let today = new Date();
// //     return (
// //         today.getHours().toString().padStart(2, '0') +
// //         ':' +
// //         today.getMinutes().toString().padStart(2, '0')
// //     );
// // }
