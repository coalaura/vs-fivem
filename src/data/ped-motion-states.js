const PedMotionStates = [
    { name: 'MotionState_None', hash: -294553821 },
    { name: 'MotionState_Idle', hash: -1871534317 },
    { name: 'MotionState_Walk', hash: -668482597 },
    { name: 'MotionState_Run', hash: -530524 },
    { name: 'MotionState_Sprint', hash: -1115154469 },
    { name: 'MotionState_Crouch_Idle', hash: 1140525470 },
    { name: 'MotionState_Crouch_Walk', hash: 147004056 },
    { name: 'MotionState_Crouch_Run', hash: 898879241 },
    { name: 'MotionState_DoNothing', hash: 247561816 },
    { name: 'MotionState_AnimatedVelocity', hash: 1427811395 },
    { name: 'MotionState_InVehicle', hash: -1797663347 },
    { name: 'MotionState_Aiming', hash: 1063765679 },
    { name: 'MotionState_Diving_Idle', hash: 1212730861 },
    { name: 'MotionState_Diving_Swim', hash: -1855028596 },
    { name: 'MotionState_Swimming_TreadWater', hash: -776007225 },
    { name: 'MotionState_Dead', hash: 230360860 },
    { name: 'MotionState_Stealth_Idle', hash: 1110276645 },
    { name: 'MotionState_Stealth_Walk', hash: 69908130 },
    { name: 'MotionState_Stealth_Run', hash: -83133983 },
    { name: 'MotionState_Parachuting', hash: -1161760501 },
    { name: 'MotionState_ActionMode_Idle', hash: -633298724 },
    { name: 'MotionState_ActionMode_Walk', hash: -762290521 },
    { name: 'MotionState_ActionMode_Run', hash: 834330132 },
    { name: 'MotionState_Jetpack', hash: 1398696542 },
];

export function getPedMotionStateName(hash) {
	const state = PedMotionStates.find(state => state.hash === hash);

	return state ? state.name : false;
}