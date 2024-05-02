document.addEventListener('DOMContentLoaded', function () {
  // Get the audio element
  var audioPlayer = document.getElementById('audioPlayer');

  // Get the click2play and click2pause elements
  var click2play = document.querySelector('.click2play');
  var click2pause = document.querySelector('.click2pause');

  // Add event listener for play event
  audioPlayer.addEventListener('play', function () {
      // Hide click2play and show click2pause
      click2play.style.display = 'none';
      click2pause.style.display = 'block';
  });

  // Add event listener for pause event
  audioPlayer.addEventListener('pause', function () {
      // Hide click2pause and show click2play
      click2pause.style.display = 'none';
      click2play.style.display = 'block';
  });

  // Function to toggle play/pause state of the audio
  function togglePlay() {
      if (audioPlayer.paused) {
          audioPlayer.play();
      } else {
          audioPlayer.pause();
      }
  }

  // Add click event listener to toggle play/pause when anywhere in the page is clicked
  document.addEventListener('click', togglePlay);
});
