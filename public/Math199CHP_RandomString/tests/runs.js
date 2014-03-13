var RunsTest = (function () {
	
	function RunsTest() {
		return this
	}

	RunsTest.prototype.calcRuns = function (str) {
		var count = 0
		str = str.slice(-100)
		for (var i=0; i<str.length-1; i++) {
			if (str[i]!=str[i+1])
				count++
		}
		return count
	}

	RunsTest.prototype.calcRunsArr = function (arr) {
		var result = [],
			self = this
		arr.forEach(function (str) {
			result.push(self.calcRuns(str))
		})
		return result
	}

	return RunsTest
})()

// exports.runs = RunsTest