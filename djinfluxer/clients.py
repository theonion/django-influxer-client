from influxdb import InfluxDBClient

from .models import Point
from .utils import is_time_offset_valid


class InfluxerClient(object):

    def __init__(self, host, port, username, password, database, series, ssl=False, timeout=None):
        """initializes a client

        :param host: the host to connect to - can be a hostname or an ip address
        :type host: str

        :param port: the port number to connect on the host
        :type port: int

        :param username: the username to connect with - should have at least read access
        :type username: str

        :param password: the password for the username
        :param password: str

        :param database: the name of the database to connect to
        :type database: str

        :param series: the name of the series to read from
        :type series: str

        :param ssl: should we connect using ssl
        :type ssl: bool

        :param timeout: time it takes to drop a connection
        :type timeout: int
        """
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.database = database
        self.series = series
        self.ssl = ssl
        self.timeout = timeout
        self._client = InfluxDBClient(
            self.host, self.port, self.username, self.password, self.database, ssl=self.ssl, timeout=self.timeout)

    def get_content(self, offset, limit=None):
        """gets content from the client's series

        :param offset: the time offset to query by
        :type offset: str

        :param limit: cap on the number of results
        :type limit: int

        :return: data points that match the offset capped by the limit
        :rtype: list
        """
        if not is_time_offset_valid(offset):
            raise Exception("The offset provided is not valid.")

        query = "SELECT content_id, sum(value) as value " \
                "FROM {series} " \
                "WHERE time > now() - {offset} " \
                "GROUP BY content_id;".format(series=self.series, offset=offset)

        results = self._client.query(query)
        points = []
        for result in results:
            name = result["name"]
            columns = result["columns"]
            for point in result["points"]:
                obj = dict(zip(columns, point))
                obj['site'] = name
                points.append(Point(**obj))

        return sorted(points, key=lambda p: p.value, reverse=True)
