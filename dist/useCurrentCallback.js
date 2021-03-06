"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useCurrentCallback(callbackFactory, deps) {
    var isCurrent = true;
    var currentCheck = function () { return isCurrent; };
    react_1.useEffect(function () { return function () {
        isCurrent = false;
    }; }, deps);
    return react_1.useCallback(callbackFactory(currentCheck), deps);
}
exports.useCurrentCallback = useCurrentCallback;
//# sourceMappingURL=useCurrentCallback.js.map