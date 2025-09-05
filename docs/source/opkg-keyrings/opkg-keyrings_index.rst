==========================================================
NI Linux Real-Time and `opkg-keyrings`: Upgrading keyrings
==========================================================

.. contents:: Table of Contents
   :depth: 2
   :local: 

Introduction
============

The `opkg-keyrings` package is a critical component in systems using opkg for
package management. It contains a collection of public signing keys used to
verify the authenticity and integrity of the package feeds.

The `opkg-keyrings` package is updated periodically to add new keys or remove
expired keys. It is important to keep the keyrings up-to-date to ensure that
packages can be verified and installed correctly.

This document provides instructions on how to upgrade the `opkg-keyrings`
package on NI Linux Real-Time systems.

How to upgrade the keyring via the command line, MAX, or SystemLink
===================================================================
Command Line
------------
Note: The following instructions only work when the target has the base system image installed and is booted
into runmode, and is connected to the internet.

Connect to the RT target via SSH and run the following command (or directly use the terminal on the target):

.. code-block:: bash

    opkg update && opkg upgrade `opkg-keyrings`

MAX
---
Note: The following instructions only work when the target has the base system image installed and is booted
into runmode, and is connected to the internet.

Adding the RT target to MAX
~~~~~~~~~~~~~~~~~~~~~~~~~~~
Right-click on "Remote Systems" and then "Create New ...".
Select "Remote Device (not on the local subnet)". Enter the target's 
host name or IP address, and proceed to "Finish".

Upgrading the `opkg-keyrings` package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Expand the target and click on the option to "Add/Remove software" on the 
target. On the Upgrade tab, there should be an option to upgrade 
`opkg-keyrings`. Upgrading this package should get the 
new signing keys installed to the target and added to the keyring.

SystemLink
----------
Adding the RT target to SystemLink
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Note: The following instructions assume that a SystemLink server is already set up.

Once the RT target has been added to MAX, it can be added to a SystemLink server by
scrolling down to the "SystemLink" section on the required target, and entering the
SystemLink server's IP address or hostname.

Launch and log in to the SystemLink web application. Click Systems
and then click Pending systems. Select the desired target to connect.

Upgrading the `opkg-keyrings` package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This requires creating a State in SystemLink and applying it to the target.

Create a State by navigating to States under System Management. Click on Create State.
Under the Editor tab of the newly created State, add the following and save:

.. code-block:: yaml

    install_updates:
        cmd.run:
            - name: 'opkg update && opkg upgrade `opkg-keyrings`'

Apply the State to the target by navigating to Systems, then selecting the desired target,
and under the States tab, click on the State created above and click Apply.

Purpose of the `opkg-keyrings` package
--------------------------------------
#. Store Trusted Signing Keys

    * The package includes the public keys required to verify package or feed signatures.
    * These keys are placed in specific directories, such as /usr/share/opkg/keyrings/.

#. Ensure Package Integrity

    * During installation, opkg checks package signatures using these keys.
    * This prevents unauthorized or tampered packages from being installed.

#. Key Management

    * The `opkg-keyrings` package is updated when signing keys are rotated (e.g., when
        old keys are retired, and new ones are issued).
    * Upgrading this package ensures the keyring remains current and secure.

Opkg Signing
============
The package feeds are signed with a private key and the corresponding
public key is included in the `opkg-keyrings` package. When the feed is
updated, opkg checks the feed signature against the public key to
verify its authenticity and integrity.

#. Generate and Sign the Package Index

    * A pair of private and public keys is created using a tool like gpg.
    * The private key is used to sign the package index (package index, 
      the *Packages* and *Packages.gz* files in the case of NILRT).
    * A detached signature (*Packages.asc*) is generated and placed alongside the
        *Packages* file.
    * The public key is distributed to the target systems.

#. Verify Signature When a Feed is Updated

    * When opkg updates a package feed, it verifies the signature of the *Packages* file
      using the public key.

#. Trust Management

    * The public key is preloaded or added to the system's trusted keyring, such as
      opkg-key (see :ref:`How keys are added to the `opkg-keyrings`` for more details
      on how this is accomplished).
    * While updating the feed (running `opkg udpate`), opkg verifies the signature.

.. _How keys are added to the `opkg-keyrings`:

How keys are added to the `opkg-keyrings`
=========================================
The Base System Image includes the signing keys, typically located at /usr/share/opkg/keyrings,
preloaded into the keyring.

However, if the signing keys used by the feeds are rotated, the target system requires an update
to add the new key and remove any obsolete keys no longer in use.

The latest version of the `opkg-keyrings` package, available on the distribution feed
(https://download.ni.com/ni-linux-rt/feeds/dist/), is built with the updated signing keys.
Upgrading this package on the target system installs the new signing key to
/usr/share/opkg/keyrings, updates the keyring by adding the new key, and
removes any deprecated keys no longer used to sign the feeds.
