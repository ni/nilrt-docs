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

firewalld is included in NILRT base system images. On older images it can be
installed from the NILRT package feed with ``opkg``:

.. code:: bash

   opkg update
   opkg install firewalld ni-firewalld-servicedefs ni-firewall-dropins

Enabling the Firewall
=====================

The firewall is disabled by default, so a newly imaged target does not filter
network traffic. It is controlled by the ``firewall.enabled`` setting in the
``SystemSettings`` section of ``/etc/natinst/share/ni-rt.ini``.

To enable the firewall, set the token to ``True``, then start firewalld or
reboot the target:

.. code:: bash

   /usr/local/natinst/bin/nirtcfg --set section=SystemSettings,token=firewall.enabled,value=True
   /etc/init.d/firewalld start

To disable the firewall, set the token to ``False``, then restart firewalld
(which stops it) or reboot the target:

.. code:: bash

   /usr/local/natinst/bin/nirtcfg --set section=SystemSettings,token=firewall.enabled,value=False
   /etc/init.d/firewalld restart

While the firewall is disabled, ``/etc/init.d/firewalld start`` reports
``firewalld is disabled`` and does nothing. The saved configuration is kept and
is still updated when packages are installed or removed, so it is ready when
the firewall is enabled.

Checking the Firewall Status
============================

Managing the firewall requires superuser (root) permissions. Check the
firewalld daemon state with:

.. code:: bash

   firewall-cmd --state

A running firewall reports ``running``; a disabled firewall reports
``not running``. You can also query or control the service through its init
script:

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
- When ``ni-firewalld-servicedefs`` is installed (the default on NILRT images),
  several core services are also opened in the ``public`` zone to enable remote
  configuration of the system. These services include: ``ni-service-locator``,
  ``ni-mxs``, ``ni-logos-xt``, ``http``, ``https``, and ``mdns``. These services
  are opened when the ``ni-firewalld-servicedefs`` package is installed and
  closed again if it is removed.

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
do **not** automatically open them. To open a service's ports, add it to a zone
(refer to `Managing the Firewall`_), or have a package open it automatically
(refer to `Opening Ports from a Package`_).

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
   * - ``ni-mxs``
     - tcp/51700, 57616, 61900, 62602
     - NI Configuration Manager (MXS).
   * - ``ni-logos-xt``
     - tcp/2343, tcp/59110-59209, udp/6000-6010
     - NI Logos XT publish-subscribe data transfer.
   * - ``ni-labview-realtime``
     - tcp/3079
     - LabVIEW Real-Time target access.
   * - ``ni-labview-viserver``
     - tcp/3363
     - LabVIEW VI Server.
   * - ``ni-labview-remote-panels``
     - tcp/8000
     - LabVIEW Remote Front Panels.
   * - ``ni-labview-webservices``
     - tcp/8080
     - LabVIEW Web Services.
   * - ``ni-veristand-gateway``
     - tcp/2039, 2041, 2042
     - NI VeriStand Gateway.
   * - ``ni-veristand-engine``
     - tcp/2040, 2050
     - NI VeriStand Engine.
   * - ``modbus``
     - tcp/502
     - Modbus protocol.
   * - ``opcua``
     - tcp/49580
     - OPC UA protocol.

Additional definitions are provided for ``dnp3``, ``dstp``,
``ethernet-ip`` (and its explicit/implicit variants), ``iec-60870-5-104``,
``iec-61850``, ``ni-dnet``, ``ni-rfsa-sfp``, ``ni-rfsa-classic-sfp``, and
``ni-rfsg-sfp``.

View the ports and protocols defined for a service with:

.. code:: bash

   firewall-cmd --info-service=ni-labview-realtime

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
   firewall-cmd --permanent --add-service=ni-labview-realtime
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

   firewall-cmd --permanent --remove-service=ni-labview-realtime
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

Opening Ports from a Package
============================

If you build your own packages, you can have their ports opened automatically on
every boot, without calling ``firewall-cmd``.

Defining a Custom Service
-------------------------

A firewalld *service definition* is a small XML file that lists the ports used by
a service. Create one for your application and install it into a firewalld
services directory:

