from .clients import InfluxerClient


class DummyClient(InfluxerClient):
    """a dummy client that returns an empty list to `get_content` - useful only for travis testing
    """

    def get_content(self, offset, limit=None):
        return []
