// Script for stop watch
var sw = {
    /* [INIT] */
    etime : null, // holds HTML time display
    timer : null, // timer object
    now : 0, // current timer
    init : function () {
      // Get HTML elements
      sw.etime = document.getElementById("sw-time");
    },
  
    /* [ACTIONS] */
    tick : function () {
    // tick() : update display if stopwatch running
  
      // Calculate hours, mins, seconds
      sw.now++;
      var remain = sw.now;
      var hours = Math.floor(remain / 3600);
      remain -= hours * 3600;
      var mins = Math.floor(remain / 60);
      remain -= mins * 60;
      var secs = remain;
  
      // Update the display timer
      if (hours<10) { hours = "0" + hours; }
      if (mins<10) { mins = "0" + mins; }
      if (secs<10) { secs = "0" + secs; }
      sw.etime.innerHTML = "<h3 style='color:white;' id='currTimer'>" + hours + ":" + mins + ":" + secs + "</h3>";
    },
  
    start : function () {
    // start() : start the stopwatch
  
      sw.timer = setInterval(sw.tick, 1000);
    },
  
    stop  : function () {
    // stop() : stop the stopwatch
  
      clearInterval(sw.timer);
  
    },
  
    reset : function () {
    // reset() : reset the stopwatch
  
      // Stop if running
      if (sw.timer != null) { sw.stop(); }
  
      // Reset time
      sw.now = -1;
      sw.tick();
    }
  };
  window.addEventListener("load", sw.init);
  