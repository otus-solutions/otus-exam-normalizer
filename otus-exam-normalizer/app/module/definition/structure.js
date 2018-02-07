
var row = {
  aliquot: "",
  patientName: "",
  solicitationNumber: "",
  orderNumber: "",
  itemNumber: "",
  examCode: "",
  examName: "",
  label: "",
  result: "",
  requestDate: "",
  collectionDate: "",
  releaseDate: "",

  isResult: true,
  isNewExam: true,
  isObservation: false,
  observationValue: "",
  rejected: false,
  rejectionMessage: "",

  index: 0,
  rowsAfterLastResult: 1
}


var file = {
  fileName: "arquivo.xlsx",
  realizationDate: new Date().toISOString(),
  fieldCenter: {acronym: "SP"},

  lastResult: undefined,
  rows: []

}