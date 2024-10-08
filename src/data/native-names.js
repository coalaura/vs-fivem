import { getIndex } from '../singletons/native-index.js';

const NamedNatives = {
    0x108be26959a9da00: "UI3DSCENE_MAKE_PUSHED_PRESET_PERSISTENT",
    0x110f526ab7841100: "SET_PED_ENVEFF_CPV_ADD",
    0x1153fa02a6590500: "NETWORK_SESSION_SET_SCRIPT_VALIDATE_JOIN",
    0x116fb94dc4b79f00: "SC_EMAIL_SEND_EMAIL",
    0x11883f412114330: "GET_CUTSCENE_END_TIME",
    0x1216e0bfa72cc700: "REQUEST_RAGDOLL_BOUNDS_UPDATE",
    0x12ded8ca53d47f00: "SET_CUTSCENE_CAM_FAR_CLIP_THIS_UPDATE",
    0x1312ddd8385aee00: "SET_WHEELIE_ENABLED",
    0x140e6a44870a1200: "NETWORK_CLEAR_OFFLINE_INVITE_PENDING",
    0x14922ed3e3876200: "NETWORK_IS_QUEUING_FOR_SESSION_JOIN",
    0x14e0b2d1ad104500: "PLAYSTATS_JOB_LTS_ROUND_END",
    0x162c23ca83ed0a00: "UGC_DID_DESCRIPTION_REQUEST_SUCCEED",
    0x17fca7199a530200: "DISABLE_CINEMATIC_SLOW_MO_THIS_UPDATE",
    0x182f266c2d9e2c00: "SET_VEHICLE_CUSTOM_PATH_NODE_STREAMING_RADIUS",
    0x19853b5b17d77c00: "SC_COMMUNITY_EVENT_GET_DISPLAY_NAME_BY_ID",
    0x19af7ed9b9d23000: "UNHINT_AMBIENT_AUDIO_BANK",
    0x19bfed045c647c00: "GET_TENNIS_SWING_ANIM_CAN_BE_INTERRUPTED",
    0x1a330d297aac6c00: "SET_LADDER_CLIMB_INPUT_STATE",
    0x1cba05ae7bd7ee00: "SET_TRANSITION_OUT_OF_TIMECYCLE_MODIFIER",
    0x1d12a56fc95be900: "SC_COMMUNITY_EVENT_GET_EXTRA_DATA_STRING_FOR_TYPE",
    0x1d4dc17c38feb000: "IS_COMMERCE_DATA_FETCH_IN_PROGRESS",
    0x1e77fa7a62ee6c00: "GET_FM_MALE_SHOP_PED_APPAREL_ITEM_INDEX",
    0x1f2300cb7fa7b800: "IS_IN_VEHICLE_MOBILE_PHONE_CAMERA_RENDERING",
    0x2016c603d6b89800: "SET_PED_STEERS_AROUND_DEAD_BODIES",
    0x20c6c7e4eb082a00: "SET_SRL_LONG_JUMP_MODE",
    0x2107a37737711800: "HAS_CODE_REQUESTED_AUTOSAVE",
    0x211c4ef450086800: "DRAW_FRONTEND_BACKGROUND_THIS_FRAME",
    0x214cd562a9392400: "HAS_SCRIPT_HIDDEN_HELP_THIS_FRAME",
    0x21c235bc64831e00: "GET_CLOSEST_POINT_ON_LINE",
    0x225778816fdc280: "SET_GAMEPLAY_CAM_MAX_MOTION_BLUR_STRENGTH_THIS_UPDATE",
    0x22e21fbcfc88c200: "BG_GET_LAUNCH_PARAM_VALUE",
    0x2302c0264ea58e00: "NETWORK_PREVENT_SCRIPT_HOST_MIGRATION",
    0x2311dd7159f00600: "SET_VEHICLE_RESPECTS_LOCKS_WHEN_HAS_DRIVER",
    0x2369d5c8a51fdc0: "DISABLE_SCUFF_DECALS",
    0x241fca5b1aa15000: "ARE_ANY_CCS_PENDING",
    0x24e4e51fc1630600: "UGC_DID_CREATE_SUCCEED",
    0x25361a96e0f7e400: "TRIGGER_PED_SCENARIO_PANICEXITTOFLEE",
    0x2570e26be6396400: "SC_COMMUNITY_EVENT_GET_EXTRA_DATA_FLOAT_FOR_TYPE",
    0x261e97ad7bcf3e00: "NETWORK_MARK_AS_PREFERRED_ACTIVITY",
    0x265635150fb0d800: "DELAY_MP_STORE_OPEN",
    0x26d7399b9587fe00: "STAT_RESET_ALL_ONLINE_CHARACTER_STATS",
    0x26f07dd83a5f8000: "NETWORK_HAS_AUTOMUTE_OVERRIDE",
    0x271017b9ba825400: "ALLOW_MOTION_BLUR_DECAY",
    0x2735233a786b1c00: "SET_CORPSE_RAGDOLL_FRICTION",
    0x27cfb1b1e078cc00: "SET_DISABLE_PETROL_DECALS_RECYCLING_THIS_FRAME",
    0x27feb5254759ce00: "PHONEPHOTOEDITOR_SET_FRAME_TXD",
    0x283b6062a2c01e00: "NETWORK_ON_RETURN_TO_SINGLE_PLAYER",
    0x2b51edbefc301400: "NETWORK_CLAN_CREWINFO_GET_CREWRANKTITLE",
    0x2bf66d2e7414f600: "NETWORK_CAN_QUEUE_FOR_PREVIOUS_SESSION_JOIN",
    0x2c4a1590abf43e00: "SET_VEHICLE_WILL_TELL_OTHERS_TO_HURRY",
    0x2c9f302398e13200: "SET_BLIP_USE_HEIGHT_INDICATOR_ON_EDGE",
    0x2d5dc831176d0200: "UGC_IS_DESCRIPTION_REQUEST_IN_PROGRESS",
    0x2e0bf682cc778e00: "NETWORK_HAS_BONE_BEEN_HIT_BY_KILLER",
    0x2e22fefa01002800: "HAS_MENU_LAYOUT_CHANGED_EVENT_OCCURRED",
    0x2e93c796abd3aa0: "SET_RADIO_POSITION_AUDIO_MUTE",
    0x2f057596f2bd0000: "IS_STORE_PENDING_NETWORK_SHUTDOWN_TO_OPEN",
    0x2f137b508de23800: "NETWORK_SET_MOCAP_CUTSCENE_CAN_BE_SKIPPED",
    0x2f3c3d9f50681e00: "SET_TREAT_AS_AMBIENT_PED_FOR_DRIVER_LOCKON",
    0x2f7ceb6520288000: "SET_PLAYER_SPECTATED_VEHICLE_RADIO_OVERRIDE",
    0x2f7f2b26dd3f1800: "SET_FIRST_PERSON_AIM_CAM_RELATIVE_HEADING_LIMITS_THIS_UPDATE",
    0x2fa2494b47fdd000: "SET_TRAILER_ATTACHMENT_ENABLED",
    0x3001bef2feca3600: "SC_TRANSITION_NEWS_HAS_EXTRA_DATA_TU",
    0x3044240d2e0fa800: "IS_INTERPOLATING_FROM_SCRIPT_CAMS",
    0x31f924b53eade000: "SET_ONLY_ALLOW_AMMO_COLLECTION_WHEN_LOW",
    0x32a6dba562c518: "RESET_LAW_RESPONSE_DELAY_OVERRIDE",
    0x3300b57fcac6de0: "RENDER_SHADOWED_LIGHTS_WITH_NO_SHADOWS",
    0x336b3d200ab00800: "COUNT_PEDS_IN_COMBAT_WITH_TARGET_WITHIN_RADIUS",
    0x33df47cc06420600: "SC_COMMUNITY_EVENT_GET_DISPLAY_NAME_FOR_TYPE",
    0x3441cad2f2231a00: "SET_ALLOW_VEHICLE_EXPLODES_ON_CONTACT",
    0x346ef3ecaaab1400: "FREE_MEMORY_FOR_MISSION_CREATOR_PHOTO_PREVIEW",
    0x34770b9ce0e03c00: "LEADERBOARDS2_READ_GET_ROW_DATA_INFO",
    0x367ef5e2f439b400: "NETWORK_SET_PLAYER_MENTAL_STATE",
    0x36ccb9be67b97000: "ROPE_SET_SMOOTH_REELIN",
    0x36f1b38855f2a800: "SUPPRESS_WITNESSES_CALLING_POLICE_THIS_FRAME",
    0x36f6626459d91400: "CASCADE_SHADOWS_SET_SPLIT_Z_EXP_WEIGHT",
    0x38491439b6ba8000: "LEADERBOARDS2_READ_GET_ROW_DATA_FLOAT",
    0x38baaa5dd4c9d200: "SET_PROFILE_SETTING_CREATOR_DM_DONE",
    0x397baa01068baa00: "GET_STATUS_OF_MANUAL_SAVE",
    0x39917e1b4cb0fa00: "NETWORK_MARK_AS_WAITING_ASYNC",
    0x3c5c1e2c2ff81400: "NETWORK_SET_OVERRIDE_TUTORIAL_SESSION_CHAT",
    0x3e38e28a1d80de00: "IS_CONTROLLED_VEHICLE_UNABLE_TO_GET_TO_ROAD",
    0x3ea03af85a85cc0: "GET_CAN_PED_BE_GRABBED_BY_SCRIPT",
    0x3fa36981311fa400: "SET_NETWORK_ID_PASS_CONTROL_IN_TUTORIAL",
    0x4008edf7d6e48000: "SET_ALLOW_CUSTOM_VEHICLE_DRIVE_BY_CAM_THIS_UPDATE",
    0x405dc2aef6af9400: "SET_ROOM_FOR_GAME_VIEWPORT_BY_KEY",
    0x425aecf167664000: "SET_PED_SHOULD_IGNORE_SCENARIO_EXIT_COLLISION_CHECKS",
    0x430a7631a84c9c00: "SET_GROUND_EFFECT_REDUCES_DRAG",
    0x43fa0dfc5df87800: "SET_SIREN_CAN_BE_CONTROLLED_BY_AUDIO",
    0x444c4525ece0a400: "RESET_STORE_NETWORK_GAME_TRACKING",
    0x450819d8cf90c400: "SC_COMMUNITY_EVENT_IS_ACTIVE_FOR_TYPE",
    0x45e816772e93a800: "UGC_IS_MODIFYING",
    0x4669b3ed80f24c00: "SUPPRESS_LOSING_WANTED_LEVEL_IF_HIDDEN_THIS_FRAME",
    0x46b05bcae4385800: "PED_HAS_SEXINESS_FLAG_SET",
    0x46d1a61a21f56800: "SET_DECAL_BULLET_IMPACT_RANGE_SCALE",
    0x472397322e92a800: "SUPPRESS_HD_MAP_STREAMING_THIS_FRAME",
    0x4811bbac21c5fc00: "NETWORK_SESSION_SET_UNIQUE_CREW_LIMIT_TRANSITION",
    0x487912fd248efc00: "SC_PRESENCE_SET_ACTIVITY_RATING",
    0x48f069265a0e4c00: "REGISTER_TEXT_LABEL_23_TO_SAVE",
    0x49e50bdb8ba4dc00: "SET_PED_ALLOW_MINOR_REACTIONS_AS_MISSION_PED",
    0x4a7d6e727f941800: "SC_COMMUNITY_EVENT_GET_EVENT_ID_FOR_TYPE",
    0x4a9fde3a5a6d0400: "NETWORK_SET_PRESENCE_SESSION_INVITES_BLOCKED",
    0x4af92acd3141d800: "CLEAR_STATUS_OF_SORTED_LIST_OPERATION",
    0x4d02279c83be6800: "UGC_DID_QUERY_CREATORS_SUCCEED",
    0x4d953df78ebf8000: "REACTIVATE_ALL_OBJECT_BRAINS_THAT_ARE_WAITING_TILL_OUT_OF_RANGE",
    0x4d9d109f63fee000: "SET_FORCE_VEHICLE_ENGINE_DAMAGE_BY_BULLET",
    0x4df7cfff471a8000: "NETWORK_ENTITY_AREA_HAVE_ALL_REPLIED",
    0x4e52e752c76e8000: "SET_ALL_MAPDATA_CULLED",
    0x4ed9c8d6da297800: "SC_COMMUNITY_EVENT_GET_EVENT_ID",
    0x50276ef8172f6000: "SET_PED_CYCLE_VEHICLE_WEAPONS_ONLY",
    0x5068f488ddb54c00: "IPL_GROUP_SWAP_IS_ACTIVE",
    0x50a8a36201dbf800: "SC_COMMUNITY_EVENT_GET_EXTRA_DATA_FLOAT",
    0x511f1a683387c800: "GET_TRACKED_PED_PIXELCOUNT",
    0x51db102f4a3ba400: "NETWORK_ENABLE_EMPTY_CROWDING_VEHICLES_REMOVAL",
    0x5324a0e3e4ce3400: "UGC_GET_TOP_RATED_CONTENT",
    0x5407b7288d047800: "COUNT_PEDS_IN_COMBAT_WITH_TARGET",
    0x54e22ea2c1956c00: "SET_PARTICLE_FX_BANG_SCRAPE_LODRANGE_SCALE",
    0x54f157e0336a3800: "SET_TENNIS_MOVE_NETWORK_SIGNAL_FLOAT",
    0x55384438fc55ac00: "SET_PROFILE_SETTING_CREATOR_CTF_DONE",
    0x5539c3ebf104a400: "NETWORK_SESSION_SET_UNIQUE_CREW_ONLY_CREWS_TRANSITION",
    0x559ebf901a8c6800: "NETWORK_PERMISSIONS_HAS_GAMER_RECORD",
    0x55f5a5f07134e000: "DONT_ZOOM_MINIMAP_WHEN_SNIPING_THIS_FRAME",
    0x5688585e6d563c00: "STAT_SET_OPEN_SAVETYPE_IN_JOB",
    0x56eb5e94318d4000: "SET_CARGOBOB_PICKUP_MAGNET_ENSURE_PICKUP_ENTITY_UPRIGHT",
    0x57d760d55f54e000: "FORCE_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS_LIST",
    0x583049884a2ef000: "THEFEED_FORCE_RENDER_OFF",
    0x583df8e3d4afbc00: "GET_CUTSCENE_CONCAT_SECTION_PLAYING",
    0x5845066d8a1ea800: "SET_ADDITIONAL_ROTATION_FOR_RECORDED_VEHICLE_PLAYBACK",
    0x58bb377bec7cd400: "SET_VEHICLE_CONVERSATIONS_PERSIST",
    0x59328eb08c5cec00: "IS_USER_OLD_ENOUGH_TO_ACCESS_STORE",
    0x593feae1f7339400: "GET_SCREEN_CODE_WANTS_SCRIPT_TO_CONTROL",
    0x5a34cd9c3c5bec00: "UGC_RELEASE_CACHED_DESCRIPTION",
    0x5a43c76f7fc7bc00: "DISABLE_NEAR_CLIP_SCAN_THIS_UPDATE",
    0x5a556b229a169400: "STAT_COMMUNITY_START_SYNCH",
    0x5a7f62fda5975800: "SUPPRESS_AMBIENT_PED_AGGRESSIVE_CLEANUP_THIS_FRAME",
    0x5b0316762afd4c00: "GET_STATUS_OF_CREATE_MISSION_CREATOR_PHOTO_PREVIEW",
    0x5b1f2e327b6b7000: "GET_REPLAY_STAT_MISSION_ID",
    0x5c48a1d6e3b33000: "WAS_FLY_CAM_CONSTRAINED_ON_PREVIOUS_UDPATE",
    0x5e3aa4ca2b6fb000: "NETWORK_ENABLE_VOICE_BANDWIDTH_RESTRICTION",
    0x5e569ec46ec21c00: "SET_VEHICLE_NO_EXPLOSION_DAMAGE_FROM_DRIVER",
    0x5ead2bf648485400: "GET_PLAYER_HAS_DRIVEN_ALL_VEHICLES",
    0x5edef0cf8c1dac00: "CAN_USE_MOBILE_PHONE_DURING_CUTSCENE",
    0x5f6df3d92271e800: "SET_PARTICLE_FX_BLOOD_SCALE",
    0x600f8cb31c7aac00: "NETWORK_SESSION_SET_GAMEMODE",
    0x6087579e7aa85c0: "IS_TARGET_PED_IN_PERCEPTION_AREA",
    0x60edd13eb3ac2000: "NETWORK_CHECK_ROS_LINK_WENTDOWN_NOT_NET",
    0x615d3925e87a3c00: "SET_CHECKPOINT_DECAL_ROT_ALIGNED_TO_CAMERA_ROT",
    0x61cb768363d6440: "SET_ALLOW_LOCKON_TO_PED_IF_FRIENDLY",
    0x62ecfcfdee788400: "DISABLE_CINEMATIC_VEHICLE_IDLE_MODE_THIS_UPDATE",
    0x63ae2b2cc273580: "SET_SHOULD_LERP_FROM_AI_TO_FULL_RECORDING",
    0x63b406d7884bfc00: "UGC_HAS_QUERY_CREATORS_FINISHED",
    0x63eb2b972a218c00: "IPL_GROUP_SWAP_CANCEL",
    0x6462a961e94b680: "CLEAR_CODE_REQUESTED_AUTOSAVE",
    0x6483c25849031c00: "PRESENCE_EVENT_UPDATESTAT_INT_WITH_STRING",
    0x66a49d0218710000: "CLOSE_SAFEHOUSE_GARAGES",
    0x66e3aaface2d2000: "SET_OVERRIDE_VEHICLE_DOOR_TORQUE",
    0x66e7cb63c97b7c00: "CODE_WANTS_SCRIPT_TO_TAKE_CONTROL",
    0x675721c9f644d000: "SC_TRANSITION_NEWS_END",
    0x68103e2247887400: "UGC_RELEASE_ALL_CACHED_DESCRIPTIONS",
    0x690a61a6d1358400: "IS_REMOTE_PLAYER_IN_NON_CLONED_VEHICLE",
    0x699e4a5c8c893c00: "SC_COMMUNITY_EVENT_GET_EXTRA_DATA_STRING_BY_ID",
    0x6a5d89d7769a4000: "NETWORK_SET_IGNORE_SPECTATOR_CHAT_LIMITS_SAME_TEAM",
    0x6bfb12ce158e3c00: "SC_TRANSITION_NEWS_SHOW",
    0x6d6840cee8845800: "REACTIVATE_NAMED_WORLD_BRAINS_WAITING_TILL_OUT_OF_RANGE",
    0x6dee77aff8c21c00: "PLAYSTATS_CREATE_MATCH_HISTORY_ID_2",
    0x6e91b04e08773000: "REACTIVATE_NAMED_OBJECT_BRAINS_WAITING_TILL_OUT_OF_RANGE",
    0x6ebfb22d646ffc00: "SET_VEHICLE_STOP_INSTANTLY_WHEN_PLAYER_INACTIVE",
    0x6f2135b612962000: "SET_THIS_IS_A_TRIGGER_SCRIPT",
    0x6f361b8889a79400: "FORCE_CLOUD_MP_STATS_DOWNLOAD_AND_OVERWRITE_LOCAL_SAVE",
    0x6fcf8ddea146c400: "WAS_VC_WITHDRAWAL_SUCCESSFUL",
    0x6fddf453c0c75800: "HAS_GAME_INSTALLED_THIS_SESSION",
    0x701fda1e82076c00: "CLOSE_ALL_BARRIERS_FOR_RACE",
    0x702bc4d605522400: "NETWORK_SESSION_SET_CREW_LIMIT_MAX_MEMBERS_TRANSITION",
    0x705a276ebff31400: "IS_INTERPOLATING_TO_SCRIPT_CAMS",
    0x710bcda8071ee000: "SC_COMMUNITY_EVENT_GET_EXTRA_DATA_INT",
    0x71b008056e569400: "LEADERBOARDS2_READ_GET_ROW_DATA_END",
    0x71e7b2e657449c00: "IS_SAFE_TO_START_PLAYER_SWITCH",
    0x723c1ce13fbfdc00: "SET_JOB_ACTIVITY_ID_STARTED",
    0x7295c203dd659c00: "RESET_GAMEPLAY_CAM_FULL_ATTACH_PARENT_TRANSFORM_TIMER",
    0x72beccf4b8295400: "SET_CARGOBOB_EXTA_PICKUP_RANGE",
    0x733c87d4ce22c000: "DISABLE_PED_INJURED_ON_GROUND_BEHAVIOUR",
    0x741a3d8380319c00: "NETWORK_REQUEST_TO_BE_HOST_OF_THIS_SCRIPT",
    0x742b58f723234000: "NETWORK_GET_PRESENCE_INVITE_INDEX_BY_ID",
    0x759650634f07b800: "BEGIN_CREATE_LOW_QUALITY_COPY_OF_PHOTO",
    0x75ba1cb3b7d40c00: "REQUEST_PED_USE_SMALL_BBOX_VISIBILITY_TRACKING",
    0x760910b49d2b9800: "BG_SET_EXITFLAG_RESPONSE",
    0x762db2d380b48c00: "CLEAR_PICKUP_REWARD_TYPE_SUPPRESSION",
    0x78ceee41f49f4400: "SET_SHOULD_RESET_TURRET_IN_SCRIPTED_CAMERAS",
    0x793ff272d5b36400: "UGC_DID_MODIFY_SUCCEED",
    0x796a877e459b9800: "SET_POSITION_OFFSET_FOR_RECORDED_VEHICLE_PLAYBACK",
    0x79d310a861697c00: "SET_FREEMODE_STRAND_PROGRESSION_STATUS",
    0x7a42b2e236e71400: "UI3DSCENE_CLEAR_PATCHED_DATA",
    0x7ac24eab6d741000: "PHONEPHOTOEDITOR_TOGGLE",
    0x7d395ea61622e000: "NETWORK_SET_LOOK_AT_TALKERS",
    0x7d6f9a3ef2613800: "SET_VEHICLE_ALLOW_HOMING_MISSLE_LOCKON",
    0x7db53b37a2f21000: "NETWORK_GET_BONE_ID_OF_FATAL_HIT",
    0x7e6946f68a38b800: "STAT_CLOUD_SLOT_SAVE_FAILED",
    0x7eec2a316c250000: "PLAYSTATS_SECURITY_VAN_MISSION_DONE",
    0x7f2c4cdf2e82e000: "STAT_CLOUD_SLOT_LOAD_FAILED",
    0x7f8f6405f4777c00: "GET_RATIO_OF_CLOSEST_POINT_ON_LINE",
    0x7fa5d82b8f58ec00: "BEGIN_CREATE_MISSION_CREATOR_PHOTO_PREVIEW",
    0x817b86108eb95000: "SET_DESCRIPTION_FOR_UGC_MISSION_EIGHT_STRINGS",
    0x8235f1bead557800: "SET_DISABLE_PED_STAND_ON_TOP",
    0x8269816f6cfd4000: "REGISTER_TEXT_LABEL_31_TO_SAVE",
    0x829cd22e043a2800: "BG_GET_SCRIPT_ID_FROM_NAME_HASH",
    0x82ebb79e258fa000: "RETAIN_ENTITY_IN_INTERIOR",
    0x836b62713e053800: "BG_IS_EXITFLAG_SET",
    0x84de3b5fb3e66800: "IS_ROPE_ATTACHED_AT_BOTH_ENDS",
    0x851cd923176eb800: "GRAB_PAUSEMENU_OWNERSHIP",
    0x88578f6ec36b4800: "LEADERBOARDS2_READ_GET_ROW_DATA_INT",
    0x88bc673ca9e0b000: "SET_VEHICLE_USE_MORE_RESTRICTIVE_SPAWN_CHECKS",
    0x8aa9180de2fee000: "SET_VEHICLE_DISABLE_HEIGHT_MAP_AVOIDANCE",
    0x8bf907833be27800: "SET_PED_INTERIOR_WALLA_DENSITY",
    0x8cc469ab4d349800: "SC_COMMUNITY_EVENT_GET_EXTRA_DATA_INT_BY_ID",
    0x8d74e26f54b4e800: "INFORM_CODE_OF_CONTENT_ID_OF_CURRENT_UGC_MISSION",
    0x8d9df6eca8768800: "SET_SCRIPT_CAN_START_CUTSCENE",
    0x8e8eeadfd0dc480: "NETWORK_GET_CAN_TRANSFER_CASH",
    0x8ec74ceb042e8000: "LEADERBOARDS_CLEAR_CACHE_DATA_ID",
    0x91ef6ee6419e5800: "SET_FOLLOW_VEHICLE_CAM_HIGH_ANGLE_MODE_THIS_UPDATE",
    0x9237e334f6e43000: "SC_LICENSEPLATE_GET_CHECK_IS_PENDING",
    0x92da6e70ef249800: "SC_TRANSITION_NEWS_GET_EXTRA_DATA_INT_TU",
    0x933bbeeb8c61b800: "IS_SWITCH_TO_MULTI_FIRSTPART_FINISHED",
    0x94538037ee44f800: "NETWORK_SET_MINIMUM_RANK_FOR_MISSION",
    0x9465e683b12d4000: "NETWORK_SKIP_RADIO_RESET_NEXT_CLOSE",
    0x9489659372a81800: "GET_EXTRACONTENT_CLOUD_RESULT",
    0x949f397a288b2800: "SET_PARTICLE_FX_FOOT_LODRANGE_SCALE",
    0x95a7dabddbb78800: "IPL_GROUP_SWAP_START",
    0x9640e30a7f396000: "SET_VEHICLE_DAMAGE_SCALES",
    0x973d76aa760a7000: "NETWORK_TRANSITION_BLOCK_JOIN_REQUESTS",
    0x9911f4a24485f800: "SET_BLOCKING_OF_NON_TEMPORARY_EVENTS_FOR_AMBIENT_PEDS_THIS_FRAME",
    0x99cad8e7afdb6000: "FORCE_SUB_THROTTLE_FOR_TIME",
    0x9a77dfd295e29800: "TOGGLE_SCENARIO_PED_COWER_IN_PLACE",
    0x9ac92eed5e479000: "UNHINT_SCRIPT_AUDIO_BANK",
    0x9b079e5221d98800: "TRIGGER_PARTICLE_FX_EMP",
    0x9b5016a6433a6800: "NETWORK_SPEND_EARNED_FROM_BANK_AND_WALLETS",
    0x9bddc73cc6a11800: "SET_CARGOBOB_PICKUP_MAGNET_SET_AMBIENT_MODE",
    0x9becd4b9fef3f800: "SET_VEHICLE_ACT_AS_IF_HAS_SIREN_ON",
    0x9d3af56e94c9b000: "SET_HORN_PERMANENTLY_ON_TIME",
    0x9d7afcbf21c51800: "NETWORK_SET_PROXIMITY_AFFECTS_TEAM",
    0x9de5d2f723576000: "SC_COMMUNITY_EVENT_GET_EXTRA_DATA_STRING",
    0x9dfe13ecdc1ec000: "SET_FOLLOW_VEHICLE_CAM_HIGH_ANGLE_MODE_EVERY_UPDATE",
    0x9e30e91fb03a3000: "GET_MP_OUTFIT_DATA_FROM_METADATA",
    0x9e6542f0ce8e7000: "DISABLE_METRO_SYSTEM",
    0x9edd76e87d5d5000: "INCREASE_PLAYER_JUMP_SUPPRESSION_RANGE",
    0x9fedf86898f10000: "UGC_IS_CREATING",
    0xa01bc64dd4bfb800: "GET_IN_VEHICLE_CLIPSET_HASH_FOR_SEAT",
    0xa08fe5e49bdc3800: "SET_PICKUP_OBJECT_GLOW_OFFSET",
    0xa0f93d5465b30800: "LEADERBOARDS2_READ_GET_ROW_DATA_START",
    0xa213b11dff526000: "DLC_CHECK_COMPAT_PACK_CONFIGURATION",
    0xa238192f33110800: "GET_PM_PLAYER_CREW_COLOR",
    0xa2c1f5e92afe4800: "CLEAR_ALL_PICKUP_REWARD_TYPE_SUPPRESSION",
    0xa2ccbe62cd4c9000: "CELL_CAM_ACTIVATE_SHALLOW_DOF_MODE",
    0xa2e9c1ab8a92e800: "NETWORK_SET_DO_NOT_LAUNCH_FROM_JOIN_AS_MIGRATED_HOST",
    0xa3f3564a5b364800: "IS_MOBILE_PHONE_TO_PED_EAR",
    0xa468e0be12b13000: "SC_COMMUNITY_EVENT_IS_ACTIVE_BY_ID",
    0xa4822f1cf23f4800: "GENERATE_VEHICLE_CREATION_POS_FROM_PATHS",
    0xa4a0065e39c9f000: "GET_SAVE_HOUSE_DETAILS_AFTER_SUCCESSFUL_LOAD",
    0xa52d5247a4228000: "SET_PED_NO_TIME_DELAY_BEFORE_SHOT",
    0xa736cf7fb7c5c000: "PLAYSTATS_JOB_LTS_END",
    0xa7862bc5ed1e0000: "UGC_GET_MOST_RECENTLY_CREATED_CONTENT",
    0xa78b8fa58200d800: "STAT_LOCAL_RESET_ALL_ONLINE_CHARACTER_STATS",
    0xa85a21582451e800: "DOOR_SYSTEM_SET_DOOR_OPEN_FOR_RACES",
    0xa8733668d1047800: "STAT_CLEAR_PENDING_SAVES",
    0xa9b61a329bfdc800: "SET_PED_IS_AVOIDED_BY_OTHERS",
    0xaa76052dda9c0000: "ADJUST_AMBIENT_PED_SPAWN_DENSITIES_THIS_FRAME",
    0xab04325045427800: "SET_VEHICLE_NOT_STEALABLE_AMBIENTLY",
    0xab13a5565480b800: "SET_EXPECTED_CLONE_NEXT_TASK_MOVE_NETWORK_STATE",
    0xad73ce5a09e43000: "FORCE_START_HIDDEN_EVASION",
    0xadb57e5b663cc800: "NETWORK_GET_MUTE_COUNT_FOR_PLAYER",
    0xaded7f5748acb000: "THEFEED_AUTO_POST_GAMETIPS_OFF",
    0xae3fee8709b3a000: "HAVE_VEHICLE_REAR_DOORS_BEEN_BLOWN_OPEN_BY_STICKYBOMB",
    0xae73d8df3a76280: "CASCADE_SHADOWS_ENABLE_FREEZER",
    0xaeab987727c5a800: "UGC_GET_CONTENT_IS_USING_SC_NICKNAME",
    0xaf348afcb575a800: "SET_ROOM_FOR_GAME_VIEWPORT_BY_NAME",
    0xaf60e6a2936f9800: "SET_VEHICLE_DISABLE_COLLISION_UPON_CREATION",
    0xafc976fd0580c800: "SET_PED_UPPER_BODY_DAMAGE_ONLY",
    0xb13e88e655e5a000: "NETWORK_RETAIN_ACTIVITY_GROUP",
    0xb1b6216ca2e7b800: "ROPE_CHANGE_SCRIPT_OWNER",
    0xb1d2bb1e1631f800: "STAT_COMMUNITY_SYNCH_IS_PENDING",
    0xb2d0bde54f0e9000: "SET_ENTITY_FLAG_RENDER_SMALL_SHADOW",
    0xb309ebea797e0000: "NETWORK_SET_SCRIPT_AUTOMUTED",
    0xb3352e018d6f8800: "SET_PED_HEALTH_PENDING_LAST_DAMAGE_EVENT_OVERRIDE_FLAG",
    0xb37e4e6a2388c800: "NETWORK_WAITING_POP_CLEAR_TUTORIAL_SESSION",
    0xb3c641f3630bf800: "SET_MOTIONBLUR_MAX_VEL_SCALER",
    0xb40ed49d7d6ff80: "REACTIVATE_ALL_WORLD_BRAINS_THAT_ARE_WAITING_TILL_OUT_OF_RANGE",
    0xb45eff719d842800: "SET_LAW_RESPONSE_DELAY_OVERRIDE",
    0xb51b9ab9ef818800: "SET_CREDITS_FADE_OUT_WITH_SCREEN",
    0xb542de8c3d1cb000: "SET_NO_DUCKING_FOR_CONVERSATION",
    0xb606e6cc59664800: "TRIGGER_COMMERCE_DATA_FETCH",
    0xb743f735c03d7800: "ROPE_SET_REFFRAMEVELOCITY_COLLIDERORDER",
    0xb746d20b17f2a000: "UGC_GET_CREATORS_BY_USER_ID",
    0xba8d65c1c6570000: "FORCE_OFF_WANTED_STAR_FLASH",
    0xbb90e12cac1da800: "SET_PARTICLE_FX_BULLET_IMPACT_LODRANGE_SCALE",
    0xbc0ce682d4d05800: "ROPE_ATTACH_VIRTUAL_BOUND_GEOM",
    0xbc9490ca15aea800: "UPDATE_WANTED_POSITION_THIS_FRAME",
    0xbcedb009461da000: "PHONEPHOTOEDITOR_IS_ACTIVE",
    0xbdb6f89c729cf000: "NETWORK_SESSION_IS_DISPLAYING_INVITE_CONFIRMATION",
    0xbe5c1255a1831000: "SET_VEHICLE_WILL_FORCE_OTHER_VEHICLES_TO_STOP",
    0xbeb2d9a1d9a8f800: "SET_SRL_READAHEAD_TIMES",
    0xbed8ca5ff5e04000: "REMAP_LODSCALE_RANGE_THIS_FRAME",
    0xbed9f5693f34f000: "STAT_COMMUNITY_GET_HISTORY",
    0xbef34b1d9624d800: "SET_SKIP_MINIGUN_SPIN_UP_AUDIO",
    0xbf22e0f32968e800: "NETWORK_LEAVE_PED_BEHIND_BEFORE_CUTSCENE",
    0xbf4f34a85ca29800: "DRAW_HUD_OVER_FADE_THIS_FRAME",
    0xc0416b061f2b8000: "GOLF_TRAIL_SET_FIXED_CONTROL_POINT_ENABLE",
    0xc0e0d686ddfc7000: "STAT_GET_LOAD_SAFE_TO_PROGRESS_TO_MP_FROM_SP",
    0xc141b8917e001800: "SET_HAS_POSTED_ALL_VEHICLES_DRIVEN",
    0xc1805d05e6d50000: "SET_VEH_FORCED_RADIO_THIS_FRAME",
    0xc2c97ea97711d000: "SC_COMMUNITY_EVENT_GET_DISPLAY_NAME",
    0xc2ee020f5fb4d800: "TRIGGER_IDLE_ANIMATION_ON_PED",
    0xc32ea7a2f6ca7800: "NETWORK_CLAN_HAS_CREWINFO_METADATA_BEEN_RECEIVED",
    0xc3376f42b1fad000: "SET_ALL_NEUTRAL_RANDOM_PEDS_FLEE_THIS_FRAME",
    0xc361aa040d663800: "SET_VEHICLE_BROKEN_PARTS_DONT_AFFECT_AI_HANDLING",
    0xc42dd763159f3800: "NETWORK_HAS_CONFIRMED_INVITE",
    0xc50ce861b55ea800: "SET_VEHICLE_LIMIT_SPEED_WHEN_PLAYER_INACTIVE",
    0xc571d0e77d8bc000: "NETWORK_IS_TRANSITION_LEAVE_POSTPONED",
    0xc594b315edf2d800: "REMOVE_COP_BLIP_FROM_PED",
    0xc5a35c73b68f4000: "SC_COMMUNITY_EVENT_GET_EXTRA_DATA_FLOAT_BY_ID",
    0xc6033d32241f7000: "SET_OBJECT_IS_SPECIAL_GOLFBALL",
    0xc61b86c9f61eb800: "SET_PAD_CAN_SHAKE_DURING_CUTSCENE",
    0xc7f29ca00f463800: "OPEN_ALL_BARRIERS_FOR_RACE",
    0xc8391c3096845800: "SET_FOLLOW_PED_CAM_LADDER_ALIGN_THIS_UPDATE",
    0xc87e740d9f387000: "UGC_WAS_QUERY_FORCE_CANCELLED",
    0xc8b5c4a79cc18800: "SET_FLY_CAM_VERTICAL_CONTROLS_THIS_UPDATE",
    0xca4ae345a153d800: "SET_PARTICLE_FX_BULLET_TRACE_NO_ANGLE_REJECT",
    0xca575c391fea2800: "NETWORK_DISABLE_VOICE_BANDWIDTH_RESTRICTION",
    0xcac57395b1511000: "SET_PLAYER_CAN_COLLECT_DROPPED_MONEY",
    0xcb82a0bf0e3e3000: "GET_STATUS_OF_CREATE_LOW_QUALITY_COPY_OF_PHOTO",
    0xccd078c2665d2800: "STOP_GAMEPLAY_HINT_BEING_CANCELLED_THIS_UPDATE",
    0xcd0f5b5d932ae800: "NETWORK_DEFER_CASH_TRANSACTIONS_UNTIL_SHOP_SAVE",
    0xced08cbe8ebb9800: "SET_FIRST_PERSON_AIM_CAM_ZOOM_FACTOR_LIMITS_THIS_UPDATE",
    0xcfd778e7904c2800: "LOCK_DOORS_WHEN_NO_LONGER_NEEDED",
    0xcfeb46dcd7d8d800: "NETWORK_REMAIN_IN_GAME_CHAT",
    0xcfeb8af24fc1d000: "NETWORK_BLOCK_JOIN_QUEUE_INVITES",
    0xd01d20616fc7400: "SET_FREEMODE_PROLOGUE_DONE",
    0xd1c55b110e4df800: "SET_TV_PLAYER_WATCHING_THIS_FRAME",
    0xd2049635deb9c000: "UPDATE_RADAR_ZOOM_TO_BLIP",
    0xd313de83394af000: "NETWORK_SESSION_IS_AWAITING_INVITE_RESPONSE",
    0xd33daa3627217800: "FORCE_ZERO_MASS_IN_COLLISIONS",
    0xd642319c54aae000: "HAVE_REPLAY_STATS_BEEN_STORED",
    0xd77a82dc2d0da80: "NETWORK_SET_INVITE_FAILED_MESSAGE_FOR_INVITE_MENU",
    0xd8122c407663b800: "SC_TRANSITION_NEWS_SHOW_NEXT_ITEM",
    0xd9f692d349249800: "RESET_WANTED_RESPONSE_NUM_PEDS_TO_SPAWN",
    0xdb41d07a45a6d800: "GET_DEFAULT_AMMO_FOR_WEAPON_PICKUP",
    0xdb90c6cca4894000: "SET_GAMEPLAY_CAM_ALTITUDE_FOV_SCALING_STATE",
    0xdbc631f109350800: "SET_DONT_ALLOW_PLAYER_TO_ENTER_VEHICLE_IF_LOCKED_FOR_PLAYER",
    0xdd2620b7b9d17000: "GET_IS_MOPPING_AREA_FREE_IN_FRONT_OF_PLAYER",
    0xdd6bcf9e94426000: "SET_RADIO_RETUNE_DOWN",
    0xdd79df9f4d26e000: "SET_FOLLOW_CAM_IGNORE_ATTACH_PARENT_MOVEMENT_THIS_UPDATE",
    0xde45d1a1ef45f000: "SET_ALL_NEUTRAL_RANDOM_PEDS_FLEE",
    0xe05dd0e970700000: "SET_VEHICLE_USED_FOR_PILOT_SCHOOL",
    0xe154b48b68ef7000: "HAS_VC_WITHDRAWAL_COMPLETED",
    0xe2892e7e55d70800: "SET_DISTANCE_BLUR_STRENGTH_OVERRIDE",
    0xe36a98d8ab3d4000: "SET_CAR_GENERATORS_CAN_UPDATE_DURING_CUTSCENE",
    0xe3e2c1b4c59dc000: "RESET_ADAPTATION",
    0xe4299c549f0d200: "DISABLE_COMPOSITE_SHOTGUN_DECALS",
    0xe496a53ba5f50800: "STAT_CLOUD_SLOT_LOAD_FAILED_CODE",
    0xe4dcec7fd5b73800: "SET_EQIPPED_WEAPON_START_SPINNING_AT_FULL_SPEED",
    0xe532ec1a63231800: "SET_WANTED_RESPONSE_NUM_PEDS_TO_SPAWN",
    0xe5810ac70602f000: "SET_AIRCRAFT_PILOT_SKILL_NOISE_SCALAR",
    0xe59343e9e9652800: "GET_MOTIONBLUR_MAX_VEL_SCALER",
    0xe63d7c6eececb800: "TOGGLE_PLAYER_DAMAGE_OVERLAY",
    0xe67c6dfd386ea800: "ALLOW_DISPLAY_OF_MULTIPLAYER_CASH_TEXT",
    0xe75a4a2e5e317000: "SC_COMMUNITY_EVENT_GET_EXTRA_DATA_INT_FOR_TYPE",
    0xe791df1f73ed3000: "DOES_THIS_PHOTO_SLOT_CONTAIN_A_VALID_PHOTO",
    0xe851e480b814d800: "SET_VEHICLE_MAY_BE_USED_BY_GOTO_POINT_ANY_MEANS",
    0xeb6f1a9b5510a800: "SET_OBJECT_TAKES_DAMAGE_FROM_COLLIDING_WITH_BUILDINGS",
    0xebf8284d8cade800: "NETWORK_REMOVE_AND_CANCEL_ALL_INVITES",
    0xebfa8d50addc5800: "UGC_HAS_DESCRIPTION_REQUEST_FINISHED",
    0xec4b4b3b99080800: "SET_PED_INJURED_ON_GROUND_BEHAVIOUR",
    0xec72c258667be800: "LOAD_HIGH_QUALITY_PHOTO",
    0xecb41ac6ab754800: "STAT_LOAD_DIRTY_READ_DETECTED",
    0xed3c76adfa6d0800: "FORCE_INSTANT_LEG_IK_SETUP",
    0xede326d47cd0f00: "NETWORK_SET_ATTRIBUTE_DAMAGE_TO_PLAYER",
    0xeebfc7a7efdc3800: "GET_VEHICLE_COLOURS_WHICH_CAN_BE_SET",
    0xef39ee20c537e800: "SET_SRL_POST_CUTSCENE_CAMERA",
    0xef9d388f8d378000: "SET_CHECK_FOR_ENOUGH_ROOM_FOR_PED",
    0xf033419d1b81f800: "GET_FM_FEMALE_SHOP_PED_APPAREL_ITEM_INDEX",
    0xf083835b70ba9800: "NETWORK_REMOVE_AND_CANCEL_ALL_TRANSITION_INVITES",
    0xf13fe2a80c05c800: "ARE_ONLINE_POLICIES_UP_TO_DATE",
    0xf1a1803d3476f000: "SET_PROFILE_SETTING_CREATOR_RACES_DONE",
    0xf22ca0fd74b81000: "SC_LICENSEPLATE_GET_CHECK_IS_VALID",
    0xf2385935bffd5000: "IS_CURRENT_HEAD_PROP_A_HELMET",
    0xf25e02cb9c581800: "DISABLE_VEHICLE_EXPLOSION_BREAK_OFF_PARTS",
    0xf284ac67940c6800: "HAS_MENU_TRIGGER_EVENT_OCCURRED",
    0xf2bebcdfafdaa000: "SET_PED_ALLOW_HURT_COMBAT_FOR_ALL_MISSION_PEDS",
    0xf2ca003f167e2000: "LOBBY_AUTO_MULTIPLAYER_MENU",
    0xf2e07819ef1a5000: "DLC_CHECK_CLOUD_DATA_CORRECT",
    0xf3365489e0dd5000: "SET_VEHICLE_MISSILE_WARNING_ENABLED",
    0xf49abc20d8552000: "NETWORK_SESSION_SET_UNIQUE_CREW_LIMIT",
    0xf4a0dadb70f58000: "IPL_GROUP_SWAP_FINISH",
    0xf51d361859935000: "SET_CHECKPOINT_CLIPPLANE_WITH_POS_NORM",
    0xf6baaaf762e1c000: "SC_LICENSEPLATE_CHECK_STRING",
    0xf6f1ebbc4e1d600: "BG_DOES_LAUNCH_PARAM_EXIST",
    0xf814fec6a19fd800: "NETWORK_STORE_INVITE_THROUGH_RESTART",
    0xf8155a7f03de0000: "SET_SRL_FORCE_PRESTREAM",
    0xf8c54a461c3e1000: "PLAYSTATS_JOB_ACTIVITY_END",
    0xf92099527db8e000: "SUPPRESS_PICKUP_REWARD_TYPE",
    0xfa1e0e893d915000: "SHUTDOWN_SESSION_CLEARS_AUTO_MULTIPLAYER",
    0xfa2888e3833c9000: "NETWORK_SEND_QUEUED_JOIN_REQUEST",
    0xfaa457ef263e8800: "REGISTER_TEXT_LABEL_63_TO_SAVE",
    0xfae628f1e9adb000: "SET_LAST_VIEWED_SHOP_ITEM",
    0xfaf2a78061fda000: "SET_GLOBAL_POSITION_OFFSET_FOR_RECORDED_VEHICLE_PLAYBACK",
    0xfb00ca71da386000: "SET_TICKER_JOHNMARSTON_IS_DONE",
    0xfb199266061f8000: "IPL_GROUP_SWAP_IS_READY",
    0xfb1f9381e80fa000: "NETWORK_FIND_LARGEST_BUNCH_OF_PLAYERS",
    0xfb680d403909e000: "NETWORK_ALLOW_GANG_TO_JOIN_TUTORIAL_SESSION",
    0xfd32549479230000: "SET_USE_CAMERA_HEADING_FOR_DESIRED_DIRECTION_LOCK_ON_TEST",
    0xfd75dabc0957c000: "UGC_SET_USING_OFFLINE_CONTENT",
    0xfe4c1d0d3b9cc000: "SC_TRANSITION_NEWS_SHOW_TIMED",
    0xff266d1d0eb11800: "SET_RADIO_RETUNE_UP",
    0xff4803bc01985000: "SET_HEALTH_SNACKS_CARRIED_BY_ALL_NEW_PEDS",
    0xff8f3a92b75ed800: "SC_COMMUNITY_EVENT_IS_ACTIVE",
    0xffee8fa29ab9a000: "UPDATE_SPECIAL_ABILITY_FROM_STAT"
};

export function getNativeNameFromOffset(offset) {
    if (!offset.startsWith("0x")) offset = "0x" + offset;

    const hex = parseInt(offset, 16);

    if (hex in NamedNatives) return NamedNatives[hex];

    const native = getIndex().getNameFromHash(offset, true);

    return native || false;
}