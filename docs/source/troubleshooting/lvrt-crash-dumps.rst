=====================================
LabVIEW Core Dumps on Linux Real-Time 
=====================================

Introduction
============

When troubleshooting LabVIEW Real-Time crashes, it is often helpful to understand the memory and instruction stack at the time of the crash. LVRT can be configured to dump this core context to disk when it crashes.

Note that core dumps are not gauaranteed to contain useful information about any particular problem. They are best evaluataed with other contextual information about the system state at the time of the crash. This can include:

- logs of what the application is doing at the time of the crash.
- simplified reproducing cases.
- context as to what changed when the crash started happening.

Without this information, the likelihood that a dump file will provide useful information decreases significantly. For example, a core dump may show an access violation due to a bad refrence in the code but it may not show what caused the reference to become bad in the first place. That information can be used to narrow things down but will not give a root cause on its own.

Additionally, reproducing a crash internally to NI is generally preferred. A dump can be unwound externally, but without access to NI symbols, it is unlikely to yield useful information. If the issue is reproduced internally at NI, the same system can be used for both reproducing and unwinding the core dump ensuring that the software versions used for debugging the dump file are consistent.


Generating a Core Dump
========================

#. Ensure that the target has software installed, is in run-mode, and will not reboot into safe mode upon reboot. This can be done by verifying the following in NI MAX:

	-  Verify that the ``Status`` of the target in the ``System Settings`` tab is currently ``Connected - Running.``
	-  Verify that the ☐ ``Force Safe Mode`` checkbox is **not** checked in the ``System Settings`` tab.

#. On the ``System Settings`` tab in NI MAX, check the boxes under ``Startup Settings`` for both ☑ ``Enable Secure Shell Server (sshd)`` and ☑ ``Enable Console Out.``

#. Navigate to the ``/var/local/natinst/log/`` directory either remotely or via a terminal and remove any existing core dumps.

	.. code:: bash

		admin@NI-cRIO-9036-01D5AED5:~# cd /var/local/natinst/log
		admin@NI-cRIO-9036-01D5AED5:/var/local/natinst/log# ls
		SystemWebServer.log
		core_dump.!usr!local!natinst!labview!lvrt
		errlog.txt
		lvlog01-20-20-21-27-51.txt
		lvlog01-20-20-21-29-47.txt
		lvlog01-20-20-21-35-13.txt
		lvlog01-20-20-21-37-03.txt
		lvrt_19.0_lvuser_cur.txt
		lvrt_19.0_lvuser_log.txt
		admin@NI-cRIO-9036-01D5AED5:/var/local/natinst/log# rm core_dump.\!usr\!local\!natinst\!labview\!lvrt


Configuring LVRT
----------------

LabVIEW Real-Time core dumps are disabled by default, as they can consume a substantial amount of disk space. You can enable them using the following methods.


LVRT >= 23.1
************

Beginning with the LV 23.1 release, LVRT is configured to *not* produce core dumps unless the ``[LVRT]EnableCoreDumps`` `ni-rt.ini` token is set to ``true``; enable it with the following command.

.. code:: bash

	nirtcfg --set section=LVRT,token=EnableCoreDumps,value=true

	nirtcfg --list | grep EnableCoreDumps  # confirm

Restart the NI Linux Real-Time target to apply the change in settings.

.. note:: The token value is tested by the ``/etc/init.d/lvrt-wrapper`` initscript during boot.

On NILRT ARM distributions, the system-wide core dump ulimit is set to ``0``. Even after you enable the INI token above, you must then follow the `LVRT < 23.1`_ instructions below to enable ``unlimited`` core dumps.


LVRT < 23.1
***********

Prior to LVRT 23.1, LVRT's core dump controls are entirely controlled using the ``/etc/init.d/lvrt-wrapper`` initscript.
	
Modify the ``/etc/init.d/lvrt-wrapper`` file in a text editor via FTP, sFTP, WebDAV, or directly on the target. Uncomment the following item in the file as described by the comments in the file:

	.. code:: bash

		# core file size
		# uncomment to enable core dumps
		#ulimit -c unlimited

Restart the NI Linux Real-Time target to apply the change in settings.


Saving a Core Dump
--------------------

#. With core dumps enabled, reproduce the crash.

