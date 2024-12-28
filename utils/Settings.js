import {
  AQUA,
  BLUE,
  BOLD,
  DARK_RED,
  GOLD,
  GRAY,
  GREEN,
  HEADER,
  ITALIC,
  RED,
} from "./Constants";
import {
  @TextProperty,
  @PercentSliderProperty,
  @SliderProperty,
  @SwitchProperty,
  @ButtonProperty,
  @Vigilant,
  @CheckboxProperty,
  @SelectorProperty,
  @ColorProperty,
  Color
} from '../../Vigilance/index';

@Vigilant("VolcAddons", "VolcAddons", {
  getCategoryComparator: () => (a, b) => {
    const categories = [
      "General",
      "Container",
      "Party",
      "Economy",
      "Combat",
      "Mining",
      "Farming",
      "Event",
      "Crimson Isles",
      "Dungeon",
      "Kuudra",
      "Rift",
    ];
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  },
})
class Settings {
  constructor() {
    this.initialize(this);

    // General Category
    this.setCategoryDescription(
      "General",
      `${HEADER}
${ITALIC}Related Commands: /va <clear, coords, fairy, gui, help, lists, settings, waypoint>
${
  DARK_RED + BOLD
}CAUTION: Some features are technically chat macros, so use at your own risk [UAYOR]!`
    );

    // Container Category
    this.setCategoryDescription(
      "Container",
      `${HEADER}
${ITALIC}Related Commands: /va <binds, buttons>`
    );

    // Party Category
    this.setCategoryDescription(
      "Party",
      `${HEADER}
${ITALIC}Related Commands: /va <wl, bl>`
    );

    // Economy Category
    this.setCategoryDescription(
      "Economy",
      `${HEADER}
${ITALIC}Related Commands: /va <attribute, calc, nw>`
    );

    // Combat Category
    this.setCategoryDescription("Combat", HEADER);

    // Mining Category
    this.setCategoryDescription(
      "Mining",
      `${HEADER}
${ITALIC}Related Commands: /va <alloy, chevent, dmevent>`
    );

    // Farming Category
    this.setCategoryDescription(
      "Farming",
      `${HEADER}
${ITALIC}Realted Commands: /pesttp`
    );

    // Event Category
    this.setCategoryDescription(
      "Event",
      `${HEADER}
${ITALIC}Related Commands: /va <rabbit, warplist>`
    );

    // Crimson Isles Category
    this.setCategoryDescription(
      "Crimson Isles",
      `${HEADER}
${ITALIC}Related Commands: /va <attribute, calc>`
    );

    // Dungeon Category
    this.setCategoryDescription("Dungeon", HEADER);

    // Kuudra Category
    this.setCategoryDescription(
      "Kuudra",
      `${HEADER}
${ITALIC}Related Commands: /va <attribute, splits>, /kv`
    );

    // Rift Category
    this.setCategoryDescription(
      "Rift",
      `${HEADER}
${ITALIC}Related Commands: /va <enigma, npc, zone>`
    );
  }

  // ████████████████████████████████████████████████████ GENERAL FEATURES ████████████████████████████████████████████████████

  // --- Essential ---
  @SwitchProperty({
    name: "VolcAddons Toggle",
    description: `Toggle ${GREEN}ON ${GRAY}to enable or ${RED}OFF ${GRAY}to disable VolcAddons.`,
    category: "General",
    subcategory: "Essential",
  })
  vaToggle = true;

  @SwitchProperty({
    name: "SkyBlock Toggle",
    description: `Toggle ${GREEN}ON ${GRAY}for features to only function in Skyblock or ${RED}OFF ${GRAY}to function anywhere.`,
    category: "General",
    subcategory: "Essential",
  })
  skyblockToggle = true;

  @SwitchProperty({
    name: "Socket Toggle",
    description: `Toggle ${GREEN}ON ${GRAY}to send information to VolcSocket server or ${RED}OFF ${GRAY}to prevent. Requires a ${AQUA}/ct load ${GRAY}to take effect.`,
    category: "General",
    subcategory: "Essential",
  })
  socketToggle = true;

  @ButtonProperty({
    name: "Discord",
    description: `${RED}Please be mindful of Discord links in chat as they may pose a security risk! ${GRAY}Server very cool, much wow.`,
    category: "General",
    subcategory: "Essential",
    placeholder: "Yamete Kudasai",
  })
  discordLink() {
    java.awt.Desktop.getDesktop().browse(
      new java.net.URI("https://discord.gg/ftxB4kG2tw")
    );
  }

  @ButtonProperty({
    name: "GitHub Updater",
    description:
      "Download the Forge.jar file for new release alerts and effortless updating!",
    category: "General",
    subcategory: "Essential",
    placeholder: "Download",
  })
  downloadForge() {
    const url =
      "https://raw.githubusercontent.com/zhenga8533/VolcAddons/main/forge/VolcAddons-1.0.jar";
    java.awt.Desktop.getDesktop().browse(new java.net.URI(url));
  }

  @ButtonProperty({
    name: "Move GUI",
    description: `Moves all current active GUIs. Runs ${AQUA}/va gui${GRAY}.
Controls:
 ${AQUA}+/- ${GRAY}to scale.
 ${AQUA}L ${GRAY}to swap align.
 ${AQUA}H ${GRAY}to swap flex.
 ${AQUA}B ${GRAY}to show BG.
 ${AQUA}W ${GRAY}to change view.
 ${AQUA}RC ${GRAY}to hide in editor.`,
    category: "General",
    subcategory: "Essential",
    placeholder: "Move GUI",
  })
  moveGUI() {
    ChatLib.command("va gui", true);
  }

