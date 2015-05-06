from .clients import InfluxerClient


class DummyClient(InfluxerClient):
    """a dummy client that returns an empty list to `get_content` - useful only for travis testing
    """

    @classmethod
    def from_real_client(cls, real_client):
        """

        :param real_client:
        :return:
        """
        return cls(
            real_client.host, real_client.port, real_client.username, real_client.password, real_client.database,
            real_client.series, real_client.ssl, real_client.timeout
        )

    def get_content(self, offset, limit=None):
        return []
