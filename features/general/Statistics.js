import {
  AQUA,
  BOLD,
  DARK_AQUA,
  DARK_BLUE,
  DARK_GRAY,
  DARK_GREEN,
  DARK_PURPLE,
  DARK_RED,
  GOLD,
  GRAY,
  GREEN,
  LOGO,
  PLAYER_CLASS,
  RED,
  YELLOW,
} from "../../utils/Constants";
import { data } from "../../utils/Data";
import { Overlay } from "../../utils/Overlay";
import { registerWhen } from "../../utils/RegisterTils";
import Settings from "../../utils/Settings";
import Toggles from "../../utils/Toggles";
import { formatNumber, formatTime } from "../../utils/functions/format";
import { isPlayer } from "../../utils/functions/player";

/**
 * Stats display overlay variables
 */
const statsExample = `${GRAY}[${GOLD}Pet${GRAY}] ${GREEN}-..-
${GRAY}[${GOLD}Legion${GRAY}] ${RED}0 ${DARK_GRAY}(0%)
${GRAY}[${GOLD}SF${GRAY}] ${GREEN}/ -.. ${AQUA}⸎
${GRAY}[${GOLD}Daily PT${GRAY}] ${GREEN}/ -..`;
const statsOverlay = new Overlay("statsDisplay", data.YL, "moveStats", statsExample);

/**
 * Get equipped pet through tab widget, menu, or chat.
 */
let petWidget = false;
registerWhen(
  register("step", () => {
    if (!World.isLoaded()) return;
    const tabNames = TabList.getNames();
    const petIndex = tabNames.findIndex((tab) => tab === "§r§e§lPet:§r");
    if (petIndex !== -1) {
      petWidget = true;
      data.pet = tabNames[petIndex + 1].substring(3);

      const petXP = tabNames[petIndex + 2].split(" ")[1];
      if (petXP != "§r§b§lMAX" && !data.pet.startsWith("§r§7No pet")) data.pet += `\n   ${petXP} XP`;
    } else petWidget = false;
  }).setFps(1),
  () => Settings.statsDisplay && Toggles.petDisplay
);

register("guiOpened", () => {
  Client.scheduleTask(1, () => {
    const container = Player.getContainer();
    if (!container.getName().startsWith("Pets (")) return;

    // Loop through pet menu
    const pets = container.getItems();
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 7; j++) {
        let pet = pets[i * 9 + j];
        if (pet.getLore().find((lore) => lore === "§5§o§7§cClick to despawn!") !== undefined) {
          let name = pet.getName();
          data.pet = name.substring(name.indexOf("]") + 2);
        }
      }
    }
  });
});
register("chat", (pet) => {
  if (!petWidget) data.pet = pet.substring(pet.indexOf("]") + 2);
}).setCriteria("&cAutopet &eequipped your ${pet}&e! &a&lVIEW RULE&r");
register("chat", (pet) => {
  if (!petWidget) data.pet = pet;
}).setCriteria("&r&aYou summoned your ${pet}&r&a!&r");

// Check for Montezuma
let lastPet = data.pet;
const revertPet = register("worldUnload", () => {
  data.pet = lastPet;
  revertPet.unregister();
}).unregister();
register("chat", () => {
  const mont = TabList.getNames().find((name) => name.startsWith("§r Montezuma:"));
  if (mont !== undefined) {
    lastPet = data.pet;
    data.pet = (mont[18] >= 6 ? DARK_PURPLE : DARK_BLUE) + "Montezuma";
    revertPet.register();
  }
}).setCriteria("  RIFT INSTABILITY WARNING");

/**
 * Get soulflow using inventory
 */
let soulflow = 0;
register("step", () => {
  const container = Player.getContainer();
  if (container === null) return;

  container.getItems().forEach((item) => {
    if (item !== null && item.getName().includes("Soulflow")) {
      const internal = item.getLore()[1].removeFormatting();
      if (internal.startsWith("Internalized:")) soulflow = internal.replace(/[^0-9]/g, "");
    }
  });
}).setDelay(5);

/**
 * Count daily playtime
 */
register("step", () => {
  if (!World.isLoaded() || !Settings.playtimeWarnings) return;

  const today = new Date().getDate();
  if (data.lastDay !== today) {
    data.playtime = 0;
    data.lastDay = today;
  }

  const hours = Math.round(data.playtime / 3_600);
  if (++data.playtime % 28_800 === 0 && data.playtime >= 28_800)
    ChatLib.chat(
      `${
        LOGO + YELLOW
      }You have been playing for ${hours} hours. Excessive game playing may cause problems in your normal daily life.`
    );
}).setFps(1);

/**
 * Update statsOverlay message
 */
