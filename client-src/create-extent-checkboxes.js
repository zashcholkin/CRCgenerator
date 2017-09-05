const EXTENTS_AMOUNT = require("./settings").EXTENTS_AMOUNT;

/*
$(document).ready(function () {
    $("#VHDL-CRC-link").hide();
});
*/

var extentsDiv = $("#extents-div");

for (var i = 0; i < EXTENTS_AMOUNT; i++) {
    extentsDiv.append(`<label>X<sup>${i}</sup>
                <input type="checkbox" name="${i}" value="use">
            </label>`);
}