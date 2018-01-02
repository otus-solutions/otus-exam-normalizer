(function () {
  'use strict';

  angular
    .module('normalizerjs.states')
    .service('normalizerjs.application.state.ApplicationStateService', Service);

  Service.$inject = [
    'STATE',
    '$state'
  ];

  function Service(STATE, $state) {
    var self = this;

    /* Public Interface */
    self.activateHome = activateHome;
    self.activateSaoPaulo = activateSaoPaulo;
    self.activateRioGrandeDoSul = activateRioGrandeDoSul;
    self.activateEspiritoSanto = activateEspiritoSanto;
    self.activateBahia = activateBahia;
    self.activateRioDeJaneiro = activateRioDeJaneiro;
    self.activateMinasGerais = activateMinasGerais;
    self.setCurrentState = setCurrentState;


    // self.activateErrorOffline = activateErrorOffline;

    function activateHome() {
      $state.go(STATE.HOME);
    }

    function activateSaoPaulo() {
      $state.go(STATE.SP);
    }

    function activateRioGrandeDoSul() {
      $state.go(STATE.RS);
    }

    function activateEspiritoSanto() {
      $state.go(STATE.ES);
    }

    function activateBahia() {
      $state.go(STATE.BA);
    }

    function activateRioDeJaneiro() {
      $state.go(STATE.RJ);
    }

    function activateMinasGerais() {
      $state.go(STATE.MG);
    }

    function getCurrentState() {
      return $state.current.name;
    }

    function setCurrentState(to) {
      $state.go(to);
    }

  }
}());
