(()=>{"use strict";var e={906:(e,t,n)=>{n.d(t,{D:()=>l});const l=Object.freeze({FILL_SCHEDULE:"fill",CLEAR_SCHEDULE:"clear",LOG_SOMETHING:"logSomething",ANALYZE:"analyze"})}},t={};function n(l){var a=t[l];if(void 0!==a)return a.exports;var i=t[l]={exports:{}};return e[l](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(906);function t(e,t){let n=e.find((e=>e.dayOfWeek===t));document.getElementById("homeHours"+t).value=n.homeHours,document.getElementById("officeHours"+t).value=n.officeHours,document.getElementById("ptoHours"+t).value=n.ptoHours}function l(e){let n=document.getElementById("timeSplits");n.innerHTML="";for(let t=0;t<e.timeSplits.length;t++){let l=document.createElement("div");l.className="input-row";let a=document.createElement("input");a.type="text",a.name="businessUnit",a.placeholder="Business Unit",a.value=e.timeSplits[t].businessUnit,a.addEventListener("input",(function(){console.log("input",a.value),a.value=a.value.toUpperCase()}));let i=document.createElement("input");i.type="text",i.name="activity",i.placeholder="Activity",i.value=e.timeSplits[t].activity,i.addEventListener("input",(function(){i.value=i.value.toUpperCase()}));let o=document.createElement("input");o.type="text",o.name="timeCode",o.placeholder="Time Code",o.value=e.timeSplits[t].timeCode,o.addEventListener("input",(function(){o.value=o.value.toUpperCase()}));let d=document.createElement("input");d.type="number",d.name="timeSplit",d.placeholder="Time Split",d.value=e.timeSplits[t].timeSplit;let r=document.createElement("i");r.className="material-icons trash-icon",r.textContent="delete",r.style.display="inline",r.addEventListener("click",(function(){if(n.removeChild(l),n.children.length<=1){let e=document.querySelector(".trash-icon");e&&(e.style.display="none")}})),l.appendChild(a),l.appendChild(o),l.appendChild(i),l.appendChild(d),l.appendChild(r),n.appendChild(l)}t(e.workWeek,"Sunday"),t(e.workWeek,"Monday"),t(e.workWeek,"Tuesday"),t(e.workWeek,"Wednesday"),t(e.workWeek,"Thursday"),t(e.workWeek,"Friday"),t(e.workWeek,"Saturday")}function a(){let e=document.createElement("div");e.className="input-row";let t=document.createElement("input");t.type="text",t.name="businessUnit",t.placeholder="Business Unit",t.addEventListener("input",(function(){t.value=t.value.toUpperCase()}));let n=document.createElement("input");n.type="text",n.name="activity",n.placeholder="Activity",n.addEventListener("input",(function(){n.value=n.value.toUpperCase()}));let l=document.createElement("input");l.type="text",l.name="timeCode",l.placeholder="Time Code",l.addEventListener("input",(function(){l.value=l.value.toUpperCase()}));let a=document.createElement("input");a.type="number",a.name="timeSplit",a.placeholder="Time Split";let i=document.createElement("i");i.className="material-icons trash-icon",i.textContent="delete",i.style.display="none",i.addEventListener("click",(function(){if(timeSplits.removeChild(e),timeSplits.children.length<=1){let e=document.querySelector(".trash-icon");e&&(e.style.display="none")}})),e.appendChild(t),e.appendChild(l),e.appendChild(n),e.appendChild(a),e.appendChild(i),document.getElementById("timeSplits").appendChild(e)}function i(e){let t=document.querySelectorAll('input[name="timeSplit"]'),n=0;for(let e=0;e<t.length;e++)n+=Number(t[e].value);if(100!==n)return e.preventDefault(),alert("The sum of all Time Splits must be 100"),!1;let l=document.getElementById("timeSplits").querySelectorAll("input");for(let t=0;t<l.length;t++)if(!l[t].value)return e.preventDefault(),alert("All Time Split fields must have a value"),!1;let a=document.getElementsByClassName("pto");for(let t=0;t<a.length;t++)if((a[t]?.value??0)%1!=0)return e.preventDefault(),alert("PTO hours must be whole numbers"),!1;return!0}function o(e){let t={};return t.homeHours=document.getElementById("homeHours"+e).value,t.officeHours=document.getElementById("officeHours"+e).value,t.ptoHours=document.getElementById("ptoHours"+e).value,t.dayOfWeek=e,t}function d(){let e={timeSplits:[],workWeek:[]},t=document.querySelectorAll('input[name="timeSplit"]'),n=document.querySelectorAll('input[name="timeCode"]'),l=document.querySelectorAll('input[name="activity"]'),a=document.querySelectorAll('input[name="businessUnit"]');for(let i=0;i<t.length;i++)e.timeSplits.push({timeSplit:t[i].value,timeCode:n[i].value,activity:l[i].value,businessUnit:a[i].value});return e.workWeek.push(o("Sunday")),e.workWeek.push(o("Monday")),e.workWeek.push(o("Tuesday")),e.workWeek.push(o("Wednesday")),e.workWeek.push(o("Thursday")),e.workWeek.push(o("Friday")),e.workWeek.push(o("Saturday")),e}function r(e){chrome.storage.sync.set({tabName:e});let t=document.getElementsByClassName("tab-content");for(let e=0;e<t.length;e++)t[e].style.display="none";let n=document.getElementsByClassName("tablinks");for(let e=0;e<n.length;e++)n[e].classList.remove("active");document.getElementById(e).style.display="block"}document.getElementById("addTimeSplit").addEventListener("click",(function(){let e=document.getElementById("timeSplits"),t=document.getElementsByClassName("trash-icon");for(let e=0;e<t.length;e++)t[e].style.display="inline";let n=document.createElement("div");n.className="input-row";let l=document.createElement("input");l.type="text",l.name="businessUnit",l.placeholder="Business Unit",l.addEventListener("input",(function(){l.value=l.value.toUpperCase()}));let a=document.createElement("input");a.type="text",a.name="activity",a.placeholder="Activity",a.addEventListener("input",(function(){a.value=a.value.toUpperCase()}));let i=document.createElement("input");i.type="text",i.name="timeCode",i.placeholder="Time Code",i.addEventListener("input",(function(){i.value=i.value.toUpperCase()}));let o=document.createElement("input");o.type="number",o.name="timeSplit",o.placeholder="Time Split";let d=document.createElement("i");d.className="material-icons trash-icon",d.textContent="delete",d.style.display="inline",d.addEventListener("click",(function(){if(e.removeChild(n),e.children.length<=1){let e=document.querySelector(".trash-icon");e&&(e.style.display="none")}})),n.appendChild(l),n.appendChild(i),n.appendChild(a),n.appendChild(o),n.appendChild(d),e.appendChild(n)})),chrome.storage.sync.get(["lastTimesheetData","tabName"]).then((e=>{e.lastTimesheetData?l(e.lastTimesheetData):a(),e.tabName&&(r(e.tabName),document.getElementById(e.tabName+"Tab").classList.add("active"))})),document.getElementById("clear").addEventListener("click",(function(){document.getElementById("timeSplits").innerHTML="",a();let e=document.getElementById("workHours").getElementsByTagName("input");for(let t=0;t<e.length;t++)e[t].value=""})),document.getElementById("fill").addEventListener("click",(function(t){if(i(t)){let t=d();console.log("data",t),chrome.storage.sync.set({lastTimesheetData:t}),chrome.tabs.query({active:!0,currentWindow:!0},(n=>{chrome.tabs.sendMessage(n[0].id,{action:e.D.FILL_SCHEDULE,data:t})}))}})),document.getElementById("save").addEventListener("click",(function(e){if(i(e)){let e=d();chrome.storage.sync.set({timesheetData:e}).then((()=>{alert("Your timesheet data has been saved!")}))}})),document.getElementById("load").addEventListener("click",(function(){chrome.storage.sync.get(["timesheetData"]).then((e=>{e.timesheetData&&(document.getElementById("timeSplits").innerHTML="",l(e.timesheetData))}))})),document.getElementById("analyze").addEventListener("click",(function(){chrome.tabs.query({active:!0,currentWindow:!0},(t=>{chrome.tabs.sendMessage(t[0].id,{action:e.D.ANALYZE}).then((e=>{console.log("response",e),function(e){let t=document.getElementById("analyzerResults");t.innerHTML="";let n=document.createElement("table");n.className="analysis-table";let l=document.createElement("tr"),a=document.createElement("th");a.textContent="Project",l.appendChild(a),a=document.createElement("th"),a.textContent="Hours",l.appendChild(a),a=document.createElement("th"),a.textContent="Percentage",l.appendChild(a),n.appendChild(l);for(let t in e.hoursByProject){let l=document.createElement("tr"),a=document.createElement("td");a.textContent=t,l.appendChild(a),a=document.createElement("td"),a.textContent=e.hoursByProject[t].toFixed(2),l.appendChild(a),a=document.createElement("td"),a.textContent=100*(e.hoursByProject[t]/e.total).toFixed(2)+"%",l.appendChild(a),n.appendChild(l)}if(e.otherHours>0){let t=document.createElement("tr"),l=document.createElement("td");l.textContent="Other",t.appendChild(l),l=document.createElement("td"),l.textContent=e.otherHours,t.appendChild(l),n.appendChild(t)}let i=document.createElement("tr"),o=document.createElement("td");o.textContent="Total",i.appendChild(o),o=document.createElement("td"),o.textContent=(e.total+e.otherHours).toFixed(),i.appendChild(o),n.appendChild(i),t.appendChild(n)}(e.data)}))}))})),document.getElementById("timeFillerTab").addEventListener("click",(function(e){r("timeFiller"),e.target.classList.add("active")})),document.getElementById("analyzerTab").addEventListener("click",(function(e){r("analyzer"),e.target.classList.add("active")}))})()})();