const csvFile = document.getElementById("csvFile");
const csvFileLabel = document.getElementById("csv-file-label");

csvFile.addEventListener("change", function () {
  let file = this.files[0];
  if (file) {
    csvFileLabel.dataset.content = file.name;
  } else {
    csvFileLabel.dataset.content = "Choose CSV File";
  }
});
