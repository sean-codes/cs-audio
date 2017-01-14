# cs-audio
Experimenting with cross platform audio solution. Targeting on modern browsers

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
