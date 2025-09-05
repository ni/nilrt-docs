# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'nilrt-docs'
copyright = 'NI'
author = 'NI'

# The full version, including alpha/beta/rc tags
release = '1.0'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'bizstyle'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = []

html_context = {
    'github_repo_url': 'https://github.com/ni/nilrt-docs/',
    'github_branch': 'main/',
    'github_src_path': 'docs/source/',
}

html_sourcelink_suffix = ''

html_sidebars = {
   '**': ['localtoc.html', 'relations.html', 'github_link.html', 'searchbox.html'],
}


# -- Options for linkcheck builder -------------------------------------------

from os import cpu_count

linkcheck_workers = cpu_count()  # Use as many workers as there are CPU cores

linkcheck_ignore = [
    r"https://linux.die.net/.*",  # linux.die.next denies robots with 403
]

linkcheck_anchors_ignore_for_url = [
    r"https://www.ni.com/en-us/support/downloads/.*",  # NI Downloads pages use dynamic anchors
    r"https://github.com/ni/linux/blob/.*",  # Probably a GH file reference, which use dynamic anchors
]
