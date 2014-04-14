if (typeof exports == "undefined") {
	exports = this;
}

var ChiSquare = (function () {

	function ChiSquare(n) {
		this.block_length = n
		this.blocks = this.generateBlocks(n)
		return this
	}

	ChiSquare.prototype.getProbability = function (deg, cs) {
		if (parseFloat(cs) > 40)
			return 1
		if (parseFloat(cs) == 0)
			return 0
		return parseFloat(ChiSquareData[deg][parseFloat(cs).toFixed(1)])
	}

	ChiSquare.prototype.calcChiSquare = function (str) {
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
			cs += (o-ep) * (o-ep) / (ep)
		})
		return cs
	}

	ChiSquare.prototype.getBlockBreakdown = function (str) {
		var res = {},
			self = this
		this.blocks.forEach(function (block) {
			var o = 0
			for (var i = 1; i*self.block_length < str.length; i++) {
				if (str.slice((i-1)*self.block_length, i*self.block_length) == block) {
					o++
				}
			}
			res[block] = o
		})
		return res
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

	ChiSquare.prototype.getBlocks = function() {
		return this.blocks
	}

	ChiSquare.prototype.getOverlappingBlockFreq = function (str) {
		var retVal = {}
		for (var i=0; i<str.length - this.block_length; i++) {
			var piece = str.slice(i,i+this.block_length)
			if (!retVal[piece])
				retVal[piece] = 0
			retVal[piece]++
		}
		return retVal
	}

	return ChiSquare
})()

exports.ChiSquareTest = ChiSquare