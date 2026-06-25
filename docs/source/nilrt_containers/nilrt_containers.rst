==================================================
Running NI Linux Real-Time in Containers
==================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Overview
========

NI Linux Real-Time (NILRT) can be built and run as an OCI/Docker
container image. Instead of running NILRT on dedicated NI hardware, a
container image packages the NILRT runmode userspace -- including SSH,
the NI System Web Server, mDNS-based discovery, and the ``opkg`` package
manager -- so that it runs as a container on a regular Linux host.

Two container image variants are produced from the
`nilrt <https://github.com/ni/nilrt>`_ build project:

* **nilrt-runmode-container** -- the full Base System Image, including
  DKMS and the proprietary NI software stack.
* **nilrt-slim-container** -- a minimal Base System Image with just the
  core runmode userspace: no desktop packages and none of the
  proprietary NI software. It is smaller and faster to start; install
  only the NI software you need via ``opkg``.

The images are managed with helper scripts in the ``docker/`` directory
of the nilrt project:

* ``docker/create-build-nilrt.sh`` -- builds the pyrex build container.
* ``docker/setup-nilrt-network.sh`` -- creates a macvlan network so
  containers get their own IP addresses on the LAN.
* ``docker/nilrt-ctr.sh`` -- launches and manages NILRT containers.
* ``docker/docker-compose.yml`` -- the Compose definition used by
  ``nilrt-ctr.sh``.

What the Containers Are For
===========================

NILRT containers are intended for development, testing, and continuous
integration workflows where running on real hardware is inconvenient or
unavailable. Typical use cases include:

* Spinning up many NILRT systems quickly -- for example, scaling out
  tens of targets for software-deployment or discovery testing.
* Validating package installs, feed configuration, and ``opkg``
  workflows without reflashing hardware.
* Exercising NI MAX and VeriStand deployment flows against a
  discoverable, networked NILRT system.
* Reproducible CI environments that exercise NILRT userspace software.

.. warning::

    NILRT containers are **not** a replacement for real-time hardware in
    production. They are a development and test convenience. See
    `Real-Time Behavior and the Host Kernel`_ below.

Real-Time Behavior and the Host Kernel
======================================

A container is **not** a virtual machine. All containers on a host share
that host's single Linux kernel; the container image provides only the
userspace. This has an important consequence for NILRT:

.. warning::

    A NILRT container runs on the **host's** kernel, not the NILRT
    ``PREEMPT_RT`` real-time kernel. The deterministic, low-latency
    scheduling that defines the "RT" in NI Linux Real-Time comes from
    that kernel. When NILRT userspace runs in a container on a
    general-purpose host kernel, real-time determinism is **lost or
    significantly degraded**.

Practically, this means:

* Even though the NILRT runmode image installs a NILRT kernel into its
  root filesystem, that kernel is **not** the one running -- the host
  kernel is. The bundled kernel and modules are inert.
* Latency and jitter depend entirely on the host kernel's configuration.
  A stock desktop/server kernel makes no real-time guarantees.
* Do not use container measurements to characterize real-time
  performance of NI hardware.

If you need genuine real-time behavior, run NILRT on supported NI
hardware (or, at minimum, on a host running a ``PREEMPT_RT`` kernel,
which still does not replicate NI hardware behavior).

Drivers in Containers
=====================

Installing NI hardware drivers inside a NILRT container is **not
sensible** and is not supported.

* Kernel-mode drivers must match the **running** kernel. Because the
  container uses the host kernel (not the NILRT kernel in the image),
  NILRT kernel modules will not load.
* The container has no access to the physical NI devices, buses, and
  FPGA/board resources that those drivers manage.
* To keep dependent packages installable without pulling in
  driver/kernel components that would fail in a container, the container
  images inject placeholder ``opkg`` status entries for low-level
  driver packages (for example ``ni-dim`` and ``ni-mdbg``). This
  satisfies dependency constraints so that higher-level software
  installs, but it does **not** provide working drivers.

In short: use containers for userspace software (LabVIEW RT, VeriStand
engine, web services, package workflows), not for hardware I/O.

Prerequisites
=============

Building the images
-------------------

To **build** the container images you need the standard NILRT build
environment described in the `nilrt README
<https://github.com/ni/nilrt/blob/HEAD/README.md>`_:

* A Linux build host (NI builds and tests on Ubuntu).
* The Docker engine (the bare engine, **not** Docker Desktop).
* The nilrt project source and submodules checked out, the
  ``build-nilrt`` pyrex image built, and ``ni-oe-init-build-env``
  sourced.
* ``MACHINE=x64`` exported (containers are intended for x64 hosts).
* The core package feed and package index built first
  (``packagefeed-ni-core`` and ``package-index``), as for any other
  image.

Running the images
-------------------

To **run** the container images, on the host that will run them:

* A container runtime: **Docker** (with the Compose plugin) or
  **podman**.
