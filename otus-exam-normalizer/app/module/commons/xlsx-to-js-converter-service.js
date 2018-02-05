//alternativa à diretiva. pode ser mais fácil de usar, visto que temos só um botão disponível para o centro.

(function () {
  'use strict';

  angular
    .module('normalizerjs.commons')
    .service('XlsxToJsConverter', service);

  function service() {
    var self = this;

    self.convert = convert;


    function convert(files) {
      var reader = new FileReader();

      reader.onload = function (e) {
        /* read workbook */
        var bstr = e.target.result;
        var workbook = XLSX.read(bstr, {type: 'binary'});

        /* DO SOMETHING WITH workbook HERE */
      };

      reader.readAsBinaryString(files[0]);
    }
  }
}());