// Get reference to the canvas element
const canvas = document.getElementById('waveformCanvas');
const ctx = canvas.getContext('2d');

// Set canvas width and height
const width = canvas.width;
const height = canvas.height;

// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Load audio file
const audioElement = new Audio('music/sagacite.mp3');
const audioSource = audioContext.createMediaElementSource(audioElement);

// Create analyser node
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048; // FFT size (frequency resolution)

// Connect nodes
audioSource.connect(analyser);
audioSource.connect(audioContext.destination);

// Create buffer for waveform data
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Function to render waveform
function renderWaveform() {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Get waveform data
  analyser.getByteTimeDomainData(dataArray);
  
  // Set style for waveform
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffffff';

  // Begin drawing waveform
  ctx.beginPath();
  
  // Calculate points for drawing waveform
  const sliceWidth = width * 1.0 / bufferLength;
  let x = 0;
  for(let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = v * height / 2;
    
    if(i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    
    x += sliceWidth;
  }

  // Finish drawing waveform
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // Schedule next frame
  requestAnimationFrame(renderWaveform);
}

// Start rendering waveform
renderWaveform();

// Play or pause audio on click
let isPlaying = false;
function togglePlayback() {
  if (isPlaying) {
    audioElement.pause(); // Pause audio playback
  } else {
    audioElement.play(); // Start audio playback
  }
  isPlaying = !isPlaying; // Toggle playback state
}

// Event listener for click to toggle playback
document.addEventListener('click', togglePlayback);

// Function to handle song end event
function handleSongEnd() {
  togglePlayback(); // Toggle playback state
}

// Event listener for song end event
audioElement.addEventListener('ended', handleSongEnd);
