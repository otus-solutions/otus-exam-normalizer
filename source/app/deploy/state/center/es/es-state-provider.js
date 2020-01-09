(function() {
  'use strict';

  angular
    .module('normalizerjs.deploy')
    .provider('normalizerjs.deploy.EspiritoSantoState', Provider);

  Provider.$inject = [
    'STATE'
  ];

  function Provider(STATE) {
    var self = this;

    self.$get = [provider];

    function provider() {
      return self;
    }

    self.state = {
      parent: STATE.HOME,
      name: STATE.ES,
      url: '/' + STATE.ES,
      template: '<es-center></es-center>'
    };
  }
}());
