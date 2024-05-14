// document.getElementById('clickme').addEventListener('click', function() {
//     chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, {action: "logSomething"});
//   });
//   });

import { messages } from "./messages";

document.getElementById("addTimeSplit").addEventListener("click", function () {
  let timeSplits = document.getElementById("timeSplits");

  let trashIcons = document.getElementsByClassName("trash-icon");
  for (let i = 0; i < trashIcons.length; i++) {
    trashIcons[i].style.display = "inline";
  }

  let newInputRow = document.createElement("div");
  newInputRow.className = "input-row";

  let newBusinessUnit = document.createElement("input");
  newBusinessUnit.type = "text";
  newBusinessUnit.name = "businessUnit";
  newBusinessUnit.placeholder = "Business Unit";
  newBusinessUnit.addEventListener("input", function () {
    newBusinessUnit.value = newBusinessUnit.value.toUpperCase();
  });

  let newActivity = document.createElement("input");
  newActivity.type = "text";
  newActivity.name = "activity";
  newActivity.placeholder = "Activity";
  newActivity.addEventListener("input", function () {
    newActivity.value = newActivity.value.toUpperCase();
  });

  let newTimeCode = document.createElement("input");
  newTimeCode.type = "text";
  newTimeCode.name = "timeCode";
  newTimeCode.placeholder = "Time Code";
  newTimeCode.addEventListener("input", function () {
    newTimeCode.value = newTimeCode.value.toUpperCase();
  });

  let newTimeSplit = document.createElement("input");
  newTimeSplit.type = "number";
  newTimeSplit.name = "timeSplit";
  newTimeSplit.placeholder = "Time Split";

  let trashIcon = document.createElement("i");
  trashIcon.className = "material-icons trash-icon";
  trashIcon.textContent = "delete";
  trashIcon.style.display = "inline";
  trashIcon.addEventListener("click", function () {
    timeSplits.removeChild(newInputRow);
    if (timeSplits.children.length <= 1) {
      let remainingTrashIcon = document.querySelector(".trash-icon");
      if (remainingTrashIcon) {
        remainingTrashIcon.style.display = "none";
      }
    }
  });

  newInputRow.appendChild(newBusinessUnit);
  newInputRow.appendChild(newTimeCode);
  newInputRow.appendChild(newActivity);
  newInputRow.appendChild(newTimeSplit);
  newInputRow.appendChild(trashIcon);
  timeSplits.appendChild(newInputRow);
});

function displayWorkHours(data, day) {
  let hours = data.find((element) => element.dayOfWeek === day);
  document.getElementById("homeHours" + day).value = hours.homeHours;
  document.getElementById("officeHours" + day).value = hours.officeHours;
  document.getElementById("ptoHours" + day).value = hours.ptoHours;
}

function displayData(data) {
  let timeSplits = document.getElementById("timeSplits");
  timeSplits.innerHTML = "";
  for (let i = 0; i < data.timeSplits.length; i++) {
    let inputRow = document.createElement("div");
    inputRow.className = "input-row";

    let businessUnit = document.createElement("input");
    businessUnit.type = "text";
    businessUnit.name = "businessUnit";
    businessUnit.placeholder = "Business Unit";
    businessUnit.value = data.timeSplits[i].businessUnit;
    businessUnit.addEventListener("input", function () {
      console.log("input", businessUnit.value);
      businessUnit.value = businessUnit.value.toUpperCase();
    });

    let activity = document.createElement("input");
    activity.type = "text";
    activity.name = "activity";
    activity.placeholder = "Activity";
    activity.value = data.timeSplits[i].activity;
    activity.addEventListener("input", function () {
      activity.value = activity.value.toUpperCase();
    });

    let timeCode = document.createElement("input");
    timeCode.type = "text";
    timeCode.name = "timeCode";
    timeCode.placeholder = "Time Code";
    timeCode.value = data.timeSplits[i].timeCode;
    timeCode.addEventListener("input", function () {
      timeCode.value = timeCode.value.toUpperCase();
    });

    let timeSplit = document.createElement("input");
    timeSplit.type = "number";
    timeSplit.name = "timeSplit";
    timeSplit.placeholder = "Time Split";
    timeSplit.value = data.timeSplits[i].timeSplit;

    let trashIcon = document.createElement("i");
    trashIcon.className = "material-icons trash-icon";
    trashIcon.textContent = "delete";
    trashIcon.style.display = "inline";
    trashIcon.addEventListener("click", function () {
      timeSplits.removeChild(inputRow);
      if (timeSplits.children.length <= 1) {
        let remainingTrashIcon = document.querySelector(".trash-icon");
        if (remainingTrashIcon) {
          remainingTrashIcon.style.display = "none";
        }
      }
    });

    inputRow.appendChild(businessUnit);
    inputRow.appendChild(timeCode);
    inputRow.appendChild(activity);
    inputRow.appendChild(timeSplit);
    inputRow.appendChild(trashIcon);
    timeSplits.appendChild(inputRow);
  }

  displayWorkHours(data.workWeek, "Sunday");
  displayWorkHours(data.workWeek, "Monday");
  displayWorkHours(data.workWeek, "Tuesday");
  displayWorkHours(data.workWeek, "Wednesday");
  displayWorkHours(data.workWeek, "Thursday");
  displayWorkHours(data.workWeek, "Friday");
  displayWorkHours(data.workWeek, "Saturday");
}

