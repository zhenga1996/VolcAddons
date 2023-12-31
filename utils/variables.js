import PogObject from "../../PogData";
import settings from "./settings";
import { AQUA, BOLD, CAT_SOULS, DARK_AQUA, DARK_GRAY, ENIGMA_SOULS, FAIRY_SOULS, GOLD, GRAY, GREEN, LOGO, RED, RESET, WHITE, YELLOW } from "./constants";


// --- PERSISTENT DATA ---
export let data = new PogObject("VolcAddons", {
    // Properties with default values for various settings and data
    "newUser": true,
    "version": "2.3.1",
    "commands": {},
    "wordbank": {},
    "lastID" : undefined,
    "world": "none",
    "tier": 0,
    "pet": undefined,
    "lastMsg": "joe",
    "vision": false,
    // playtime tracking
    "playtime": 0,
    "lastDay": 0,
    // lists
    "whitelist": [],
    "blacklist": [],
    "warplist": ["hub", "da", "castle", "museum", "wizard"],
    "moblist": [],
    "colorlist": {},
    "emotelist": {},
    "cooldownlist": {},
    "valuelist": {},
    // kuudra splits stuff
    "files": [],
    "splits": {
        "last": [0, 0, 0, 0, 0],
        "best": [999, 999, 999, 999, 9999],
        "worst": [0, 0, 0, 0, 0],
    },
    // tracker data
    "vanqSession": {
        "vanqs": 0,
        "kills": 0,
        "last": 0,
        "average": 0,
    },
    "inqSession": {
        "inqs": 0,
        "burrows": 0,
        "last": 0,
        "average": 0,
    },
    "kuudraSession": {
        "profit": 0,
        "chests": 0,
        "average": 0,
        "time": 0,
        "rate": 0
    },
    // economy calculation stuff
    "composterUpgrades": {
        "Composter Speed": -1,
        "Multi Drop": -1,
        "Cost Reduction": -1
    },
    "apexPrice": 2e9,
    // control keys
    "dianaKey": 0,
    "pauseKey": 0,
    "devKey": 0,
    "bindKey": 0,
    "slotBinds": {},
    "bindPresets": {},
    // GUI locations
    "AL": [780, 430, 1.2, false], // Skill Tracker Location
    "BL": [10, 120, 1.2, false], // Vampire Location
    "CL": [10, 180, 1.2, false], // Counter Location
    "DL": [10, 180, 1.2, false], // Broodmother Location
    "EL": [100, 150, 1.1, false], // Advanced Value Location
    "FL": [220, 10, 1.2, false], // Trophy Fish Location
    "GL": [10, 140, 1.2, false], // Gyro Location
    "HL": [10, 240, 1.2, false], // Powder Chest Location
    "IL": [10, 180, 1.2, false], // Inq Location
    "JL": [150, 180, 1.2, false], // Kill Counter Location
    "KL": [600, 220, 1.2, false], // Kuudra Profit Location
    "LL": [870, 130, 1.2, false], // Server Status Location
    "ML": [780, 390, 1.2, false], // Coins Location
    "NL": [10, 160, 1.2, false], // Next Visitors Location
    "OL": [10, 130, 1.2, false], // Composter Location
    "PL": [10, 180, 1.2, false], // Powder Location
    "QL": [250, 225, 4, false], // Vanquisher Location
    "RL": [600, 175, 1, false], // Container Value Location
    "SL": [10, 180, 1.2, false], // Splits Location
    "TL": [10, 130, 1.2, false], // Golden Fish Timer Location
    "UL": [930, 65, 1.2, false], // Armor Display Location
    "VL": [10, 180, 1.2, false], // Visitors Location
    "WL": [730, 130, 1.2, false], // Wolf Combo Location
    "XL": [Renderer.screen.getWidth()/2 - 96, Renderer.screen.getHeight()*6/7, 1, false], // Searchbox location
    "YL": [770, 125, 1.2, false], // SkyBlock Stats Location
    "ZL": [780, 330, 1.2, false], // Kuudra Profit Tracker Location
    "EQL": [905, 65, 1.2, false], // Equipment Location
    "PHL": [170, 160, 1.2, false], // Pesthunter Location
    "SDL": [170, 180, 1.2, false], // Spray Display Location
    // Rift waypoint properties
    "fairySouls": FAIRY_SOULS,
    "enigmaSouls": ENIGMA_SOULS,
    "catSouls": CAT_SOULS
}, "datitee.json");


// --- TRIGGER CONTROL ---

// An array to store registered triggers and their dependencies
let registers = [];

/**
 * Adds a trigger with its associated dependency to the list of registered triggers.
 * Credit to: https://www.chattriggers.com/modules/v/BloomCore for idea
 *
 * @param {Object} trigger - The trigger to be added.
 * @param {function} dependency - The function representing the dependency of the trigger.
 */
