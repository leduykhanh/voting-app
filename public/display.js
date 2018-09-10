var socket = io();


var count = 0;
//chart data
var chartjson = {
  "title": "Title Text",
  "data": [{
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }, {
    "count": 0
  }
],
  "ymax": 100,
  "ykey": 'count',
  "xkey": "name",
  "prefix": "%"
};
//chart colors
var colors = ['one', 'two', 'three', 'four', 'five', 'six',
 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen','fourteen',
  'fifteen', 'sixteen', 'seventeen'];

function getVotes(){
  $.get("/vote",
   (data) => {
     var count = data.reduce((d1, d2) => d1 + d2.count, 0);

     data.map(
       d => {
         let bar = document.getElementById(colors[d.id - 1]);
         let text = document.getElementById('text' + d.id);
         let percentage = d.count > 0 ? 100 * d.count / count : 1;
         bar.style.height = percentage + '%';
         text.innerText = d.count;
        }
     )
   });
}

function openFullscreen(elem) {
  console.log(elem.webkitRequestFullscreen)
  if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.requestFullscreen) { /* Chrome, Safari and Opera */
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

getVotes();

socket.on('vote-update',
  (data) => getVotes()
);

//constants
var TROW = 'tr',
  TDATA = 'td';

var chart = document.createElement('div');
//create the chart canvas
var barchart = document.createElement('table');
//create the title row
var titlerow = document.createElement(TROW);
//create the title data
var titledata = document.createElement(TDATA);
//make the colspan to number of records
titledata.setAttribute('colspan', chartjson.data.length+1);
titledata.setAttribute('class', 'charttitle');
titledata.innerText = chartjson.title;
titlerow.appendChild(titledata);
barchart.appendChild(titlerow);
chart.appendChild(barchart);

//create the bar row
var barrow = document.createElement(TROW);

//lets add data to the chart
for (var i = 0; i < chartjson.data.length; i++) {
  barrow.setAttribute('class', 'bars');
  var prefix = chartjson.prefix || '';
  //create the bar data
  var bardata = document.createElement(TDATA);
  var bar = document.createElement('div');
  var image = document.createElement('image');
  var text = document.createElement('div');
  text.setAttribute('id', 'text' + (i+1));
  image.setAttribute("src", "/images/"+ (i+1)+".png");
  bar.setAttribute('id', colors[i]);
  bar.style.height = (chartjson.data[i][chartjson.ykey] > 0 ? chartjson.data[i][chartjson.ykey] : 1)  + prefix;
  bar.style.width = "60%";
  bar.style.marginLeft = "20%";
  bar.style.marginRight = "20%";
  text.innerText = chartjson.data[i][chartjson.ykey];

  bardata.appendChild(text);
  bardata.appendChild(bar);
  bardata.appendChild(image);
  barrow.appendChild(bardata);
}


barchart.appendChild(barrow);
chart.appendChild(barchart);
document.getElementById('chart').innerHTML = chart.outerHTML;
openFullscreen(document.getElementById("chart"));
document.getElementById("chart").webkitRequestFullscreen();
