const ForceTypes = [
    { name: "APPLY_TYPE_FORCE", id: 0 },
    { name: "APPLY_TYPE_IMPULSE", id: 1 },
    { name: "APPLY_TYPE_EXTERNAL_FORCE", id: 2 },
    { name: "APPLY_TYPE_EXTERNAL_IMPULSE", id: 3 },
    { name: "APPLY_TYPE_TORQUE", id: 4 },
    { name: "APPLY_TYPE_ANGULAR_IMPULSE", id: 5 }
];

export function getForceTypeName(id) {
    const type = ForceTypes.find(type => type.id === id);

    return type ? type.name : false;
}