  // --- General ---
  @SwitchProperty({
    name: "Remove Selfie Mode",
    description: "Removes selfie mode from perspective toggle.",
    category: "General",
    subcategory: "General",
  })
  removeSelfie = false;

  @SliderProperty({
    name: "Render Waypoint",
    description: `Creates waypoints out of patcher formated coords. Set seconds until waypoints expire or as 0 to turn ${RED}OFF ${BLUE}(mob waypoints last 1/3 as long)${GRAY}.`,
    category: "General",
    subcategory: "General",
    min: 0,
    max: 120,
  })
  drawWaypoint = 0;

  @SliderProperty({
    name: "Skill Tracker",
    description: `Tracks and displays skill XP's rate of gain. Set minutes of inactivity required for tracker to reset or as 0 to turn ${RED}OFF${GRAY}.
Move GUI with ${AQUA}/moveSkills ${GRAY}or reset tracker with ${AQUA}/resetSkills${GRAY}.`,
    category: "General",
    subcategory: "General",
    min: 0,
    max: 10,
  })
  skillTracker = 0;

  @SwitchProperty({
    name: "Text Shadow Toggle",
    description:
      "Sets if text shadow renders on any GUI elements. Make sure Patcher's `Disable Text Shadow` is turned off!",
    category: "General",
    subcategory: "General",
  })
  textShadow = true;

  @SwitchProperty({
    name: "Widget Display",
    description: `Displays any widget in ${AQUA}/va wgl${GRAY}. Move GUI with ${AQUA}/move<widget>${GRAY}.`,
    category: "General",
    subcategory: "General",
  })
  widgetDisplay = true;

  // --- Server ---
  @SliderProperty({
    name: "Fairy Soul Waypoints",
    description: `Set distance at which Fairy Soul waypoints will render or as 0 to turn ${RED}OFF${GRAY}.`,
    category: "General",
    subcategory: "Server",
    min: 0,
    max: 128,
  })
  fairyWaypoint = 0;

  @SliderProperty({
    name: "Hide Far Entities",
    description: `Set maximum distance away from player an entity can be or as 0 to turn ${RED}OFF${GRAY}.`,
    category: "General",
    subcategory: "Server",
    min: 0,
    max: 128,
  })
  hideFarEntity = 0;
  @SliderProperty({
    name: "Hide Close Players",
    description: `Set minimum distance away from player a player can be or as 0 to turn ${RED}OFF${GRAY}.`,
    category: "General",
    subcategory: "Server",
    min: 0,
    max: 128,
  })
  hideCloseEntity = 0;
  @TextProperty({
    name: "Hide on bush",
    description: `Enter world names as [${AQUA}world1, world2, ...${GRAY}] for entity hiders to work on or leave empty for all worlds.`,
    category: "General",
    subcategory: "Server",
    placeholder: "world1, world2, ...",
  })
  hideWorlds = "";

  @SwitchProperty({
    name: "Hide All Particles",
    description:
      "Prevents any particle from rendering, including those not in settings.",
    category: "General",
    subcategory: "Server",
  })
  hideParticles = false;

  @SwitchProperty({
    name: "Server Alert",
    description: "Alerts player when they rejoin a previously joined server.",
    category: "General",
    subcategory: "Server",
  })
  serverAlert = true;

  @SwitchProperty({
    name: "Server Status",
    description: `Tracks various server/player statistics.\nMove GUI with ${AQUA}/moveStatus${GRAY}.`,
    category: "General",
    subcategory: "Server",
  })
  serverStatus = false;

  @SwitchProperty({
    name: "SkyBlock Stats Display",
    description: `Tracks various SkyBlock statistics.\nMove GUI with ${AQUA}/moveStats ${GRAY}and set toggle with ${AQUA}/va toggles${GRAY}.`,
    category: "General",
    subcategory: "Server",
  })
  statsDisplay = false;

  // --- Timer ---
  @SwitchProperty({
    name: "Item Cooldown Alert",
    description: `${GRAY}Alerts player once item cooldown timer expires.\nAdd cooldowns with ${AQUA}/va cd${GRAY}.`,
    category: "General",
    subcategory: "Timer",
  })
  cooldownAlert = false;

  @TextProperty({
    name: "Reminder Text",
    description: "Set the warning text that appears when timer expires.",
    category: "General",
    subcategory: "Timer",
    placeholder: "konnichiwa.",
  })
  reminderText = "";
  @SliderProperty({
    name: "Reminder Time",
    description: `Set minutes until timer expires or as 0 to turn ${RED}OFF${GRAY}.`,
    category: "General",
    subcategory: "Timer",
    min: 0,
    max: 120,
  })
  reminderTime = 0;

  // --- Webhook ---
  @TextProperty({
    name: "Discord Webhook",
    description: `Input Discord Webhook link to send the chat messages to. Set toggle with ${AQUA}/va toggles${GRAY}.`,
    category: "General",
    subcategory: "Webhook",
    protected: true,
  })
  chatWebhook = "";

  // --- Yapping ---
  @SwitchProperty({
    name: "Autocomplete Command",
    description:
      "Attempts to autocomplete commands with the most used commands. Use arrow keys to navigate through suggestions and tab to select suggestion.",
    category: "General",
    subcategory: "Yapping",
  })
  autocomplete = false;

  @SwitchProperty({
    name: "Autocorrect Command",
    description:
      "Attempts to correct invalid commands with valid ones. It will take time to collect enough data to be accurate.",
    category: "General",
    subcategory: "Yapping",
  })
  autocorrect = false;

  @SwitchProperty({
    name: "Bridge Formatter",
    description:
      "Created for myself, so may or may not work for you. Detects '»' symbol in bridge messages to format them.",
    category: "General",
    subcategory: "Yapping",
  })
  bridgeFormat = false;