export function registerWhen(trigger, dependency) {
    trigger.unregister();
    registers.push([trigger, dependency, false]);
}

// Updates trigger registrations based on world or GUI changes
export function setRegisters(off = false) {
    registers.forEach(trigger => {
        if (off || (!trigger[1]() && trigger[2])) {
            trigger[0].unregister();
            trigger[2] = false;
        } else if (trigger[1]() && !trigger[2]) {
            trigger[0].register();
            trigger[2] = true;
        }
    });
}

// Event handler for GUI settings close.
register("guiClosed", (event) => {
    if (!event.toString().includes("vigilance")) return;

    setRegisters(off = settings.skyblockToggle && !Scoreboard.getTitle().removeFormatting().includes("SKYBLOCK"));
    updateEntityList();
});


// --- LIST CONTROL ---
import { updateEntityList } from "../features/combat/EntityDetect";
import { setWarps } from "../features/event/MythRitual";
import { convertToTitleCase, unformatNumber } from "./functions";

/**
 * Updates a list based on the provided arguments.
 *
 * @param {string[]} args - An array of arguments provided for the list update.
 * @param {Array|string} list - The list to be updated.
 * @param {string} listName - The name of the list for displaying messages.
 * @returns {Array|string} - The updated list.
 */
let lines = [5858, 5859];
export function updateList(args, list, listName) {
    const isArray = Array.isArray(list);
    const command = args[1]
    const item = listName === "moblist" ? args.slice(2).join(' ') : args.slice(2).join(' ').toLowerCase();

    // Object pairs
    const value = listName === "cdlist" ? unformatNumber(args[2]) : 
        listName === "valuelist" ? unformatNumber(args[3]) || unformatNumber(args[2]) : args.slice(3).join(' ');
    const key = listName === "cdlist" || (listName === "valuelist" && !isNaN(unformatNumber(args[2]))) ?
        Player?.getHeldItem()?.getItemNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") : args[2];

    switch (command) {
        case "add": // ADD TO LIST
            if (isArray && !list.includes(item)) {
                list.push(item);
                ChatLib.chat(`${LOGO + GREEN}Successfully added "${WHITE + item + GREEN}" to the ${listName}!`);
            } else if (!isArray && !(key in list)) {
                list[key] = value;
                ChatLib.chat(`${LOGO + GREEN}Successfully linked "${WHITE + value + GREEN}" to [${WHITE + key + GREEN}]!`);
            } else ChatLib.chat(`${LOGO + RED}[${WHITE + (isArray ? item : key + RED)}] is already in the ${listName}!`);
            break;
        case "remove": // REMOVE FROM LIST
            if (isArray && list.indexOf(item) > -1) {
                list.splice(list.indexOf(item), 1);
                ChatLib.chat(`${LOGO + GREEN}Successfully removed "${WHITE + item + GREEN}" from the ${listName}!`);
            } else if (!isArray && key in list) {
                delete list[key];
                ChatLib.chat(`${LOGO + GREEN}Successfully removed "${WHITE + key + GREEN}" from the ${listName}!`);
            } else ChatLib.chat(`${LOGO + RED}[${WHITE + item + RED}] is not in the ${listName}!`);
            break;
        case "clear": // CLEAR LIST
        case "reset":
            if (isArray) list.length = 0;
            else Object.keys(list).forEach(key => delete list[key]);
            ChatLib.chat(`${LOGO + GREEN}Successfully cleared the ${listName}!`);
            break;
        case "view": // DISPLAY LIST
        case "list":
            ChatLib.clearChat(lines);
            lines = [5858, 5859];
            let id = 5860;
            const page = parseInt(args[2] ?? 1);
            const length = isArray ? list.length : Object.keys(list).length;
            const total = Math.ceil(length / 12) || 1;

            // Print out header
            new Message("\n&c&m-----------------------------------------------------").setChatLineId(5858).chat();
            const lArrow = new TextComponent("&r&e&l<<&r&9")
                .setClickAction("run_command")
                .setClickValue(`/va ${listName} list ${page - 1}`)
                .setHoverValue(`${YELLOW}Click to view page ${page - 1}.`);
            const rArrow = new TextComponent("&r&e&l>>")
                .setClickAction("run_command")
                .setClickValue(`/va ${listName} list ${page + 1}`)
                .setHoverValue(`${YELLOW}Click to view page ${page + 1}.`);
            const header = new Message("&r&9                     ").setChatLineId(5859);

            header.addTextComponent(page > 1 ? lArrow : "   ");
            header.addTextComponent(` §6${convertToTitleCase(listName)} §8(§fPage §7${page} §fof §7${total}§8) `);
            if (page < total) header.addTextComponent(rArrow);
            header.addTextComponent("\n").chat();

            // Loop through variables
            const pageIndex = (page - 1) * 12;
            if (isArray) {
                for (let i = pageIndex; i < Math.min(pageIndex + 12, length); i++) {
                    new Message(` ${DARK_GRAY}⁍ `, new TextComponent(`${AQUA + list[i]}`)
                        .setClickAction("run_command")
                        .setClickValue(`/va ${listName} remove ${list[i]}`)
                        .setHoverValue(`${YELLOW}Click to remove ${AQUA + list[i] + YELLOW} from list.`)
                    ).setChatLineId(++id).chat();
                    lines.push(id);
                }
            } else {
                const keys = Object.keys(list);
                for (let i = pageIndex; i < Math.min(pageIndex + 12, length); i++) {
                    let key = keys[i];
                    new Message(` ${DARK_GRAY}⁍ `, new TextComponent(`${AQUA + key}`)
                        .setClickAction("run_command")
                        .setClickValue(`/va ${listName} remove ${key}`)
                        .setHoverValue(`${YELLOW}Click to remove ${AQUA + key + YELLOW} from list.`),
                        `${GRAY} => ${YELLOW + list[key]}`
                    ).setChatLineId(++id).chat();
                    lines.push(id);
                }
            }

            // Footer
            new Message("&c&m-----------------------------------------------------&r").setChatLineId(++id).chat();
            lines.push(id);
            break;
        case "default":
            if (listName === "moblist") {
                list.length = 0;
                list.push("vanquisher");
                list.push("jawbus");
                list.push("thunder");
                ChatLib.chat(`${LOGO + GREEN}Successfully set moblist to default!`);
                break;
            }
        default:
            ChatLib.chat(`\n${LOGO + RED}Error: Invalid argument "${command}"!`);
            let base = `${LOGO + RED}Please input as: ${WHITE}/va ${listName} ${GRAY}<${WHITE}view, clear, add, remove${GRAY}> ${WHITE}`;

            if (listName === "cdlist") base += `[cd]\n\n${DARK_AQUA}Special args (put in front, e.x 'a60'):
- ${AQUA}none ${GRAY}=> ${GRAY}right click
- ${AQUA}l ${GRAY}=> ${AQUA}left click
- ${AQUA}a ${GRAY}=> ${AQUA}no cd (e.x Plasmaflux)
- ${AQUA}s ${GRAY}=> ${AQUA}shift`;
            else if (listName === "emotelist") base += "[key] [value]";
            else if (listName === "warplist") base += `${GRAY}<${WHITE}hub, castle, da, museum, crypt, wizard${GRAY}>>`;
            else if (listName === "moblist")
                base += `${GRAY}<${WHITE}[MC Entity Class], [Stand Name]${GRAY}>>`;
            else if (listName === "colorlist") base += "[moblist var] [r] [g] [b]";
            else if (listName === "valuelist") base += "[ITEM_ID] [value]";
            else base += "[item]";
            
            ChatLib.chat(base);
            break;
    }
    
    if (listName === "moblist" || listName === "colorlist") updateEntityList();
    else if (listName === "warplist") setWarps();
    setRegisters(off = settings.skyblockToggle && !Scoreboard.getTitle().removeFormatting().includes("SKYBLOCK"));
}


