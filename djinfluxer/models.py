"""
objects to handle stored points in influxdb
"""


class Point(object):
    """
    a piece of information stored in influxdb
    """

    def __init__(self, site, content_id, value, event=None, path=None, time=None, sequence_number=None):
        self.site = site
        self.content_id = content_id
        self.value = value
        self.event = event
        self.path = path
        self.time = time
        self.sequence_number = sequence_number

    def __str__(self):
        return "<Point: content_id={} value={}>".format(self.content_id, self.value)

    def __repr__(self):
        return str(self)

    def __lt__(self, other):
        """compares this instance to another based on their `value` attributes

        :param other: the other Point object to compare
        :type other: Point

        :return: is self.value less than the other value
        :rtype: bool
        """
        return self.value < other.value
