const input = document.getElementById("search");
const searchBtn = document.getElementById("search-button");

input.addEventListener("keyup", () => {
  const searchText = input.value.trim().toLowerCase();
  const rows = document.getElementsByTagName("tr");
  for (let i of rows) {
    const text = i.textContent.toLowerCase();
    if (searchText.length > 0 && text.includes(searchText)) {
      i.classList.add("highlight");
      i.scrollIntoView(true);
    } else {
      if (i.classList.contains("highlight")) {
        i.classList.remove("highlight");
      }
    }
  }
});

const table = document.getElementById("display-data-table");
const option = document.getElementById("rows-count");
const headerRow = table.rows[0];
let rowCount = table.rows.length - 1;
let rowsPerPage = 10;
let currentSortColumn = null;
let currentSortOrder = "asc";

option.addEventListener("change", function () {
  rowsPerPage = option.value;
  sort(1);
});

let tr = [];

var i,
  ii,
  j = 1;

let th = headerRow.outerHTML;

let pageCount = Math.ceil(rowCount / rowsPerPage);

if (pageCount > 1) {
  for (i = j, ii = 0; i <= rowCount; i++, ii++) {
    tr[ii] = table.rows[i].outerHTML;
  }

  table.insertAdjacentHTML(
    "afterend",
    "<br><div id='buttons' class='pagination'></div>"
  );

  sort(1);
}

function sort(page) {
  var rows = th,
    s = rowsPerPage * page - rowsPerPage;
  for (i = s; i < s + rowsPerPage && i < tr.length; i++) rows += tr[i];
  table.innerHTML = rows;
  document.getElementById("buttons").innerHTML = pageButtons(pageCount, page);
}

function pageButtons(pageCount, current) {
  var prevButton = current == 1 ? "disabled" : "";
  var nextButton = current == pageCount ? "disabled" : "";
  var buttons =
    "<input type='button' value='Previous' onclick='sort(" +
    (current - 1) +
    ")' " +
    prevButton +
    ">";
  for (var i = 1; i <= pageCount; i++) {
    buttons +=
      "<input type='button' value='" + i + "' onclick='sort(" + i + ")'>";
  }
  buttons +=
    "<input type='button' value='Next' onclick='sort(" +
    (current + 1) +
    ")' " +
    nextButton +
    ">";
  return buttons;
}

function sortTable(columnIndex) {
  const dataType = getDataType(columnIndex);

  tr.sort((a, b) => {
    const valueA = getCellValue(a, columnIndex, dataType);
    const valueB = getCellValue(b, columnIndex, dataType);

    if (dataType === "numeric") {
      return valueA - valueB;
    } else {
      return valueA.localeCompare(valueB);
    }
  });

  if (currentSortColumn === columnIndex) {
    currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    tr.reverse();
  } else {
    currentSortColumn = columnIndex;
    currentSortOrder = "asc";
  }

  sort(1);
}

function getDataType(columnIndex) {
  const cell = headerRow.cells[columnIndex];
  const cellData = cell.textContent.trim();

  if (/^\d+(\.\d+)?$/.test(cellData)) {
    return "numeric";
  }

  return "text";
}

function getCellValue(rowHTML, columnIndex, dataType) {
  const tempRow = document.createElement("tr");
  tempRow.innerHTML = rowHTML;

  const cell = tempRow.cells[columnIndex];
  const cellData = cell.textContent.trim();

  if (dataType === "numeric") {
    return parseFloat(cellData);
  }

  return cellData;
}

// const table = document.getElementById("display-data-table");
// const option = document.getElementById("rows-count");
// const headerRow = table.rows[0];
// let rowCount = table.rows.length - 1;
// let rowsPerPage = 10;
// let currentSortColumn = null;
// let currentSortOrder = "asc";

// option.addEventListener("change", function () {
//   rowsPerPage = option.value;
//   sort(1);
// });

// let tr = [];

// var i,
//   ii,
//   j = 1;

// let th = headerRow.outerHTML;

// let pageCount = Math.ceil(rowCount / rowsPerPage);

// if (pageCount > 1) {
//   for (i = j, ii = 0; i <= rowCount; i++, ii++) {
//     tr[ii] = table.rows[i].outerHTML;
//   }

//   table.insertAdjacentHTML(
//     "afterend",
//     "<br><div id='buttons' class='pagination'></div>"
//   );

//   sort(1);
// }

// function sort(page) {
//   var rows = th,
//     s = rowsPerPage * page - rowsPerPage;
//   for (i = s; i < s + rowsPerPage && i < tr.length; i++) rows += tr[i];
//   table.innerHTML = rows;
//   table.insertBefore(headerRow, table.firstChild);
//   document.getElementById("buttons").innerHTML = pageButtons(pageCount, page);
// }

