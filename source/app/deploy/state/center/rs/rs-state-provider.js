(function () {
  'use strict';

  angular
    .module('normalizerjs.deploy')
    .provider('normalizerjs.deploy.RioGrandeDoSulState', Provider);

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
      name: STATE.RS,
      url: '/' + STATE.RS,
      template: '<rs-center></rs-center>'
    };
  }
}());