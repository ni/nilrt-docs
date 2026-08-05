==================================================
NI Linux Real-Time and opkg: Distributing Packages
==================================================

.. contents:: Table of Contents
   :depth: 2
   :local: 


Introduction
============

Oftentimes it can be desirable to extend the functionality provided by the Linux kernel and have access to other custom packages.
This document will discuss how to create, package, and test loadable packages with NI Linux Real-Time.


A Note on Support
-----------------

This document is meant as a walkthrough of general Linux concepts within NI Linux Real-Time.
As these concepts are general to any Linux system and the open source software used, NI Support will not provide assistance through Technical Support channels should problems be encountered.
NI does not provide official support for modifying the kernel such as through the addition of loadable kernel modules.
For more information on how NI provides support for NI Linux Real-Time, refer to the `NI Linux Real-Time FAQ`_.
If problems are encountered, posting to the `NI Linux Real-Time Community`_ or other Linux discussion boards is the recommended way to get further guidance.


Requirements
------------

The following software and hardware are required to follow this tutorial:

- NI Linux Real-Time System with one of the following access to the online NI Repositories
- Source code for a Linux Package
    - NI recommends using the “Hello, World!” source :download:`available here <source_files/opkg-intro.tar.gz>` for this tutorial. Or you may use your own source or even pre-built shared libraries.


Opkg
----

Opkg is a light-weight package manager which uses the IPK package format to install and manage packages on a filesystem.
While slightly different, IPK packages are very similar to DEB packages and are based on that standard.
Opkg is used by many embedded Linux distributions, including OpenWRT and Yocto, due to its lightweight nature.

This tutorial will cover the steps needed to use the ``opkg`` and ``opkg-build`` commands to create a package for distribution.
IPKs can be created on any system with ``opkg-build`` installed, but this tutorial will only discuss building packages directly on NI LinuxRT.


Configuring the System
======================

Before starting, the required software and toolchains must be installed to the NI Linux Real-Time system used.
This can be accomplished through console access to the device via a serial port, SSH, or direct access via a keyboard and monitor.
For the screenshots in this tutorial, SSH is used via `PuTTY`_.

1. Open a console to the NI Linux Real-Time system and log in as or
   switch to the ``admin`` user.
2. Run the ``opkg update`` command to refresh the list of available
   packages.

   .. code:: bash

      opkg update

3. Install the ``opkg-utils`` package to install the required tools for
   creating IPKs.

   .. code:: bash

      opkg install opkg-utils

4. Confirm that the installation completed successfully.


.. Note::

   You can also build IPKs on a linux system other than NILRT by checking out the `opkg-utils <https://git.yoctoproject.org/opkg-utils/>`_ repository from Yocto and running the ``opkg-build`` command on the source files.


Source Files
============

To demonstrate building and testing a package, this tutorial will use a simple “Hello, World!” example.
While this same process will apply to any package, NI recommends walking through the process for this simple module before moving to more complex designs.

Download this example IPK (:download:`opkg-intro.tar.gz<source_files/opkg-intro.tar.gz>`) and inspect its contents.

.. code:: text

   opkg-intro/
   ├── CONTROL
   │  └── control
   └── usr
      └── local
         └── bin
            └── hello

:CONTROL/control: The control file for the package
:usr/local/bin/hello: An executable script for the package, which prints a simple message to the console.


Control File
------------

The control file describes the package's dependencies, maintainer, name, version, and other information required by opkg to ensure proper installation.
Much of this information will also be returned if the ``opkg info`` command is run on a built or installed package.

.. include:: source_files/opkg-intro/CONTROL/control
   :literal:


Script File
-----------

The ``hello`` script is a simple shell script that prints a message to the console.

.. include:: source_files/opkg-intro/usr/local/bin/hello
   :literal:


Creating the Package File
=========================

With the source in hand, the next step is to package it into an IPK for redistribution.
As mentioned previously, IPKs are very similar to DEB packages and are based on that standard.

The easiest way to create an IPK is to use the ``opkg-build`` command provided by the Yocto *opkg-utils* repository.


.. code:: bash

   tar -xaf opkg-intro.tar.gz
   opkg-build ./opkg-intro .

This will create a new file called ``opkg-intro_1.0.0_any.ipk`` in the current directory.

The IPK can be installed directly to the system using opkg.

.. code:: bash

   opkg install ./opkg-intro_1.0.0_any.ipk


Maintainer Scripts
------------------

Sometimes additional actions need to be run before or after the installation or removal of a package.
You can create scripts to perform these actions and include them within your package's ``CONTROL`` directory.
During installation or removal, opkg will automatically run these scripts to perform the necessary actions.

Maintainer scripts are executed by the system shell.
So they should be ``bash`` compatible shell scripts on NILRT.

.. list-table:: Maintainer Scripts
   :header-rows: 1

   * - Script
     - Execution Time
     - Common Use Cases
   * - ``CONTROL/preinst``
     - After package download, before installation.
     - Check for environmental compatibility with the package.
   * - ``CONTROL/postinst``
     - After package installation.
     - Perform post-installation package configuration. Automatically (re)start packaged daemons.
   * - ``CONTROL/prerm``
     - Before file removal.
     - Stop packaged daemons prior to package removal.
   * - ``CONTROL/postrm``
     - After file removal.
     - Reload system daemons that were affected by the removal of this package.

``postinst`` and ``prerm`` are the most commonly used scripts, and are often used to start and stop daemons that are included in a package.
You are not required to include any script that you do not have a need for.

.. important::
   In order to build a package, all scripts must have executable privileges.
   To ensure that this is the case, run ``chmod a+x <script>`` before attempting to build a package.


Resources
=========

-  `NI Linux Real-Time Community and Discussion
   Forums <https://forums.ni.com/t5/NI-Linux-Real-Time/ct-p/7013?profile.language=en>`__
-  `NI Linux Real-Time
   FAQ <https://forums.ni.com/t5/NI-Linux-Real-Time-Documents/NI-Linux-Real-Time-FAQ/ta-p/3495630?profile.language=en>`__
-  `The Linux Kernel Module Programming
   Guide <https://www.tldp.org/LDP/lkmpg/2.6/html/>`__
-  `Dynamic Kernel Module Support
   source <https://github.com/dell/dkms>`__
-  `PuTTY`_
-  `Getting Started with C/C++ Development Tools for NI Linux Real-Time,
   Eclipse Edition <http://www.ni.com/tutorial/14625/en/>`__


.. _NI Linux Real-Time Community: https://forums.ni.com/t5/NI-Linux-Real-Time/ct-p/7013
.. _NI Linux Real-Time FAQ: https://forums.ni.com/t5/NI-Linux-Real-Time-Documents/NI-Linux-Real-Time-FAQ/ta-p/3495630
.. _PuTTY: https://putty.software/
