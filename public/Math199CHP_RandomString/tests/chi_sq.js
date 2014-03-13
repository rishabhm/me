var ChiSquare = (function () {

	function ChiSquare(n) {
		this.block_length = n
		this.blocks = this.generateBlocks(n)
		return this
	}

	ChiSquare.prototype.getProbability = function (deg, cs) {
		var probabilities = {
			0 : [ 0.995, 0.990, 0.975, 0.950,0.900, 0.100, 0.050, 0.025, 0.010, 0.005],
			3 : [0.072,0.115,0.216,0.352,0.584,6.251,7.815,9.348,11.345,12.838],
			7 : [0.989,1.239,1.690,2.167,2.833,12.017,14.067,16.013,18.475,20.278],
			15 : [4.601,5.229,6.262,7.261,8.547,22.307,24.996,27.488,30.578,32.801]
		}

		for (var i=1; i<probabilities[deg].length; i++) {
			if (cs < probabilities[deg][i])
				return probabilities[0][i-1]
		}

		return 0

	}

	ChiSquare.prototype.calcChiSquare = function (str) {
		// console.log(this.block_length)
		// console.log(str)
		var cs = 0,
			ep = (str.length / this.block_length) / Math.pow(2,this.block_length),
			self = this
		this.blocks.forEach(function (block) {
			var o = 0
			for (var i = 1; i*self.block_length < str.length; i++) {
				if (str.slice((i-1)*self.block_length, i*self.block_length) == block) {
					o++
				}
			}
			// console.log(o, ep)
			cs += (o-ep) * (o-ep) / (ep)
		})
		return cs
	}

	ChiSquare.prototype.calcChiSquareArr = function (arr) {
		var result = [],
			self = this
		arr.forEach(function (str) {
			result.push(parseFloat(self.calcChiSquare(str)))
		})
		return result
	}

	ChiSquare.prototype.setBlockLength = function (n) {
		this.block_length = n
		this.blocks = this.generateBlocks(n)
	}

	ChiSquare.prototype.generateBlocks = function (n) {
		if (n==1) {
			return ['0','1']
		}
		var result = []
		this.generateBlocks(n-1).forEach(function (e) {
			result.push(e+'1')
			result.push(e+'0')
		})
		return result
	}

	return ChiSquare
})()

// exports.ChiSquareTest = ChiSquare