registerWhen(
  register("tick", () => {
    let statsMessage = "";

    // Pet
    if (Toggles.petDisplay) {
      let pet =
        data.pet.length > 36 && !data.pet.startsWith("§r§7No pet") ? data.pet.split(" ").slice(2).join(" ") : data.pet;
      statsMessage += `${GRAY}[${GOLD}Pet${GRAY}] ${pet}\n`;
    }

    // Legion
    if (Toggles.legionDisplay) {
      const player = Player.asPlayerMP();
      const legionCount = World.getAllEntitiesOfType(PLAYER_CLASS).filter(
        (other) => isPlayer(other) && player.distanceTo(other) < 30
      ).length;
      const legionPercent = Math.round(Math.min(1, legionCount / 20) * 100);
      const legionColor =
        legionCount > 16
          ? GREEN
          : legionCount > 12
          ? DARK_GREEN
          : legionCount > 8
          ? YELLOW
          : legionCount > 4
          ? GOLD
          : legionColor > 0
          ? RED
          : DARK_RED;
      statsMessage += `${GRAY}[${GOLD}Legion${GRAY}] ${legionColor + legionCount + DARK_GRAY} (${legionPercent}%)\n`;
    }

    // Soulflow
    if (Toggles.soulflowDisplay) {
      const soulflowColor =
        soulflow > 100_000
          ? GREEN
          : soulflow > 75_000
          ? DARK_GREEN
          : soulflow > 50_000
          ? YELLOW
          : soulflow > 25_000
          ? GOLD
          : soulflow > 10_000
          ? RED
          : DARK_RED;
      statsMessage += `${GRAY}[${GOLD}SF${GRAY}] ${soulflowColor + formatNumber(soulflow) + AQUA} ⸎\n`;
    }

    // Playtime
    if (Toggles.trackPlaytime) {
      const ptColor =
        data.playtime < 3_600
          ? GREEN
          : data.playtime < 7_200
          ? DARK_GREEN
          : data.playtime < 10_800
          ? YELLOW
          : data.playtime < 18_000
          ? GOLD
          : data.playtime < 28_800
          ? RED
          : DARK_RED;
      const formattedPlaytime = formatTime(data.playtime).replace(/\d+/g, (match) => `${ptColor}${match}${DARK_GRAY}`);
      statsMessage += `${GRAY}[${GOLD}Daily PT${GRAY}] ${formattedPlaytime}`;
    }

    statsOverlay.setMessage(statsMessage);
  }),
  () => Settings.statsDisplay
);

/**
 * Output Stats to user chat when user requests via command args.
 *
 * @param {String} stat - Status type to retrieve.
 */
export function getStat(stat) {
  switch (stat) {
    case "pet":
      ChatLib.chat(`${LOGO + DARK_AQUA + BOLD}Pet: ${data.pet}`);
      break;
    case "soulflow":
    case "sf":
      const soulflowColor =
        soulflow > 100_000
          ? GREEN
          : soulflow > 75_000
          ? DARK_GREEN
          : soulflow > 50_000
          ? YELLOW
          : soulflow > 25_000
          ? GOLD
          : soulflow > 10_000
          ? RED
          : DARK_RED;

      ChatLib.chat(`${LOGO + DARK_AQUA + BOLD}SF: ${soulflowColor + formatNumber(soulflow) + AQUA} ⸎`);
      break;
    case "playtime":
    case "pt":
      const ptColor =
        data.playtime < 3_600
          ? GREEN
          : data.playtime < 7_200
          ? DARK_GREEN
          : data.playtime < 10_800
          ? YELLOW
          : data.playtime < 18_000
          ? GOLD
          : data.playtime < 28_800
          ? RED
          : DARK_RED;

      ChatLib.chat(`${LOGO + DARK_AQUA + BOLD}Daily Playtime: ${ptColor + formatTime(data.playtime)}`);
      break;
    case "legion":
      const player = Player.asPlayerMP();
      const legionCount =
        World.getAllEntitiesOfType(PLAYER_CLASS).filter(
          (other) => other.getEntity().func_110143_aJ() !== 20 && player.distanceTo(other) < 30
        ).length - 1;
      const legionPercent = Math.min(1, legionCount / 20).toFixed(2) * 100;
      const legionColor =
        legionCount > 16
          ? GREEN
          : legionCount > 12
          ? DARK_GREEN
          : legionCount > 8
          ? YELLOW
          : legionCount > 4
          ? GOLD
          : legionColor > 0
          ? RED
          : DARK_RED;
      ChatLib.chat(`${DARK_AQUA + BOLD}Legion: ${legionColor + legionCount + DARK_GRAY} (${legionPercent}%)`);
      break;
  }
}
