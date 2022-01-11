"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
// axios({
//     method: 'post',
//     url: '/user/12345',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone'
//     }
//   });
axios_1["default"]({
    method: 'POST',
    url: 'https://api.jsonbin.io/v3/b',
    headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2b$10$ZnO6WtBQRdK7T2XnA.SJFupmACGAApO62k3tMTc/AJTanAdJet4ye',
        'X-Collection-Id': '61d596f839a33573b3237f90'
    },
    data: {
        name: 'axios',
        start: 'now',
        notes: [],
        end: ''
    }
})
    .then(function (response) {
    console.log(response);
})["catch"](function (error) {
    console.log(error);
});
// axios({
//     method: 'GET',
//     url: 'https://jsonplaceholder.typicode.com/users',
// })
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
