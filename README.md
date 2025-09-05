# nilrt-docs
Official documentation for the NI Linux Real-Time OS.

The built documentation is hosted at [https://nilrt-docs.ni.com/](https://nilrt-docs.ni.com/).


## Building
This documentation is built using Sphinx. To build:

1. Install the host build tools.
   * [GNU Make](https://www.gnu.org/software/make/)
   * [Python3](https://www.python.org/downloads/)

1. Install the python requirements specified in [`:requirements.txt`](./requirements.txt).
    It is recommended that you use a python virtual environment.

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
    ```

1. Build the project using the included Makefile.

   ``` bash
   make all
   ```

   The built documentation output will appear under `:docs/build/html/`.


## About NI Linux Real-Time
To learn about NI Linux Real-Time, visit the [NI Linux Real-Time Portal](http://www.ni.com/white-paper/14627/en/).
