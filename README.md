meteor-hx
=========

Functions for working with hex grids.  Used in http://dominusgame.net.

meteor add danimal:hx

Exports Hx to client and server.

* Hx.createHexGrid(numRings) - returns an array of hex coordinates [{x:0, y:0}, {x:1, y:0}]
* Hx.getNeighbor(x, y, direction) - returns {x:integer, y:integer}
* Hx.coordinatesToPos(x, y, hexSize, hexSquish) - returns {x:posX, y:posY} - This converts from the hex's coordinates to the position it should be drawn at.  HexSize is the radius of the hex.  HexSquish is how much the hexes should be squished vertically so that they appear to be viewed from an angle instead of straight down.
* Hx.posToCoordinates(x, y, hexSize, hexSquish)
* Hx.convertAxialToCubeCoordinates(q, r)
* Hx.convertCubeToAxialCoordinates(x,y,z)
* Hx.roundCubeCoordinates(x,y,z)
* Hx.hexDistance(x1, y1, x2, y2)
* Hx.getSurroundingHexes(x, y, numRings) - returns array of x and y.  [{x:0, y:0}, {x:1, y:1}]

See http://www.redblobgames.com/grids/hexagons/ for info on hex grids.
