import { EarlyCloseDates } from "./earlyClose.js";
import { HOLIDAYS } from "./holidays.js";
import { HOURS_DATA_SELECTORS } from "./hoursDataSelectors.js";
("use strict");
const IFRAME_ID = "ptifrmtgtframe";
const HOURS_FIELD_ID_SELECTOR = "QTY_DAY";
const TIME_REPORTING_CODE_ID_SELECTOR = "TRC";
const BUSINESS_UNIT_ID_SELECTOR = "BUSINESS_UNIT_PC";
const PROJECT_ID_SELECTOR = "PROJECT_ID";
const DESC_SELECTOR = "DESCR";
const ACTIVITY_ID_SELECTOR = "ACTIVITY_ID";
const HOME_TIME_REPORTING_CODE = "WFH";
const OFFICE_TIME_REPORTING_CODE = "REG";
const PTO_TIME_REPORTING_CODE = "PTO";
const HOLIDAY_TIME_REPORTING_CODE = "PHOL";
const EARLY_CLOSE_TIME_REPORTING_CODE = "ERCLS";
const ROW_ID_SELECTOR = "trTR_WEEKLY_GRID$0_row";
const DAY_COLUMN_ID_SELECTOR = "PSLEVEL1GRIDCOLUMNHDR";
const DAYS_IN_WEEK = 7;
let _doc = null;
let _data = null;
let currentRow = 0;
let homeHoursRows = 0;
let officeHoursRows = 0;
let ptoHoursRows = 0;

const daysMap = {
  Sunday: 1,
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5,
  Friday: 6,
  Saturday: 7,
};

const columnHeaderDaysMap = {
  Sun: true,
  Mon: true,
  Tue: true,
  Wed: true,
  Thu: true,
  Fri: true,
  Sat: true,
};