function displayInitial() {
  let firstInputRow = document.createElement("div");
  firstInputRow.className = "input-row";

  let firstBusinessUnit = document.createElement("input");
  firstBusinessUnit.type = "text";
  firstBusinessUnit.name = "businessUnit";
  firstBusinessUnit.placeholder = "Business Unit";
  firstBusinessUnit.addEventListener("input", function () {
    firstBusinessUnit.value = firstBusinessUnit.value.toUpperCase();
  });

  let firstActivity = document.createElement("input");
  firstActivity.type = "text";
  firstActivity.name = "activity";
  firstActivity.placeholder = "Activity";
  firstActivity.addEventListener("input", function () {
    firstActivity.value = firstActivity.value.toUpperCase();
  });

  let firstTimeCode = document.createElement("input");
  firstTimeCode.type = "text";
  firstTimeCode.name = "timeCode";
  firstTimeCode.placeholder = "Time Code";
  firstTimeCode.addEventListener("input", function () {
    firstTimeCode.value = firstTimeCode.value.toUpperCase();
  });

  let firstTimeSplit = document.createElement("input");
  firstTimeSplit.type = "number";
  firstTimeSplit.name = "timeSplit";
  firstTimeSplit.placeholder = "Time Split";

  let trashIcon = document.createElement("i");
  trashIcon.className = "material-icons trash-icon";
  trashIcon.textContent = "delete";
  trashIcon.style.display = "none";
  trashIcon.addEventListener("click", function () {
    timeSplits.removeChild(firstInputRow);
    if (timeSplits.children.length <= 1) {
      let remainingTrashIcon = document.querySelector(".trash-icon");
      if (remainingTrashIcon) {
        remainingTrashIcon.style.display = "none";
      }
    }
  });

  firstInputRow.appendChild(firstBusinessUnit);
  firstInputRow.appendChild(firstTimeCode);
  firstInputRow.appendChild(firstActivity);
  firstInputRow.appendChild(firstTimeSplit);
  firstInputRow.appendChild(trashIcon);
  document.getElementById("timeSplits").appendChild(firstInputRow);
}

// get timesheet data from chrome storage
chrome.storage.sync.get(["lastTimesheetData", "tabName"]).then((result) => {
  if (result.lastTimesheetData) {
    displayData(result.lastTimesheetData);
  } else {
    displayInitial();
  }

  if (result.tabName) {
    openTab(result.tabName);
    document.getElementById(result.tabName + "Tab").classList.add("active");
  }
});

document.getElementById("clear").addEventListener("click", function () {
  let timeSplits = document.getElementById("timeSplits");
  timeSplits.innerHTML = "";
  displayInitial();

  let workHours = document.getElementById("workHours");
  let inputs = workHours.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
});

function validateData(event) {
  let timeSplits = document.querySelectorAll('input[name="timeSplit"]');
  let sum = 0;
  for (let i = 0; i < timeSplits.length; i++) {
    sum += Number(timeSplits[i].value);
  }
  if (sum !== 100) {
    event.preventDefault();
    alert("The sum of all Time Splits must be 100");
    return false;
  }

  // all of the inputs in timeSplits must have a value
  let timeSplitsInput = document
    .getElementById("timeSplits")
    .querySelectorAll("input");
  for (let i = 0; i < timeSplitsInput.length; i++) {
    if (!timeSplitsInput[i].value) {
      event.preventDefault();
      alert("All Time Split fields must have a value");
      return false;
    }
  }

  // all of the pto input values must be whole numbers
  let ptoInputs = document.getElementsByClassName("pto");
  for (let i = 0; i < ptoInputs.length; i++) {
    if ((ptoInputs[i]?.value ?? 0) % 1 !== 0) {
      event.preventDefault();
      alert("PTO hours must be whole numbers");
      return false;
    }
  }

  return true;
}