  @SwitchProperty({
    name: "Custom Emotes",
    description: `Replaces parts of chat messages containing emotes in ${AQUA}/emotes${GRAY}.
Add custom emotes with ${AQUA}/va emote${GRAY}.`,
    category: "General",
    subcategory: "Yapping",
  })
  enableEmotes = false;

  @SwitchProperty({
    name: "SkyBlock XP Alert",
    description:
      "Displays a chat message and title when player gains SkyBlock XP in actionBar.",
    category: "General",
    subcategory: "General",
  })
  levelAlert = true;

  @SwitchProperty({
    name: "Playtime Warnings",
    description:
      "Display messages if your playtime for one day exceeds certain amounts.",
    category: "General",
    subcategory: "General",
  })
  playtimeWarnings = true;

  // ████████████████████████████████████████████████████ PARTY ████████████████████████████████████████████████████

  // --- Container ---
  @SwitchProperty({
    name: "Auction Highlight",
    description: `Highlights all items in auction house that have been sold. Personal items are in ${GREEN}GREEN ${GRAY}and co-op items are in ${GOLD}GOLD${GRAY}.`,
    category: "Container",
    subcategory: "Container",
  })
  auctionHighlight = false;

  @SelectorProperty({
    name: "Container Buttons ",
    description: `Display buttons that runs a command when pressed. Use ${AQUA}/va buttons ${GRAY}to view related commands.`,
    category: "Container",
    subcategory: "Container",
    options: ["OFF", "Default", "Transparent", "Semi-Transparent", "FurfSky"],
  })
  containerButtons = 0;

  @SelectorProperty({
    name: "Container Preview ",
    description: `Renders a preview of hovered container besides container GUI. Move GUI with ${AQUA}/movePreview${GRAY}.
Also ${AQUA}/va preview ${GRAY}can be used to lock previews and show replica. Move GUI with ${AQUA}/moveSP${GRAY}.`,
    category: "Container",
    subcategory: "Container",
    options: ["OFF", "Default", "FurfSky"],
  })
  containerPreview = 0;

  @SwitchProperty({
    name: "Searchbar",
    description: `Highlights item with matching name/lore with search. Supports binary AND (&&) and OR (||). Also can be used as a basic calculator.
Move GUI with ${AQUA}/moveSearch${GRAY}.`,
    category: "Container",
    subcategory: "Container",
  })
  searchbar = false;

  @SwitchProperty({
    name: "Slot Binding",
    description: `Scuffed version of NEU's slot binding feature. Use ${AQUA}/va slot ${GRAY}to view related commands.`,
    category: "Container",
    subcategory: "Container",
  })
  slotBinding = true;

  @SwitchProperty({
    name: "Wardrobe Hotkey",
    description:
      "Allows linking between wardrobe slots and keys. Set key in MC controls to use in wardrobe menu, and follow the instruction provided there.",
    category: "Container",
    subcategory: "Container",
  })
  wardrobeBinding = true;

  // --- Items ---
  @SwitchProperty({
    name: "Attribute Abbreviation",
    description: `Renders abbreviation of attributes over any item that has them.`,
    category: "Container",
    subcategory: "Items",
  })
  attributeAbbrev = false;

  @SwitchProperty({
    name: "Armor Display",
    description: `Displays user's armor pieces as icons on an overlay. Move GUI with ${AQUA}/moveArmor${GRAY}.`,
    category: "Container",
    subcategory: "Items",
  })
  armorDisplay = false;

  @SwitchProperty({
    name: "Equipment Display",
    description: `Displays user's equipment pieces as icons on an overlay and besides inventory. Move GUI with ${AQUA}/moveEq${GRAY}.`,
    category: "Container",
    subcategory: "Items",
  })
  equipDisplay = false;

  @SwitchProperty({
    name: "Item Time Display",
    description: "Adds time label to Bottle of Jyrre and Dark Truffle item description.",
    category: "Container",
    subcategory: "Items",
  })
  itemTimer = true;

  @SwitchProperty({
    name: "Max Supercraft",
    description:
      "Displays the maximum amount of items that can be crafted using supercraft.",
    category: "Container",
    subcategory: "Items",
  })
  maxSupercraft = true;

  // ████████████████████████████████████████████████████ PARTY ████████████████████████████████████████████████████

  // --- Message ---
  @TextProperty({
    name: "Guild Join Message",
    description: `Set the message to be sent to the guild once a user joins. Use ${
      AQUA + "${name}"
    } ${GRAY}in order say player name.`,
    category: "Party",
    subcategory: "Message",
  })
  guildMessage = "";

  @TextProperty({
    name: "Party Join Message",
    description: `Set the message to be sent to the party once a user joins. Use ${
      AQUA + "${name}"
    } ${GRAY}in order say player name.`,
    category: "Party",
    subcategory: "Message",
  })
  partyMessage = "";

  @SwitchProperty({
    name: "Party Leader Only",
    description: "Only sends above message when you are party leader.",
    category: "Party",
    subcategory: "Message",
  })
  partyMessageLeader = false;

  // --- Party ---
  @SwitchProperty({
    name: "Anti Ghost Party",
    description:
      "Prevents creating ghost parties when inviting multiple players.",
    category: "Party",
    subcategory: "Party",
  })
  antiGhostParty = false;

  @SwitchProperty({
    name: "Auto Join Reparty",
    description: "Accepts reparty invites sent within 60 seconds.",
    category: "Party",
    subcategory: "Party",
  })
  joinRP = false;

  @SelectorProperty({
    name: "Auto Transfer",
    description: "Transfers party when certain conditions are met.",
    category: "Party",
    subcategory: "Party",
    options: ["OFF", "On Transfer", "On Kick"],
  })
  autoTransfer = 0;

