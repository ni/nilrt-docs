==================================================
Tracing on NI Linux Real-Time
==================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Introduction
============

When debugging latency issues, race conditions, or hangs on real-time embedded targets, it is useful to know what the kernel/OS was doing just prior to the error condition. Acquiring and analyzing a kernel event or function trace can provide insights into latency spikes, race conditions, lock contention, priority inversions, missed loop iterations and so on.

This document covers using the kernel ftrace system.

ftrace
======

On NILRT systems the kernel debugfs is mounted at ``/sys/kernel/debug``. The ftrace subsystem can be controlled via pseudo-files at ``/sys/kernel/debug/tracing``. For a quick description of the configuration knobs available, see ``/sys/kernel/debug/tracing/README``.

Below is the typical sequence to start an *event trace* from an SSH/serial terminal prompt. The same operations can be performed via file read/writes from other programming languages, including LabVIEW.

.. note::
   Files under ``/sys/kernel/debug/tracing`` are text files, use appropriate LabVIEW primitives when accessing them.

.. note::
   Tracing is a privileged operation. On older versions of NILRT (2025Q1 and earlier), file ownership and/or permissions have to be adjusted when used from LabVIEW; e.g., with ``chown -R lvuser:ni /sys/kernel/debug/tracing``. This change will not persist across a reboot.

#. Stop any ongoing tracing and clear the buffer.

   .. code:: bash

      echo 0 > /sys/kernel/debug/tracing/tracing_on
      echo 0 > /sys/kernel/debug/tracing/trace

#. Enable tracing for all events.

   .. code:: bash

      echo 1 > /sys/kernel/debug/tracing/events/enable

#. Start tracing.

   .. code:: bash

      echo 1 > /sys/kernel/debug/tracing/tracing_on

#. (optional) Add custom markers to the trace.

   Custom markers can be added into the trace to track the application progress by writing into the trace_marker file:

   .. code:: bash

      echo "something happened" > /sys/kernel/debug/tracing/trace_marker

   Use this with caution and sparingly. Writing to the trace buffer adds additional latency.

Analyzing the results
=====================

The resulting trace can be extracted with ``trace-cmd`` which can be installed from packages feeds with

.. code:: bash

   opkg install trace-cmd

To extract the trace, use

.. code:: bash

   trace-cmd extract

The resulting trace file ``trace.dat`` can then be loaded in the front-end GUI tool ``kernelshark`` for off-target analysis.

   .. image:: resources/trace-loaded-in-kernelshark.png

``kernelshark`` can be used on a Linux desktop distribution or on Windows with Windows Subsystem for Linux (WSL).

Alternatively, trace can also be extracted by reading ``/sys/kernel/debug/tracing/trace`` file directly. This will output a human readable textual representation. Reading the trace can be a slow operation, if it is large.

LabVIEW Threads
---------------

The trace will contain threads created by LabVIEW Real-Time process (lvrt).
The full list of these threads can be obtained by running

.. code:: bash

   cat /proc/$(pidof lvrt)/task/*/status | grep Name

Some common threads are

.. csv-table:: LabVIEW Real-Time threads
   :file: resources/lvrt-threads.csv
   :widths: 20, 60
   :header-rows: 1

Additional information and resources
====================================

* `Linux Tracing Technologies <https://www.kernel.org/doc/html/latest/trace/index.html>`_
* `Debugging the kernel using Ftrace - part 1 <https://lwn.net/Articles/365835/>`_
* `Debugging the kernel using Ftrace - part 2 <https://lwn.net/Articles/366796/>`_
* `trace-cmd: A front-end for Ftrace <https://lwn.net/Articles/410200/>`_
* `KernelShark documentation <https://kernelshark.org/Documentation.html>`_
* `Using KernelShark to analyze the real-time scheduler <https://lwn.net/Articles/425583/>`_
