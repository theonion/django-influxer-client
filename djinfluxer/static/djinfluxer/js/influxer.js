module.exports = {

  /**
   * initializes the object that fires the request to influxer
   */
  init: function (influxer_gif) {
    this.influxer_gif = influxer_gif;
  },

  /**
   * creates a dummy image, sets the source to influxer and sends off the request
   */
  sendEvent: function (options) {
    this.event = options.event;
    this.site = options.site || this.getSite();
    this.contentId = options.contentId || this.getContentId();
    this.path = options.path || this.getPath();
    this.cacheBuster = this.getCacheBuster();
    var url = this.influxer_gif +
      '?' + this.cacheBuster +
      '&site=' + this.site +
      '&content_id=' + this.contentId +
      '&event=' + this.event +
      '&path=' + this.path;
    var img = new Image();
    img.src = url;
    return img;
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
    var location = this.getWindowLocation();
    var hostname = location.hostname;
    var hostnameParts = hostname.split('.');
    return hostnameParts[hostnameParts.length - 2];
  },

  /**
   * gets the content id or null from the path to send to influxer
   */
  getContentId: function () {
    var location = this.getWindowLocation();
    var pathname = location.pathname;
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
    var location = this.getWindowLocation();
    return location.pathname;
  },

  /**
   * gets the current date
   */
  getCacheBuster: function () {
    return (new Date()).getTime();
  }
};
