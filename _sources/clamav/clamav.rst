==================================================
ClamAV Installation and Configuration
==================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Introduction
============

ClamAV is an open-source antivirus engine designed to detect trojans, viruses, malware, and other
malicious threats on Linux systems. It provides a robust scanning mechanism that can identify and
quarantine infected files by comparing them against continuously updated virus signature databases.
ClamAV supports scanning of various file formats including compressed files, executables, documents,
and email attachments.

The primary purpose of ClamAV is to protect systems from malware infections that could compromise
system integrity, steal sensitive data, or disrupt operations. By scanning files and directories for known
malicious patterns, ClamAV helps identify threats before they can execute or spread, reducing the risk
of data breaches, ransomware attacks, or system compromise.

You might want to use ClamAV if you need to:

- scan files and directories for viruses and malware on embedded Linux systems.
- verify the integrity of files transferred via USB, network, or other external sources.
- detect malicious code before it can execute on critical industrial control systems.
- maintain compliance with security policies that require antivirus protection.

ClamAV is especially valuable in environments where file transfers occur frequently or where systems
process data from external sources. Its command-line interface, low resource footprint, and flexible
scanning options make it well-suited for embedded Linux Real-Time systems like NI's industrial controllers.

.. note::
    This guide covers NILRT-specific installation and configuration. For comprehensive documentation
    on all ClamAV commands, options, and advanced usage, refer to the official
    `ClamAV User Manual <https://docs.clamav.net/manual/Usage.html>`_.

Installation
============

ClamAV requires the NI Linux RT System Image version 11.4 (build 26.0.0) or newer.

Installing ClamAV
-----------------

To install ClamAV on your NILRT system, use the opkg package manager:

.. code:: bash

    opkg update
    opkg install clamav clamav-freshclam

This will install:
- ``clamav``: The core ClamAV antivirus engine and scanner
- ``clamav-freshclam``: The utility for updating virus signature databases

After installation, you'll need to configure ClamAV according to your requirements. See the Configuration section below for details.


Verifying Installation
----------------------

After installation, verify that ClamAV is properly installed and configured:

**Quick Version Check:**

.. code:: bash

    clamscan --version

You should see output showing the ClamAV version (1.4.3 or newer) and configuration paths.

Configuration
=============

ClamAV uses configuration files to control its behavior for virus scanning and signature updates.
The main configuration files are:

- ``/etc/clamav/freshclam.conf``: Configuration for the freshclam signature updater
- ``/etc/clamav/clamd.conf``: Configuration for the ClamAV daemon (optional)
- ``/var/lib/clamav/``: Directory containing virus signature databases


Updating Virus Signatures
--------------------------

Before scanning files, you need to download the latest virus signature database.
ClamAV provides the following methods to update signatures:


Method 1: Online Update
~~~~~~~~~~~~~~~~~~~~~~~

If your target has internet connectivity, update signatures using ``freshclam`` with superuser permissions:

.. code:: bash

   freshclam

This downloads the latest virus definitions from ClamAV's mirror servers.


Method 2: Offline Update
~~~~~~~~~~~~~~~~~~~~~~~~

**For systems without internet connectivity,** you need to manually download the signature databases on a system with internet access, then transfer them to your NILRT target.

**Option A: Using freshclam on another system**

On a Linux system with internet access and ClamAV installed:

.. code:: bash

    # Download signatures to a specific directory
    freshclam --datadir=/tmp/clamav-db
    
    # Copy the downloaded files to your NILRT target
    # Transfer these files: bytecode.cvd, daily.cvd, main.cvd

**Option B: Using cvdupdate (Python utility)**

CVDUpdate is a python utility to download and update ClamAV Virus Databases and database patch files for the purposes of supporting offline systems.
This utility is provided and recommended by the ClamAV project and licensed under Apache-2.0 license.
Refer to the Additional Resources section for more information.
Use ``cvdupdate`` on any system with internet access and then copy the downloaded signature files to the NILRT target.