  @TextProperty({
    name: "Server Kick Announce",
    description: `Set the message to be sent to the party if you get lobby kicked or as nothing to turn ${RED}OFF${GRAY}.`,
    category: "Party",
    subcategory: "Party",
  })
  kickAnnounce = "";

  @SwitchProperty({
    name: "Whitelist Rejoin",
    description: `Accepts party invites from players on the whitelist.
Add players with ${AQUA}/va whitelist${GRAY}.`,
    category: "Party",
    subcategory: "Party",
  })
  joinWhitelist = true;

  // --- Party Commands ---
  @SwitchProperty({
    name: "Leader Chat Commands",
    description: `Allows players in party to use leader commands.\nBanish players with ${AQUA}/va blacklist ${GRAY}and set toggle with ${AQUA}/va toggles${GRAY}.`,
    category: "Party",
    subcategory: "Party Commands",
  })
  leaderCommands = false;
  @SwitchProperty({
    name: "Party Chat Commands",
    description: `Allows players to use party commands.\nBanish players with ${AQUA}/va blacklist ${GRAY}and set toggle with ${AQUA}/va toggles${GRAY}.`,
    category: "Party",
    subcategory: "Party Commands",
  })
  partyCommands = false;

  // ████████████████████████████████████████████████████ ECONOMY ████████████████████████████████████████████████████

  // --- Economy ---
  @SelectorProperty({
    name: "Bits Alert",
    description: "Alerts player when they are no longer generating bits.",
    category: "Economy",
    subcategory: "Economy",
    options: ["OFF", "Chat", "Title", "All"],
  })
  bitsAlert = 0;

  @SliderProperty({
    name: "Coin Tracker",
    description: `Tracks and displays purse's rate of gain. Set minutes until tracker resets or as 0 to turn ${RED}OFF${GRAY}.
Move GUI with ${AQUA}/moveCoins ${GRAY}or reset tracker with ${AQUA}/resetCoins${GRAY}.`,
    category: "Economy",
    subcategory: "Economy",
    min: 0,
    max: 10,
  })
  coinTracker = 0;

  // --- Item Cost ---
  @SliderProperty({
    name: "Container Value",
    description: `Displays item values in any inventory. Set number of item prices to display or as 0 to turn ${RED}OFF${GRAY}.`,
    category: "Economy",
    subcategory: "Pricing",
    min: 0,
    max: 54,
  })
  containerValue = 0;

  @SelectorProperty({
    name: "Item Price",
    description:
      "Displays complete item price including enchants, modifiers, and attributes.",
    category: "Economy",
    subcategory: "Pricing",
    options: ["OFF", "Advanced View", "Tooltip View", "Omnipotent View"],
  })
  itemPrice = 0;

  @SwitchProperty({
    name: "Single Attribute",
    description:
      "Nullifies the value of the lower value attribute on items with T5 or lower attributes.",
    category: "Economy",
    subcategory: "Pricing",
  })
  singleAttribute = true;

  @SelectorProperty({
    name: "Price Type",
    description: "Choose the type of bazaar pricing used in item calculations.",
    category: "Economy",
    subcategory: "Pricing",
    options: ["Order", "Insta"],
  })
  priceType = 0;

  @SwitchProperty({
    name: "Trade Value",
    description: "Determines the value difference between two trades.",
    category: "Economy",
    subcategory: "Pricing",
  })
  tradeValue = false;

  // ████████████████████████████████████████████████████ COMBAT ████████████████████████████████████████████████████

  // --- Bestiary ---
  @SelectorProperty({
    name: "Bestiary Counters",
    description: `Tracks bestiary hourly progress using tablist widget.
Move GUI with ${AQUA}/moveBe ${GRAY}or reset tracker with ${AQUA}/resetBe${GRAY}.`,
    category: "Combat",
    subcategory: "Bestiary",
    options: ["OFF", "Cumulative", "World"],
  })
  bestiaryCounter = 0;

  @SwitchProperty({
    name: "Bestiary GUI",
    description:
      "Shows bestiary level as stack size and highlight uncompleted bestiary milestones.",
    category: "Combat",
    subcategory: "Bestiary",
  })
  bestiaryGUI = false;

  @ColorProperty({
    name: "Hitbox Color",
    description: `Set the seed and opacity used to randomize entity hitbox colors.`,
    category: "Combat",
    subcategory: "Bestiary",
    hidden:
      !FileLib.read("./VolcAddons/Data", "contract.txt")
        ?.split("\n")?.[51]
        ?.includes(Player.getName()) ?? false,
  })
  hitboxColor = Color.BLACK;

  @SwitchProperty({
    name: "Kill Counter",
    description: `Tracks average amount of specific mob kills an hour ${BLUE}(must have Book of Stats)${GRAY}.
Move GUI with ${AQUA}/moveKills ${GRAY}or reset tracker with ${AQUA}/resetKills${GRAY}.`,
    category: "Combat",
    subcategory: "Bestiary",
  })
  killCounter = false;

  // --- Combat ---
  @SwitchProperty({
    name: "Combo Display",
    description: "Replaces Grandma Wolf combo chat messages with a custom GUI.",
    category: "Combat",
    subcategory: "Combat",
  })
  comboDisplay = false;

  @SelectorProperty({
    name: "Damage Tracer",
    description: `Spams chat with unique damage ticks ${BLUE}(this is meant for training dummies)${GRAY}.`,
    category: "Combat",
    subcategory: "Combat",
    options: ["OFF", "Simple", "Analytical"],
  })
  damageTracker = 0;

  @PercentSliderProperty({
    name: "Low Health Alert",
    description: `Set percent hp threshold until alert appears or as 0 to turn ${RED}OFF${GRAY}.`,
    category: "Combat",
    subcategory: "Combat",
  })
  healthAlert = 0.0;

