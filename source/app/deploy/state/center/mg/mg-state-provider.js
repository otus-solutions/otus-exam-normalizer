(function() {
  'use strict';

  angular
    .module('normalizerjs.deploy')
    .provider('normalizerjs.deploy.MinasGeraisState', Provider);

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
      name: STATE.MG,
      url: '/' + STATE.MG,
      template: '<mg-center></mg-center>'
    };
  }
}());