// function pageButtons(pageCount, current) {
//   var prevButton = current == 1 ? "disabled" : "";
//   var nextButton = current == pageCount ? "disabled" : "";
//   var buttons =
//     "<input type='button' value='Previous' onclick='sort(" +
//     (current - 1) +
//     ")' " +
//     prevButton +
//     ">";
//   for (var i = 1; i <= pageCount; i++) {
//     buttons +=
//       "<input type='button' value='" + i + "' onclick='sort(" + i + ")'>";
//   }
//   buttons +=
//     "<input type='button' value='Next' onclick='sort(" +
//     (current + 1) +
//     ")' " +
//     nextButton +
//     ">";
//   return buttons;
// }

// function sortTable(columnIndex) {
//   const dataType = getDataType(columnIndex);

//   tr.sort((a, b) => {
//     const valueA = getCellValue(a, columnIndex, dataType);
//     const valueB = getCellValue(b, columnIndex, dataType);

//     if (dataType === "numeric") {
//       return valueA - valueB;
//     } else {
//       return valueA.localeCompare(valueB);
//     }
//   });

//   if (currentSortColumn === columnIndex) {
//     currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
//     tr.reverse();
//   } else {
//     currentSortColumn = columnIndex;
//     currentSortOrder = "asc";
//   }

//   sort(1);
// }

// function getDataType(columnIndex) {
//   const cell = headerRow.cells[columnIndex];
//   const cellData = cell.textContent.trim();

//   if (/^\d+(\.\d+)?$/.test(cellData)) {
//     return "numeric";
//   }

//   return "text";
// }

// function getCellValue(rowHTML, columnIndex, dataType) {
//   const tempRow = document.createElement("tr");
//   tempRow.innerHTML = rowHTML;

//   const cell = tempRow.cells[columnIndex];
//   const cellData = cell.textContent.trim();

//   if (dataType === "numeric") {
//     return parseFloat(cellData);
//   }

//   return cellData;
// }

/*
const table = document.getElementById("display-data-table");
const option = document.getElementById("rows-count");
let rowCount = table.rows.length;
let rowsPerPage = 10;

option.addEventListener("change", function () {
  rowsPerPage = option.value;
  sort(1);
});

let tableHead = table.rows[0].firstElementChild.tagName === "th";
let tr = [];

var i,
  ii,
  j = tableHead ? 1 : 0;

let th = tableHead ? table.rows[0].outerHTML : "";

let pageCount = Math.ceil(table.rows.length / rowsPerPage);

if (pageCount > 1) {
  for (i = j, ii = 0; i < rowCount; i++, ii++) {
    tr[ii] = table.rows[i].outerHTML;
  }

  table.insertAdjacentHTML(
    "afterend",
    "<br><div id='buttons' class='pagination'></div"
  );

  sort(1);
}

function sort(page) {
  var rows = th,
    s = rowsPerPage * page - rowsPerPage;
  for (i = s; i < s + rowsPerPage && i < tr.length; i++) rows += tr[i];
  table.innerHTML = rows;
  document.getElementById("buttons").innerHTML = pageButtons(pageCount, page);
}

function pageButtons(pageCount, current) {
  var prevButton = current == 1 ? "disabled" : "";
  var nextButton = current == pageCount ? "disabled" : "";
  var buttons =
    "<input type='button' value='Previous' onclick='sort(" +
    (current - 1) +
    ")' " +
    prevButton +
    ">";
  for (var i = 1; i <= pageCount; i++) {
    buttons +=
      "<input type='button' value='" + i + "' onclick='sort(" + i + ")'>";
  }
  buttons +=
    "<input type='button' value='Next' onclick='sort(" +
    (current + 1) +
    ")' " +
    nextButton +
    ">";
  return buttons;
}

// sorting table functionality

let currentSortColumn = null;

function sortTable(columnIndex) {
  const dataType = getDataType(columnIndex);

  tr.sort((a, b) => {
    const valueA = getCellValue(a, columnIndex, dataType);
    const valueB = getCellValue(b, columnIndex, dataType);

    if (dataType === "numeric") {
      return valueA - valueB;
    } else {
      return valueA.localeCompare(valueB);
    }
  });

  if (currentSortColumn === columnIndex) {
    currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    tr.reverse();
  } else {
    currentSortColumn = columnIndex;
    currentSortOrder = "asc";
  }

  sort(1);
}

function getDataType(columnIndex) {
  const firstRow = table.rows[tableHead ? 1 : 0];
  const cell = firstRow.cells[columnIndex];
  const cellData = cell.textContent.trim();

  if (/^\d+(\.\d+)?$/.test(cellData)) {
    return "numeric";
  }

  return "text";
}

function getCellValue(rowHTML, columnIndex, dataType) {
  const tempRow = document.createElement("tr");
  tempRow.innerHTML = rowHTML;

  const cell = tempRow.cells[columnIndex];
  const cellData = cell.textContent.trim();

  if (dataType === "numeric") {
    return parseFloat(cellData);
  }

  return cellData;
}
*/
