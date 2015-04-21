"""
objects to handle stored points in influxdb
"""


class Point(object):
    """
    a piece of information stored in influxdb
    """

    def __init__(self, site, content_id, value, event=None, path=None):
        self.site = site
        self.content_id = content_id
        self.value = value
        self.event = event
        self.path = path

    @classmethod
    def from_query_result(cls, result):
        """creates a new `Point` instance from the query result

        :param result: a result dict from an influxdb query
        :type result: dict

        :return: a new instance of Point
        :rtype: Point
        """
        site = result["name"]
        columns = result["columns"]
        points = result["points"]
        attrs = dict(zip(columns, points))
        attrs["site"] = site
        return Point(**attrs)

    def __lt__(self, other):
        """compares this instance to another based on their `value` attributes

        :param other: the other Point object to compare
        :type other: Point

        :return: is self.value less than the other value
        :rtype: bool
        """
        return self.value < other.value
