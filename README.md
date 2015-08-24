meteor-hx
=========

Functions for working with hex grids.  Used in http://dominusgame.net.

Instalation
=========

meteor add danimal:hx

Exports Hx to client and server.

Usage
=========

* Hx.hexDimensions(hexSize, hexSquish) - returns width and height of one hex
* Hx.distanceBetweenHexes(hexSize, hexSquish) - distance from midpoint of a hex to midpoint of next hex
* Hx.createHexGrid(numRings) - returns an array of hex coordinates [{x:0, y:0}, {x:1, y:0}]
* Hx.getNeighbor(x, y, direction) - returns {x:integer, y:integer}
* Hx.coordinatesToPos(x, y, hexSize, hexSquish) - returns {x:posX, y:posY} - This converts from the hex's coordinates to the position it should be drawn at.  HexSize is the radius of the hex.  HexSquish is how much the hexes should be squished vertically so that they appear to be viewed from an angle instead of straight down.
* Hx.posToCoordinates(x, y, hexSize, hexSquish)
* Hx.convertAxialToCubeCoordinates(q, r)
* Hx.convertCubeToAxialCoordinates(x,y,z)
* Hx.roundCubeCoordinates(x,y,z)
* Hx.hexDistance(x1, y1, x2, y2)
* Hx.getSurroundingHexes(x, y, numRings) - returns array of x and y.  [{x:0, y:0}, {x:1, y:1}]
* Hx.getHexPolygonVerts(pos_x, pos_y, hex_size, hex_squish, nearestHalfPixel) - returns an array with positions of hex verts [x y x y x y ...]. NearestHalfPixel rounds points to the nearest 0.5 pixel so that lines don't alias.
* Hx.getHexVertPositions(pos_x, pos_y, hex_size, hex_squish, nearestHalfPixel) - returns an array with positions of hex verts [{x:x,y:y}, {x:x,y:y}, ...]
* Hx.getHexesAlongLine(from_x, from_y, to_x, to_y, hex_size, hex_squish) - returns an array with coordinates of hexes along a line between two hexes. [{x:x,y:y}, {x:x,y:y}, ...]

See http://www.redblobgames.com/grids/hexagons/ for info on hex grids.

http://www.gamasutra.com/blogs/HermanTulleken/20140912/225495/20_Fun_Grid_Facts_Hex_Grids.php