- ``/usr/lib/firewalld/services/`` for a definition shipped by a package, or
- ``/etc/firewalld/services/`` for a definition added locally on a target.

For example, ``/usr/lib/firewalld/services/my-app.xml``:

.. code:: xml

   <?xml version="1.0" encoding="utf-8"?>
   <service>
     <short>my-app</short>
     <description>My application control port.</description>
     <port protocol="tcp" port="9000"/>
   </service>

The service is then available to ``firewall-cmd`` by name and can be opened like
any other service:

.. code:: bash

   firewall-cmd --permanent --add-service=my-app
   firewall-cmd --reload

If your port and protocol are already covered by one of the NI service
definitions listed above, reuse that service name instead of writing your own.

Opening Services Automatically
------------------------------

NILRT provides a declarative mechanism for a package to request that its
services be opened in the default zone on every boot, without calling
``firewall-cmd`` itself.

To use it, install the following:

#. one or more service definition files (as described above), and
#. a marker file under ``/etc/ni/firewall/open.d/``.

A marker file lists one or more services to open. The file contents should
specify one service per line. Blank lines and lines beginning with ``#`` are
ignored. A marker file with no service lines opens a single service with the same
name as the marker file.

For example, an empty marker file named ``/etc/ni/firewall/open.d/my-app`` opens
the ``my-app`` service. A marker file with the following contents opens both the
``my-app`` service and LabVIEW Real-Time target access:

.. code:: text

   # Services required by my-app
   my-app
   ni-labview-realtime

The ``/usr/bin/ni-firewall-apply`` script processes the marker files. It opens
every service named by a current marker file. It also closes any service it
previously opened for which marker file content has been removed. It runs at
boot after firewalld starts and after each package install or removal with
``opkg``, and records what it opened in ``/var/lib/ni/firewall/applied``. It
only closes services that it opened. Services opened by other means are left
unchanged. If you add or remove a marker file by hand, run
``ni-firewall-apply`` to apply the change immediately instead of waiting for
the next boot:

.. code:: bash

   ni-firewall-apply

Opening Services Automatically via Packages
-------------------------------------------

If you build your own packages, include the service definition files and marker
files in your package recipe:

.. code:: bash

   SRC_URI += " \
       file://my-app.xml \
       file://open.d/my-app \
   "

   do_install:append () {
       install -D -m 0644 ${UNPACKDIR}/my-app.xml \
           ${D}${libdir}/firewalld/services/my-app.xml
       install -D -m 0644 ${UNPACKDIR}/open.d/my-app \
           ${D}${sysconfdir}/ni/firewall/open.d/my-app
   }

When the package is installed with ``opkg``, its services are opened as soon
as the install finishes. Uninstalling the package removes its service
definition file and marker file, and its services are closed as soon as the
removal finishes.

.. note::
   ``ni-firewall-apply`` runs only after an ``opkg`` command that succeeds. If
   any package in the command fails to install (for example, its ``postinst``
   script fails), the services of the packages that did install are not opened
   until you run ``ni-firewall-apply``, the next successful ``opkg`` command, or
   the next reboot.
.. note::
   Opening a service only allows traffic through the firewall. It does not start
   your application. Your application must be running and listening on the port
   for a remote connection to succeed.

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

**The firewall is not running:** Check that it is enabled (refer to
`Enabling the Firewall`_), then check its state and the system log:

.. code:: bash

   /usr/local/natinst/bin/nirtcfg --get section=SystemSettings,token=firewall.enabled,value=False
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

**A service is open but remote connections still fail:** Opening a service in the
firewall does not start your application. Confirm that a process is actually
listening on the port. A command like ``netstat -lntu`` can be helpful. If
nothing is listening, the connection is refused even though the firewall allows
it.

**A service was not opened:** Confirm that both the service definition file and
the marker file exist. Then run ``ni-firewall-apply`` and check
``/var/lib/ni/firewall/applied`` for the services it opened. When it runs after
an ``opkg`` transaction, its output is logged to ``/var/log/messages`` with the
``ni-firewall-apply`` tag.

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
