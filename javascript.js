var csAudio = {};
csAudio.init = function(){
	this.list = {};
	try {
		window.AudioContext = 
			window.AudioContext || window.webkitAudioContext;
		this.canPlayAudio = true;
		this.context = new AudioContext();
	} catch (e) {
		this.canPlayAudio = false;
		this.context = undefined;
		alert('Web Audio API is not supported in this browser');
	}
	return this;
}

csAudio.load = function(path, types){
	var pathSplit = path.split('/');
	var name = pathSplit.pop();
	var path = pathSplit.toString('/');
	var types = types.split(',');

	this.list[name] = {};
	for(var i in types){
		var type = types[i].trim();
		this.list[name][type] = {
			path : path 
				+ '/' + name 
				+ '.' + type,
			buffer: null,
			request: new XMLHttpRequest()
		}

		csAudio.list[name][type].request.csData = { name: name, type: type }
		csAudio.list[name][type].request.open('GET', csAudio.list[name][type].path, true);
		csAudio.list[name][type].request.responseType = 'arraybuffer';

		csAudio.list[name][type].request.onload = function(){
			console.log(this.csData);
			var name = this.csData.name;
			var type = this.csData.type;
			csAudio.context.decodeAudioData(this.response, function(buffer){
				csAudio.list[name][type].buffer = buffer;
			});
		}
		csAudio.list[name][type].request.send();
	}
}

csAudio.play = function(name){
	var source = this.context.createBufferSource(); 
	source.buffer = csAudio.list[name]['wav'].buffer;

	source.connect(this.context.destination);
	source.start(0);
}