.. code:: bash

    # Install cvdupdate
    python -m pip install --user cvdupdate

    # (optional) You may wish to customize where the databases are stored
    cvd config set --dbdir <your path>
    
    # Download the latest signatures
    cvd update

    # Signatures are downloaded to: ~/.cvdupdate/database/
    # Copy these .cvd files to your NILRT target

**Transferring Signatures to NILRT Target**

Once you have the signature files (``.cvd`` or ``.cld`` files), copy them to your NILRT target's ClamAV database directory.

.. code:: bash

    # Copy files to the target (via SCP, USB, or other method)
    # Then on the NILRT target:
    cp *.cvd /var/lib/clamav/
    chown clamav:clamav /var/lib/clamav/*.cvd
    chmod 644 /var/lib/clamav/*.cvd

The typical signature files you need are:
    - ``main.cvd`` or ``main.cld`` - Main virus database
    - ``daily.cvd`` or ``daily.cld`` - Daily updates
    - ``bytecode.cvd`` or ``bytecode.cld`` - Bytecode signatures 


Scanning Files and Directories
==============================

ClamAV can be used to run scheduled, periodic scans or manual scans on demand.

To schedule periodic scans on your NILRT system, create a cron job which runs the ``clamav-scan`` wrapper script at your desired frequency.
For more information on scheduling and cron configuration, refer to the `ClamAV User Manual <https://docs.clamav.net/manual/Usage.html>`_.

ClamAV is configured for manual operation on NILRT systems.
Use the following commands to scan files and directories for malware.


Using the NILRT's Wrapper Script
---------------------------------------

The ``clamav-scan`` wrapper script handles memory management automatically and provides a simplified interface:

**Basic Usage:**

.. code:: bash

    # Scan current directory
    clamav-scan .
    
    # Scan a specific directory
    clamav-scan /path/to/scan
    
    # Scan a specific file
    clamav-scan /path/to/file.txt

**Advanced Options:**

.. code:: bash

    # Set custom swap file size (in MB)
    clamav-scan --swap-size 2048 /path/to/scan

All standard ``clamscan`` options can be passed to the wrapper script.

The wrapper script automatically...

- creates temporary swap files (default size is 1024 MB) if system memory is small (< 3GB).
- passes through any additional ``clamscan`` options.


Using clamscan Directly
-----------------------

For more control over scanning options, use ``clamscan`` directly:

.. code:: bash

    # Recursive scan of a directory
    clamscan -r /path/to/scan
    
    # Scan and show only infected files
    clamscan -r -i /path/to/scan
    
    # Scan with verbose output
    clamscan -r -v /path/to/scan
    
    # Scan with custom log file
    clamscan -r --log=/tmp/my-scan.log /path/to/scan

Common clamscan options:

- ``-r`` : Recursive scan
- ``-i`` : Show only infected files
- ``-v`` : Verbose output
- ``--log=FILE`` : Save results to log file
- ``--max-filesize=SIZE`` : Skip files larger than SIZE
- ``--exclude-dir=PATTERN`` : Exclude directories matching pattern

.. note::
    All commands require root privileges to access all files and directories on the system.


Additional Resources
====================

**Official ClamAV Documentation:**

- `ClamAV User Manual <https://docs.clamav.net/manual/Usage.html>`_ - Complete guide to all ClamAV commands and options
- `ClamAV Official Documentation <https://docs.clamav.net/>`_ - Main documentation portal
- `Scanning Usage Guide <https://docs.clamav.net/manual/Usage/Scanning.html>`_ - Comprehensive scanning options and examples
- `Freshclam Configuration <https://docs.clamav.net/manual/Usage/Configuration.html#freshclamconf>`_ - Signature update configuration
- `Signature Management <https://docs.clamav.net/manual/Usage/SignatureManagement.html>`_ - Managing virus definition databases
- `ClamAV FAQ <https://docs.clamav.net/faq/faq.html>`_ - Frequently asked questions and troubleshooting tips
- `CVDUpdate Utility <https://pypi.org/project/cvdupdate/>`_ - Python utility for offline signature updates
