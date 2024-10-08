const Flags = [
    { name: "RESUME_IF_INTERRUPTED", flag: 1 },
    { name: "WARP_ENTRY_POINT", flag: 2 },
    { name: "JACK_ANYONE", flag: 8 },
    { name: "WARP_PED", flag: 16 },
    { name: "DONT_WAIT_FOR_VEHICLE_TO_STOP", flag: 64 },
    { name: "DONT_CLOSE_DOOR", flag: 256 },
    { name: "WARP_IF_DOOR_IS_BLOCKED", flag: 512 },
    { name: "JUMP_OUT", flag: 4096 },
    { name: "DONT_DEFAULT_WARP_IF_DOOR_BLOCKED", flag: 65536 },
    { name: "USE_LEFT_ENTRY", flag: 131072 },
    { name: "USE_RIGHT_ENTRY", flag: 262144 },
    { name: "JUST_PULL_PED_OUT", flag: 524288 },
    { name: "BLOCK_SEAT_SHUFFLING", flag: 1048576 },
    { name: "WARP_IF_SHUFFLE_LINK_IS_BLOCKED", flag: 4194304 },
    { name: "DONT_JACK_ANYONE", flag: 8388608 },
    { name: "WAIT_FOR_ENTRY_POINT_TO_BE_CLEAR", flag: 16777216 }
];

export function getVehicleTaskFlags(flags) {
    if (!flags) {
        return [];
    }

    let result = [];

    for (const flag of Flags) {
        if (flags & flag.flag) {
            result.push(flag.name);
        }
    }

    return result;
}