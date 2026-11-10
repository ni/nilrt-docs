=======================================================
Checking for and Installing Software Updates with opkg
=======================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Introduction
============

NI Linux Real-Time (NILRT) installs software from package feeds hosted by NI.
When NI fixes a problem in a package, including a security vulnerability, it
publishes an updated version of that package to the feeds for the affected
release. Checking for and installing these updates regularly keeps a target's
software current.

This page describes how to use ``opkg`` on the target to check for updated
packages and install them.

.. note::
   Package updates keep the software of the installed NILRT release current. To
   move a target to a new NILRT release, install the new base system image with
   NI MAX, NI Package Manager, or SystemLink. Refer to the
   :doc:`../policies/security_response_policy` for how NI handles
   vulnerabilities.

Requirements
============

- The target has a base system image installed and is booted into run mode.
- The target can reach the package feeds over the network. On an image built by
  NI, the feeds are hosted on ``download.ni.com``.
- You are logged in to the target as ``root`` (for example, over SSH).

The configured feeds are listed in the ``/etc/opkg/`` configuration files:

.. code:: bash

   grep -h '^src' /etc/opkg/*.conf

``opkg`` verifies the signature of each feed before using it. If ``opkg update``
reports a signature error, the signing keys on the target may be out of date.
Refer to :doc:`../opkg-keyrings/opkg-keyrings_index`.

Checking for Updates
====================

First, download the latest package lists from the feeds:

.. code:: bash

   opkg update

``opkg update`` only refreshes the lists of available packages. It does not
install or change any software.

Then list the installed packages that have a newer version available:

.. code:: bash

   opkg list-upgradable

Each line shows the package name, the installed version, and the available
version:

.. code:: text

   openssl - 3.5.9-r0.6 - 3.5.9-r0.13
   busybox-udhcpc - 1.37.0-r0.83 - 1.37.0-r0.89

If the command prints nothing, all installed packages are up to date.

To count the available updates, or to check a single package:

.. code:: bash

   opkg list-upgradable | wc -l
   opkg list-upgradable | grep openssl

.. note::
   ``opkg list-upgradable`` compares against the package lists downloaded by the
   last ``opkg update``. Run ``opkg update`` first to get current results.

Installing Updates
==================

To see what an upgrade would do without changing the system, run:

.. code:: bash

   opkg upgrade --noaction

To install all available updates:

.. code:: bash

   opkg upgrade

To install the update for specific packages only:

.. code:: bash

   opkg upgrade openssl openssl-conf

After the upgrade finishes, check its output for errors. Then reboot the target
so that every upgraded component, including the kernel, libraries, and running
services, is in use:

.. code:: bash

   reboot

.. note::
   Upgrading packages can change the behavior of software on the target. Test
   updates on a non-production target before applying them to deployed systems.

Checking for Updates Automatically
==================================

To check for updates on a schedule and record the result in the system log,
add a cron entry. For example, create ``/etc/cron.d/opkg-check`` with the
following content to check daily at 01:00 UTC:

.. code:: text

   PATH=/usr/sbin:/usr/bin:/sbin:/bin
   0 1 * * * root opkg update >/dev/null 2>&1 && logger -t opkg-check "$(opkg list-upgradable | wc -l) package update(s) available"

View the results with:

.. code:: bash

   grep opkg-check /var/log/messages

This only reports available updates; install them as described in
`Installing Updates`_.

Troubleshooting
===============

**opkg update fails to download the package lists:** Confirm that the target
has network access to the feeds and can resolve their host names. Some networks
require a proxy; refer to the ``opkg.conf`` documentation for the ``http_proxy``
option.

**opkg update reports a signature error:** Update the signing keys as described
in :doc:`../opkg-keyrings/opkg-keyrings_index`, then run ``opkg update`` again.

**An upgrade fails while configuring a package:** Review the error in the
``opkg`` output. After resolving it, run ``opkg configure`` to finish
configuring any packages that were installed but not configured, then run
``opkg upgrade`` again.

Additional Resources
====================

- :doc:`opkg_intro` - Building and distributing your own packages with
  ``opkg``.
- :doc:`../opkg-keyrings/opkg-keyrings_index` - Upgrading the feed signing
  keys.
- :doc:`../policies/security_response_policy` - How NI handles security
  vulnerabilities in NILRT.
