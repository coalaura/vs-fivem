const VehicleWheelTypes = [
    { id: 0, name: "VWT_SPORT" },
    { id: 1, name: "VWT_MUSCLE" },
    { id: 2, name: "VWT_LOWRIDER" },
    { id: 3, name: "VWT_SUV" },
    { id: 4, name: "VWT_OFFROAD" },
    { id: 5, name: "VWT_TUNER" },
    { id: 6, name: "VWT_BIKE" },
    { id: 7, name: "VWT_HIEND" },
    { id: 8, name: "VWT_SUPERMOD1" },
    { id: 9, name: "VWT_SUPERMOD2" },
    { id: 10, name: "VWT_SUPERMOD3" },
    { id: 11, name: "VWT_SUPERMOD4" },
    { id: 12, name: "VWT_SUPERMOD5" }
];

export function getVehicleWheelTypeName(id) {
    const wheelType = VehicleWheelTypes.find(wheelType => wheelType.id === id);

    return wheelType ? wheelType.name : false;
}