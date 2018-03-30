module.exports = {
	"for loop": () => {
		const fn = a=>a;
		const a = [0,1,2,4];
		for(var i = 0; i < a.length; ++i){
			fn(a[i]);
		}
	},
	"forEach": () => {
		const fn = a=>a;
		const a = [0,1,2,4];
		a.forEach(fn);
	}
};