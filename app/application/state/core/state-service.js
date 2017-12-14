(function () {
  'use strict';

  angular
    .module('normalizerjs.application.state')
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


    // self.activateErrorOffline = activateErrorOffline;

    function activateHome() {
      $state.go(STATE.HOME);
    }

    function activateSaoPaulo() {
      $state.go(STATE.SP_NORMALIZER);
    }

    function activateRioGrandeDoSul() {
      $state.go(STATE.RS_NORMALIZER);
    }

    function activateEspiritoSanto() {
      $state.go(STATE.ES_NORMALIZER);
    }

    function activateBahia() {
      $state.go(STATE.BA_NORMALIZER);
    }

    function activateRioDeJaneiro() {
      $state.go(STATE.RJ_NORMALIZER);
    }

    function activateMinasGerais() {
      $state.go(STATE.MG_NORMALIZER);
    }

    function getCurrentState() {
      return $state.current.name;
    }

    function setCurrentState(to) {
      $state.go(to);
    }

  }
}());
