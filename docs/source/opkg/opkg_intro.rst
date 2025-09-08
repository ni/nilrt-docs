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
    - NI recommends using the “Hello, World!” source :download:`available here <source_files/opkg_intro.tar.gz>` for this tutorial. Or you may use your own source or even pre-built shared libraries.


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


Source Files
============

To demonstrate building and testing a package, this tutorial will use a simple “Hello, World!” example.
While this same process will apply to any package, NI recommends walking through the process for this simple module before moving to more complex designs.

The :download:`source for this “Hello, World!” package<source_files/opkg_intro.tar.gz>` will consist of three main
files:

:helloworld.c: The C source code
:CONTROL: The control file for the package
:debian-binary: The debian-binary file


.. _helloworldc:

helloworld.c
------------

This is C source code for a simple “Hello, World!” program.

.. code:: c

   #include <stdio.h>

   int main()
   {
     printf("Hello, World!!! \\n");
     return 0;
   }

If you want to compile the source on the target, you could do so using the gcc toolchain:

.. code:: bash

   gcc -o hello helloworld.c

Note: if you are following this tutorial and compiling on target, make sure to install the compile tools which will allow you to use gcc.

.. code:: bash

   opkg install gcc binutils gcc-symlinks

At this point, you now have an executable called ``hello``.


Creating the Package File
=========================

With the source in hand, the next step is to package it into an IPK for redistribution.
As mentioned previously, IPKs are very similar to DEB packages and are based on that standard.
For more information on creating IPKs and the options for doing so, NI recommends referring to the official documentation for ``opkg`` and ``opkg-build``.


Directory Structure
-------------------

To create an IPK file, everything must be in the proper directory structure.
For this tutorial the following directory structure will be used.

.. code:: text

   hellopkg
   |-- CONTROL
   |   `-- control
   |-- debian-binary
   `-- usr
       |-- bin
       |   `-- hello
       `-- lib

This mirrors the final structure contained in the built package, which is simply a special compressed form of that directory structure.
As covered in the official opkg documentation, an IPK requires a few things with the other items being optional:

1. A ``CONTROL`` directory with a ``control`` file.

   .. note:: Keep in mind that Linux is case sensitive.

2. The data files to be installed in their proper directory structure.

The optional components required for a package are:

1. A ``postinst`` script, to register the kernel module with DKMS following the installation.
2. A ``prerm`` script, to remove and unregister the kernel module from DKMS prior to removal.

For more information on IPKs and these files, refer to the official documentation and man pages for opkg.
To proceed with this tutorial, recreate the file structure shown above on the NI Linux Real-Time system with the files provided for this tutorial.


Control File
------------

The control file describes the package's dependencies, maintainer, name, version, and other information required by opkg to ensure proper installation.
Much of this information will also be returned if the ``opkg info`` command is run on a built or installed package.

::

   Package: hellopkg
   Version: 1.0.0
   Architecture: x64
   Maintainer: "somebody" <somebody@somewhere.com>
   Description: hello world
   Source: helloworld.c
   Priority: optional
   Section: libs


The debian-binary File
----------------------

This file should be a text file containing only the following line, as described by the IPK standard.

::

   2.0

Scripts
-------

As mentioned previously, there are two optional scripts when creating IPK files for installing packages.
These scripts handle the registration, installation, and removal of files during installation and removal of the package.

.. note::
   In order to build a package, all scripts must have executable privileges.
   To ensure that this is the case, run ``chmod a+x <script>`` before attempting to build a package.

:preinst: The ``preinst`` script will be run before the installation of the package files.

:postinst: The ``postinst`` script will be run upon finishing the installation of the package files.

:prerm: The ``prerm`` script will be run by opkg before any files are removed during package removal.

:postrm: The ``postrm`` script will be run by opkg after files are removed during package removal.


Building the Package
====================

Once the directory structure is in place, all that's necessary is to build them into an IPK package.

1. Change directories to the directory containing the top-level directory for the package. In this case, the directory containing the ``hellopkg/`` directory.
2. Run the ``opkg-build`` command on the package directory.
3. Confirm that the IPK file is now present.


Building the Feed
=================

If you wish to turn the directory into a feed, you can perform the following step to generate ``Packages`` and ``Packages.gz`` files.

1. Run ``opkg-make-index -p Packages Packages``
2. From there, you can put these files onto a HTTP/S web server to
   access the feed remotely.

At this point, NI recommends testing the package on a different system from the one it was originally built on or testing by formatting the system used to create the IPK and installing from scratch.
You can simply transfer the ipk to the target, and then install it using opkg.


A Note for More General Use Cases
=================================

The tutorial above just walked through the steps for building an ipk that includes a Hello World executable.
If you want to apply this to an ipk that will include various shared libraries, you can still follow the steps above, and use the tree structure.
For example:

.. code:: text

   examplepkg
   |-- CONTROL
   |   `-- control
   `-- usr
       |-- bin
       |   `-- exampleexe
       `-- lib
           `-- example.so

Once you have the tree structure in place, you can follow the rest of the steps in the tutorial.
For installing from the OS package manager, it is best practice to install shared libraries to ``/usr/`` directories.
It is best practice to use ``/usr/local/`` for things not managed by opkg.


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
