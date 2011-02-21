var websocket_address = "ws://localhost:8000";
var circular_pixels = true; /* False for square */  
  
var canvas;
var ctx;
var ws;

var frameCount;
var lastTime;

window.onload = function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  blank();
  
  frameCount = 0;
  lastTime = (new Date).getTime();
  
  connect();
};

function connect() {
  ws = new WebSocket(websocket_address);
  
  ws.onopen = function() {
    document.getElementById('connection').innerHTML = 'Status: connected';
  }
  
  ws.onmessage = function(e) {
    var data = JSON.parse(e.data);
    
    if (data['status'] == 'ok') {
      blank();
      var size = data['size'];
      var frame = data['frame'];
      
      var xo = size[0];
      var xf = canvas.width / (size[2]-size[0]);
      var yo = size[1];
      var yf = canvas.height / (size[3]-size[1]);
      
      var pixelWidth = xf;
      var pixelHeight = yf;
      var pixelRadius = Math.min(xf, yf) / 2.0;
      
      for (var i = 0; i < frame.length; i++) {
        var pos = frame[i][0];
        var clr = frame[i][1];
        
        var x = (pos[0] - xo) * xf;
        var y = (pos[1] - yo) * yf;
        
        ctx.fillStyle = clr;
        ctx.strokeStyle = clr;
        
        if (circular_pixels) {
          ctx.beginPath();
          ctx.arc(x, y, pixelRadius, 0, Math.PI*2, true);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(x, y, pixelWidth, pixelHeight);
        }
      }
      
      if (frameCount == 30) {
        frameCount = 0;
        var t = (new Date).getTime();
        var dt = t - lastTime;
        var fr = 30 / (dt / 1000.0);
        document.getElementById('framerate').innerHTML = 'Framerate: ' + fr.toFixed(2) + ' fps';
      
        lastTime = t;
      }
      
      frameCount += 1;
      
    } else if (data['status'] == 'exiting') {
      document.getElementById('framerate').innerHTML = '';
      ws.close();
    }
  };
  
  ws.onclose = function() {
    document.getElementById('connection').innerHTML = 'Status: disconnected';
    blank();
    setTimeout(connect, 2000);
  }
}

function blank() {
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
