// Get references to DOM elements
const input = document.getElementById("search"); // Input field for search
const searchBtn = document.getElementById("search-button"); // Search button
const table = document.getElementById("display-data-table"); // Table element
const option = document.getElementById("rows-count"); // Select element for rows count
const headerRow = table.rows[0]; // Header row of the table

// Variables for pagination and sorting
let rowCount = table.rows.length - 1; // Number of rows in the table excluding header
let rowsPerPage = 10; // Number of rows to display per page
let currentSortColumn = null; // Index of the currently sorted column (null if not sorted)
let currentSortOrder = "asc"; // Current sort order ("asc" for ascending, "desc" for descending)

// Add event listener for search input
input.addEventListener("keyup", () => {
  const searchText = input.value.trim().toLowerCase(); // Get trimmed and lowercase search text
  const rows = document.getElementsByTagName("tr"); // Get all table rows

  // Iterate over each row and highlight or remove highlight based on search text
  for (let i of rows) {
    const text = i.textContent.toLowerCase(); // Get lowercase text content of the row
    if (searchText.length > 0 && text.includes(searchText)) {
      i.classList.add("highlight"); // Add "highlight" class to the row if search text matches
      i.scrollIntoView(true); // Scroll the row into view
    } else {
      if (i.classList.contains("highlight")) {
        i.classList.remove("highlight"); // Remove "highlight" class if search text doesn't match
      }
    }
  }
});

// Add event listener for rows count selection
option.addEventListener("change", function () {
  rowsPerPage = option.value; // Update the number of rows per page
  sort(1); // Sort and display the first page
});

// Array to store table row HTML
let tr = [];

// Variables for pagination
let i,
  ii,
  j = 1;
let th = headerRow.outerHTML; // Outer HTML of the header row
let pageCount = Math.ceil(rowCount / rowsPerPage); // Calculate the total number of pages

// Create table rows HTML for pagination if there are more than one page
if (pageCount > 1) {
  for (i = j, ii = 0; i <= rowCount; i++, ii++) {
    tr[ii] = table.rows[i].outerHTML; // Store the outer HTML of each row except the header
  }

  table.insertAdjacentHTML(
    "afterend",
    "<br><div id='buttons' class='pagination'></div>" // Insert pagination buttons after the table
  );

  sort(1); // Sort and display the first page
}

// Sort the table and update the display based on the page
function sort(page) {
  var rows = th,
    s = rowsPerPage * page - rowsPerPage;
  for (i = s; i < s + rowsPerPage && i < tr.length; i++) {
    rows += tr[i]; // Append the HTML of each row to the sorted HTML
  }
  table.innerHTML = rows; // Update the table with the sorted rows HTML
  document.getElementById("buttons").innerHTML = pageButtons(pageCount, page); // Update the pagination buttons
}

// Generate pagination buttons HTML
function pageButtons(pageCount, current) {
  var prevButton = current == 1 ? "disabled" : "";
  var nextButton = current == pageCount ? "disabled" : "";
  var buttons =
    "<input type='button' value='Previous' onclick='sort(" +
    (current - 1) +
    ")' " +
    prevButton +
    ">";

  // Generate buttons for each page
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

// Sort the table when a column header is clicked
function sortTable(columnIndex) {
  const dataType = getDataType(columnIndex); // Determine the data type of the column

  // Sort the rows based on the column values and data type
  tr.sort((a, b) => {
    const valueA = getCellValue(a, columnIndex, dataType);
    const valueB = getCellValue(b, columnIndex, dataType);

    if (dataType === "numeric") {
      return valueA - valueB;
    } else {
      return valueA.localeCompare(valueB);
    }
  });

  // Reverse the order if the same column is clicked again
  if (currentSortColumn === columnIndex) {
    currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    tr.reverse();
  } else {
    currentSortColumn = columnIndex;
    currentSortOrder = "asc";
  }

  sort(1); // Sort and display the first page
}

// Determine the data type of a column based on the header cell content
function getDataType(columnIndex) {
  const cell = headerRow.cells[columnIndex]; // Get the header cell of the column
  const cellData = cell.textContent.trim(); // Get trimmed text content of the header cell

  if (/^\d+(\.\d+)?$/.test(cellData)) {
    return "numeric"; // Return "numeric" if the cell content matches a numeric pattern
  }

  return "text"; // Return "text" for any other data type
}

// Get the value of a cell in a row based on the column index and data type
function getCellValue(rowHTML, columnIndex, dataType) {
  const tempRow = document.createElement("tr"); // Create a temporary row element
  tempRow.innerHTML = rowHTML; // Set the row HTML to the temporary row

  const cell = tempRow.cells[columnIndex]; // Get the cell of the specified column
  const cellData = cell.textContent.trim(); // Get trimmed text content of the cell

  if (dataType === "numeric") {
    return parseFloat(cellData); // Parse the cell data as a float for numeric data type
  }

  return cellData; // Return the cell data as is for text data type
}
