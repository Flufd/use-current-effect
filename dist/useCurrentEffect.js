"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useCurrentEffect(callback, deps) {
    var effectState = { isCurrent: true };
    react_1.useEffect(function () {
        var cleanup = callback(effectState);
        return function () {
            effectState.isCurrent = false;
            cleanup && cleanup();
        };
    }, deps);
}
exports.useCurrentEffect = useCurrentEffect;
//# sourceMappingURL=useCurrentEffect.js.map