  @SwitchProperty({
    name: "Mana Drain Range",
    description:
      "Highlights and displays number of players in mana drain range. Works only when holding End Stone Sword or fluxes.",
    category: "Combat",
    subcategory: "Combat",
  })
  manaDrain = false;

  @SwitchProperty({
    name: "Ragnarok Detection",
    description:
      "Displays an alert title when Ragnarock Axe finishes casting or is canceled.",
    category: "Combat",
    subcategory: "Combat",
  })
  ragDetect = true;

  // --- Slayer ---
  @SelectorProperty({
    name: "Announce Boss Chat",
    description: "Sends coordinates of user slayer boss spawns to chat.",
    category: "Combat",
    subcategory: "Slayer",
    options: ["OFF", "All Chat", "Party Chat", "Self"],
  })
  bossAlert = 0;
  @SelectorProperty({
    name: "Announce Miniboss Chat",
    description: `Sends coordinates of user slayer miniboss spawns to chat ${BLUE}(sounds must be ${GREEN}ON${BLUE})${GRAY}.`,
    category: "Combat",
    subcategory: "Slayer",
    options: ["OFF", "All Chat", "Party Chat", "Self"],
  })
  miniAlert = 0;

  @SwitchProperty({
    name: "Boss Highlight",
    description: "Shows colorful hitboxes around slayer bosses.",
    category: "Combat",
    subcategory: "Slayer",
  })
  bossHighlight = false;
  @SwitchProperty({
    name: "Miniboss Highlight",
    description: "Shows colorful hitboxes around slayer minibosses.",
    category: "Combat",
    subcategory: "Slayer",
  })
  miniHighlight = false;

  @SliderProperty({
    name: "Slayer Spawn Warning",
    description: `Warns player when slayer boss is about to spawn. Set warning percentage or as 0 to turn ${RED}OFF${GRAY}.`,
    category: "Combat",
    subcategory: "Slayer",
    min: 0,
    max: 100,
  })
  slayerSpawn = 0;

  // ████████████████████████████████████████████████████ MINING ████████████████████████████████████████████████████

  // --- Jinx ---
  @SliderProperty({
    name: "Powder Chest Detect",
    description: `Highlights and counts nearby powder chests. Set block range of detection radius or as 0 to turn ${RED}OFF${GRAY}.
Move GUI with ${AQUA}/moveChest${GRAY}.`,
    category: "Mining",
    subcategory: "Jinx",
    min: 0,
    max: 128,
  })
  powderChest = 0;

  @SelectorProperty({
    name: "Powder Chest Hider",
    description: "Removes specified chat messages from powder chest openings.",
    category: "Mining",
    subcategory: "Jinx",
    options: ["OFF", "Items", "Powder", "All"],
  })
  powderHider = 0;

  @SliderProperty({
    name: "Powder Tracker",
    description: `Displays powders' rate of gain. Set minutes of inactivity required for tracker to reset or as 0 to turn ${RED}OFF${GRAY}.
Move GUI with ${AQUA}/movePowder ${GRAY}or reset tracker with ${AQUA}/resetPowder${GRAY}.`,
    category: "Mining",
    subcategory: "Jinx",
    min: 0,
    max: 10,
  })
  powderTracker = 0;

  // --- Mining ---
  @SwitchProperty({
    name: "Pick Display",
    description: `Displays all pickaxe abilities as an overlay and alerts when they are off cooldown. Move GUI with ${AQUA}/movePick${GRAY}.`,
    category: "Mining",
    subcategory: "Mining",
  })
  pickDisplay = false;

  @SwitchProperty({
    name: "Wishing Compass Locator",
    description: `Attempts to use 2 wishing compass uses to estimate important locations ${BLUE}(more accurate when used further apart)${GRAY},`,
    category: "Mining",
    subcategory: "Mining",
  })
  compassLocator = false;

  // --- Shaft ---
  @SwitchProperty({
    name: "Commission Announce",
    description: "Alerts user whenever a commission is completed.",
    category: "Mining",
    subcategory: "Shaft",
  })
  commissionAnnounce = false;

  @SwitchProperty({
    name: "Commissions Display",
    description: `Displays mining commissions from tab list onto screen as an overlay. Move GUI with ${AQUA}/moveCommissions${GRAY}.`,
    category: "Mining",
    subcategory: "Shaft",
  })
  commissionsDisplay = false;

  @SelectorProperty({
    name: "Commission Waypoints",
    description:
      "Renders a text waypoint to any gemstone location needed for a commission. Optionally draws line to closest waypoints.",
    category: "Mining",
    subcategory: "Shaft",
    options: ["OFF", "Waypoint", "Line", "Both"],
  })
  commissionWaypoints = 0;

  @SwitchProperty({
    name: "Corpse Announce",
    description:
      "Announces corpse location to party chat if it has yet to be announced. Only announces corpse you loot.",
    category: "Mining",
    subcategory: "Shaft",
  })
  corpseAnnounce = false;

  @SwitchProperty({
    name: "Corpse Waypoints",
    description: `Display waypoints for nearby corpses. ${DARK_RED}Technically uses ESP so UAYOR!`,
    category: "Mining",
    subcategory: "Shaft",
  })
  corpseWaypoints = false;

  @SwitchProperty({
    name: "Fossil Helper",
    description:
      "Highlights which slot has the highest probability of being a fossil piece. Sometimes bugs if server lags, but will update if you just click the side.",
    category: "Mining",
    subcategory: "Shaft",
  })
  fossilHelper = false;

  @SwitchProperty({
    name: "Shaft Transfer",
    description:
      "Attempts to use various party transfer chat commands if you discover a mineshaft.",
    category: "Mining",
    subcategory: "Shaft",
  })
  shaftTransfer = false;

