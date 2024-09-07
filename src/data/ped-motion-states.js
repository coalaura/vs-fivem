const PedMotionStates = [
    {name: "MS_NONE", hash: -294553821},
    {name: "MS_IDLE", hash: -1871534317},
    {name: "MS_WALK", hash: -668482597},
    {name: "MS_RUN", hash: -530524},
    {name: "MS_SPRINT", hash: -1115154469},
    {name: "MS_CROUCH_IDLE", hash: 1140525470},
    {name: "MS_CROUCH_WALK", hash: 147004056},
    {name: "MS_CROUCH_RUN", hash: 898879241},
    {name: "MS_DONOTHING", hash: 247561816},
    {name: "MS_ANIMATEDVELOCITY", hash: 1427811395},
    {name: "MS_INVEHICLE", hash: -1797663347},
    {name: "MS_AIMING", hash: 1063765679},
    {name: "MS_DIVING_IDLE", hash: 1212730861},
    {name: "MS_DIVING_SWIM", hash: -1855028596},
    {name: "MS_SWIMMING_TREADWATER", hash: -776007225},
    {name: "MS_DEAD", hash: 230360860},
    {name: "MS_STEALTH_IDLE", hash: 1110276645},
    {name: "MS_STEALTH_WALK", hash: 69908130},
    {name: "MS_STEALTH_RUN", hash: -83133983},
    {name: "MS_PARACHUTING", hash: -1161760501},
    {name: "MS_ACTIONMODE_IDLE", hash: -633298724},
    {name: "MS_ACTIONMODE_WALK", hash: -762290521},
    {name: "MS_ACTIONMODE_RUN", hash: 834330132},
    {name: "MS_JETPACK", hash: 1398696542}
];

export function getPedMotionStateName(hash) {
	const state = PedMotionStates.find(state => state.hash === hash);

	return state ? state.name : false;
}