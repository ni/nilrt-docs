========================
Technical Support Report
========================

Hardware Configuration Utility can generate a Technical Support Report for an NI Linux Real Time system which contains information about the system that is helpful in troubleshooting issues.

Starting with NILRT version 11.2 (i.e., 2025Q3), Technical Support Report generated in `.zip` format for x64 systems will also include contents of `/var/log`, `/var/local/natinst/log`, and `/var/lib/pstore`.

Other files and directories can be included in the Technical Support Report by adding a configuration file such as `user_logs.ini` under `/usr/share/ni-resetniconfig` like following

.. code:: text

   [Paths]
   File1 = /File_Path

   [Dirs]
   Dir1 = /Some/Dir_1
   Dir2 = /Some/Dir_2

Additional information and resources
====================================

* `Generating a Technical Support Report <https://www.ni.com/docs/en-US/bundle/hardwareconfigurationutility/page/tech-support-report.html>`_
