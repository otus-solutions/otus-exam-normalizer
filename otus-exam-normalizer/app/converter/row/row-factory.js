//TODO: Implementanar...

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

  fieldsRequiredfilled: true,
  isResult: true,
  isNewExam: true,
  isObservation: false,
  observation: "",
  rejected: false,
  rejectionMessage: "",

  originalColumnsArray: [],

  index: 0,
  rowsAfterLastResult: 1 //Position After lastResult
}