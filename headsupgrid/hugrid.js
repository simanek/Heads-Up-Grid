/*
* Heads-Up Grid
* Simple HTML + CSS grid overlay for web design and development.
*
* Files: hugrid.css, hugrid.js, example.html
*
* Example and documentation at: http://bohemianalps.com/tools/grid
*
* Shurane, thanks for your help! https://github.com/shurane
*
* Copyright (c) 2011 Jason Simanek
*
* Version: 1.5 (09/03/2011)
* Requires: jQuery v1.6+
*
* Licensed under the GPL license:
*   http://www.gnu.org/licenses/gpl.html
*/

// the semicolon at the beginning is there on purpose in order to protect the integrity
// of your scripts when mixed with incomplete objects, arrays, etc.
// TODO is it required?
// ;
(function ($) {
  // "use strict";

  $.headsUpGrid = function(options) {

    var defaults = {
      pageUnits: 'px',
      colUnits: 'px',
      pageWidth: 960,
      columns: 6,
      columnWidth: 140,
      gutterWidth: 24,
      pageTopMargin: 35,
      rowHeight: 20,
      showGridOnload: false
    };

    // Avoid 'this' confusion
    var plugin = this;

    // This will hold the merged default, and user-provided options
    // plugin's properties will be accessible like:
    // plugin.settings.propertyName from inside the plugin or
    // myplugin.settings.propertyName from outside the plugin
    // where "myplugin" is an instance of the plugin
    plugin.settings = {};

    var init = function() {
      plugin.settings = $.extend({}, defaults, options);
      plugin.makehugrid();
    };

    plugin.makehugrid = function() {

      /* Remove Previously Existing Grid Elements */
      $('#hugrid').remove();
      $('#hugridRows').remove();
      $('#hugridUX').remove();

      /* Column Container */
      var hugridDiv = document.createElement("div");
      hugridDiv.id  = "hugrid";

      /* Left Margin Column */
      leftDiv = document.createElement("div");
      leftDiv.className = "mline mlineL";
      hugridDiv.appendChild(leftDiv);

      /* Create plugin.settings.columns */
      for (var i = 0; i < (plugin.settings.columns - 1); i++) {
        colDiv = document.createElement("div");
        colDiv.className = "hugcol";
        hugridDiv.appendChild(colDiv);
        lineLDiv = document.createElement("div");
        lineLDiv.className = "lineL";
        colDiv.appendChild(lineLDiv);
        lineRDiv = document.createElement("div");
        lineRDiv.className = "lineR";
        colDiv.appendChild(lineRDiv);
      }

      /* Right Margin Column */
      rightDiv = document.createElement("div");
      rightDiv.className = "mline mlineR";
      hugridDiv.appendChild(rightDiv);

      document.body.appendChild(hugridDiv);

      /* If Rows */
      if (plugin.settings.rowHeight !== 0)  {
        /* Row Container */
        pageheight     = $(document.body).height();
        var hugridRows = document.createElement("div");
        hugridRows.id  = "hugridRows";
        /* Create Rows */
        for (var j = 0; j < (pageheight / plugin.settings.rowHeight); j++) {
          rowDiv = document.createElement("div");
          rowDiv.className = "hugrow";
          hugridRows.appendChild(rowDiv);
          lineB = document.createElement("div");
          lineB.className = "lineB";
          rowDiv.appendChild(lineB);
        }

        document.body.appendChild(hugridRows);
      }

      /* Apply CSS Properties */
      $('#hugrid').css('width', plugin.settings.pageWidth + plugin.settings.pageUnits);

      if (typeof window.pageleftmargin === 'number') {
        $('#hugrid').css('left', pageleftmargin + plugin.settings.pageUnits);
        $('#hugrid').css('margin', '0');
      } else if (typeof window.pagerightmargin === 'number') {
        $('#hugrid').css('right', pagerightmargin + plugin.settings.pageUnits);
        $('#hugrid').css('left', 'auto');
        $('#hugrid').css('margin', '0');
      } else {
        if (plugin.settings.pageUnits === '%') {
          $('#hugrid').css('left', ((100 - plugin.settings.pageWidth) / 2) + plugin.settings.pageUnits);
          $('#hugrid').css('margin-left', 'auto');
        } else {
          $('#hugrid').css('margin-left', '-' + (plugin.settings.pageWidth / 2) + plugin.settings.pageUnits);
        }
      }

      $('#hugrid div.hugcol').css('margin-left', plugin.settings.columnWidth + plugin.settings.colUnits);
      $('#hugrid div.hugcol').css('width', plugin.settings.gutterWidth + plugin.settings.colUnits);
      $('#hugridRows').css('margin-top', plugin.settings.pageTopMargin + 'px');
      $('#hugridRows div.hugrow').css('margin-top', (plugin.settings.rowHeight - 1) + 'px');

      /* Create hugridUX and button */
      var hugridUX = document.createElement("div");
      hugridUX.id = "hugridUX";
      document.body.appendChild(hugridUX);
      $('#hugridUX').append('<div id="hugridButtonBkgd"></div><button id="hugridButton"></button>');
      $('#hugridButton').append('<span id="hugbuttonON">ON</span>');
      $('#hugridButton').append('<span id="hugbuttonOFF" style="display:none;">OFF</span>');

      /* On/Off Button - click functionality */
      $('#hugridButton').click(function () {
        $('#hugridButton').toggleClass('buttonisoff');
        $('#hugrid').toggle();
        $('#hugridRows').toggle();
        $("#hugridButton span").toggle();
      });

      if (plugin.settings.showGridOnload === false) {
        $('#hugridButton').toggleClass('buttonisoff');
        $('#hugrid').toggle();
        $('#hugridRows').toggle();
        $("#hugridButton span").toggle();
      }
    };

    init();
  };
})(jQuery);