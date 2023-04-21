module.exports = [
	// Bad natives
	{
		"func": "GetPlayerPed",
		"args": [
			"-1",
			"0",
			""
		],
		"message": "Use PlayerPedId instead of GetPlayerPed",
		"replace": "PlayerPedId()",
		"type": "warning"
	},
	{
		"func": "GetDistanceBetweenCoords",
		"message": "Use #(vector1 - vector2) instead of GetDistanceBetweenCoords",
		"type": "warning"
	},
	{
		"func": "RegisterServerEvent",
		"message": "Use RegisterNetEvent instead of RegisterServerEvent",
		"replace": "RegisterNetEvent",
		"type": "warning"
	},
	{
		"func": "RegisterClientEvent",
		"message": "Use RegisterNetEvent instead of RegisterClientEvent",
		"replace": "RegisterNetEvent",
		"type": "warning"
	},
	{
		"func": "Citizen.Wait",
		"args": [
			"1"
		],
		"message": "Use Citizen.Wait(0) to wait for the next tick instead of Citizen.Wait(1)",
		"replace": "Citizen.Wait(0)",
		"type": "warning"
	},

	// Bad practices
	{
		"func": "NetworkRequestControlOfEntity",
		"message": "You should avoid forcing network ownership of entities",
		"type": "notice"
	},
	{
		"func": "NetworkRequestControlOfNetworkId",
		"message": "You should avoid forcing network ownership of entities",
		"type": "notice"
	},
	{
		"func": "DestroyAllCams",
		"message": "Each script should manage its own cameras and destroy them using DestroyCam"
	}
].map((entry, index) => {
	entry.id = `k${index + 1}`;

	return entry;
});
