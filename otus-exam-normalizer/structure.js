var fieldCenterDefinitions = {
  acronym: "SP",
  templates: [
    {
      template: "bioquimica-urina-sp",
      version: "1.0.0"
    },
    {
      template: "glicemia-jejum-sp",
      version: "1.0.0"
    }
  ]
}



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


var file = {
  fileName: "arquivo.xlsx",
  realizationDate: new Date().toISOString(),
  fieldCenter: {acronym: "SP"},
  template = undefined;

  lastResult: undefined,
  rows: []
}