  // ████████████████████████████████████████████████████ FARMING ████████████████████████████████████████████████████

  // --- Garden ---
  @SelectorProperty({
    name: "Composter Display",
    description:
      "Alerts player when composter is inactive or display time until it is inactive.",
    category: "Farming",
    subcategory: "Garden",
    options: ["OFF", "Inactive Title", "Time Overlay"],
  })
  compostTab = 0;

  @SwitchProperty({
    name: "Garden Plot Box",
    description: `Draws a bounding box on the current plot player is in. Also renders `,
    category: "Farming",
    subcategory: "Garden",
  })
  gardenBox = false;

  @SwitchProperty({
    name: "Garden Tab Display",
    description: `Displays garden visitors outside of tab menu.\nMove GUI with ${AQUA}/moveVisitors${GRAY}.`,
    category: "Farming",
    subcategory: "Garden",
  })
  gardenTab = false;

  // --- Pests ---
  @SwitchProperty({
    name: "Desk Highlight",
    description: `Highlights plots in desk menu in ${RED}RED ${GRAY}if infested or in ${GREEN}GREEN ${GRAY}if sprayed. Also changes stack size of plot to count/time.`,
    category: "Farming",
    subcategory: "Pests",
  })
  deskHighlight = false;

  @SliderProperty({
    name: "Infested Alert",
    description: `Set minimum amount of pests must be on garden to display infestation alert or as 0 to turn ${RED}OFF${GRAY}.`,
    category: "Farming",
    subcategory: "Pests",
    min: 0,
    max: 8,
  })
  infestationAlert = 0;

  @SwitchProperty({
    name: "Pest Alert",
    description: "Displays a title on screen when any pests spawn.",
    category: "Farming",
    subcategory: "Pests",
  })
  pestAlert = false;

  @SwitchProperty({
    name: "Pesthunter Display",
    description: `Tracks and warns when the pesthunter bonus runs out.\nMove GUI with ${AQUA}/moveBonus${GRAY}.`,
    category: "Farming",
    subcategory: "Pests",
  })
  pesthunterBonus = false;

  @SwitchProperty({
    name: "Spray Display",
    description: `Tracks and warns when sprays on any plot expires.\nMove GUI with ${AQUA}/moveSpray${GRAY}.`,
    category: "Farming",
    subcategory: "Pests",
  })
  sprayDisplay = false;

  // ████████████████████████████████████████████████████ EVENT ████████████████████████████████████████████████████

  // --- Chocolate Factory ---
  @SwitchProperty({
    name: "Chocolate Overlay",
    description:
      "Renders a GUI element that displays current chocolate production data.",
    category: "Event",
    subcategory: "Chocolate Factory",
  })
  chocoDisplay = false;

  @SwitchProperty({
    name: "Egg Timers",
    description:
      "Displays overlay off how long until an egg spawns. Also shows title whenever an egg spawns.",
    category: "Event",
    subcategory: "Chocolate Factory",
  })
  eggTimers = false;

  @SwitchProperty({
    name: "Egg Waypoints",
    description: `Display waypoints for nearby eggs. ${DARK_RED}Technically uses ESP so UAYOR!`,
    category: "Event",
    subcategory: "Chocolate Factory",
  })
  chocoWaypoints = false;

  @SelectorProperty({
    name: "Rabbit Highlight",
    description:
      "Highlights the worker with the best cost to production ratio.",
    category: "Event",
    subcategory: "Chocolate Factory",
    options: ["OFF", "All", "Only Workers", "No Tower"],
  })
  rabbitHighlight = 0;

  @SelectorProperty({
    name: "Stray Alert",
    description: `Calls an emergency meeting whenever a stray rabbit appears.`,
    category: "Event",
    subcategory: "Chocolate Factory",
    options: ["OFF", "All", "Gold"],
  })
  strayAlert = 0;

  // --- Diana ---
  @SwitchProperty({
    name: "Diana Waypoint",
    description: `Estimates theoretical burrow location using particles and pitch of Ancestral Spade cast ${BLUE}(POV Soopy servers are down)${GRAY}.
Particles must be ${GREEN}ON ${GRAY}and use ${AQUA}/togglemusic ${GRAY}to turn music ${RED}OFF${GRAY}.`,
    category: "Event",
    subcategory: "Mythological Ritual",
  })
  dianaWaypoint = false;
  @SwitchProperty({
    name: "Diana Warp",
    description: `Set keybind in controls to warp to the location closest to estimation.\nSet wanted warps with ${AQUA}/va warplist${GRAY}.`,
    category: "Event",
    subcategory: "Mythological Ritual",
  })
  dianaWarp = false;

  @SelectorProperty({
    name: "Burrow Detection",
    description:
      "Detects, alerts, and creates waypoints to nearby burrow particles.",
    category: "Event",
    subcategory: "Mythological Ritual",
    options: [
      "OFF",
      "ON",
      "w/ Amogus Alert",
      "w/ Chat Alert",
      "w/ Both Alerts",
    ],
  })
  burrowDetect = 0;

  // --- Great Spook ---
  @SwitchProperty({
    name: "Math Teacher Solver",
    description: "Solves the math equation for those with feeble minds.",
    category: "Event",
    subcategory: "Great Spook",
  })
  mathSolver = false;

  @SwitchProperty({
    name: "Primal Fear Alert",
    description:
      "Plays a sound and shows title when a primal fear is able to be spawned.",
    category: "Event",
    subcategory: "Great Spook",
  })
  fearAlert = false;

  // --- Inquisitor ---
  @SwitchProperty({
    name: "Detect Inquisitor",
    description: "Alerts player of nearby Inquisitors.",
    category: "Event",
    subcategory: "Inquisitor",
  })
  detectInq = false;

