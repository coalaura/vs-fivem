// These overrides are based on research and testing
function nativeOverrides(native) {
    switch (native.name) {
        case 'SetFacialIdleAnimOverride':
            native.params[2].type = 'boolean';

            break;
        case 'DrawMarker':
            native.params[21].type = 'boolean';
            native.params[22].type = 'boolean';

            break;
    }

    return native;
}

module.exports = {
    nativeOverrides
};
