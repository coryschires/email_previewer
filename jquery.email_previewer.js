/**
 * Email Previewer - jQuery plugin which dynamically generates
 * email previews as the user completes specified fields.
 * 
 * Source Code: https://github.com/coryschires/email_previewer
 * 
 * Copyright (c) 2011 Cory Schires (coryschires.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.1.0
 */


(function($) {

  $.fn.extend({
    email_previewer: function(fields) {
      
      var perserve_linebreaks = function(text) {
        var html = text.replace(/\r\n\r\n/g, "</p><p>"),
          html = html.replace(/\r\n/g, "<br />"),
          html = html.replace(/\n\n/g, "</p><p>"),
          html = html.replace(/\n/g, "<br />"),
          html = "<p>"+html+"</p>";
        return html;
      };
      
      var sync_text = function(input, preview) {
        var text = input.val();
        if (input.is('textarea')) {
          text = perserve_linebreaks(text);
        }
        preview.text(text);
      }
      
      return this.each(function() {

        // sync preview on page load
        $.each(fields, function(input, preview) {
          var input = $(input), preview = $(preview);
          sync_text(input, preview);
        });
        
        // create keyup events
        $.each(fields, function(input, preview) {
          var input = $(input), preview = $(preview);
          input.keyup(function() {
            sync_text(input, preview);
          });
        });
        
      });
    }
  })
})(jQuery);
