// from data.js
var tableData = data;
//  point towards table body
var tbody = d3.select("tbody");

// set function for obtaining data for matching date with searched date
var getMatchingRecords = dt => {
    var mdy1 = new Date(dt);
     console.log(mdy1.getMonth());
     console.log(mdy1.getDate());
     console.log(mdy1.getFullYear());
    var records = []
    data.forEach(datum => {
        var mdy2 = new Date(datum.datetime);
        if ((mdy2.getTime() === mdy1.getTime()) || (dt === "")) {
            records.push(datum);
        }
    });
    return records;
}
// fill in table with obtained data for specified date
var updateTable = records => {
    tbody.html("");
    if (records.length < 1) return;
    records.forEach(record => {
        var row = tbody.append("tr");
        Object.entries(record).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

// point towards button in HTML
var button = d3.select("#filter-btn");

var handleInput = () => {
    // stops the page refresh on "Enter" button
    d3.event.preventDefault();

    var dt = d3.select("#datetime").property("value");
    var records = getMatchingRecords(dt);
    updateTable(records);
}

// Update the table with button click
button.on("click", handleInput);
// Enter also update the output
d3.select("form").on("submit", handleInput);