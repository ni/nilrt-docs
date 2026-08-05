==================================================
Firewall Configuration with firewalld
==================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Introduction
============

firewalld is a firewall management daemon that provides a dynamically managed
firewall with support for network zones, predefined services, and both runtime
and permanent configuration. On NI Linux Real-Time (NILRT), firewalld is the
recommended way to control which network services can be accessed on a target.

firewalld organizes rules around a few concepts:

- **Zones** represent different trust levels for network connections (for
  example, ``public`` for untrusted networks). The active zone determines which
  traffic is allowed.
- **Services** are named collections of ports and protocols (for example,
  ``ssh`` or ``modbus``) that can be added to a zone without having to remember
  individual port numbers.
- **Runtime vs. permanent** configuration lets you test rule changes
  immediately (runtime) and separately commit them so they survive a reboot or
  daemon reload (permanent).

You might want to use firewalld if you need to:

- restrict which network services on your NILRT target are accessible from the
  network.
- open ports for NI software components or your own applications in a
  controlled, named way.
- apply different rule sets depending on the network a target is connected to.
- maintain compliance with security policies that require host-based firewalling.

.. note::
   This guide covers NILRT-specific behavior and common tasks. For comprehensive
   documentation on all firewalld concepts, commands, and options, refer to the
   official `firewalld documentation <https://firewalld.org/documentation/>`_.

Availability
============

firewalld has been available in the NILRT package feed since the 2025 Q1
release and can be installed with ``opkg`` if it is not already present:

.. code:: bash

   opkg update
   opkg install firewalld ni-firewalld-servicedefs

Checking the Firewall Status
============================

Managing the firewall requires superuser (root) permissions. Check the
firewalld daemon state with:

.. code:: bash

   firewall-cmd --state

A running firewall reports ``running``. You can also query or control the
service through its init script:

.. code:: bash

   /etc/init.d/firewalld status
   /etc/init.d/firewalld start
   /etc/init.d/firewalld restart

.. note::
   NILRT uses a SysV init system rather than ``systemd``, so ``systemctl`` is
   not available. Use the ``/etc/init.d/firewalld`` script to start, stop, and
   check the daemon.

Default Configuration
=====================

By default, the firewall is configured as follows:

- The default (and active) zone is ``public``.
- The ``public`` zone allows the ``ssh`` and ``dhcpv6-client`` services so that
  remote login and IPv6 address configuration continue to work.

Inspect the active configuration with:

.. code:: bash

   # Show the default zone
   firewall-cmd --get-default-zone

   # Show everything allowed in the active zone(s)
   firewall-cmd --list-all

   # List all available (defined) services
   firewall-cmd --get-services

NI Service Definitions
======================

NILRT ships firewalld *service definitions* for the network protocols used by NI
software. These definitions declare the ports and protocols for each service but
do **not** automatically open them—you add a service to a zone to open its ports
(refer to `Managing the Firewall`_).

The service definition files are installed under
``/usr/lib/firewalld/services/`` and are available to ``firewall-cmd`` by name.
Commonly used NI services include:

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Service name
     - Ports
     - Description
   * - ``ni-service-locator``
     - tcp/3580
     - NI Service Locator port-mapping facility.
   * - ``ni-visa-server``
     - tcp/3537
     - NI-VISA remote server.
   * - ``ni-mxs``
     - tcp/51700, 57616, 61900, 62602
     - NI Configuration Manager (MXS).
   * - ``ni-rpc-server``
     - tcp/43973
     - NI RPC server.
   * - ``ni-logos-xt``
     - tcp/2343, tcp/59110-59209, udp/6000-6010
     - NI Logos XT publish-subscribe data transfer.
   * - ``ni-sync-remote``
     - tcp/31762
     - NI-Sync remote access.
   * - ``ni-labview-realtime``
     - tcp/3079
     - LabVIEW Real-Time target access.
   * - ``modbus``
     - tcp/502
     - Modbus protocol.
   * - ``opcua``
     - tcp/49580
     - OPC UA protocol.

