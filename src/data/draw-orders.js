const DrawOrders = [
    { name: "BEFORE_HUD_PRIORITY_LOW", id: 0 },
    { name: "BEFORE_HUD", id: 1 },
    { name: "BEFORE_HUD_PRIORITY_HIGH", id: 2 },
    { name: "AFTER_HUD_PRIORITY_LOW", id: 3 },
    { name: "AFTER_HUD", id: 4 },
    { name: "AFTER_HUD_PRIORITY_HIGH", id: 5 },
    { name: "AFTER_FADE_PRIORITY_LOW", id: 6 },
    { name: "AFTER_FADE", id: 7 },
    { name: "AFTER_FADE_PRIORITY_HIGH", id: 8 }
];

export function getScriptGfxDrawOrderName(id) {
    const order = DrawOrders.find(order => order.id === id);

    return order ? order.name : false;
}