function getWorkHours(day) {
  let hours = {};
  hours.homeHours = document.getElementById("homeHours" + day).value;
  hours.officeHours = document.getElementById("officeHours" + day).value;
  hours.ptoHours = document.getElementById("ptoHours" + day).value;
  hours.dayOfWeek = day;
  return hours;
}

function formatData() {
  let data = {};
  data.timeSplits = [];
  data.workWeek = [];
  let timeSplits = document.querySelectorAll('input[name="timeSplit"]');
  let timeCodes = document.querySelectorAll('input[name="timeCode"]');
  let activities = document.querySelectorAll('input[name="activity"]');
  let businessUnits = document.querySelectorAll('input[name="businessUnit"]');
  for (let i = 0; i < timeSplits.length; i++) {
    data.timeSplits.push({
      timeSplit: timeSplits[i].value,
      timeCode: timeCodes[i].value,
      activity: activities[i].value,
      businessUnit: businessUnits[i].value,
    });
  }
  data.workWeek.push(getWorkHours("Sunday"));
  data.workWeek.push(getWorkHours("Monday"));
  data.workWeek.push(getWorkHours("Tuesday"));
  data.workWeek.push(getWorkHours("Wednesday"));
  data.workWeek.push(getWorkHours("Thursday"));
  data.workWeek.push(getWorkHours("Friday"));
  data.workWeek.push(getWorkHours("Saturday"));

  return data;
}

document.getElementById("fill").addEventListener("click", function (event) {
  if (validateData(event)) {
    let data = formatData();
    console.log("data", data);
    chrome.storage.sync.set({ lastTimesheetData: data });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: messages.FILL_SCHEDULE,
        data: data,
      });
    });
  }
});

document.getElementById("save").addEventListener("click", function (event) {
  if (validateData(event)) {
    let data = formatData();
    chrome.storage.sync.set({ timesheetData: data }).then(() => {
      alert("Your timesheet data has been saved!");
    });
  }
});

document.getElementById("load").addEventListener("click", function () {
  chrome.storage.sync.get(["timesheetData"]).then((result) => {
    if (result.timesheetData) {
      let timeSplits = document.getElementById("timeSplits");
      timeSplits.innerHTML = "";
      displayData(result.timesheetData);
    }
  });
});

function displayAnalysis(data) {
  let analysis = document.getElementById("analyzerResults");
  analysis.innerHTML = "";
  let table = document.createElement("table");
  table.className = "analysis-table";
  let header = document.createElement("tr");
  let headerData = document.createElement("th");
  headerData.textContent = "Project";
  header.appendChild(headerData);
  headerData = document.createElement("th");
  headerData.textContent = "Hours";
  header.appendChild(headerData);
  headerData = document.createElement("th");
  headerData.textContent = "Percentage";
  header.appendChild(headerData);
  table.appendChild(header);

  for (let key in data.hoursByProject) {
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.textContent = key;
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.textContent = data.hoursByProject[key].toFixed(2);
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.textContent =
      (data.hoursByProject[key] / data.total).toFixed(2) * 100 + "%";
    row.appendChild(cell);
    table.appendChild(row);
  }

  if (data.otherHours > 0) {
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.textContent = "Other";
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.textContent = data.otherHours;
    row.appendChild(cell);
    table.appendChild(row);
  }
  
  let row = document.createElement("tr");
  let cell = document.createElement("td");
  cell.textContent = "Total";
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.textContent = (data.total + data.otherHours).toFixed();
  row.appendChild(cell);
  table.appendChild(row);
  analysis.appendChild(table);
}

document.getElementById("analyze").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs
      .sendMessage(tabs[0].id, { action: messages.ANALYZE })
      .then((response) => {
        console.log("response", response);
        displayAnalysis(response.data);
      });
  });
});

function openTab(tabName) {
  chrome.storage.sync.set({ tabName: tabName });
  let tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  let tabs = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
}

document
  .getElementById("timeFillerTab")
  .addEventListener("click", function (event) {
    openTab("timeFiller");
    event.target.classList.add("active");
  });

document
  .getElementById("analyzerTab")
  .addEventListener("click", function (event) {
    openTab("analyzer");
    event.target.classList.add("active");
  });
