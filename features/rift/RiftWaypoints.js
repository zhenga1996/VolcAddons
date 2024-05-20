import location from "../../utils/location";
import settings from "../../utils/settings";
import { getClosest } from "../../utils/functions/find";
import { registerWhen } from "../../utils/register";
import { data } from "../../utils/data";
import { Waypoint } from "../../utils/WaypointUtil";


/**
 * Removes closest Montezuma soul piece when player finds one.
 */
registerWhen(register("chat", () => {
    // Delete closest soul
    const closest = getClosest([Player.getX(), Player.getY(), Player.getZ()], data.catSouls);
    if (closest !== undefined)
        data.catSouls.splice(data.catSouls.indexOf(closest[0]), 1);
}).setCriteria("You found a piece of Montezuma's soul!"), () => location.getWorld() === "The Rift");

/**
 * Fail safe Montzuma soul piece remove in case player clicks on an unregistered soul.
 */
registerWhen(register("chat", () => {
    if (!data.catSouls.length) return;

    // Delete duplicate soul
    const closest = getClosest([Player.getX(), Player.getY(), Player.getZ()], data.catSouls);
    if (closest[1] < 5)
        data.catSouls.splice(data.catSouls.indexOf(closest[0]), 1);
}).setCriteria("You have already found this Montezuma soul piece!"), () => location.getWorld() === "The Rift");


/**
 * Variables used to reprsent and track the 6 effigies.
 */
const EFFIGIES = [
    ["1st Effigy", 151, 73, 96], ["2nd Effigy", 194, 87, 120], ["3rd Effigy", 236, 104, 148],
    ["4th Effigy", 294, 90, 135], ["5th Effigy", 263, 93, 95], ["6th Effigy", 241, 123, 119]
];
const missingEffigies = new Waypoint([0.75, 0.75, 0.75]);  // Silver effigies

/**
 * Tracks missing effigies and makes a waypoint to them.
 */
registerWhen(register("step", () => {
    missingEffigies.clear();
    let effigies = Scoreboard?.getLines()?.find((line) => line.getName().includes("Effigies"));
    if (effigies === undefined) return;

    effigies = effigies.getName().replace(/[^§7⧯]/g,'').split("§");
    effigies.shift();
    effigies.forEach((effigy, i) => { 
        if (effigy.includes('7')) missingEffigies.push(EFFIGIES[i]);
    });
}).setFps(1), () => location.getWorld() === "The Rift" && settings.effigyWaypoint);
