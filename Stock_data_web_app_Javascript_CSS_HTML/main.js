//Gets the id and assigns it to variables
var submitBtn = document.getElementsByClassName("submitBtn");
var stksymbolClass = document.getElementsByClassName("stksymbol");
var container = document.getElementsByClassName("container")[0];

// xhr requests a  promise call to fetch the data from the API
let request = obj => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(obj.method || "GET", obj.url);
    if (obj.headers) {
      Object.keys(obj.headers).forEach(key => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
  });
};

// RX js observer to get the JSON data from the API server
var observer = {
  next: function(value) {
    var inputstksymbol = stksymbolClass[0].value;
    console.log();
    request({
      url: `https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo`
    })
      .then(response => {
        console.log(response);
        var stocktable = document.getElementsByClassName("stockListTable")[0];
        if (typeof stocktable != "undefined" && stocktable != null) {
          container.removeChild(stocktable); // Remove the child if it exists
        }
        var inpsymarr = inputstksymbol.split(",");
        var filteredData = response.data.filter(f =>
          inpsymarr.includes(f.symbol)
        );
        GenerateTable(filteredData);
      })
      .catch(error => {
        console.log(error);
      });
  },

  error: function(error) {
    console.log(error);
  },
  complete: function() {
    console.log("Completed");
  }
};

// method to generate table from the json output
function GenerateTable(stockDetailsArray) {
  //Creates a HTML Table element.
  var table = document.createElement("table");
  table.setAttribute("class", "stockListTable");
  table.border = "1";

  //Get the count of columns and adds the header row

  var row = table.insertRow(-1);
  for (var key in stockDetailsArray[0]) {
    var headerCell = document.createElement("th");
    headerCell.innerHTML = key;
    row.appendChild(headerCell);
  }
  //Add the data rows.
  for (var i = 0; i < stockDetailsArray.length; i++) {
    row = table.insertRow(-1);
    for (var key in stockDetailsArray[i]) {
      var cell = row.insertCell(-1);
      cell.innerHTML = stockDetailsArray[i][key];
    }
  }
  container.appendChild(table);
}
function unsubscribeSubmitbtn() {
  console.log("unload");
  subscriberObject.unsubscribe();
}

// Event listener observer for click submit button
var subscriberObject = Rx.Observable.fromEvent(submitBtn, "click").subscribe(
  observer
);
window.onunload = unsubscribeSubmitbtn;
