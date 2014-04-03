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
	if (found == Math.pow(2,n)) {
		console.log("Coupon data : " + CouponsData[n][maxInd + n].toString())
	} else {
		console.log("Coupon data : " + CouponsData[n]['not_found'].toString())
	}
}

exports.CouponsTest = CouponsTest