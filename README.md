# nilrt-docs
Repository for the https://nilrt-docs.ni.com documentation pages for NI Linux Real-Time. 

## Introduction
This project contains community sourced documentation for the NI Linux Real-Time Operating System. This documentation is hosted at https://nilrt-docs.ni.com.

## Building
This documentation is built using Sphinx. To build:

1. [Install Sphinx using whichever method you prefer from the official Sphinx documentation.](https://www.sphinx-doc.org/en/master/usage/installation.html)
2. Clone this repo.
   ``` bash
   git clone https://github.com/ni/nilrt-docs
   cd nilrt-docs
   ```
3. Run the following commands.
   ``` bash
   cd docs/
   make html
   ```
4. Navigate to the built html tree at `docs/build/html`

## About NI Linux Real-Time
To learn about NI Linux Real-Time, visit the [NI Linux Real-Time Portal](http://www.ni.com/white-paper/14627/en/).