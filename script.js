angular.module('test', []);

(function() {
  angular.module('test').directive('scrollToMe', scrollToMe);

  function scrollToMe() {
    return {
      scope: {
        shouldScroll: '=scrollToMe',
        direction: '@direction'
      },
      link: function(scope, element, attrs) {
        scope.$watch('shouldScroll', shouldScrollChanged);

        function shouldScrollChanged(newVal, oldVal) {
          if(newVal && !oldVal) {
            scrollIntoView();
          }
        }

        function scrollParent($element) {
          return $element.parents().filter(function() {
            return (/(auto|scroll)/).test(
              $.css(this, "overflow") + 
              $.css(this, "overflow-y") + 
              $.css(this, "overflow-x")
            );
          });
        }

        function scrollIntoView() {
          var $element = $(element);
          var elementTop = $element.position().top;
          var elementHeight = $element.height();

          var $scroller = scrollParent($element);
          var scrollerTop = $scroller.position().top;
          var scrollerHeight = $scroller.height();

          var elementBottom = elementTop + elementHeight - scrollerTop;

          if(elementTop < scrollerTop) {
            $(element)[0].scrollIntoView(true);
          } else if(elementBottom > scrollerHeight) {
            $(element)[0].scrollIntoView(false);
          }

        }
      }
    }
  }
})();





(function() {
  angular.module('test').controller('TestScrollCtrl', TestScrollCtrl);

  function TestScrollCtrl() {
    var vm = this;
    vm.items = [];
    vm.index = 0;
    vm.direction = 'up';

    vm.previous = previous;
    vm.next = next;

    function previous() {
      vm.index--;
      if(vm.index < 0) 
        vm.index = 0;
      vm.direction = 'down';
    }

    function next() {
      vm.index++;
      if(vm.index >= vm.items.length) 
        vm.index = vm.items.length - 1;
      vm.direction = 'up';
    }

    activate();

    function activate() {
      for(var i = 0; i < 20; i++) {
        vm.items.push(i + 1);
      }
    }
  }
})();






