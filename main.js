const Benchmark = require("benchmark");
module.exports = class {
	constructor(tests){
		this.suite = new Benchmark.Suite();
		Object.keys(tests).forEach(key => {
			this.suite.add(key, tests[key]);
		});
		this.suite.on("cycle", function(event) {
		  console.log(event.target.toString());
		}).on("complete", () => {
			const benches = this.suite.filter(Benchmark.benchmarks);
			const fastest = this.suite.filter(Benchmark.benchmarks, "fastest")[0];
			const slowest = this.suite.filter(Benchmark.benchmarks, "slowest")[0];
			const output = benches
				.filter(bench => bench !== fastest)
				.sort((a, b) => b.hz - a.hz);
			console.log(`
Fastest:
${fastest.name} with ${fastest.times.period}s period
Others:
${output.map(bench => `${bench.name}: ${(1 - bench.hz / fastest.hz) * 100}% slower`).join("\n")}`);
		})
	}
	run(){
		this.suite.run({
			async: true
		});
	}
}

