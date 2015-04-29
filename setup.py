from distutils.core import setup


setup(
    name="django-influxer-client",
    version="1.0.8",
    description="Modules and JS to work with Django-Influxer integration",
    author="Vince Forgione",
    author_email="vforgione@theonion.com",
    url="https://github.com/theonion/django-influxer-client",
    packages=["djinfluxer"],
    install_requires=[
        "Django>1.7,<1.8",
        "influxdb==0.1.13",
    ]
)