Additional definitions are provided for ``dnp3``, ``dstp``,
``ethernet-ip`` (and its explicit/implicit variants), ``iec-60870-5-104``,
``iec-61850``, ``ni-dnet``, ``ni-imaq``, ``ni-labview-viserver``,
``ni-rfsa-sfp``, ``ni-rfsa-classic-sfp``, ``ni-rfsg-sfp``, ``ni-scope-sfp``, and
``ni-xnet-bus-monitor``.

View the ports and protocols defined for a service with:

.. code:: bash

   firewall-cmd --info-service=ni-visa-server

Managing the Firewall
=====================

All configuration changes are made with ``firewall-cmd``. Changes apply either to
the live **runtime** configuration (lost on reload/reboot) or to the
**permanent** configuration (persisted). A typical workflow is to change the
permanent configuration and then reload.

Opening a Service or Port
-------------------------

**Open an NI (or standard) service in the default zone:**

.. code:: bash

   # Add permanently, then apply
   firewall-cmd --permanent --add-service=ni-visa-server
   firewall-cmd --reload

**Open an arbitrary port** (for example, a custom application on tcp/8080):

.. code:: bash

   firewall-cmd --permanent --add-port=8080/tcp
   firewall-cmd --reload

**Test a change at runtime only** (reverted on the next reload or reboot):

.. code:: bash

   firewall-cmd --add-service=modbus

Closing a Service or Port
-------------------------

.. code:: bash

   firewall-cmd --permanent --remove-service=ni-visa-server
   firewall-cmd --permanent --remove-port=8080/tcp
   firewall-cmd --reload

Applying and Persisting Changes
-------------------------------

- ``firewall-cmd --reload`` applies the permanent configuration and discards any
  runtime-only changes.
- To copy the current runtime configuration into the permanent configuration,
  use:

  .. code:: bash

     firewall-cmd --runtime-to-permanent

.. note::
   Permanent firewalld configuration is stored under ``/etc/firewalld/``.
   Runtime changes that have not been made permanent are lost when the daemon
   reloads or the target reboots.

Working with Zones
------------------

.. code:: bash

   # List all zones and their configuration
   firewall-cmd --list-all-zones

   # Change the default zone
   firewall-cmd --set-default-zone=public

   # Bind a specific interface to a zone (permanent)
   firewall-cmd --permanent --zone=public --change-interface=eth0
   firewall-cmd --reload

Persistence Across Reimaging and Replication
============================================

The NILRT network configuration utility (``ninetcfgutil``) includes the
firewalld configuration directories (``/etc/firewalld`` and
``/etc/sysconfig/firewalld``) in its export/import set. As a result, permanent
firewall changes are preserved when a system configuration is exported and
restored, or when a target is replicated. Refer to the system replication
documentation for details on exporting and restoring target configuration.

Troubleshooting
===============

**The firewall is not running:**

.. code:: bash

   firewall-cmd --state
   /etc/init.d/firewalld restart
   # Inspect the system log for firewalld messages
   grep -i firewalld /var/log/messages

**A change did not take effect:** Verify that you used ``--permanent`` and then
ran ``--reload``, or check the runtime state directly:

.. code:: bash

   firewall-cmd --list-all

**Log denied packets** to diagnose blocked traffic:

.. code:: bash

   firewall-cmd --set-log-denied=all
   firewall-cmd --get-log-denied
   grep -i 'IN=' /var/log/messages

Additional Resources
====================

- `firewalld Documentation <https://firewalld.org/documentation/>`_ - Official
  firewalld documentation portal.
- `firewall-cmd Manual <https://firewalld.org/documentation/man-pages/firewall-cmd.html>`_ -
  Complete reference for the ``firewall-cmd`` command.
- `firewalld Zones <https://firewalld.org/documentation/zone/>`_ - Concept guide
  for zones and trust levels.
- `firewalld Services <https://firewalld.org/documentation/service/>`_ - How
  service definitions are structured.
