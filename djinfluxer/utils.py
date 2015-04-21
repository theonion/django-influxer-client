import re

from django.db.models import Q

valid_time_offset_regex = re.compile(r"^\d+[usmhdw]$")


def is_time_offset_valid(offset):
    """ensures that the given offset is valid to influxdb

    :param offset: the offset string
    :type offset: str

    :return: is this a valid offset
    :rtype: bool
    """
    return re.match(valid_time_offset_regex, offset) is not None


def get_django_instance_from_point(method, field, point):
    """gets a django model instance via the ORM from a point's content id

    >>> method = MyModel.objects.get
    >>> field = "pk"
    >>> point = Point(site="site", content_id=123, value=1)
    >>> instance = get_django_instance_from_point(method, field, point)
    >>> instance
    <MyModel: 123>

    :param method: a django model manager method to get an instance
    :type method: method

    :param field: the name of the django model field that corresponds to a content id
    :type field: str

    :param point: a point object from influxdb
    :type point: Point

    :return: a django model instance
    :rtype: Model
    """
    query = {field: point.content_id}
    return method(Q(**query))
