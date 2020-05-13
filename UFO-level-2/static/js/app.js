// from data.js
var tableData = data;

var setAttrs = (whattoset,attrs) => {
    Object.entries(attrs).forEach(([key,value]) => {
        whattoset.attr(key,attrs[key]);
    });
}
// Add more lists
var filters = d3.select("#filters");

var labels = ["city","state","country","shape"];

var attrbs = labels.map( label => {
    return {"class":"form-control","id":label,"type":"text","placeholder":""};
});

for(var i = 0;i<labels.length;i++){
    var li = filters.append("li");
    li.attr("class", "filter list-group-item");
    
    var label = li.append('label');
    label.attr("for",labels[i]);
    label.text(labels[i]);
    
    var inpt = li.append('input');
    setAttrs(inpt,attrbs[i]);
}
//----------------------------------------

var tbody = d3.select("tbody");

var getMatchingRecords = (dt,flts) => {
    var mdy1 = new Date(dt);
    var records = []
    data.forEach((datum) => {
        var mdy2 = new Date(datum.datetime);
        if (((mdy2.getTime() === mdy1.getTime()) || (dt === ""))
        && ((flts[0] === datum.city.toLowerCase()) || (flts[0] === ""))
        && ((flts[1] === datum.state.toLowerCase()) || (flts[1] === ""))
        && ((flts[2] === datum.country.toLowerCase()) || (flts[2] === ""))
        && ((flts[3] === datum.shape.toLowerCase()) || (flts[3] === ""))){
            records.push(datum);
        }
    });
    return records;
}

var updateTable = records => {
    tbody.html("");
    if (records.length < 1) return;
    records.forEach((record) => {
        var row = tbody.append("tr");
        Object.values(record).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

var button = d3.select("#filter-btn");

var handleInput = () => {
    var flts = labels.map(label =>{
        return d3.select(`#${label}`).property("value").toLowerCase();
    });
    dt = d3.select("#datetime").property("value");
    updateTable(getMatchingRecords(dt,flts));
}

button.on("click", handleInput);