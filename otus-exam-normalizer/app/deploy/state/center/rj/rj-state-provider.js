(function() {
  'use strict';

  angular
    .module('normalizerjs.deploy')
    .provider('normalizerjs.deploy.RioDeJaneiroState', Provider);

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
      name: STATE.RJ,
      url: '/' + STATE.RJ,
      templateUrl: 'app/ux-component/center/rj/rj-template.html'
    };
  }
}());
