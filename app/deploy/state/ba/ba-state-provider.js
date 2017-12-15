(function() {
  'use strict';

  angular
    .module('normalizerjs.deploy')
    .provider('normalizerjs.deploy.BahiaState', Provider);

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
      name: STATE.BA,
      url: '/' + STATE.BA,
      templateUrl: 'app/ux-component/ba/ba-template.html'
    };
  }
}());
