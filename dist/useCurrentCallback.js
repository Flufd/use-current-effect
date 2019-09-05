"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useCurrentCallback(callbackFactory, deps) {
    var state = { isCurrent: true };
    react_1.useEffect(function () {
        return function () {
            state.isCurrent = false;
        };
    }, deps);
    return react_1.useCallback(callbackFactory(state), deps);
}
exports.useCurrentCallback = useCurrentCallback;
//# sourceMappingURL=useCurrentCallback.js.map