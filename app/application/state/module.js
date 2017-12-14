// (function() {
//   'use strict';

//   angular
//     .module('normalizerjs.application.state', [])
//     .run(Run);

//   Run.$inject = [
//     'STATE',
//     '$rootScope',
//     '$injector',
//     '$state'
//   ];

//   function Run(STATE, $rootScope, $injector, $state) {
//     $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
//       if (toState.data && toState.data.redirect) {
//         $injector
//           .invoke(toState.data.redirect)
//           .then(function(redirectTo) {
//             event.preventDefault();
//             if (redirectTo) {
//               $state.go(redirectTo);
//             }
//           });

//       }
//     });

//     $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
//       evt.preventDefault();
//       console.error(error.message);
//       if (error.redirectTo) {
//         $state.go(error.redirectTo);
//       } else {
//         $state.go('error', {
//           status: error.status
//         });
//       }
//     });
//   }

// }());
