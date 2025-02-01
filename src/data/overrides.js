// These overrides are based on research and testing
export function applyNativeOverrides(native) {
    switch (native.name) {
        case 'SetFacialIdleAnimOverride':
            native.parameters[2].type = 'boolean';

            break;
        case 'SetTrailerLegsLowered':
            native.parameters = [
                {
                    name: 'trailer',
                    type: 'vehicle'
                }
            ];

            break;
    }

    return native;
}
