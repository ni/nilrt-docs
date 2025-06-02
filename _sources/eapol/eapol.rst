===============================================================
Connecting NI Linux Real-Time Systems to a Wired 802.1X Network
===============================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Introduction
============

Networks protected by `IEEE 802.1X`_ require that devices authenticate before
connecting to the network.
NI Linux Real-Time uses `wpa-supplicant`_ to provide credentials to the network.
wpa-supplicant supports numerous EAP methods.
This document provides instructions on how to connect NI Linux Real-Time systems
to a wired 802.1X network.

.. _IEEE 802.1X: https://en.wikipedia.org/wiki/IEEE_802.1X
.. _wpa-supplicant: https://w1.fi/wpa_supplicant/

Installation
============

Support for connecting to wired 802.1X networks is available on the NI Linux RT System
Image starting with version 11.2 (build 25.5.0).
No additional packages need to be installed.

Configuration
=============

Determine the name of the network interface that will be connected to the wired 802.1X
network, e.g. ``eth1``.
You can see a list of network interfaces and their names by running ``ifconfig``.

Write a wpa-supplicant configuration file with settings appropriate for the network.
Refer to the `wpa-supplicant README`_ for information about the configuration file.

.. _wpa-supplicant README: https://w1.fi/cgit/hostap/plain/wpa_supplicant/README

Example:

.. code-block:: text

    ap_scan=0
    network={
    	key_mgmt=IEEE8021X
    	identity="user"
    	password="password"
    	eap=MD5
    }

You can run the supplicant directly in order to test the configuration file with the
following command:

.. code:: bash

    wpa_supplicant -c ${path_to_configuration_file} -D wired -i ${interface}

To update the NI Linux Real-Time system's network configuration to use
the configuration file, store the file at the following location:

.. code-block:: text

    /etc/natinst/share/wpa_supplicant.wired.${interface}.conf

The system will automatically connect to the network on boot.
To connect immediately, either reboot the system or run the following command:

.. code:: bash

    /etc/init.d/networking restart