* ``python3`` (the helper scripts use it for IP math and network
  inspection).
* For LAN-visible containers via macvlan: root/``sudo`` access and an
  interface in promiscuous mode (the setup script handles this). In VMs
  (for example VirtualBox/VMware) the host NIC must allow promiscuous
  mode.
* The containers run as ``--privileged`` (required by the NILRT init,
  ``niauth``, bind-mounts, and ``setcap`` in the post-install), so the
  host must permit that.

Building the Containers
=======================

After completing the build-environment setup and building the core feed
and package index, build the image recipes with bitbake:

.. code:: bash

    export MACHINE=x64

    # build the full runmode container image...
    bitbake nilrt-runmode-container

    # ...and/or the slim variant
    bitbake nilrt-slim-container

The build emits OCI and docker-archive artifacts under
``$BUILDDIR/tmp-glibc/deploy/images/x64/``. The ``*.docker.tar`` archive
can be loaded directly into Docker:

.. code:: bash

    cd $BUILDDIR/tmp-glibc/deploy/images/x64/

    # full image
    docker load -i nilrt-runmode-container-x64.docker.tar
    # slim image
    docker load -i nilrt-slim-container-x64.docker.tar

    # verify the images are present; note the version tag
    docker images nilrt-runmode-container
    docker images nilrt-slim-container

The images are tagged ``nilrt-runmode-container:<DISTRO_VERSION>`` and
``nilrt-slim-container:<DISTRO_VERSION>-slim``. The ``nilrt-ctr.sh``
helper auto-detects the newest locally-available tag, or you can pin one
with the ``NILRT_VERSION`` environment variable.

For podman, load the archive with:

.. code:: bash

    podman load -i nilrt-runmode-container-x64.docker.tar

Running the Containers
======================

Create the container network (once)
-----------------------------------

Containers attach to an external macvlan network named ``nilrt-net``,
which gives each container its own IP address on your physical LAN so
that remote hosts and NI MAX can discover them. Create it once with:

.. code:: bash

    # auto-detect interface, subnet, and gateway
    bash docker/setup-nilrt-network.sh

    # ...or specify everything explicitly, reserving a range for containers
    bash docker/setup-nilrt-network.sh -i eth0 -s 192.0.2.0/24 \
        -g 192.0.2.1 -r 192.0.2.64/26

    # podman users
    bash docker/setup-nilrt-network.sh --runtime podman

Reserving an IP range (``-r/--ip-range``) for containers avoids DHCP
conflicts -- coordinate the range with your network administrator. The
script also sets up a ``nilrt-shim`` interface so the **host** can reach
containers on the macvlan network (macvlan otherwise blocks
host-to-container traffic). Use ``--dry-run`` to preview the commands
without applying them.

Launch containers
-----------------

Use ``nilrt-ctr.sh run``, which scans the LAN for free addresses and
pins a collision-free IP to each container. Containers are named
sequentially (``nilrt-1``, ``nilrt-2``, ``nilrt-slim-1``, ...):

.. code:: bash

    # launch one full runmode container
    bash docker/nilrt-ctr.sh run nilrt

    # launch three slim containers
    bash docker/nilrt-ctr.sh run nilrt-slim -n 3

    # restrict allocation to a CIDR, or skip the (slow) LAN scan
    bash docker/nilrt-ctr.sh run nilrt -r 192.0.2.64/26
    bash docker/nilrt-ctr.sh run nilrt --no-scan
    bash docker/nilrt-ctr.sh run nilrt --dry-run

For **podman**, assign a free address yourself with an explicit
``--ip`` (the ``nilrt-ctr.sh run`` helper is Docker/Compose-specific):

.. code:: bash

    podman run -it --privileged --network=nilrt-net --ip 192.0.2.65 \
        nilrt-runmode-container:TAG

Manage running containers
-------------------------

``nilrt-ctr.sh`` provides convenience commands. A target can be a
container name, an ID prefix, or a managed index:

.. code:: bash

    bash docker/nilrt-ctr.sh status nilrt-1            # show a summary
    bash docker/nilrt-ctr.sh shell nilrt-1             # interactive shell
    bash docker/nilrt-ctr.sh set-feed all 2026Q2       # set the opkg feed
    bash docker/nilrt-ctr.sh change-hostname nilrt-1 cRIO-test

Standard runtime commands also work, filtered to NILRT-managed
containers:

.. code:: bash

    docker ps -a --filter label=nilrt.managed=true
    docker logs CONTAINER
    docker exec -it CONTAINER /bin/bash

Installing LabVIEW and VeriStand
================================

LabVIEW Real-Time and the VeriStand engine are installed inside a
running container with ``opkg``, the same package manager used on NILRT
hardware. First point the container at a package feed for the desired
release quarter, then install the packages.

Using ``nilrt-ctr.sh``:

