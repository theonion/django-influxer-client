from django.contrib.auth import get_user_model
from django.test import TestCase
from requests.exceptions import ConnectionError

from .clients import InfluxerClient
from .dummy import DummyClient
from .models import Point
from .utils import is_time_offset_valid, get_django_instance_from_point


class PointTests(TestCase):
    """tests methods of the Point object
    """

    def setUp(self):
        """create two, non-equal point objects
        """
        self.point1 = Point("onion", 123, 10, "pageview", "/articles/read-this-123")
        self.point2 = Point("onion", 456, 21, "pageview", "/articles/read-this-too-456")

    def test__lt(self):
        """tests the __lt__ method of Point
        """
        self.assertLess(self.point1, self.point2)


class ClientTests(TestCase):
    """tests methods of the InfluxerClient object
    """

    def setUp(self):
        """sets up a client to an influxdb service at root:root@localhost:8086
        """
        self.client = InfluxerClient("127.0.0.1", 8086, "root", "root", "influxdb", "test", False, None)

    def test__get_content(self):
        """tests the get_content method of InfluxerClient - will skip if connection errs
        """
        try:
            points = self.client.get_content("100000w", limit=10)
            for point in points:
                self.assertIsInstance(point, Point)
        except ConnectionError:
            return


class DummyClientTests(TestCase):
    """tests methods of the DummyClient object
    """

    def setUp(self):
        """sets up a client to an influxdb service at root:root@localhost:8086
        """
        self.client = DummyClient("127.0.0.1", 8086, "root", "root", "influxdb", "test", False, None)

    def test__get_content(self):
        """tests the get_content method returns an empty list
        """
        points = self.client.get_content("1d")
        self.assertEqual(points, [])


class UtilTests(TestCase):
    """tests functions in the utils module
    """

    def test__is_time_offset_valid(self):
        """tests is_time_offset_valid
        """
        valid_offsets = ("u", "s", "m", "h", "d", "w")
        invalid_offsets = ("y", "microsecond", "minute")
        for index, offset in enumerate(valid_offsets):
            good = "{}{}".format(index, offset)
            self.assertTrue(is_time_offset_valid(good))
            bad = "a{}".format(offset)
            self.assertFalse(is_time_offset_valid(bad))
        for index, offset in enumerate(invalid_offsets):
            bad = "{}{}".format(index, offset)
            self.assertFalse(is_time_offset_valid(bad))

    def test__get_django_instance_from_point(self):
        """tests get_django_instance_from_point
        """
        User = get_user_model()
        user = User.objects.create(username="test", password="user", email="test.user@example.com")
        point = Point("onion", user.pk, "whatever, this doesn't matter in this example")
        method = User.objects.get
        field = "pk"
        instance = get_django_instance_from_point(method, field, point)
        self.assertIsInstance(instance, User)
