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

csAudio.load = function(options){
	var pathSplit = options.path.split('/');
	var name = pathSplit.pop();
	var path = pathSplit.toString('/');
	var types = (options.extension ? options.extension : 'wav').split(',');

	this.list[name] = {};
	for(var i in types){
		var type = types[i].trim();
		this.list[name][type] = {
            loaded: false,
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
				csAudio.list[name][type].loaded = true;
			});
		}
		csAudio.list[name][type].request.send();
	}
}

csAudio.play = function(audioName){
    if(this.list[audioName]['wav'].loaded === true){
        var csAudioObj = this.context.createBufferSource();
    	csAudioObj.buffer = this.list[audioName]['wav'].buffer;
    	csAudioObj.connect(this.context.destination);
        csAudioObj.start(0);
        return csAudioObj;
    }
    return undefined;
}
