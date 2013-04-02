#!/usr/bin/env python

from distutils.core import setup
from setuptools import find_packages


version = '1.2.2'

classifiers = [
    "Development Status :: 5 - Production/Stable",
    "Intended Audience :: Developers",
    "License :: Other/Proprietary License",
    "Programming Language :: Python",
    "Operating System :: OS Independent",
    "Topic :: Software Development :: Libraries",
    "Topic :: Utilities",
    "Environment :: Web Environment",
    "Framework :: Django",
]

long_desc = open('README.rst').read()

setup(
    name='django-redactor',
    version=version,
    url='http://github.com/mazelife/django-redactor/',
    author='James Stevenson',
    author_email='james.m.stevenson at gmail dot com',
    license='CC licence, see LICENSE.txt',
    packages=find_packages(),
    description=(
        'Integrates the Redactor Javascript WYSIWYG editor with Django.'
    ),
    classifiers=classifiers,
    long_description=long_desc,
    install_requires=['django>=1.3.1'],
    include_package_data=True,
    zip_safe=False
)
