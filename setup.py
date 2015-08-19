from distutils.core import setup


setup(
    name="django-influxer-client",
    version="2.0.1",
    description="Modules and JS to work with Django-Influxer integration",
    author="Vince Forgione",
    author_email="vforgione@theonion.com",
    url="https://github.com/theonion/django-influxer-client",
    packages=["djinfluxer"],
    install_requires=[
        "influxdb",
    ]
)
