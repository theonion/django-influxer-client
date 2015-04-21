describe('Influxer', function () {
  var influxer_gif = 'http://influxer.local/influxer.gif';
  var event = 'pageview';
  var influxer;

  beforeEach(function () {
    influxer = require('./influxer');
  });

  describe('#init', function () {
    beforeEach(function () {
      sinon.stub(influxer, 'getWindowLocation').returns({
        hostname: 'barf.onion.com',
        pathname: '/articles/you-should-be-reading-this-123456'
      });
      influxer.init(influxer_gif, event);
    });

    afterEach(function () {
      influxer.getWindowLocation.restore();
    });

    it('sets `influxer_gif`', function () {
      expect(influxer.influxer_gif).to.not.eql(null);
      expect(influxer.influxer_gif).to.not.eql(undefined);
    });

    it('sets `event`', function () {
      expect(influxer.event).to.not.eql(null);
      expect(influxer.event).to.not.eql(undefined);
    });

    it('sets `location`', function () {
      expect(influxer.location).to.not.eql(null);
      expect(influxer.location).to.not.eql(undefined);
    });

    it('sets `site`', function () {
      expect(influxer.site).to.not.eql(null);
      expect(influxer.site).to.not.eql(undefined);
    });

    it('sets `contentId`', function () {
      expect(influxer.contentId).to.not.eql(null);
      expect(influxer.contentId).to.not.eql(undefined);
    });

    it('sets `path`', function () {
      expect(influxer.path).to.not.eql(null);
      expect(influxer.path).to.not.eql(undefined);
    });

    it('sets `cacheBuster`', function () {
      expect(influxer.cacheBuster).to.not.eql(null);
      expect(influxer.cacheBuster).to.not.eql(undefined);
    });
  });

  describe('#getSite', function () {
    beforeEach(function () {
      sinon.stub(influxer, 'getWindowLocation').returns({
        hostname: 'barf.onion.com',
        pathname: '/articles/you-should-be-reading-this-123456'
      });
      influxer.init(influxer_gif, event);
    });

    afterEach(function () {
      influxer.getWindowLocation.restore();
    });

    it('gets the site name from the hostname', function () {
      influxer.getSite();
      expect(influxer.site).to.eql('onion');
    });
  });

  describe('#getContentId', function () {
    beforeEach(function () {
      sinon.stub(influxer, 'getWindowLocation').returns({
        hostname: 'barf.onion.com',
        pathname: '/articles/you-should-be-reading-this-123456'
      });
      influxer.init(influxer_gif, event);
    });

    afterEach(function () {
      influxer.getWindowLocation.restore();
    });

    it('gets the content id name from the pathname', function () {
      influxer.getContentId();
      expect(influxer.contentId).to.eql('123456');
    });
  });

  describe('#getPath', function () {
    beforeEach(function () {
      sinon.stub(influxer, 'getWindowLocation').returns({
        hostname: 'barf.onion.com',
        pathname: '/articles/you-should-be-reading-this-123456'
      });
      influxer.init(influxer_gif, event);
    });

    afterEach(function () {
      influxer.getWindowLocation.restore();
    });

    it('gets the content id name from the pathname', function () {
      influxer.getPath();
      expect(influxer.path).to.eql('/articles/you-should-be-reading-this-123456');
    });
  });

  describe('#sendEvent', function () {
    beforeEach(function () {
      sinon.stub(influxer, 'getWindowLocation').returns({
        hostname: 'barf.onion.com',
        pathname: '/articles/you-should-be-reading-this-123456'
      });
      influxer.init(influxer_gif, event);
    });

    afterEach(function () {
      influxer.getWindowLocation.restore();
    });

    it('creates a new dummy image from requesting its source from influxer', function () {
      var src = influxer_gif + '?' + influxer.cacheBuster + '&site=onion&content_id=123456&event=pageview&path=/articles/you-should-be-reading-this-123456';
      var img = influxer.sendEvent();
      expect(img.src).to.eql(src);
    });
  });
});
