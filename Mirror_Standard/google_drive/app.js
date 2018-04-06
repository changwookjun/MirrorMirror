var PythonShell = require('python-shell');

var options = {
	mode: 'text',
	pythonPath: '',
	pythonOptions: ['-u'],
	scriptPath: '',
	args: ['value1', 'value2', 'value3']
};

function upload(file_path) {
	console.log('upload : %s', file_path);
	options.args = [file_path]
	PythonShell.run('./google_drive/google-drive-upload.py', options, function(err, results) {
		if (err) throw err;

		console.log('results : %j', results);
		console.log('results.length : %d', results.length);
		console.log('prediction : %s', results[results.length - 1]);
		//callback(results)
	});
}

exports.upload = upload;
