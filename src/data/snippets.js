export default [
    {
        prefix: 'thread',
        body: 'Citizen.CreateThread(function()\n\t$0\nend)',
        description: 'Create a thread'
    },
    {
        prefix: 'threadnow',
        body: 'Citizen.CreateThreadNow(function()\n\t$0\nend)',
        description: 'Create a thread that runs immediately'
    },
    {
        prefix: 'timeout',
        body: 'Citizen.SetTimeout(1000, function()\n\t$0\nend)',
        description: 'Create a timeout'
    },
    {
        prefix: 'tick',
        body: 'Citizen.Wait(0)\n',
        description: 'Wait for the next tick'
    },
    {
        prefix: 'event',
        body: 'RegisterNetEvent("$0")\nAddEventHandler("$0", function()\nend)',
        description: 'Create a network event'
    },
    {
        prefix: 'eventh',
        body: 'AddEventHandler("$0", function()\nend)',
        description: 'Create a network event handler'
    }
];