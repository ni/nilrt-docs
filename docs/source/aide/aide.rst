==================================================
File Integrity Monitoring with AIDE
==================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Introduction
============

AIDE (Advanced Intrusion Detection Environment) is a host-based file integrity
monitoring tool. It takes a snapshot of the monitored filesystem state
(the *baseline*) and reports any additions, removals, or modifications to
monitored files each time a check is run.

On NI Linux Real-Time (NILRT), AIDE monitors the security-sensitive parts of the
filesystem (``/bin``, ``/sbin``, ``/lib``, ``/usr``, ``/boot``, ``/etc``, and
kernel modules) and logs a summary to the system log after each daily check.
No daemon runs between checks, so AIDE has no steady-state CPU or memory impact.
When a check does run, it is an ordinary (non-real-time) process, so real-time
threads always take priority over it.

You might want to use AIDE if you need to:

- Detect unexpected changes to system binaries, libraries, or configuration
  files on an embedded Linux controller.
- Demonstrate filesystem integrity monitoring for security audits or compliance
  evidence.
- Receive an alert when a file is added, removed, or modified outside of an
  intentional change.

.. note::
   This guide covers NILRT-specific installation and use. For full documentation
   on AIDE configuration syntax and all command-line options, refer to the
   official `AIDE manual <https://aide.github.io/doc/>`_.

Availability
============

AIDE is included in NILRT base system images. On older images it can be
installed from the NILRT package feed with ``opkg``:

.. code:: bash

   opkg update
   opkg install aide

This installs the ``aide`` binary, the NI baseline monitoring policy
(``/etc/aide.conf``), and the following scripts:

- ``/etc/init.d/aide-init`` — builds the baseline on first boot and rebuilds it
  on request.
- ``/usr/sbin/aide-check`` — runs an integrity check. ``/etc/cron.d/aide-check``
  runs it daily at 00:00 UTC (midnight UTC).
- ``/etc/opkg/post_invoke.d/10-aide-reinit`` — rebuilds the baseline after each
  package installation, upgrade, or removal with ``opkg``.

Initial Baseline and Updating the Baseline
==========================================

The baseline is built automatically on first boot by the ``aide-init`` init
script. You do not need to run it manually on a freshly imaged target.

The baseline is also rebuilt automatically after every ``opkg`` command that
successfully installs, upgrades, or removes packages, so package changes are not
reported as differences by later checks. The rebuild runs in the background, so
``opkg`` does not wait for it. Integrity checks are skipped until it finishes.

You need to rebuild the baseline yourself after other intentional changes, for
example:

- deploying a LabVIEW Real-Time application.
- changing system configuration (for example, hostname or network settings).

To rebuild the baseline, run:

.. code:: bash

   /etc/init.d/aide-init reinit

.. note::
   Before rebuilding the baseline, consider running a manual check first
   (see `Checking Status`_) and reviewing any unexpected differences.
   Rebuilding the baseline accepts the current filesystem state as trusted.

This rebuilds the baseline in the background from the current filesystem state
and replaces the existing database and checksum, which are re-protected. On
ARM32 targets (for example, cRIO-9068) this takes approximately 2–3 minutes; on
x64 targets it takes 1–2 minutes.

If you do not rebuild the baseline after making changes, AIDE will continue to
report the differences on every subsequent daily check until the baseline is
updated.

.. note::
   The ``reinit`` operation requires root permissions.

Changes Reported When the Baseline Is Rebuilt
---------------------------------------------

When the baseline is rebuilt after an ``opkg`` command, AIDE first compares the
filesystem with the previous baseline and logs what changed. If every change
comes from the packages that were installed, upgraded, or removed, a
``daemon.info`` line similar to the following is logged::

   aide-init: rebaseline: changes since the previous baseline are from opkg packages: Added entries: 2 Removed entries: 0 Changed entries: 0 [report: /var/log/aide/aide-update.20261029-121527.log]

If some changes do not come from those packages, a ``daemon.warning`` line lists
them::

   aide-init: rebaseline: 2 change(s) since the previous baseline not accounted for by opkg packages, e.g. added /usr/bin/zz-canary;changed /etc/hosts; [report: /var/log/aide/aide-update.20261029-122910.log]

