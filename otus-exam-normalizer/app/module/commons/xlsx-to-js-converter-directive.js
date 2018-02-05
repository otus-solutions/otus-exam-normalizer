//provavelmente usado por todos os centros que entregam resultados em formato xlsx
//só aplicando o exemplo do README do conversor
//o serviço faz o mesmo

(function () {
  angular
    .module(normalizerjs.commons)
    .directive(importSheetJs, directive);

  function directive() {
    return {
      scope: {},
      link: function ($scope, $elm, $attrs) {
        $elm.on('change', function (changeEvent) {
          var reader = new FileReader();

          reader.onload = function (e) {
            /* read workbook */
            var bstr = e.target.result;
            var workbook = XLSX.read(bstr, {type: 'binary'});

            /* DO SOMETHING WITH workbook HERE */
          };

          reader.readAsBinaryString(changeEvent.target.files[0]);
        });
      }
    };
  }
}());
