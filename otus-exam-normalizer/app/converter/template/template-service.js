(function () {
  'use strict';

  angular
    .module('normalizerjs.converter.template')
    .service('normalizerjs.converter.template.TemplateService', Service);

  Service.$inject = [
    'normalizerjs.converter.FieldCenterService',
    'normalizerjs.converter.RowFactory',
    'normalizerjs.converter.Field'
  ];

  function Service(FieldCenterService, Row, Field) {
    var self = this;
    var requiredProperties = [
      "registrationCode",
      "aliquot",
      "solicitationNumber",
      "orderNumber",
      "itemNumber",
      "examCode",
      "examName",
      "label",
      "result",
      "requestDate",
      "collectionDate",
      "releaseDate"
    ];
    self.allTemplates = Definitions.templates;

    self.createRow = createRow;
    self.getTemplate = getTemplate;
    self.findTemplatesByFieldCenter = findTemplatesByFieldCenter;
    self.getColumn = getColumn;
    self.getValueFromSheet = getValueFromSheet;
    self.equalLastResult = equalLastResult;
    self.contains = contains;
    self.notContains = notContains;
    self.exists = exists;
    self.isEmpty = isEmpty;
    self.fillRow = fillRow;
    self.validateFieldsRule = validateFieldsRule;
    self.validateRow = validateRow;
    self.dateValueToISOString = dateValueToISOString;
    self.getFieldValue = getFieldValue;
    self.validateSimpleRules = validateSimpleRules;
    self.validateFunctionRules = validateFunctionRules;
    self.getObservation = getObservation;

    function getTemplate(sheet, availableTemplates) {
      var template = undefined;
      for (var i = 0; i < availableTemplates.length; i++) {
        var testTemplate = availableTemplates[i];
        var column = getColumn(testTemplate.templateValidations.fieldName, testTemplate);
        var isValid = false;

        for(var line = 0; line < 10; line++) {
          var value = getValueFromSheet(sheet, line, column); 
          var acceptable = testTemplate.templateValidations.acceptableValues.find(function(acceptableValue){
            if(exists(value) && value.toString){
              return acceptableValue.toString().trim() == value.toString().trim();
            } else {
              return false;
            }
          });

          if(exists(acceptable)){
            template = testTemplate;
            break;
          }
        }
        if(exists(template)) break;
      }
      return template;
    }

    function getValueFromSheet(sheet, line, column){
      return sheet[line][column];
    }

    function getColumn(fieldName, template){
      return template.fields.find(function(field){
        return field.name == fieldName;
      }).column
    }

    function equalLastResult(property, row, lastResult) {
      return lastResult && row[property].toString().trim().toUpperCase() === lastResult[property].toString().trim().toUpperCase() ? true : false;
    }

    function notContains(property, row, textArray) {
      return !contains(property, row, textArray);
    }

    function contains(property, row, textArray) {
      var value = row[property];
      var contains = false;
      
      for (var i = 0; i < textArray.length; i++) {
        var text = textArray[i];
        var re = new RegExp(text, "i");
        if (re.test(value)) {
          contains = true;
          break;
        }
      }
      return contains;
    }

    function exists(value) {
      return value !== undefined ? true : false;
    }

    function isEmpty(value) {
      return value === undefined || value === "" ? true : false;
    }

    function createRow(template, columnsArray, lastRow, lastResult, originalLine) {
      var row = Row.create();

      row.originalColumnsArray = columnsArray;
      row.originalLine = originalLine;
      row.index = lastRow ? lastRow.index + 1 : 0;
      row.countRowsAfterLastResult = lastRow ? lastRow.countRowsAfterLastResult + 1 : 0;

      fillRow(row, columnsArray, template);
      validateFieldsRule(row, lastResult);
      validateRow(row, lastResult, template);

      if(row.isResult){
        row.countRowsAfterLastResult = 0;
      }

      if(!row.isResult && !row.isNewExam && !row.isExamObservation && !row.isResultObservation){
        row.rejected = true;
        row.rejectionMessage = "N/A";
      }

      return row;
    }

    function dateValueToISOString(value, formatDate) {
      var currentYear = new Date().getFullYear().toString().substr(2, 2);

      if (formatDate.day) var day = value.substr(formatDate.day.start, formatDate.day.length);
      if (formatDate.month) var month = value.substr(formatDate.month.start, formatDate.month.length);
      if (formatDate.year) {
        var year = value.substr(formatDate.year.start, formatDate.year.length);
        if (year.length == 2) {
          year = (year > currentYear ? '19' : '20') + year;
        }
      }
      if (formatDate.hours) var hours = value.substr(formatDate.hours.start, formatDate.hours.length);
      if (formatDate.minutes) var minutes = value.substr(formatDate.minutes.start, formatDate.minutes.length);
      if (formatDate.seconds) var seconds = value.substr(formatDate.seconds.start, formatDate.seconds.length);
      if (formatDate.milliseconds) var milliseconds = value.substr(formatDate.milliseconds.start, formatDate.milliseconds.length);

      day = day || 0;
      month = month || 0;
      year = year || 0;
      hours = hours || 0;
      minutes = minutes || 0;
      seconds = seconds || 0;
      milliseconds = milliseconds || 0;

      var date = new Date(Number(year), Number(month) - 1, Number(day),
        Number(hours), Number(minutes), Number(seconds),
        Number(milliseconds));

      return date.toISOString();
    }

    function getFieldValue(field, columnsArray, template) {
      var value = columnsArray[field.column];
      if (value && field.isDate && template.formatType && template.formatType.date) {
        value = dateValueToISOString(value, template.formatType.date);
      }
      return value;
    }

    function fillRow(row, columnsArray, template) {
      var isValid = true;
      var isResult = true;

      template.fields.forEach(function (templateField) {
        var field = Field.createWithTemplateField(templateField);
        var value = getFieldValue(field, columnsArray, template);
        if (isEmpty(value)) {
          if (field.required) {
            field.isEmpty = true;
            isValid = false;
          }
          if (!isEmpty(template.valueIfUndefined)) value = template.valueIfUndefined;
        }
        field.value = value;
        row.insertField(field);
      });

      return row;
    }

    function validateSimpleRules(field, rules, row, lastResult) {
      var isValid = true;

      if (isValid && exists(rules.isEmpty)) {
        var expected = rules.isEmpty;
        var returned = field.isEmpty;
        isValid = expected === returned;
      }

      if (isValid && exists(rules.equalLastResult)) {
        var expected = rules.equalLastResult;
        var returned = equalLastResult(field.name, row, lastResult);
        isValid = expected === returned;
      }

      if (isValid && exists(rules.contains)) {
        var textArray = rules.contains;
        var returned = contains(field.name, row, textArray);
        isValid = returned;
      }

      if (isValid && exists(rules.notContains)) {
        var textArray = rules.notContains;
        var returned = notContains(field.name, row, textArray);
        isValid = returned;
      }

      return isValid;
    }

    function validateFieldsRule(row, lastResult) {
      row.fields.forEach(function (field) {
        var isValid = true;

        if (field.required && field.isEmpty) {
          row.isValid = false;
        };

        if (field.examRule) {
          isValid = validateSimpleRules(field, field.examRule, row, lastResult);
          field.examRuleApplied = true;
          field.examRuleReturn = isValid;
        }

        if (field.resultRule) {
          isValid = validateSimpleRules(field, field.resultRule, row, lastResult);
          field.resultRuleApplied = true;
          field.resultRuleReturn = isValid;
        }

        if (field.examObservationRule) {
          isValid = validateSimpleRules(field, field.examObservationRule, row, lastResult);
          field.examObservationRuleApplied = true;
          field.examObservationRuleReturn = isValid;
        }

        if (field.resultObservationRule) {
          isValid = validateSimpleRules(field, field.resultObservationRule, row, lastResult);
          field.resultObservationRuleApplied = true;
          field.resultObservationRuleReturn = isValid;
        }
      });
    }

    function validateRow(row, lastResult, template) {
      var examRuleReturn = undefined;
      var resultRuleReturn = undefined;
      var examObservationRuleReturn = undefined;
      var resultObservationRuleReturn = undefined;

      row.fields.forEach(function (field) {
        if (exists(field.examRuleReturn)) {
          if (exists(examRuleReturn)) {
            examRuleReturn = examRuleReturn ? field.examRuleReturn : false;
          } else {
            examRuleReturn = field.examRuleReturn;
          }
        }

        if (exists(field.resultRuleReturn)) {
          if (exists(resultRuleReturn)) {
            resultRuleReturn = resultRuleReturn ? field.resultRuleReturn : false;
          } else {
            resultRuleReturn = field.resultRuleReturn;
          }
        }

        if (exists(field.examObservationRuleReturn)) {
          if (exists(examObservationRuleReturn)) {
            examObservationRuleReturn = examObservationRuleReturn ? field.examObservationRuleReturn : false;
          } else {
            examObservationRuleReturn = field.examObservationRuleReturn;
          }
        }

        if (exists(field.resultObservationRuleReturn)) {
          if (exists(resultObservationRuleReturn)) {
            resultObservationRuleReturn = resultObservationRuleReturn ? field.resultObservationRuleReturn : false;
          } else {
            resultObservationRuleReturn = field.resultObservationRuleReturn;
          }
        }
      });

      if (template.rules) {
        if (template.rules.exam && (!exists(examRuleReturn) || examRuleReturn)) {
          examRuleReturn = validateFunctionRules(template.rules.exam, row, lastResult);
        }
        if (template.rules.result && (!exists(resultRuleReturn) || resultRuleReturn)) {
          resultRuleReturn = validateFunctionRules(template.rules.result, row, lastResult);
        }
        if (template.rules.examObservation && (!exists(examObservationRuleReturn) || examObservationRuleReturn)) {
          examObservationRuleReturn = validateFunctionRules(template.rules.examObservation, row, lastResult);
        }
        if (template.rules.resultObservation && (!exists(resultObservationRuleReturn) || resultObservationRuleReturn)) {
          resultObservationRuleReturn = validateFunctionRules(template.rules.resultObservation, row, lastResult);
        }
      }

      if (resultRuleReturn) {
        row.isResult = true;

        if (examRuleReturn) {
          row.isNewExam = true;
        }
      } else {
        if (examObservationRuleReturn) {
          row.isExamObservation = true;
          if (template.rules && template.rules.examObservation) {
            var observationRule = template.rules.examObservation;
            row.observation = getObservation(observationRule, row, lastResult);
          }
        }
        else if (resultObservationRuleReturn) {
          row.isResultObservation = true;
          if (template.rules && template.rules.resultObservation) {
            var observationRule = template.rules.resultObservation;
            row.observation = getObservation(observationRule, row, lastResult);
          }
        }
      }
    }

    function getObservation(observationRule, row, lastResult){
      var observation = "";
      if(observationRule.observationFromTheField){
        observation = row[observationRule.observationFromTheField];
      } else if(observationRule.getObservation){
        observation = observationRule.getObservation(row, lastResult);
      }
      return observation;
    }

    function validateFunctionRules(rules, row, lastResult) {
      var isValid = false;
      if (rules.otherValidation) {
        isValid = rules.otherValidation(row, lastResult);
      }
      return isValid;
    }

    function findTemplatesByFieldCenter(fieldCenter) {
      var acronym = fieldCenter.acronym;
      var availableTemplates = [];
      var fieldCenterDefinition = FieldCenterService.getFieldCenterByAcronym(fieldCenter.acronym);

      availableTemplates = self.allTemplates.filter(function (template) {
        return (
          fieldCenterDefinition.templates.filter(function (centerTemplate) {
            return (
              centerTemplate.template === template.template
              && centerTemplate.version === template.version
            );
          }).length
        );
      });

      return availableTemplates;
    }

    return self;
  }
}());