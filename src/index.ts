import { initLogging1, initLogging2 } from './log/InitLogging';
import { test } from './test/test';
import { CustomWindow } from './types/common';

(function () {
  initLogging1();
  initLogging2();
})();

export { initLogging1, initLogging2, test };

if (typeof window !== 'undefined') {
  (window as CustomWindow).test = test;
  (window as CustomWindow).initLogging1 = initLogging1;
  (window as CustomWindow).initLogging2 = initLogging2;
  // add more if you initialize functions and wanna call like this "functionName();" not "window.functionName();"
}
