(function () {
  'use strict';

  angular
    .module('normalizerjs.converter')
    .factory('normalizerjs.converter.FileStructureFactory', Factory);

  Factory.$inject = [
    'normalizerjs.converter.RowFactory',
    'normalizerjs.converter.TemplateService'
  ];

  function Factory(Row, TemplateService) {
    var self = this;
    self.create = create;
    self.fromJson = fromJson;

    function create() {
      return new FileStructure(Row, TemplateService, {});
    }

    function fromJson(fileInfo) {
      return new FileStructure(Row, TemplateService, fileInfo);
    }

    return self;
  }

  function FileStructure(Row, TemplateService, fileInfo) {
    var self = this;
    
    var availableTemplates = [];
    var template;
    var fieldCenter = fileInfo.fieldCenter || undefined;
    
    self.fileName = fileInfo.fileName || '';
    self.realizationDate = fileInfo.realizationDate || new Date().toISOString();
    self.template = fileInfo.template || '';

    self.lastResult = fileInfo.lastResult || '';
    self.rows = Row.fromJson(fileInfo.rows);
    
    self.objectType = 'FileStructure';
    
    self.findLastResult = findLastResult;
    self.getFieldCenter = getFieldCenter;
    self.setFieldCenter = setFieldCenter;
    self.toJSON = toJSON;

    _onInit();

    function _onInit() {
      _inicializeFields()  
    }

    function _inicializeFields(){
      if(fieldCenter && fieldCenter.acronym){
        findAvailableTemplates(fieldCenter);
      }
      findLastResult();
    }

    function setFieldCenter(parmFieldCenter){
      fieldCenter = parmFieldCenter;
      findAvailableTemplates(fieldCenter);
    }

    function getFieldCenter(){
      return fieldCenter;
    }

    function findLastResult(){
      var lastResult = undefined;

      if(self.rows && self.rows.length){
        var rowsResults = self.rows.filter(function(row){
          return row.isResult === true;
        });

        lastResult = rowsResults[rowsResults.length - 1];
      }

      self.lastResult = lastResult;
    }

    function findAvailableTemplates(fieldCenter){
      availableTemplates = TemplateService.findTemplatesByFieldCenter(fieldCenter);
    }

    function findTemplate(sheet) {
      if(!availableTemplates || !availableTemplates.length) findAvailableTemplates(fieldCenter);
      if(template) template = TemplateService.getTemplate(sheet, availableTemplates);
    }

    function createRow(columnsArray) {
      var row = TemplateService.createRow(template, columnsArray, self.rows[self.rows.length]);
      insertRow(row);
    }

    function insertRow(row){
      self.rows.push(row);
    }

    function toJSON() {
      var json = {
        self
      };

      return json;
    }
  }
}());


