var howler = require( 'howler' );

var mixinSound = {

  playMusicById(id) {
    var soundName = '';

    switch(id) {
      case '1':
        soundName = 'classic';
        break
      case '2':
        soundName = 'funny';
        break;
      case '3':
        soundName = 'modern';
        break;
      default:
        soundName = 'classic';
    }

    var sound = new howler.Howl({
      urls: ['audio/'+soundName+'.mp3'],
      volume: 0.8,
      sprite: { preview: [0, 3000] }
    });
    sound.fade(0.0, 0.8, 500);

    return { 
      play: function() {
        sound.play('preview');
      },
      stop: function() {
        sound.stop();
      }
    };
  }

};

module.exports = mixinSound;
