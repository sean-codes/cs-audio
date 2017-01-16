# cs-audio
Experimenting with cross platform audio solution. Targeting on modern browsers
>Note: This is template project I'm using to get audio into CS-Engine and not meant to stand alone

#Usage
>Pre code thoughts

	var audio = new csAudio();
	//Loading Audio
	audio.load('myAudio', 'wav, ogg');

	//Hold audio for using
	var mySound = audio.use('myAudio');

	//Playing
	mySound.play();

	//Stopping
	mySound.stop();

	//Reset to beginning also called once audio stops
	mysound.reset();

	//Change moment in time
	mysound.set(second)
