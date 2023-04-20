module.exports = [
	// Bad natives
	{
		"regex": /(?<=\b)GetPlayerPed\s*\(\s*(-1|0)?\s*\)/g,
		"message": "Use PlayerPedId() instead of $0",
		"replace": "PlayerPedId()",
		"type": "warning"
	},
	{
		"regex": /(?<=\b)GetDistanceBetweenCoords/g,
		"message": "Use #(vector1 - vector2) instead of $0",
		"type": "warning"
	},
	{
		"regex": /(?<=\b)RegisterServerEvent(?=\s*\()/g,
		"message": "Use RegisterNetEvent instead of $0",
		"replace": "RegisterNetEvent",
		"type": "warning"
	},
	{
		"regex": /(?<=\b)RegisterClientEvent(?=\s*\()/g,
		"message": "Use RegisterNetEvent instead of $0",
		"replace": "RegisterNetEvent",
		"type": "warning"
	},
	{
		"regex": /(?<=\b)(Citizen\.)?Wait\s*\(\s*1\s*\)/g,
		"message": "Use Citizen.Wait(0) to wait for the next tick instead of $0",
		"replace": "Citizen.Wait(0)",
		"type": "warning"
	},

	// Bad practices
	{
		"regex": /(?<=\b)NetworkRequestControlOf(Entity|NetworkId)(?=\s*\()/g,
		"message": "You should avoid forcing network ownership of entities",
		"type": "notice"
	},
	{
		"regex": /(?<=\b)DestroyAllCams(?=\s*\()/g,
		"message": "Each script should manage its own cameras and destroy them using DestroyCam"
	}
].map((entry, index) => {
	entry.id = `k${index + 1}`;

	return entry;
});
