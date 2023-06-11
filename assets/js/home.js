// Get the CSV file input element and the CSV file label element.
const csvFile = document.getElementById("csvFile");
const csvFileLabel = document.getElementById("csv-file-label");

// When the CSV file input element changes, update the CSV file label to show the name of the selected file.
csvFile.addEventListener("change", function () {
  // Get the file that was selected by the user.
  let file = this.files[0];

  // If a file was selected, update the CSV file label to show its name.
  if (file) {
    csvFileLabel.dataset.content = file.name;
  } else {
    // Otherwise, set the CSV file label to show the default text "Choose CSV File".
    csvFileLabel.dataset.content = "Choose CSV File";
  }
});
