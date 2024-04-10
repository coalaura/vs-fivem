/**
 * System specs:
 * - RTX 3090 (24GB)
 * - 128GB DDR4 RAM @ 3200MHz
 * - i9-11900K @ 3.50GHz
 *
 * All performance tests are ran on a local FiveM server with a bunch of scripts and addon assets and a single player loaded in at the top of maze bank tower.
 * The server is given 20 seconds to load and start up before the performance tests are ran.
 */

export default [
    // Inserting at the end of a table
    {
        bad: {
            regex: /table\.insert([^,]+, [^,]+)/g,
            code: 'table.insert',
            perf: '0.076us'
        },
        good: {
            code: 'table[#table + 1] = 1',
            perf: '0.036us'
        }
    },

    // joaat instead of GetHashKey
    {
        bad: {
            regex: /GetHashKey\(/g,
            code: 'GetHashKey',
            perf: '0.509us'
        },
        good: {
            code: 'joaat',
            perf: '0.318us'
        }
    }
];