// --- ETC ---
/**
 * Returns the current paused state.
 *
 * @returns {boolean} - The current paused state.
 */
let paused = false;
export function getPaused() {
    return paused;
}

// Key binding for pausing or unpausing trackers
const pauseKey = new KeyBind("Pause Trackers", data.pauseKey, "./VolcAddons.xdd");
pauseKey.registerKeyPress(() => {
    paused = !paused;
    const message = paused ? `${RED}Paused` : `${GREEN}Resumed`;
    ChatLib.chat(`${LOGO + GOLD}Tracker ${message}!`);
});
register("gameUnload", () => {
    data.pauseKey = pauseKey.getKeyCode();
});

// Stats tracking class
export class Stat {
    constructor() {
        // Initializing properties for tracking statistics
        this.reset();
    }

    // Method to reset stat properties
    reset() {
        this.start = 0.00; // Starting Amount
        this.now = 0.00; // Current Amount
        this.gain = 0.00; // Current - Starting Amount
        this.next = 0.00; // Next Level
        this.time = 0.00; // Time passed
        this.rate = 0.00; // Amount/hr
        this.since = 600; // Time since last Amount earn
    }
}

// Saving data to persistent storage upon game unload
register("gameUnload", () => {
    data.save();
}).setPriority(Priority.LOWEST);