.. code:: bash

    # point the container's opkg at a feed (YYYYQN, e.g. 2026Q2)
    bash docker/nilrt-ctr.sh set-feed nilrt-1 2026Q2

    # install LabVIEW Real-Time
    bash docker/nilrt-ctr.sh install nilrt-1 --feed 2026Q2 \
        ni-labview-realtime

    # install the VeriStand engine
    bash docker/nilrt-ctr.sh install nilrt-1 --feed 2026Q2 \
        ni-veristand-engine

Equivalently, from a shell inside the container:

.. code:: bash

    bash docker/nilrt-ctr.sh shell nilrt-1

    # inside the container:
    opkg update
    opkg install ni-labview-realtime
    opkg install ni-veristand-engine

.. note::

    On hardware, installing an RT application package causes a reboot so
    that the LabVIEW RT engine (``lvrt``) re-reads its startup
    application. Containers are not rebooted, so the images ship an
    ``opkg`` wrapper that restarts ``lvrt`` automatically after a
    successful install or upgrade of an RT-relevant package
    (``ni-labview-realtime*``, ``ni-veristand-engine*``). The restart is
    skipped while ``lvrt`` is actively serving an application, so running
    deployments are not interrupted.

Once installed, the container is discoverable by NI MAX and VeriStand
(via mDNS and the NI System Web Server) at the container's LAN IP, and
applications such as the VeriStand engine can be deployed to it over
the network.

.. warning::

    Because the container runs on the host kernel (see `Real-Time
    Behavior and the Host Kernel`_), LabVIEW RT and VeriStand run
    **without** real-time determinism. This is suitable for functional
    and integration testing, not for real-time performance validation.

Configurable Run Options
========================

Container behavior is driven by ``docker/docker-compose.yml`` and the
environment variables consumed by the helper scripts. The most useful
knobs:

.. list-table::
   :header-rows: 1
   :widths: 22 38 40

   * - Option
     - How to set it
     - Notes
   * - Image variant
     - ``run nilrt`` vs ``run nilrt-slim``
     - Full runmode vs slim image.
   * - Image version/tag
     - ``NILRT_VERSION=<tag>`` env var
     - Defaults to the newest locally-loaded tag.
   * - Number of containers
     - ``-n/--count N`` on ``run``
     - Launches N collision-free instances.
   * - Network name
     - ``NILRT_NETWORK`` env var (default ``nilrt-net``)
     - Must be an existing external macvlan network.
   * - IP address / range
     - ``NILRT_IP`` (per container); ``-r/--ip-range`` on
       ``run``/network setup
     - ``run`` pins a verified-free IP; podman uses ``--ip``.
   * - LAN scan tuning
     - ``NILRT_SCAN=0`` (disable), ``NILRT_SCAN_TIMEOUT=<sec>``
     - Controls the free-IP probe before launch.
   * - Hostname
     - ``nilrt-ctr.sh change-hostname <target> <name>``
     - Also re-derives the NI serial number.
   * - Package feed
     - ``nilrt-ctr.sh set-feed <target|all> <YYYYQN>``
     - Writes ``/etc/opkg/base-feeds.conf``.

Because the containers are launched through Docker Compose, you can
constrain host resources (CPU, memory, storage, devices, extra volumes)
by editing ``docker/docker-compose.yml`` or adding a Compose override.
For example, to limit CPU and memory and add a persistent volume, add to
the relevant service:

.. code:: yaml

    services:
      nilrt:
        cpus: "2.0"            # max 2 CPU cores
        cpuset: "0-1"          # pin to specific cores (optional)
        mem_limit: "4g"        # max 4 GiB RAM
        memswap_limit: "4g"    # cap swap as well
        shm_size: "1g"         # /dev/shm size
        storage_opt:
          size: "20G"          # writable-layer size cap (driver-dependent)
        volumes:
          - /host/path:/c      # persist deployed apps/data across restarts

When running directly with ``docker run`` or ``podman run``, the
equivalent flags are ``--cpus``, ``--cpuset-cpus``, ``--memory``,
``--memory-swap``, ``--shm-size``, ``--storage-opt size=``, and
``-v/--volume``.

.. warning::

    The NILRT init requires ``--privileged``. Dropping it will break
    ``niauth``, the web server, and the bind-mounts.

Supported Host Operating Systems
================================

The container images are **x64 Linux** images and are intended to run on
a **Linux host** with a native container runtime:

* **Docker engine** (not Docker Desktop) with the Compose plugin, or
  **podman**.
* NI builds and validates on **Ubuntu**; other modern Linux
  distributions with a current Docker/podman should work.
* macvlan networking (used for LAN-visible container IPs) is a Linux
  feature; it is not available on Docker Desktop for macOS/Windows, so
  the LAN-discovery workflow described here is Linux-only. Running the
  image without macvlan (for example with default bridge networking) is
  possible but loses direct LAN discoverability by NI MAX/VeriStand.
* When the host is itself a VM, enable nested promiscuous mode on the
  VM's NIC for macvlan to work.
