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
When a check does run, it executes at the lowest system priority to avoid
interfering with real-time workloads.

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

AIDE is available in the NILRT package feed and can be installed with ``opkg``:

.. code:: bash

   opkg update
   opkg install aide

This installs the ``aide`` binary, the NI baseline monitoring policy
(``/etc/aide.conf``), and two scripts:

- ``/etc/init.d/aide-init`` — builds the baseline on first boot.
- ``/etc/cron.daily/aide-check`` — runs an integrity check daily at 00:00 UTC (midnight UTC).

Initial Baseline and Updating the Baseline
==========================================

The baseline is built automatically on first boot by the ``aide-init`` init
script. You do not need to run it manually on a freshly imaged target.

There are several reasons you may need to rebuild the baseline, including:

- deploying a LabVIEW Real-Time application.
- installing or upgrading packages with ``opkg install`` or ``opkg upgrade``.
- changing system configuration (for example, hostname or network settings).

To rebuild the baseline, run:

.. code:: bash

   /etc/init.d/aide-init reinit

.. note::
   Before rebuilding the baseline, consider running a manual check first
   (see `Checking Status`_) and reviewing any unexpected differences.
   Rebuilding the baseline accepts the current filesystem state as trusted.

This removes the existing database and checksum, rebuilds the baseline from the
current filesystem state, and re-protects both files. On ARM32 targets
(for example, cRIO-9068) this takes approximately 2–3 minutes; on x64 targets
(for example, cRIO-9045) it completes in under a minute.

If you do not rebuild the baseline after making changes, AIDE will continue to
report the differences on every subsequent daily check until the baseline is
updated.

.. note::
   The ``reinit`` operation requires root permissions.

Scheduled Checks
================

AIDE runs automatically at 00:00 UTC (midnight UTC) each day via ``crond``. The check runs at
the lowest system priority (``nice -n 19 ionice -c3``) to avoid interfering with
real-time workloads. On a cRIO-9068 (ARM32, Cortex-A9, 512 MB RAM), each check
takes approximately 2–3 minutes; on a cRIO-9045 (x64) it takes approximately
10–15 seconds.

You can inspect or modify the schedule by editing the cron configuration. Refer
to the cronie documentation for details.

Checking Status
===============

View recent AIDE activity in the system log:

.. code:: bash

   grep aide /var/log/messages

A clean check produces a ``daemon.info`` line in the system log similar to::

   aide-check: check complete — 0 added, 0 removed, 0 changed (11234 files)

A check that detected differences produces a ``daemon.warning`` line in the
system log::

   aide-check: DIFFERENCES FOUND — 3 added, 0 removed, 1 changed (11234 files)

To trigger a manual check immediately (outside the daily schedule):

.. code:: bash

   sh /etc/cron.daily/aide-check

In addition to the summaries in the system log, each AIDE check also generates
detailed reports in ``/var/log/aide``. View the detailed report for the most
recent check:

.. code:: bash

   ls -lt /var/log/aide/

The newest report is listed first. Open it with ``cat`` or a pager. Detailed
reports are retained for 30 days and then automatically removed by log rotation.

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

**The daily check is skipped with a "baseline error" in the log:**

The baseline database or its checksum sidecar cannot be verified. This may
indicate tampering, filesystem corruption, or that ``aide-init`` has not yet
run. Check the syslog for details and rebuild the baseline:

.. code:: bash

   grep aide /var/log/messages
   /etc/init.d/aide-init reinit

**The** ``aide-init reinit`` **command fails:**

Ensure you are running as root. Verify that the baseline database exists and
check whether the immutable bit is set:

.. code:: bash

   ls -la /var/lib/aide/
   lsattr /var/lib/aide/aide.db.gz

If the ``i`` (immutable) flag is set and preventing the operation, remove it
before reinitializing:

.. code:: bash

   chattr -i /var/lib/aide/aide.db.gz /var/lib/aide/aide.db.gz.sha256
   /etc/init.d/aide-init reinit

**AIDE takes a long time on ARM32:**

This is normal. The Cortex-A9 processor in devices like the cRIO-9068 requires
2–3 minutes to hash approximately 11,000 files. AIDE runs at the lowest priority
and does not affect real-time task latency.

Additional Resources
====================

- `AIDE Documentation <https://aide.github.io/doc/>`_ - Official AIDE manual.
- `AIDE GitHub <https://github.com/aide/aide>`_ - Source code and release notes.
- `CIS Benchmarks <https://www.cisecurity.org/cis-benchmarks/>`_ - CIS filesystem
  integrity control references (1.3.x series).
