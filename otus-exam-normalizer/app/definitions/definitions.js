var Definitions = {};
Definitions.templates = [];
Definitions.fieldCenterList = [];

Definitions.fieldCenterList = [
  {
    name: "Bahia",
    acronym: "BA",
    code: 1,
    templates: [],
    fileFormats: []
  },
  {
    name: "Espírito Santo",
    acronym: "ES",
    code: 2,
    templates: [],
    fileFormats: []
  },
  {
    acronym: "MG",
    name: "Minas Gerais",
    code: 3,
    templates: [],
    fileFormats: []
  },
  {
    name: "Rio de Janeiro",
    acronym: "RJ",
    code: 4,
    templates: [],
    fileFormats: []
  },
  {
    name: "Rio Grande do Sul",
    acronym: "RS",
    code: 5,
    templates: [],
    fileFormats: []
  },
  {
    acronym: "SP",
    name: "São Paulo",
    code: 6,
    templates: [
      {
        template: "bioquimica-urina-sp",
        version: "1.0.0"
      },
      {
        template: "glicemia-jejum-sp",
        version: "1.0.0"
      }
    ],
    fileFormats: ["xls", "xlsx"]
  }
];

Definitions.templates = [
  {
    template: "bioquimica-urina-sp",
    version: "1.0.0",
    fileType: "Bioquímica de Úrina - SP",
    fieldCenter: { acronym: "SP" },

    outTemplate: "OTUS-EXAM-NORMALIZER",
    outTemplateVersion: "1.0.0",

    formatType: {
      date: {
        day: { start: 0, length: 2 },
        month: { start: 3, length: 2 },
        year: { start: 6, length: 2 },
        hours: { start: 9, length: 2 },
        minutes: { start: 12, length: 2 }
      },
    },

    templateValidations: {
      fieldName: "examCode",
      acceptableValues: [111000, 111100, 111130]
    },

    header: {
      row: 2,
      headers: ["Matrícula", "Nome do Paciente", "Nº Solicitação", "Nº Pedido", "Nº Item Pedido", "Cód.  Exame", "Nome do Exame", "Rótulo", "R E S U L T A D O", "Data/Hora Solicitação", "Data/Hora Coleta", "Data/Hora Liberação"]
    },

    valueIfUndefined: "",

    fields: [
      {
        name: "registrationCode",
        column: 0,
        rules: {
          result: {
            isEmpty: false,
          }
        }
      },
      {
        name: "aliquot",
        column: 1,
        required: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "solicitationNumber",
        column: 2,
      },
      {
        name: "orderNumber",
        column: 3,
      },
      {
        name: "itemNumber",
        column: 4,
      },
      {
        name: "examCode",
        column: 5,
        required: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "examName",
        column: 6,
        required: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "label",
        column: 7,
        required: true,
        rules: {
          result: {
            isEmpty: false,
            notContains: ["eTFG para afro-descendentes", "eTFG para não afro-descendentes"]
          }
        }

      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "requestDate",
        column: 9,
        required: false,
        isDate: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "collectionDate",
        column: 10,
        required: false,
        isDate: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "releaseDate",
        column: 11,
        required: true,
        isDate: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      }
    ],

    rules: {
      exam: {
        otherValidation: function (row, lastResult) {
          return (!lastResult ||
            (
              row.aliquot !== lastResult.aliquot
              || row.examCode !== lastResult.examCode
            )
          ) ? true : false;
        }
      }
    }
  },

  {
    template: "glicemia-jejum-sp",
    version: "1.0.0",
    fileType: "Glicemia jejum (SP)",
    fieldCenter: { acronym: "SP" },

    outTemplate: "OTUS-EXAM-NORMALIZER",
    outTemplateVersion: "1.0.0",

    formatType: {
      date: {
        day: { start: 0, length: 2 },
        month: { start: 3, length: 2 },
        year: { start: 6, length: 2 },
        hours: { start: 9, length: 2 },
        minutes: { start: 12, length: 2 }
      },
    },

    templateValidations: {
      fieldName: "examCode",
      acceptableValues: [110010]
    },

    header: {
      row: 2,
      headers: ["Matrícula", "Nome do Paciente", "Nº Solicitação", "Nº Pedido", "Nº Item Pedido", "Cód.  Exame", "Nome do Exame", "Rótulo", "R E S U L T A D O", "Data/Hora Solicitação", "Data/Hora Coleta", "Data/Hora Liberação"]
    },

    valueIfUndefined: "",

    fields: [
      {
        name: "registrationCode",
        column: 0,
        rules: {
          result: {
            isEmpty: false,
          }
        }
      },
      {
        name: "aliquot",
        column: 1,
        required: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "solicitationNumber",
        column: 2,
      },
      {
        name: "orderNumber",
        column: 3,
      },
      {
        name: "itemNumber",
        column: 4,
      },
      {
        name: "examCode",
        column: 5,
        required: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "examName",
        column: 6,
        required: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "label",
        column: 7,
        required: true,
        rules: {
          result: {
            isEmpty: false,
            notContains: ["eTFG para afro-descendentes", "eTFG para não afro-descendentes"]
          }
        }

      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "requestDate",
        column: 9,
        required: false,
        isDate: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "collectionDate",
        column: 10,
        required: false,
        isDate: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      },
      {
        name: "releaseDate",
        column: 11,
        required: true,
        isDate: true,
        rules: {
          result: {
              isEmpty: false,
          }
        },
      }
    ],

    rules: {
      exam: {
        otherValidation: function (row, lastResult) {
          return (!lastResult ||
            (
              row.aliquot !== lastResult.aliquot
              || row.examCode !== lastResult.examCode
            )
          ) ? true : false;
        }
      }
    }
  }
];

window.Definitions = Definitions;