import { InitLogging1, InitLogging2 } from './log/InitLogging';
import { test } from './test/test';

(function () {
  InitLogging1();
  InitLogging2();
})();

export { InitLogging1, InitLogging2, test };
