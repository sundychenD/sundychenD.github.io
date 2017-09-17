var canvasDiv = document.getElementById('particle-canvas');
var options = {
  particleColor: '#3C485E',
  interactive: true,
  speed: 'medium',
  density: 'high'
};
var particleCanvas = new ParticleNetwork(canvasDiv, options);