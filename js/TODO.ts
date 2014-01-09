 /**
 * Priorities - 1-Highest, 5-Lowest
 *
 * TODOs:
 *
 * Inventory:
 * 4 Limit what can go into each equipment slot
 * 3 Limit container contents
 *      - (weight, bulk, quantity e.g belt slot, cannot put into itself)
 *      - weight, bulk
 * 4 Belt, update activate menu
 * 1 Opening bags only hooked onto items created before the open inventory screen
 * 5 merge coins
 * DONE - equiping items
 * DONE - Double click to open/close items with containers
 *
 * Shops:
 * 2 buy/sell
 * 4 identify items services
 * 3 generate all shops
 * 4 - Bjorn sells broken swords, and too good items (Hint: goodsQuality)
 *
 * Monsters:
 * 2 monster stats
 *      - att,
 *      - def,
 * 2 monster drop loot
 * 4 monster special attacks
 *      - ghosts/spectre monsters (move through walls)
 *      - dragons (cast spells)
 *      - giants (throws boulders)
 *      - thieves (steal stuff)
 * DONE - Monster move alternatives
 * DONE - Monster hit hero on structure
 *
 * World:
 * 1 Solid tiles (caves, crops, crap)
 * 4 The hero shouldn't be positioned _on_ the link when entering a new area
 * DONE - Tiles hold containers and can open inventory
 *
 * Story:
 * 5 burnt out farm
 * 5 note on dungeon level last
 * 5 burnt out village
 *
 * Dungeon:
 * 2 Dungeon generation
 *      - Stair maplinks
 * 4 dungeon floor misalign graphical glitch
 * DONE - Corner walls
 *
 * HUD:
 * ACTIVE - Hero status view
 * 3 buttons
 *      - Get,
 *      - Free Hand,
 *      - Search
 * 4 spell buttons
 *
 * Menu:
 * file menu
 * char menu
 * DONE - inventory menu
 * map menu
 * spell menu
 * activate - freehand + belt
 * verbs
 * - rest,
 * - sleep,
 * - open/close,
 * - disarm trap,
 * - look,
 * - climb
 *
 * Hotkeys:
 * 2 c, i, etc...
 *
 * Combat system:
 * 2 basic weapon/armour stats, monster stas
 * 4 fog of war
 * 4 visible sight
 * 3 speed
 *      - walking
 *      - fighting
 * 3 dying
 * 
 * Spell system:
 * 5 everything
 *
 * Game:
 * 5 new game
 * 3 char creation
 * 5 save/load game
 *
 * Game concepts:
 * 5 identifyable items
 *
 *
 *
 *
 * Corridor heuristics:
  * Corridors require:
  * - knowledge of room locations
  * - exits
  * - other corridors
  *
  * Foreach exit, try to create:
  *    1. 2 point corridor (only one from exit in the cardinal direction)
  *    2. 3 point corridors (n-1 from the 2 point working backwards trying the two perpendicular directions)
  *    3. 4 point corridors
  *
  *
  * Heuristics:
  * - Corridors are defined by either 2, 3 or 4 points
  * - Corridors must start at an exit
  * - Corridors will intersect with one of the following: end of map, exit, room, corridor
  * - A heuristic is a set of rules govening how corridors will be formed AND give a point feedback of what this
  * corridor is worth to the dungeon.
  * A. The highest worth heuristic is chosen
  * B. Each heuristic has a probability of being chosen depending on it's rating (rating / Sum of ratings)
  *
  * Corridor definition:
  * - Begins adjacent to a exit
  * - A point for each 45 or 90 deg turn (these are the only turns available)
  * - Ends at another exit or room edge, an intersection or a dead end
  *
  *
  *
  * Deadend - 1:
  * - Hits map end with no other intersection
  *
 */
