var template = {
  fieldCenter: { acronym: "SP" },
  template: "bioquimica-urina-sp",
  version: "1.0.0",
  fileType: "Bioquímica de Úrina - SP",

  outTemplate: "OTUS-EXAM-NORMALIZER",
  outTemplateVersion: "1.0.0",

  formatDate: {
    day: { start: 0, end: 1 },
    month: { start: 3, end: 4 },
    year: { start: 6, end: 7 },
    hour: { start: 9, end: 10 },
    minutes: { start: 12, end: 13 }
    //TODO: Implement 'formatString' in the Future
    //formatString: "dd/MM/yy hh:mm"
  },

  templateValidations: [
    {
      fieldName: "examCode",
      acceptableValues: [111100, 111130]
    }
  ],

  header: {
    row: 2,
    headers: ["Matrícula", "Nome do Paciente", "Nº Solicitação", "Nº Pedido", "Nº Item Pedido", "Cód.  Exame", "Nome do Exame", "Rótulo", "R E S U L T A D O", "Data/Hora Solicitação", "Data/Hora Coleta", "Data/Hora Liberação"]
  },

  valueIfUndefined: "",

  fields: {
    aliquot: {
      required: true,
      column: 0
    },
    patientName: {
      required: false,
      column: 1
    },
    solicitationNumber: {
      required: false,
      column: 2
    },
    orderNumber: {
      required: false,
      column: 3
    },
    itemNumber: {
      required: false,
      column: 4
    },
    examCode: {
      required: false,
      column: 5
    },
    examName: {
      required: false,
      column: 6
    },
    label: {
      required: true,
      column: 7
    },
    result: {
      required: false,
      column: 8
    },
    requestDate: {
      required: false,
      column: 9,
      isDate: true
    },
    collectionDate: {
      required: false,
      column: 10,
      isDate: true
    },
    releaseDate: {
      required: false,
      column: 11,
      isDate: true
    },
  },

  examRole: {
    rules: [
      {
        fieldsRule: [
          {
            name: "aliquot",
            equalLastResult: false
          },
          {
            name: "label",
            notContains: ["OBS", "INVALID_OBSERVATION"]
          }
        ],
        otherValidation = function(row, lastResult, lastExam){return true;}
      },
      {
        fieldsRule: [
          {
            name: "examCode",
            equalLastResult: false
          },
          {
            name: "label",
            notContains: ["OBS", "INVALID_OBSERVATION"]
          }
        ]
      }
    ]
  },

  examObservationRule: {},

  resultObservationRule: {
    rules: [
      {
        fieldsRule: [
          {
            name: "aliquot",
            equalLastResult: true
          },
          {
            name: "examName",
            equalLastResult: true
          },
          {
            name: "examCode",
            equalLastResult: true
          },
          {
            name: "label",
            contains: ["", "OBS"],
            notContains: ["INVALID_OBSERVATION"]
          },
          {
            name: "result",
            isEmpty: false,
          },
        ],
        
        valueByFieldName: "result",

        otherValidation = function(row, lastResult){ 
          //Exemplo: Valida somente 2 linhas após a linha do ultimo resuldade de exame
          return (row.rowsAfterLastResult <= 2);
        },
        getObservation = function(row, lastResult){
          //Exemplo: Concatena rótulo do resultado com a coluna resultado na linha da observação
          return lastResult.label + " - " + row.result;
        }
      }
    ]
  }
}