const columnHeaderDaysToDayOfWeekMap = {
  Sun: "Sunday",
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

let holidaysInWeek = [];
let earlyCloseDaysInWeek = [];

function getIFrameDoc() {
  let iframe = document.getElementById(IFRAME_ID);
  return iframe.contentDocument || iframe.contentWindow.document;
}

function safeConvertStringToNumber(str) {
  return Number(str === "" ? 0 : str);
}

function getTimeSplitPercentage(row) {
  return Number(_data.timeSplits[row % 2].timeSplit / 100);
}

function getTimeSplitBusinessUnitCode(row) {
  return _data.timeSplits[row % 2].businessUnit;
}

function getTimeSplitTimeCode(row) {
  return _data.timeSplits[row % 2].timeCode;
}

function getTimeSplitActivity(row) {
  return _data.timeSplits[row % 2].activity;
}

function round(num) {
  return Math.round(num * 100) / 100;
}

export function doFill(data) {
  console.log("doing fill..");
  _doc = getIFrameDoc();
  _data = data;
  let workweek = _data.workWeek;
  let homeHours = workweek.filter(
    (workday) =>
      safeConvertStringToNumber(workday[HOURS_DATA_SELECTORS.homeHours]) > 0
  );
  if (homeHours.length > 0) {
    homeHoursRows = _data.timeSplits.length;
    console.log("homeHoursRows: ", homeHoursRows);
  } else {
    homeHoursRows = 0;
  }
  let officeHours = workweek.filter(
    (workday) =>
      safeConvertStringToNumber(workday[HOURS_DATA_SELECTORS.officeHours]) > 0
  );
  if (officeHours.length > 0) {
    officeHoursRows = _data.timeSplits.length;
    console.log("officeHoursRows: ", officeHoursRows);
  } else {
    officeHoursRows = 0;
  }
  let ptoHours = workweek.filter(
    (workday) =>
      safeConvertStringToNumber(workday[HOURS_DATA_SELECTORS.ptoHours]) > 0
  );
  if (ptoHours.length > 0) {
    ptoHoursRows = 1;
  } else {
    ptoHoursRows = 0;
  }

  let rowCount = getRowCount();
  let holidayRows = countNeededHolidayRows();
  let earlyCloseRows = countNeededEarlyCloseRows();
  console.log("Holiday rows: ", holidayRows);
  console.log("Holidays in week: ", holidaysInWeek);
  console.log("Early close rows: ", earlyCloseRows);
  console.log("Early close days in week: ", earlyCloseDaysInWeek);
  let neededRowCount =
    homeHoursRows +
    officeHoursRows +
    ptoHoursRows +
    holidayRows +
    earlyCloseRows;

  console.log("rowCount: ", rowCount, " neededRowCount: ", neededRowCount);
  console.log(
    "homeHours: ",
    homeHours,
    " officeHours: ",
    officeHours,
    " ptoHours: ",
    ptoHours
  );

  if (rowCount < neededRowCount) {
    alert(`You need to have ${neededRowCount} row(s), then fill again.`);
    return;
  }

  clearCells(rowCount);
  for (let i = 0; i < homeHoursRows; i++) {
    doFillHelper(
      homeHours,
      i,
      HOME_TIME_REPORTING_CODE,
      HOURS_DATA_SELECTORS.homeHours
    );
  }
  currentRow += homeHoursRows;
  for (let i = 0; i < officeHoursRows; i++) {
    doFillHelper(
      officeHours,
      i,
      OFFICE_TIME_REPORTING_CODE,
      HOURS_DATA_SELECTORS.officeHours
    );
  }
  currentRow += officeHoursRows;
  for (let i = 0; i < ptoHoursRows; i++) {
    doFillHolidayOrPtoHelper(
      ptoHours,
      i,
      PTO_TIME_REPORTING_CODE,
      HOURS_DATA_SELECTORS.ptoHours
    );
  }
  currentRow += ptoHoursRows;
  for (let i = 0; i < holidaysInWeek.length; i++) {
    doFillHolidayOrPtoHelper(
      [holidaysInWeek[i]],
      i,
      HOLIDAY_TIME_REPORTING_CODE,
      HOURS_DATA_SELECTORS.holidayHours
    );
  }
  currentRow += holidayRows;
  for (let i = 0; i < earlyCloseDaysInWeek.length; i++) {
    doFillHolidayOrPtoHelper(
      [earlyCloseDaysInWeek[i]],
      i,
      EARLY_CLOSE_TIME_REPORTING_CODE,
      HOURS_DATA_SELECTORS.earlyCloseHours
    );
  }
  currentRow += earlyCloseRows;
  if (rowCount > neededRowCount && neededRowCount === currentRow) {
    while (currentRow < rowCount) {
      doFillExtraRowsHelper();
      currentRow++;
    }
  }

  currentRow = 0; // reset the current row
  holidaysInWeek = []; // reset the holidays in the week
  holidayRows = 0;
  earlyCloseDaysInWeek = []; // reset the holidays in the week
  earlyCloseRows = 0;
}

function getDateColumnHeaders() {
  let dayColumnHeaders = Array.from(
    _doc.getElementsByClassName(DAY_COLUMN_ID_SELECTOR)
  ).filter((col) => columnHeaderDaysMap[col.innerText.split("\n")[0]]);
  const dateTexts = dayColumnHeaders.map((col) => col.innerText.split("\n")[1]);
  const dayOfWeekTexts = dayColumnHeaders.map(
    (col) => col.innerText.split("\n")[0]
  );
  return { dateTexts, dayOfWeekTexts, dayColumnHeaders };
}

function countNeededHolidayRows() {
  let holidayRows = 0;
  const { dateTexts, dayOfWeekTexts, dayColumnHeaders } =
    getDateColumnHeaders();
  console.log(
    "In count needed holiday rows... dateTexts: ",
    dateTexts,
    " dayOfWeekTexts: ",
    dayOfWeekTexts,
    " dayColumnHeaders: ",
    dayColumnHeaders
  );
  for (let i = 0; i < dayColumnHeaders.length; i++) {
    if (HOLIDAYS[dateTexts[i]]) {
      // if the date is a holiday
      holidayRows = 1; // only need one row for holiday
      holidaysInWeek.push({
        holidayHours: "8",
        dayOfWeek: columnHeaderDaysToDayOfWeekMap[dayOfWeekTexts[i]],
      });
    }
  }
  return holidayRows;
}

function countNeededEarlyCloseRows() {
  let earlyCloseRows = 0;
  const { dateTexts, dayOfWeekTexts, dayColumnHeaders } =
    getDateColumnHeaders();
  for (let i = 0; i < dayColumnHeaders.length; i++) {
    if (EarlyCloseDates[dateTexts[i]]) {
      // if the date is an early close day
      earlyCloseRows = 1; // only need one row for the early close
      earlyCloseDaysInWeek.push({
        earlyCloseHours: "2",
        dayOfWeek: columnHeaderDaysToDayOfWeekMap[dayOfWeekTexts[i]],
      });
    }
  }
  return earlyCloseRows;
}

function getRowCount() {
  let rows = 0;
  for (let i = 1; true; i++) {
    let row = _doc.getElementById(ROW_ID_SELECTOR + i);
    if (!row) {
      return rows;
    }
    rows++;
  }
}

function clearCells(rowCount) {
  for (let i = 0; i < rowCount; i++) {
    for (let j = 1; j <= DAYS_IN_WEEK; j++) {
      let hoursField = _doc.getElementById(
        HOURS_FIELD_ID_SELECTOR + j + "$" + i
      );
      if (hoursField) {
        hoursField.value = "";
      }
    }
    let businessUnitField = _doc.getElementById(
      BUSINESS_UNIT_ID_SELECTOR + "$" + i
    );
    if (businessUnitField) {
      businessUnitField.value = "";
    }
    let projectField = _doc.getElementById(PROJECT_ID_SELECTOR + "$" + i);
    if (projectField) {
      projectField.value = "";
    }
    let activityField = _doc.getElementById(ACTIVITY_ID_SELECTOR + "$" + i);
    if (activityField) {
      activityField.value = "";
    }
  }
}

function doFillHelper(hours, index, timeReportingCode, dataSelector) {
  fillDaysOfWeek(
    hours,
    index + currentRow,
    dataSelector,
    getTimeSplitPercentage(index + currentRow)
  );
  fillTimeReportingCode(index + currentRow, timeReportingCode);
  fillBusinessUnitPC(index + currentRow);
  fillProjectID(index + currentRow);
  fillActivityID(index + currentRow);
}

function doFillHolidayOrPtoHelper(
  hours,
  index,
  timeReportingCode,
  dataSelector
) {
  fillDaysOfWeek(hours, index + currentRow, dataSelector);
  fillTimeReportingCode(index + currentRow, timeReportingCode);
}

function doFillExtraRowsHelper() {
  fillBusinessUnitPC(currentRow);
  fillProjectID(currentRow);
}

function fillDaysOfWeek(workweek, rowNumber, selector, splitPercentage = 1) {
  console.log(
    "in fill days of week. workweek: ",
    workweek,
    " rowNumber: ",
    rowNumber,
    " selector: ",
    selector
  );
  for (let workday of workweek) {
    console.log("workday: ", workday);
    // exclude holiday
    if (
      (selector === HOURS_DATA_SELECTORS.officeHours ||
        selector === HOURS_DATA_SELECTORS.homeHours) &&
      holidaysInWeek.length > 0 &&
      holidaysInWeek.filter((day) => day.dayOfWeek === workday.dayOfWeek)
        .length > 0
    ) {
      console.log(
        "skipping holiday day... ",
        workday.dayOfWeek,
        " for ",
        selector,
        " hollidaysInWeek: ",
        holidaysInWeek
      );
      console.log(
        "filter expr: ",
        holidaysInWeek.filter((day) => day.dayOfWeek === workday.dayOfWeek)
          .length > 0
      );
      continue;
    }
    let hoursField = _doc.getElementById(
      HOURS_FIELD_ID_SELECTOR + daysMap[workday.dayOfWeek] + "$" + rowNumber
    );
    if (hoursField) {
      hoursField.value = String(
        round(Number(workday[selector]) * splitPercentage)
      );
    }
  }
}

function fillTimeReportingCode(rowNumber, code) {
  let timeReportingCodeField = _doc.getElementById(
    TIME_REPORTING_CODE_ID_SELECTOR + "$" + rowNumber
  );
  if (timeReportingCodeField) {
    timeReportingCodeField.value = code;
  }
}

function fillBusinessUnitPC(rowNumber) {
  let businessUnitField = _doc.getElementById(
    BUSINESS_UNIT_ID_SELECTOR + "$" + rowNumber
  );
  if (businessUnitField) {
    businessUnitField.value = getTimeSplitBusinessUnitCode(rowNumber);
  }
}

function fillProjectID(rowNumber) {
  let projectField = _doc.getElementById(PROJECT_ID_SELECTOR + "$" + rowNumber);
  if (projectField) {
    projectField.value = getTimeSplitTimeCode(rowNumber);
  }
}

function fillActivityID(rowNumber) {
  let activityField = _doc.getElementById(
    ACTIVITY_ID_SELECTOR + "$" + rowNumber
  );
  if (activityField) {
    activityField.value = getTimeSplitActivity(rowNumber);
  }
}

export function analyze() {
  console.log("Analyzing the schedule!");
  _doc = getIFrameDoc();
  let totalProjectHours = 0;
  let otherHours = 0;
  let projectToHours = {};
  let rowCount = getRowCount();
  for (let i = 0; i < rowCount; i++) {
    let projectField = _doc.getElementById(DESC_SELECTOR + "$" + i);

    if (!projectField) {
      continue;
    }

    let projectDescription = projectField.innerText.trim();

    if (!projectDescription) {
      for (let j = 1; j <= DAYS_IN_WEEK; j++) {
        let hoursField = _doc.getElementById(
          HOURS_FIELD_ID_SELECTOR + j + "$" + i
        );
        let hours = safeConvertStringToNumber(hoursField.value);
        otherHours += hours;
      }
      continue;
    }

    console.log("projectDescription: ", projectDescription);
    if (!projectToHours[projectDescription]) {
      projectToHours[projectDescription] = 0;
    }
    for (let j = 1; j <= DAYS_IN_WEEK; j++) {
      let hoursField = _doc.getElementById(
        HOURS_FIELD_ID_SELECTOR + j + "$" + i
      );
      let hours = safeConvertStringToNumber(hoursField.value);
      projectToHours[projectDescription] += hours;
      totalProjectHours += hours;
    }
  }
  return {
    total: totalProjectHours,
    hoursByProject: projectToHours,
    otherHours: otherHours,
  };
}
