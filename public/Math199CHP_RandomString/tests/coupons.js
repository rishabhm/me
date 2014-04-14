if (typeof exports == "undefined") {
	exports = this;
}

function generateCoupons(n) {
	if (n==1) {
		return ["1","0"]
	}
	var retVal = []
	generateCoupons(n-1).forEach(function (c) {
		retVal.push("1"+c)
		retVal.push("0"+c)
	})
	return retVal
}

var CouponsTest = function (str, n) {
	var coupons = generateCoupons(n),
		found = 0,
		maxInd = str.indexOf(coupons[0]),
		currInd
	coupons.forEach(function (c) {
		currInd = str.indexOf(c)
		if (currInd > -1) {
			found++
		}
		if (currInd > maxInd) {
			maxInd = currInd
		}
	})

	var p_value

	if (found == Math.pow(2,n)) {
		p_value = CouponsData[maxInd + n]
		return p_value
	} else {
		return Math.max(0.5, CouponsData[str.length])
	}

}

exports.CouponsTest = CouponsTest