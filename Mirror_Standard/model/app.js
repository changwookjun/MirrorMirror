var PythonShell = require('python-shell');

var options = {
	mode: 'text',
	pythonPath: '',
	pythonOptions: ['-u'],
	scriptPath: '',
	args: ['value1', 'value2', 'value3']
};

/*
PythonShell.run('Mirror_Mirror.py', options, function(err, results) {
		if (err) throw err;
	
		console.log('results : %j', results);
		console.log('results.length : %d', results.length);
		console.log('prediction : %s', results[results.length - 1]);
		//callback(results)
	});
*/
function predict(callback) {
	PythonShell.run('./model/Mirror_Mirror.py', options, function(err, results) {
		if (err) throw err;
	
		console.log('results : %j', results);
		console.log('results.length : %d', results.length);
		console.log('prediction : %s', results[results.length - 1]);
		callback(results)
	});
}


exports.predicts = predict;
