export default {
	// Bad natives
	'GetPlayerPed': {
		'match': args => {
			if (args.length !== 1) return false;

			return args[0] === '-1' || args[0] === '0';
		},
		'message': 'Use PlayerPedId instead of GetPlayerPed.',
		'type': 'warning'
	},
	'GetDistanceBetweenCoords': {
		'message': 'Use #(vector1 - vector2) instead of GetDistanceBetweenCoords.',
		'type': 'warning'
	},
	'Vdist': {
		'message': 'Use #(vector1 - vector2) instead of Vdist.',
		'type': 'warning'
	},
	'RegisterServerEvent': {
		'message': 'Use RegisterNetEvent instead of RegisterServerEvent.',
		'replace': 'RegisterNetEvent',
		'type': 'warning'
	},
	'RegisterClientEvent': {
		'message': 'Use RegisterNetEvent instead of RegisterClientEvent.',
		'replace': 'RegisterNetEvent',
		'type': 'warning'
	},
	'Citizen.Wait': {
		'match': args => {
			if (args.length !== 1) return false;

			const arg = parseInt(args[0]);

			return arg && arg <= 50 && arg >= 1;
		},
		'message': 'You should avoid waiting less than ~50ms and use 0 to wait one tick instead.',
		'type': 'warning'
	},

	// Bad practices
	'NetworkRequestControlOfEntity': {
		'message': 'You should avoid forcing network ownership of entities.'
	},
	'NetworkRequestControlOfNetworkId': {
		'message': 'You should avoid forcing network ownership of entities.'
	},
	'SetNetworkIdCanMigrate': {
		'message': 'You should avoid forcing network ownership of entities.'
	},
	'DestroyAllCams': {
		'message': 'Each script should manage its own cameras and destroy them using DestroyCam.'
	},

	// Clean code
	'Wait': {
		'message': 'Use Citizen.Wait instead of just Wait.',
		'replace': 'Citizen.Wait($0)',
		'type': 'warning'
	},
	'SetTimeout': {
		'message': 'Use Citizen.SetTimeout instead of just SetTimeout.',
		'replace': 'Citizen.SetTimeout($0)',
		'type': 'warning'
	},
	'CreateThreadNow': {
		'message': 'Use Citizen.CreateThreadNow instead of just CreateThreadNow.',
		'replace': 'Citizen.CreateThreadNow($0)',
		'type': 'warning'
	},
	'CreateThread': {
		'message': 'Use Citizen.CreateThread instead of just CreateThread.',
		'replace': 'Citizen.CreateThread($0)',
		'type': 'warning'
	}
};
