var Definitions = {};
Definitions.templates = [];
Definitions.fieldCenterList = [];

Definitions.fieldCenterList = [
  {
    name: "Bahia",
    acronym: "BA",
    code: 1,
    templates: [],
    fileFormats: ["xls", "xlsx"]
  },
  {
    name: "Espírito Santo",
    acronym: "ES",
    code: 2,
    templates: [],
    fileFormats: ["xls", "xlsx"]
  },
  {
    acronym: "MG",
    name: "Minas Gerais",
    code: 3,
    templates: [],
    fileFormats: ["xls", "xlsx"]
  },
  {
    name: "Rio de Janeiro",
    acronym: "RJ",
    code: 4,
    templates: [],
    fileFormats: ["xls", "xlsx"]
  },
  {
    name: "Rio Grande do Sul",
    acronym: "RS",
    code: 5,
    templates: [],
    fileFormats: ["xls", "xlsx"]
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
      },
      {
        template: "glicemia-pos-sobrecarga-sp",
        version: "1.0.0"
      },
      {
        template: "hormonios-jejum-sp",
        version: "1.0.0"
      },
      {
        template: "insulina-pos-sp",
        version: "1.0.0"
      },
      {
        template: "pcr-sp",
        version: "1.0.0"
      },
      {
        template: "bioquimica-soro-sp",
        version: "1.0.0"
      },
      {
        template: "hba1c-sp",
        version: "1.0.0"
      },
      {
        template: "calcio-sp",
        version: "1.0.0"
      }
      /* O template de Hemograma ainda não será implementado, apenas sua estrutura será inicializada
      ,
      {
        template: "hemograma-sp",
        version: "1.0.0"
      }
      */
    ],
    fileFormats: ["xls", "xlsx"]
  }
];

/*
//The rules of the fields are divided into:
  field.rules: {
    result: {},
    exam: {},
    examObservation: {},
    resultObservation: {}
  }

//Each rule has these attributes:
  field.rules.result: {
    isEmpty: true,
    equalLastResult: false,
    contains: ['this_text'],
    notContains: ['this_other_text']
  }

//The rules of the template are divided into:
  template.rules: {
    result: {},
    exam: {},
    examObservation: {},
    resultObservation: {}
  }
//These rules have these attributes:
  template.rules.result: {
    otherValidation: function(row, lastResult) { return true; }
  }

//The Observation rules (examObservation, resultObservation) have these attributes:
  template.rules.result: {
    observationFromTheField: "aliquot",
    getObservation: function (row, lastResult) { return "observation"; }
  }
*/
Definitions.templates = [
  /* BEGIN - Template: Bioquímica de Úrina (SP) - Version: 1.0.0 */
  {
    template: "bioquimica-urina-sp",
    version: "1.0.0",
    fileType: "Bioquímica de Úrina (SP)",

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
      acceptableValues: [111000, 111100, 111130, 130520]
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
          },
          examObservation: {
            equalLastResult: true
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }
      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: Bioquímica de Úrina (SP) */
  //------------------------------------------
  /* BEGIN - Template: Glicemia Jejum (SP) - Version: 1.0.0 */
  {
    template: "glicemia-jejum-sp",
    version: "1.0.0",
    fileType: "Glicemia Jejum (SP)",

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
          },
          examObservation: {
            equalLastResult: true
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }
      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: Glicemia Jejum (SP) */
  //------------------------------------------
  /* BEGIN - Template: Glicemia Pós Sobrecarga (SP) - Version: 1.0.0 */
  {
    template: "glicemia-pos-sobrecarga-sp",
    version: "1.0.0",
    fileType: "Glicemia Pós Sobrecarga (SP)",

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
      acceptableValues: [110610]
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
          },
          examObservation: {
            equalLastResult: true
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }
      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: Glicemia Pós Sobrecarga (SP) */
  //------------------------------------------
  /* BEGIN - Template: Hormônios Jejum (SP) - Version: 1.0.0 */
  {
    template: "hormonios-jejum-sp",
    version: "1.0.0",
    fileType: "Hormônios Jejum (SP)",

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
      acceptableValues: [130530, 130010, 130020, 130500, 130540]
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
          },
          examObservation: {
            equalLastResult: true
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }
      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: Hormônios Jejum (SP) */
  //------------------------------------------
  /* BEGIN - Template: Insulina Pós (SP) - Version: 1.0.0 */
  {
    template: "insulina-pos-sp",
    version: "1.0.0",
    fileType: "Insulina Pós (SP)",

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
      acceptableValues: [130380]
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
          },
          examObservation: {
            equalLastResult: true
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }
      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: Insulina Pós (SP) */
  //------------------------------------------
  /* BEGIN - Template: PCR (SP) - Version: 1.0.0 */
  {
    template: "pcr-sp",
    version: "1.0.0",
    fileType: "PCR (SP)",

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
      acceptableValues: [130510]
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
          },
          examObservation: {
            equalLastResult: true
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }
      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: PCR (SP) */
  //------------------------------------------
  /* BEGIN - Template: Bioquímica de Soro (SP) - Version: 1.0.0 */
  {
    template: "bioquimica-soro-sp",
    version: "1.0.0",
    fileType: "Bioquímica de Soro (SP)",

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
      acceptableValues: [110050, 110060, 130560, 110160, 110170, 110200, 110260, 110750, 110280]
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:", "eTFG para afro-descendentes", "eTFG para não afro-descendentes"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }

      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: Bioquímica de Soro (SP) */
  //------------------------------------------
  /* BEGIN - Template: HbA1C (SP) - Version: 1.0.0 */
  {
    template: "hba1c-sp",
    version: "1.0.0",
    fileType: "HbA1C (SP)",

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
      acceptableValues: [110040]
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
          },
          examObservation: {
            equalLastResult: true
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }
      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: HbA1C (SP) */
  //------------------------------------------
  /* BEGIN - Template: Calcio (SP) - Version: 1.0.0 */
  {
    template: "calcio-sp",
    version: "1.0.0",
    fileType: "Calcio (SP)",

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
      acceptableValues: [110850]
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
          },
          examObservation: {
            equalLastResult: true
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }
      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: Calcio (SP) */
  //------------------------------------------
  /* BEGIN - Template: HEMOGRAMA (SP) - Version: 1.0.0 */
  // Incompleto! - Falta implementar as regras para traramento de observações de exame e de resultado
  {
    template: "hemograma-sp",
    version: "1.0.0",
    fileType: "HEMOGRAMA (SP)",

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
      acceptableValues: [120010]
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
          },
          examObservation: {
            equalLastResult: true
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
          },
          examObservation: {
            equalLastResult: true
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
            notContains: ["OBS:"]
          },
          examObservation: {
            contains: ["OBS:"]
          }
        }
      },
      {
        name: "result",
        column: 8,
        required: true,
        rules: {
          result: {
            isEmpty: false
          },
          examObservation: {
            notContains: ["Amostra acidentada"]
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
          );
        }
      },
      examObservation: {
        observationFromTheField: "result"
      }
    }
  },
  /* END - Template: HEMOGRAMA (SP) */
];

window.Definitions = Definitions;