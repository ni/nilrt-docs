============
nirtfeatures
============

:Source: `ni/linux.git:drivers/misc/nirtfeatures.c <https://github.com/ni/linux/blob/HEAD/drivers/misc/nirtfeatures.c>`_

The `nirtfeatures` driver is a NILRT-specific, out-of-tree, ACPI driver which provides an API to interact with NI hardware devices equipped with supported CPLD devices.

The `nirtfeatures` driver is built into all NILRT x64 kernels, but only systems which provide an ACPI device with device id NIC775D `will be captured <https://github.com/ni/linux/blob/81fc9e513b095c0008520d7a55dabc3ef3531539/drivers/misc/nirtfeatures.c#L1515>`_ by the driver. When the driver captures a device, it creates a symlink from `/dev/nirtfeatures` to the sysfs root.


SysFS
=====

reset_source
------------

The `reset_source` sysfs entry is read-only, and exposes a single word which describes the state of the CPLD's `ProcResetSourceReg` register. Possible values are defined by the possible return values of the `nirtfeatures.c:nirtfeatures_reset_source_get() <https://github.com/ni/linux/blob/b162dea3fba40d50016831993491ad814c3d5742/drivers/misc/nirtfeatures.c#L234>`_ function.

:button: The CPLD came out of reset due to someone toggling the front-panel reset button.
:fpga: The CPLD came out of reset because the onboard FPGA received a reset signal.
:ironclad: The CPLD came out of reset because the *Ironclad* watchdog timer expired.
:poweron: The system was not reset using the CPLD.
:processor: The CPLD came out of reset due to a reset occuring internal to the processor. Most often, this is due to a user-space process rebooting or shutting down the system from software.
:software: The CPLD came out of reset because the processor wrote a `1` to the `ResetProcessor` bit of the `ProcessorModeReg` CPLD register.
:watchdog: The CPLD came out of reset because the niwatchdog timer expired.


User Space Tooling
==================

User space tooling for the `nirtfeatures` driver is provided by the `ni-rtfeatures <https://github.com/ni/meta-nilrt/tree/4402ef086bb2d9b4fdfd47845dbcd0100dbfe211/recipes-ni/ni-rtfeatures>`_ IPK. This IPK includes several initscripts for reporting and handling CPLD register states during system boot.


Logging
=======

.. versionadded:: 9.1

The `/etc/init.d/ni-rtfeatures` initscript displays the status of the CPLD `reset_source` register during boot along with an interpretation of the register's value. The script reads this value from the `/dev/nirtfeatures/reset_source` sysfs file if it is present and prints its interpretation to the syslog and stderr in a line like:

::

	Aug 22 19:18:50 ni-rtfeatures: reset_source=processor  # Reset from MAX or command line

Reference the `reset_source`_ sysfs documentation for more-detailed documentation of the reset_source values.
