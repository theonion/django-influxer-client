describe('Influxer', function () {
  var influxer_gif = 'http://influxer.local/influxer.gif';
  var influxer;

  beforeEach(function () {
    influxer = require('./influxer');
  });

  describe('#init', function () {
    beforeEach(function () {
      influxer.init(influxer_gif);
    });

    it('sets `influxer_gif`', function () {
      expect(influxer.influxer_gif).to.not.eql(null);
      expect(influxer.influxer_gif).to.not.eql(undefined);
    });
  });

  describe('#getSite', function () {
    beforeEach(function () {
      sinon.stub(influxer, 'getWindowLocation').returns({
        hostname: 'barf.onion.com',
        pathname: '/articles/you-should-be-reading-this-123456'
      });
      influxer.init(influxer_gif);
    });

    afterEach(function () {
      influxer.getWindowLocation.restore();
    });

    it('gets the site name from the hostname', function () {
      var site = influxer.getSite();
      expect(site).to.eql('onion');
    });
  });

  describe('#getContentId', function () {
    beforeEach(function () {
      sinon.stub(influxer, 'getWindowLocation').returns({
        hostname: 'barf.onion.com',
        pathname: '/articles/you-should-be-reading-this-123456'
      });
      influxer.init(influxer_gif);
    });

    afterEach(function () {
      influxer.getWindowLocation.restore();
    });

    it('gets the content id name from the pathname', function () {
      var contentId = influxer.getContentId();
      expect(contentId).to.eql('123456');
    });
  });

  describe('#getPath', function () {
    beforeEach(function () {
      sinon.stub(influxer, 'getWindowLocation').returns({
        hostname: 'barf.onion.com',
        pathname: '/articles/you-should-be-reading-this-123456'
      });
      influxer.init(influxer_gif);
    });

    afterEach(function () {
      influxer.getWindowLocation.restore();
    });

    it('gets the content id name from the pathname', function () {
      var path = influxer.getPath();
      expect(path).to.eql('/articles/you-should-be-reading-this-123456');
    });
  });

  describe('#sendEvent', function () {
    beforeEach(function () {
      sinon.stub(influxer, 'getWindowLocation').returns({
        hostname: 'barf.onion.com',
        pathname: '/articles/you-should-be-reading-this-123456'
      });
      sinon.stub(influxer, 'getCacheBuster').returns('789');
      influxer.init(influxer_gif);
    });

    afterEach(function () {
      influxer.getWindowLocation.restore();
      influxer.getCacheBuster.restore();
    });

    describe('creates a new dummy image from requesting its source from influxer', function () {
      it('with just the event name', function () {
        var src = influxer_gif + '?789&site=onion&content_id=123456&event=pageview&path=/articles/you-should-be-reading-this-123456';
        var img = influxer.sendEvent('pageview');
        expect(img.src).to.eql(src);
      });

      it('event, site', function () {
        var src = influxer_gif + '?789&site=barf&content_id=123456&event=pageview&path=/articles/you-should-be-reading-this-123456';
        var img = influxer.sendEvent('pageview', 'barf');
        expect(img.src).to.eql(src);
      });

      it('event, site, contentId', function () {
        var src = influxer_gif + '?789&site=barf&content_id=456789&event=pageview&path=/articles/you-should-be-reading-this-123456';
        var img = influxer.sendEvent('pageview', 'barf', '456789');
        expect(img.src).to.eql(src);
      });

      it('event, site, contentId, path', function () {
        var src = influxer_gif + '?789&site=barf&content_id=456789&event=pageview&path=/crap/';
        var img = influxer.sendEvent('pageview', 'barf', '456789', '/crap/');
        expect(img.src).to.eql(src);
      });
    });
  });
});
