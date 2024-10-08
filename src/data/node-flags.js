const NodeFlags = [
    { name: "INCLUDE_SWITCHED_OFF_NODES", flag: 1 },
    { name: "INCLUDE_BOAT_NODES", flag: 2 },
    { name: "IGNORE_SLIPLANES", flag: 4 },
    { name: "IGNORE_SWITCHED_OFF_DEADENDS", flag: 8 },
    { name: "GET_HEADING", flag: 256 },
    { name: "FAVOUR_FACING", flag: 512 }
];

export function getVehicleNodeFlags(flags) {
    if (!flags) {
        return [];
    }

    let result = [];

    for (const flag of NodeFlags) {
        if (flags & flag.flag) {
            result.push(flag.name);
        }
    }

    return result;
}