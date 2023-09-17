module.exports = [
	// Bad natives
	{
		"func": "GetPlayerPed",
		"args": /^(0|-1)?$/m,
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
		"func": "Vdist",
		"message": "Use #(vector1 - vector2) instead of Vdist",
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
		"args": /^([1-9]|[1-4][0-9])$/m,
		"message": "You should avoid waiting less than 50ms and use 0 to wait one tick instead",
		"replace": "Citizen.Wait(0)",
		"type": "warning"
	},
	{
		"func": "Citizen.Wait",
		"args": /^\d+\.\d+$/m,
		"message": "Citizen.Wait expects an integer, what you are doing is literally a sin",
		"replace": "Citizen.Wait(0)",
		"type": "warning"
	},

	// Bad practices
	{
		"func": "NetworkRequestControlOfEntity",
		"message": "You should avoid forcing network ownership of entities"
	},
	{
		"func": "NetworkRequestControlOfNetworkId",
		"message": "You should avoid forcing network ownership of entities"
	},
	{
		"func": "SetNetworkIdCanMigrate",
		"message": "You should avoid forcing network ownership of entities"
	},
	{
		"func": "DestroyAllCams",
		"message": "Each script should manage its own cameras and destroy them using DestroyCam"
	},

	// Clean code
	{
		"func": "Wait",
		"message": "Use Citizen.Wait instead of just Wait",
		"replace": "Citizen.Wait",
		"type": "warning"
	},
	{
		"func": "SetTimeout",
		"message": "Use Citizen.SetTimeout instead of just SetTimeout",
		"replace": "Citizen.SetTimeout",
		"type": "warning"
	},
	{
		"func": "CreateThreadNow",
		"message": "Use Citizen.CreateThreadNow instead of just CreateThreadNow",
		"replace": "Citizen.CreateThreadNow",
		"type": "warning"
	},
	{
		"func": "CreateThread",
		"message": "Use Citizen.CreateThread instead of just CreateThread",
		"replace": "Citizen.CreateThread",
		"type": "warning"
	}
].map((entry, index) => {
	entry.id = `k${index + 1}`;

	return entry;
});