  @SelectorProperty({
    name: "Announce Inquisitor Chat",
    description: "Sends coordinates of user Inquisitor spawns to chat.",
    category: "Event",
    subcategory: "Inquisitor",
    options: ["OFF", "All Chat", "Party Chat", "Self"],
  })
  inqAlert = 0;

  @SelectorProperty({
    name: "Inquisitor Counter",
    description: `Tracks average kills of Inquisitor spawns.\nMove GUI with ${AQUA}/moveInq ${GRAY}or reset tracker with ${AQUA}/resetInq${GRAY}.`,
    category: "Event",
    subcategory: "Inquisitor",
    options: ["OFF", "Overall View", "Session View"],
  })
  inqCounter = 0;

  // --- SkyBlock ---
  @SelectorProperty({
    name: "Bingo Card Overlay",
    description: `Displays bingo card goals on screen as an overlay.\nMove GUI with ${AQUA}/moveBingo${GRAY}.`,
    category: "Event",
    subcategory: "SkyBlock",
    options: ["OFF", "All", "Personal", "Community"],
  })
  bingoCard = 0;

  @SwitchProperty({
    name: "Calendar Time",
    description:
      "Adds the local start and end time to the tooltip of calendar events.",
    category: "Event",
    subcategory: "SkyBlock",
  })
  calendarTime = false;

  // ████████████████████████████████████████████████████ CRIMSON ISLES ████████████████████████████████████████████████████

  // --- Fishing ---
  @SelectorProperty({
    name: "Announce Mythic Creature Spawn",
    description:
      "Sends coordinates of user mythic lava creature spawns to chat.",
    category: "Crimson Isles",
    subcategory: "Fishing",
    options: ["OFF", "All Chat", "Party Chat", "Self"],
  })
  mythicLavaAnnounce = 0;

  @SwitchProperty({
    name: "Detect Mythic Lava Creature",
    description: "Alerts player of nearby Thunders or Lord Jawbuses.",
    category: "Crimson Isles",
    subcategory: "Fishing",
  })
  mythicLavaDetect = false;

  @SwitchProperty({
    name: "Golden Fish Timer",
    description: `Sets a 4 minute timer on rod cast to track Golden Fish reset.\nMove GUI with ${AQUA}/moveTimer${GRAY}.`,
    category: "Crimson Isles",
    subcategory: "Fishing",
  })
  goldenFishAlert = false;

  @SwitchProperty({
    name: "Trophy Fish Overlay",
    description: `Tracks number of trophy fishes caught and displays rates per hour.
Move GUI with ${AQUA}/moveTrophy ${GRAY}or reset tracker with ${AQUA}/resetTrophy${GRAY}.`,
    category: "Crimson Isles",
    subcategory: "Fishing",
  })
  trophyCounter = false;

  // --- Vanquisher ---
  @SelectorProperty({
    name: "Announce Vanquisher Chat",
    description: `Sends coordinates of user Vanquisher spawns ${BLUE}(only works if Vanquisher Auto-Warp is empty)${GRAY}.`,
    category: "Crimson Isles",
    subcategory: "Vanquisher",
    options: ["OFF", "All Chat", "Party Chat", "Self"],
  })
  vanqAlert = 0;

  @TextProperty({
    name: "Vanquisher Auto-Warp",
    description: `Parties and warps players in list to lobby on user Vanquisher spawn.\nEnable by entering party as [${AQUA}ign1, ign2, ...${GRAY}].`,
    category: "Crimson Isles",
    subcategory: "Vanquisher",
    placeholder: "ign1, ign2, ...",
  })
  vanqParty = "";

  @SelectorProperty({
    name: "Vanquisher Counter",
    description: `Tracks average kills of Vanquisher spawns ${BLUE}(must have Book of Stats)${GRAY}.
Move GUI with ${AQUA}/moveCounter ${GRAY}or reset tracker with ${AQUA}/resetCounter${GRAY}.`,
    category: "Crimson Isles",
    subcategory: "Vanquisher",
    options: ["OFF", "Overall View", "Session View"],
  })
  vanqCounter = 0;

  @SwitchProperty({
    name: "Vanquisher Detection",
    description: `Alerts player of nearby Vanquishers.\nMove GUI with ${AQUA}/moveVanq${GRAY}.`,
    category: "Crimson Isles",
    subcategory: "Vanquisher",
  })
  vanqDetect = false;

  // ████████████████████████████████████████████████████ DUNGEON ████████████████████████████████████████████████████

  // --- Chests ---
  @SwitchProperty({
    name: "Croesus Highlight",
    description: "Highlights not/partially opened chests in Croesus menu.",
    category: "Dungeon",
    subcategory: "Chests",
  })
  croesusHighlight = false;

  @SwitchProperty({
    name: "Dungeon Profit",
    description: `Display overall profit of Dungeon chests.\nMove GUI with ${AQUA}/moveDP${GRAY}.`,
    category: "Dungeon",
    subcategory: "Chests",
  })
  dungeonProfit = false;

  // --- Star Detect ---
  @SelectorProperty({
    name: "Star Mob Highlight",
    description: "Detects star mobs and highlights them in the chosen method.",
    category: "Dungeon",
    subcategory: "Star Detect",
    options: ["OFF", "Highlight", "Box", "Outline"],
  })
  starDetect = 0;
  @ColorProperty({
    name: "Star Highlight Color",
    description: "Choose the highlight color.",
    category: "Dungeon",
    subcategory: "Star Detect",
  })
  starColor = Color.GREEN;

  // ████████████████████████████████████████████████████ KUUDRA ████████████████████████████████████████████████████

  // --- Kuudra ---
  @SwitchProperty({
    name: "Auto '/kv' PF",
    description:
      "Automatically runs `/kv` command whenever a player joins using party finder.",
    category: "Kuudra",
    subcategory: "Kuudra",
  })
  autoKV = false;