#. Confirm that a core dump is now present in ``/var/local/natinst/log/``. The core dump should have a name similar to ``core_dump.!usr!local!natinst!labview!lvrt``.

	.. code:: bash

		admin@NI-cRIO-9036-01D5AED5:~# ls /var/local/natinst/log
		SystemWebServer.log
		core_dump.!usr!local!natinst!labview!lvrt
		errlog.txt
		lvlog01-20-20-21-27-51.txt
		lvlog01-20-20-21-29-47.txt
		lvlog01-20-20-21-35-13.txt
		lvlog01-20-20-21-37-03.txt
		lvrt_19.0_lvuser_cur.txt
		lvrt_19.0_lvuser_log.txt

#. Archive the dump file.

	.. code:: bash

		admin@NI-cRIO-9036-01D5AED5:/var/local/natinst/log# tar -czf myCoreDump.tar.gz core_dump.\!usr\!local\!natinst\!labview\!lvrt
		admin@NI-cRIO-9036-01D5AED5:/var/local/natinst/log# ls
		SystemWebServer.log
		core_dump.!usr!local!natinst!labview!lvrt
		errlog.txt
		lvlog01-20-20-21-27-51.txt
		lvlog01-20-20-21-29-47.txt
		lvlog01-20-20-21-35-13.txt
		lvlog01-20-20-21-37-03.txt
		lvlog01-20-20-21-42-12.txt
		lvlog01-20-20-21-42-33.txt
		lvrt_19.0_lvuser_cur.txt
		lvrt_19.0_lvuser_log.txt
		myCoreDump.tar.gz
		admin@NI-cRIO-9036-01D5AED5:/var/local/natinst/log#

#. Copy the core dump archive to a host system via a supported file transfer method (FTP, sFTP, WebDAV, etc).
#. Generate an NI MAX Technical Support Report and include this when providing NI Support with the core dump.


Confirming Core Dumps are Generated
-----------------------------------

To confirm core dumps are properly configured, it's possible to force a crash of the LabVIEW Real-Time process for testing purposes.

#. Configure a target for Core Dumps as described above.

#. Open a terminal on the target (SSH or Serial) and log in as the admin user.

#. Run the following command:

	.. code:: bash

		killall -3 lvrt

	This command will send a SIGSEGV to the lvrt process.

#. Confirm that the lvrt process crashed.

	**LabVIEW Real-Time >= 23.1**

	A message will be logged to the system log at `/var/log/messages` if a crash occurs.
	Run the following command to confirm the crash was logged.

	.. code:: bash

		cat /var/log/messages | tail

	This will show the last 10 messages logged.
	If a crash occurred, the a message similer to the following should be present:

	.. code:: bash

		lvrt-daemon: The LabVIEW Real-Time Process has encountered an error. Check /var/local/natinst/log for error logs.

	**LabVIEW Real-Time < 23.1**

	Run the following command:

	.. code:: bash

		ps -aux | grep lvrt

	If lvrt crashed, there should be something similar to the following result, noting the CRASHED_AND_RESTART message:

	.. code:: bash

		1707 admin      0:00 {lvrt-daemon} /bin/sh /etc/init.d/lvrt-daemon
		2408 admin      0:00 /bin/su -- lvuser -l -c /etc/init.d/lvrt-wrapper CRASHED_AND_RESTART /var/run/lvrt_wrapper.pid false
		2409 lvuser     0:00 {MainAppThread} ./lvrt
		2473 admin      0:00 grep lvrt

#. Confirm that a core dump is now present in ``/var/local/natinst/log/``. The core dump should have a name similar to ``core_dump.!usr!local!natinst!labview!lvrt``.

	.. code:: bash

		admin@NI-cRIO-9036-01D5AED5:~# ls /var/local/natinst/log
		SystemWebServer.log
		core_dump.!usr!local!natinst!labview!lvrt
		errlog.txt
		lvlog01-20-20-21-27-51.txt
		lvlog01-20-20-21-29-47.txt
		lvlog01-20-20-21-35-13.txt
		lvlog01-20-20-21-37-03.txt
		lvrt_19.0_lvuser_cur.txt
		lvrt_19.0_lvuser_log.txt

#. Remove the core dump before proceeding to reproduce the actual crash.
