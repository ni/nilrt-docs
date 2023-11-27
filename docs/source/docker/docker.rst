==================================================
NI Linux Real-Time and Docker
==================================================

.. contents:: Table of Contents
   :depth: 2
   :local: 

Introduction
============

The `Docker platform`_ helps with producing consistent environments and isolating the processes
within them.
Docker can be used on NI Linux Real-Time with NI hardware for test and measurement use cases.
The document encompasses the basics of how to install Docker and run containers from an
NI Linux Real-Time system.

.. _Docker platform: https://www.docker.com

Installation
============

To install Docker on an NI Linux Real-Time system, simply run the following command
from your target:

.. code:: bash
    
    opkg install docker-ce

.. note::

    Currently Docker will not function correctly if you have LabVIEW RT installed.

Once installed, you can verify it was set up correctly by running:

.. code:: bash

    docker run --rm hello-world

You should see the following output:

.. code::

    Unable to find image 'hello-world:latest' locally
    latest: Pulling from library/hello-world
    719385e32844: Pull complete
    Digest: sha256:88ec0acaa3ec199d3b7eaf73588f4518c25f9d34f58ce9a0df68429c5af48e8d
    Status: Downloaded newer image for hello-world:latest

    Hello from Docker!
    This message shows that your installation appears to be working correctly.

    To generate this message, Docker took the following steps:
     1. The Docker client contacted the Docker daemon.
     2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
        (amd64)
     3. The Docker daemon created a new container from that image which runs the
        executable that produces the output you are currently reading.
     4. The Docker daemon streamed that output to the Docker client, which sent it
        to your terminal.

    To try something more ambitious, you can run an Ubuntu container with:
     $ docker run -it ubuntu bash

    Share images, automate workflows, and more with a free Docker ID:
     https://hub.docker.com/

    For more examples and ideas, visit:
     https://docs.docker.com/get-started/

Starting Containers with Host Networking
========================================

By default, Docker containers will use bridged adapters, but this is not currently supported by
NI Linux Real-Time.
Thus, one must use host networking if they want access to the network from their container.

To use host networking, create the Docker container with the ``--network=host`` or ``--network host`` arguments.

See Docker's documentation on `host networking`_ for details.

.. _host networking: https://docs.docker.com/network/drivers/host/

.. warning::

    Host networking reduces the isolation of the container.

Examples:

.. code:: bash
    
    docker run -it --network=host ubuntu bash

In the example, the command will start up an interactive bash prompt of Ubuntu with access to the
host network.

.. note::

    You can also disable networking altogether via the ``--network=none`` or ``--network none`` arguments.