  @SwitchProperty({
    name: "Crate Edit",
    description: `Changes the location and size of crate pickup rendering.\nMove GUI with ${AQUA}/moveCrate${GRAY}.`,
    category: "Kuudra",
    subcategory: "Kuudra",
  })
  crateEdit = false;

  @SwitchProperty({
    name: "Kuudra HP Display",
    description:
      "Displays Kuudra's HP as a percent and renders it on the boss.",
    category: "Kuudra",
    subcategory: "Kuudra",
  })
  kuudraHP = false;

  @SwitchProperty({
    name: "Kuudra Spawn",
    description: `Displays a title for where Kuudra spawns in p4 ${BLUE}(requires animation skip, so don't fail @BananaTheBot)${GRAY}. ${DARK_RED}Technically uses ESP so UAYOR!`,
    category: "Kuudra",
    subcategory: "Kuudra",
  })
  kuudraSpawn = false;

  @SwitchProperty({
    name: "Kuudra Splits",
    description: `Displays and records Kuudra splits.\nMove GUI with ${AQUA}/moveSplits ${GRAY}or view splits with ${AQUA}/va splits${GRAY}.`,
    category: "Kuudra",
    subcategory: "Kuudra",
  })
  kuudraSplits = false;

  @SwitchProperty({
    name: "Show Crate Waypoints",
    description: "Creates waypoints to nearby supplies and fuels.",
    category: "Kuudra",
    subcategory: "Kuudra",
  })
  kuudraCrates = false;

  @SwitchProperty({
    name: "Show Supply Piles",
    description: "Creates waypoints to uncompleted supply piles.",
    category: "Kuudra",
    subcategory: "Kuudra",
  })
  kuudraBuild = false;

  // --- Kuudra Alert ---
  @SwitchProperty({
    name: "Kuudra Alerts",
    description: `Alerts player of important events Kuudra. Set toggle with ${AQUA}/va toggles${GRAY}.`,
    category: "Kuudra",
    subcategory: "Kuudra Alert",
  })
  kuudraAlerts = false;

  // --- Kuudra Profit ---
  @SliderProperty({
    name: "Minimum God Roll",
    description: `Set the minimum amount a combo attribute may be to be tracked as a god roll or as 0 to turn ${RED}OFF ${BLUE}(in millions)${GRAY}.`,
    category: "Kuudra",
    subcategory: "Kuudra Profit",
    min: 0,
    max: 250,
  })
  minGR = 50;
  @SwitchProperty({
    name: "Kuudra Profit",
    description: `Display overall profit of Kuudra chests.\nMove GUI with ${AQUA}/moveKP${GRAY}.`,
    category: "Kuudra",
    subcategory: "Kuudra Profit",
  })
  kuudraProfit = false;
  @SelectorProperty({
    name: "Kuudra Profit Tracker",
    description: `Display Kuudra hourly rate of gain. Move GUI with ${AQUA}/moveKPT or reset tracker with ${AQUA}/resetKPT${GRAY}.`,
    category: "Kuudra",
    subcategory: "Kuudra Profit",
    options: ["OFF", "Overall View", "Session View"],
  })
  kuudraProfitTracker = 0;
  @SwitchProperty({
    name: "Tabasco Enjoyer",
    description: `Toggle ${RED}OFF ${GRAY}if you are a cringer without max chili pepper collection.`,
    category: "Kuudra",
    subcategory: "Kuudra Profit",
  })
  maxChili = true;

  // ████████████████████████████████████████████████████ RIFT ████████████████████████████████████████████████████

  // --- Rift ---
  @SwitchProperty({
    name: "DDR Helper",
    description: "Replaces Dance Room titles with custom ones.",
    category: "Rift",
    subcategory: "Rift",
  })
  ddrHelper = false;

  @SliderProperty({
    name: "Enigma Soul Waypoints",
    description: `Set distance at which Enigma Soul waypoints will render or as 0 to turn ${RED}OFF${GRAY}.`,
    category: "Rift",
    subcategory: "Rift",
    min: 0,
    max: 128,
  })
  enigmaWaypoint = 0;

  @SwitchProperty({
    name: "Montezuma Soul Waypoints",
    description: "Displays waypoints of nearby discord kittens.",
    category: "Rift",
    subcategory: "Rift",
  })
  catWaypoint = false;

  // --- Vampire ---
  @SelectorProperty({
    name: "Announce Mania Phase",
    description: "Sends coordinates when user's Vampire boss goes into mania.",
    category: "Rift",
    subcategory: "Vampire",
    options: ["OFF", "All Chat", "Party Chat", "Self"],
  })
  announceMania = 0;

  @SwitchProperty({
    name: "Effigy Waypoint",
    description: "Displays waypoints of inactive Blood Effigies.",
    category: "Rift",
    subcategory: "Vampire",
  })
  effigyWaypoint = true;

  @SwitchProperty({
    name: "Enlarge Impel Message",
    description: "Converts Impel messages to be disturbingly noticable.",
    category: "Rift",
    subcategory: "Vampire",
  })
  vampireImpel = false;

  @SwitchProperty({
    name: "Vampire Hitbox",
    description:
      "Renders a small box around the vampire and colors it in when boss is steakable.",
    category: "Rift",
    subcategory: "Vampire",
  })
  vampireHitbox = false;

  @SwitchProperty({
    name: "Vampire Attack Display",
    description: `Displays time of Mania, Twinclaws, and Ichor attacks.\nMove GUI with ${AQUA}/moveVamp${GRAY}.`,
    category: "Rift",
    subcategory: "Vampire",
  })
  vampireAttack = false;
}

export default new Settings();