The full list is at the end of the named report. Review these changes: they were
made outside of ``opkg`` and are included in the new baseline, so later checks no
longer report them. Changes to ``/etc/firewalld/zones/`` are expected when an
installed or removed package opens or closes firewall ports.

.. note::
   The baseline is not rebuilt after an ``opkg`` command that fails, even if some
   of its packages were installed. The next check then reports the files of
   those packages. After resolving the failure, run
   ``/etc/init.d/aide-init reinit`` or a successful ``opkg`` command.

Scheduled Checks
================

AIDE runs automatically at 00:00 UTC (midnight UTC) each day via ``crond``. On a
cRIO-9068 (ARM32, Cortex-A9, 512 MB RAM), each check takes approximately 2–3
minutes; on a cRIO-9030 (x64) it takes approximately 1 minute.

You can inspect or modify the schedule by editing ``/etc/cron.d/aide-check``.
Refer to the cronie documentation for details.

Checking Status
===============

View recent AIDE activity in the system log:

.. code:: bash

   grep aide /var/log/messages

A clean check produces a ``daemon.info`` line in the system log similar to::

   aide-check: integrity check OK: no differences

A check that detected differences produces a ``daemon.warning`` line in the
system log::

   aide-check: integrity check FOUND DIFFERENCES (rc=5): Added entries: 1 Removed entries: 0 Changed entries: 1 [report: /var/log/aide/aide-check.20261029-122750.5k3pMG.log]

To trigger a manual check immediately (outside the daily schedule):

.. code:: bash

   /usr/sbin/aide-check

In addition to the summaries in the system log, each AIDE check also generates
a detailed report in ``/var/log/aide``. View the detailed report for the most
recent check:

.. code:: bash

   ls -lt /var/log/aide/

The newest report is listed first. Open it with ``cat`` or a pager. The 30 most
recent check reports (``aide-check.*.log``) and baseline rebuild reports
(``aide-update.*.log``) are kept; older ones are removed automatically.

Understanding the Report
========================

The per-run report lists every file that differs from the baseline. Each entry
shows what changed. Common attributes include:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Attribute
     - Meaning
   * - ``Size``
     - File size changed
   * - ``SHA256``
     - File content changed (SHA256 hash differs)
   * - ``MTime``
     - Last-modified timestamp changed
   * - ``Inode``
     - Inode number changed (for example, file was replaced)
   * - ``Uid`` / ``Gid``
     - Owner or group changed
   * - ``Perm``
     - File permissions changed

Files listed under **Added** are present on disk but were not in the baseline.
Files listed under **Removed** were in the baseline but are no longer on disk.
Files listed under **Changed** were in the baseline and are still present but
one or more attributes differ.

Troubleshooting
===============

**AIDE reports unexpected differences:**

Review the detailed report to determine whether the changes are intentional.
If they are, rebuild the baseline to record the new system state:

.. code:: bash

   /etc/init.d/aide-init reinit

**The daily check is skipped:**

The system log explains why. ``baseline rebuild pending; skipping integrity
check`` means a baseline rebuild is in progress, and the next check runs
normally. ``BASELINE DATABASE CHECKSUM MISMATCH`` or ``baseline checksum
missing`` means the baseline cannot be verified. This may indicate tampering or
filesystem corruption. Investigate, then rebuild the baseline:

.. code:: bash

   grep aide /var/log/messages
   /etc/init.d/aide-init reinit

**The baseline is not rebuilt:**

Ensure you are running as root. The rebuild runs in the background, so check the
system log for errors, and the rebuild report (``aide-update.*.log``, or
``aide-init.log`` for a first baseline) it names:

.. code:: bash

   grep aide-init /var/log/messages
   ls -lt /var/log/aide/

**AIDE takes a long time on ARM32:**

This is normal. The Cortex-A9 processor in devices like the cRIO-9068 requires
2–3 minutes to hash approximately 11,000 files. Real-time threads take priority
over the check, so it does not affect real-time task latency.

Additional Resources
====================

- `AIDE Documentation <https://aide.github.io/doc/>`_ - Official AIDE manual.
- `AIDE GitHub <https://github.com/aide/aide>`_ - Source code and release notes.
- `CIS Benchmarks <https://www.cisecurity.org/cis-benchmarks/>`_ - CIS filesystem
  integrity control references (1.3.x series).
