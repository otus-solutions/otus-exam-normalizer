(function() {
  'use strict';

  angular
    .module('normalizerjs.deploy')
    .provider('normalizerjs.deploy.HomeState', Provider);

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
      name: STATE.HOME,
      url: '/' + STATE.HOME,
      templateUrl: 'app/ux-component/home/home.html',
      controller: 'normalizerjs.uxComponent.HomeController as $ctrl'
    };
  }
}());
