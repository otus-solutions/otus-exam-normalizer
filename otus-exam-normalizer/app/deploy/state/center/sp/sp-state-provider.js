(function () {
  'use strict';

  angular
    .module('normalizerjs.deploy')
    .provider('normalizerjs.deploy.SaoPauloState', Provider);

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
      name: STATE.SP,
      url: '/' + STATE.SP,
      templateUrl: 'app/ux-component/center/sp/sp-template.html'
    };
  }
}());
