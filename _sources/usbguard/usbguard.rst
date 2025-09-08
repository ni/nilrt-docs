==================================================
USBGuard Installation and Configuration
==================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Introduction
============

USBGuard is a software framework designed to protect Linux systems from unauthorized or potentially
malicious USB devices. It provides a robust mechanism for controlling which USB devices are allowed to
connect to your system by implementing whitelisting and blacklisting policies based on device attributes
such as ID, serial number, and more.

The primary purpose of USBGuard is to defend against threats like BadUSB attacks, where compromised
USB devices can be used to exploit or take control of a computer. By enforcing strict authorization
policies, USBGuard helps prevent rogue devices from gaining access, reducing the risk of data theft,
malware infection, or system compromise.

You might want to use USBGuard if you need to:

- secure sensitive systems against unauthorized USB access.
- prevent data exfiltration via removable media.
- limit the risk of malware introduced through USB devices.
- maintain compliance with security policies that restrict external device usage.

USBGuard is especially valuable in environments where physical access to computers is possible, such as
offices, labs, or public spaces. Its flexible rule language and integration with Linux kernel features make
it a powerful tool for enhancing endpoint security.

Installation
============

USBGuard requires the NI Linux RT System Image version 11.3 (build 25.8.0) or newer.

To install USBGuard on an NI Linux Real-Time system, simply run the following command
from your target:

.. code:: bash
    
    opkg install usbguard


This will install, but not enable, USBGuard on your system.

You can check the status of the USBGuard service with:

.. code:: bash

    service usbguard status

Configuration
=============

USBGuard uses configuration files to control its behavior and define which USB devices are allowed or
blocked. The two main files are:

- ``/etc/usbguard/rules.conf``: This file contains the rules that define which USB devices are allowed or blocked.
- ``/etc/usbguard/usbguard-daemon.conf``: This file contains the daemon configuration

.. warning::
    By default, USBGuard blocks all USB devices until you create rules to allow them.
    This includes essential devices like your keyboard and mouse. Before starting or enabling
    USBGuard, make sure your ``rules.conf`` authorizes the devices you need to avoid losing access.


To generate a ruleset based on currently attached USB devices, run the following command as root:

.. code:: bash

    usbguard generate-policy > /etc/usbguard/rules.conf


This will create a ``rules.conf`` file that whitelists all devices currently connected to your system. You
can then edit this file to fine-tune your device policies.


Once you are satisfied with your rules, you can enable USBGuard to run at startup by running:

.. code:: bash

    # Force remove any existing symlinks
    update-rc.d -f usbguard remove
    # Add USBGuard to startup, starting if applicable for current runlevel, using
    # defaults from the init script
    update-rc.d -s usbguard defaults

Service Management
==================

With sysvinit, you can manually control the USBGuard service using the following commands:

.. code:: bash

    service usbguard start      # Start the USBGuard service
    service usbguard stop       # Stop the USBGuard service
    service usbguard restart    # Restart the USBGuard service
    service usbguard status     # Check the status of the USBGuard service

These commands require root privileges.

Additional Resources
====================

- `USBGuard Configuration Documentation <https://usbguard.github.io/documentation/configuration.html>`_
- `USBGuard Rule Language Documentation <https://usbguard.github.io/documentation/rule-language.html>`_



