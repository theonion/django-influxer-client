module.exports = {

  /**
   * initializes the object that fires the request to influxer
   */
  init: function (influxer_gif, event) {
    this.influxer_gif = influxer_gif;
    this.event = event;
    this.location = this.getWindowLocation();
    this.site = this.getSite();
    this.contentId = this.getContentId();
    this.path = this.getPath();
    this.cacheBuster = (new Date()).getTime();
  },

  /**
   * gets window.location... ugh
   */
  getWindowLocation: function () {
    return window.location;
  },

  /**
   * gets the site name to send to influxer
   */
  getSite: function () {
    var hostname = this.location.hostname;
    var hostnameParts = hostname.split('.');
    return hostnameParts[hostnameParts.length - 2];
  },

  /**
   * gets the content id or null from the path to send to influxer
   */
  getContentId: function () {
    var pathname = this.location.pathname;
    var urlRegex = /^.*\-\d+$/;
    var extractionRegex = /\d+$/gm;
    var contentId = null;
    if (urlRegex.test(pathname)) {
      contentId = pathname.match(extractionRegex)[0];
    } else {
      contentId = pathname;
    }
    if (contentId == undefined) {
      contentId = null;
    }
    return contentId;
  },

  /**
   * gets the current path
   */
  getPath: function () {
    return this.location.pathname;
  },

  /**
   * creates a dummy image, sets the source to influxer and sends off the request
   */
  sendEvent: function () {
    var url = this.influxer_gif +
      '?' + this.cacheBuster +
      '&site=' + this.site +
      '&content_id=' + this.contentId +
      '&event=' + this.event +
      '&path=' + this.path;
    var img = new Image();
    img.src = url;
    return img;
  }
};
