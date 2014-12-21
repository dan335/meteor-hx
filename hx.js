Hx = {
	// starts at 0,0
	// adds rings
	// returns an array of hex coordinates [{x:0, y:0}, {x:1, y:0}]
	createHexGrid: function(numRings) {
		check(numRings, Number)

		var hexes = []
		var pos = {x:0, y:0}
		hexes.push({x:pos.x, y:pos.y})

		for (var k = 1; k <= numRings; k++) {
			// move out a ring, has to be direction 4
			pos = this.getNeighbor(pos.x, pos.y, 4)
			for (var i =  0; i < 6; i++) {
				for (var j = 0; j < k; j++) {
					hexes.push({x:pos.x, y:pos.y})
					// move to neighbor in direction i
					pos = this.getNeighbor(pos.x, pos.y, i)
				}
			}
		}

		return hexes
	},



	getNeighbor: function(x, y, direction) {
		check(x, Number)
		check(y, Number)
		check(direction, Number)

		switch(direction) {
			case 0:
				x = x + 1
				break;
			case 1:
				x = x + 1
				y = y - 1
				break;
			case 2:
				y = y - 1
				break;
			case 3:
				x = x - 1
				break;
			case 4:
				x = x - 1
				y = y + 1
				break;
			case 5:
				y = y + 1
				break;
		}

		return {x: x, y: y}
	},


	// This converts from the hex's coordinates to the position it should be drawn at.
	// HexSize is the radius of the hex.
	// HexSquish is how much the hexes should be squished vertically so that they appear to be viewed from an angle instead of straight down.
	coordinatesToPos: function(x, y, hexSize, hexSquish) {
		check(x, Number)
		check(y, Number)

		var posX = hexSize * 3/2 * x
		var posY = hexSize * (Math.sqrt(3) * hexSquish) * (y + x/2)

		return {x:posX, y:posY}
	},


	posToCoordinates: function(x, y, hexSize, hexSquish) {
		check(x, Number)
		check(y, Number)

		var q = 2/3 * x / hexSize
		var r = (1/3 * (Math.sqrt(3) / hexSquish) * y - 1/3 * x) / hexSize

		// just rounding doesn't work, must convert to cube coords then round then covert to axial
		var cube = this.convertAxialToCubeCoordinates(q,r)
		var round = this.roundCubeCoordinates(cube.x, cube.y, cube.z)
		var axial = this.convertCubeToAxialCoordinates(round.x, round.y, round.z)

		return {
			x:axial.x,
			y:axial.y
		}
	},


	convertAxialToCubeCoordinates: function(q,r) {
		check(q, Number)
		check(r, Number)
		return {
			x: q,
			y: -1 * q - r,
			z: r
		}
	},

	convertCubeToAxialCoordinates: function(x,y,z) {
		check(x, Number)
		check(y, Number)
		check(z, Number)

		return {x: x, y: z}
	},

	roundCubeCoordinates: function(x,y,z) {
		check(x, Number)
		check(y, Number)
		check(z, Number)

		var rx = Math.round(x)
		var ry = Math.round(y)
		var rz = Math.round(z)

		var x_diff = Math.abs(rx - x)
		var y_diff = Math.abs(ry - y)
		var z_diff = Math.abs(rz - z)

		if (x_diff > y_diff && x_diff > z_diff) {
			rx = -1 * ry - rz
		} else if (y_diff > z_diff) {
			ry = -1 * rx - rz
		} else {
			rz = -1 * rx - ry
		}

		return {x: rx, y: ry, z: rz}
	},


	hexDistance: function(x1, y1, x2, y2) {
		check(x1, Number)
		check(y1, Number)
		check(x2, Number)
		check(y2, Number)

		return (Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(x1 + y1 - x2 - y2)) / 2
	},


	getSurroundingHexes: function(x, y, numRings) {
		check(x, Number)
		check(y, Number)
		check(numRings, Number)

		var hexes = []

		var pos = {x:x, y:y}
		for (var k=1; k<=numRings; k++) {
			pos = this.getNeighbor(pos.x, pos.y, 4)
			for (var i =  0; i < 6; i++) {		// change direction
				for (var j = 0; j < k; j++) {		// number to get in this direction
					hexes.push({x:pos.x, y:pos.y})
					pos = this.getNeighbor(pos.x, pos.y, i)
				}
			}
		}

		return hexes
	},


	// returns an array with positions of hex verts
	// made to be used with svg
	getHexPolygonVerts: function(pos_x, pos_y, hex_size, hex_squish) {
		check(pos_x, Number)
		check(pos_y, Number)
		check(hex_size, Number)
		check(hex_squish, Number)

		var points = ''
		for (var i = 0; i < 6; i++) {
			var angle = 2 * Math.PI / 6 * i

			var point_x = (hex_size * Math.cos(angle)) + pos_x
			var point_y = (hex_size * Math.sin(angle) * hex_squish) + pos_y

			if (isNaN(point_x) || isNaN(point_y)) {
				return false
			}

			if (i != 0) { points = points + ' '; }		// add space in-between if not first
			points = points + point_x.toString() + ',' + point_y.toString()		// concat into string
		}
		return points
	},


	// returns [{x:x,y:y}, {x:x,y:y}, ...]
	// made to use with canvas
	getHexVertPositions: function(pos_x, pos_y, hex_size, hex_squish) {
		check(pos_x, Number)
		check(pos_y, Number)
		check(hex_size, Number)
		check(hex_squish, Number)

		var points = []
		for (var i = 0; i < 6; i++) {
			var angle = 2 * Math.PI / 6 * i

			var point = {}
			point.x = (hex_size * Math.cos(angle)) + pos_x
			point.y = (hex_size * Math.sin(angle) * hex_squish) + pos_y

			if (isNaN(point.x) || isNaN(point.y)) {
				return false
			}

			points.push(point)
		}
		return points
	}


}
