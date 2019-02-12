window.onload = function() {
    let millis = document.getElementById("millis");
    let quarter = document.getElementById("quarter");
    millis.addEventListener("keyup", function() {
        if (isValidTimestamp(millis)) {
            quarter.value = quarterFromMillis(millis.value);
        }
    });
    quarter.addEventListener("keyup", function() {
        if (isValidQuarter(quarter)) {
            millis.value = startMillisFromQuarter(quarter.value);
        }
    });
}

function quarterFromMillis(millis) {
  const timestamp = isNaN(millis) ? millis : parseInt(millis);
  const date = new Date(timestamp);
  return date.getUTCFullYear() + "Q" + Math.floor(date.getUTCMonth()/3 + 1);
}

function startMillisFromQuarter(quarter) {
    const match  = /(\d{4})Q(\d)/i.exec(quarter);
    date = new Date(Date.UTC(match[1], (match[2] - 1) * 3, 1));
    return date.getTime();
}

function isValidTimestamp(input) {
    const timestamp = isNaN(input.value) ? input.value : parseInt(input.value);
    return (new Date(timestamp)).getTime() > 0;
}

function isValidQuarter(input) {
    return /(\d{4})Q(\d)/i.test(input.value);
}
