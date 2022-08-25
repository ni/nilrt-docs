==========================================================
Obtaining Kernel Logs from a Prior System Crash Via pstore
==========================================================

On Linux, the dmesg log (i.e., the log printed from the `dmesg` command) is the kernel message buffer. Any `printk` kernel message logs end up here. \
When the kernel crashes, a stack trace is printed to the kernel message buffer. Unfortunately, a crash typically means the system reboots which will \
wipe out any values in the kernel message buffer.

On x64 platforms, the last lines of the kernel message buffer can be placed into EFI variable storage via the pstore mechanism when a kernel crash occurs; this allows them to be retrieved on next boot.

As of NI Linux Real-Time 21.3, the system will automatically copy logs out of EFI storage into the `/var/lib/pstore/[YYYYMMDD_hhmmss]/` directory. \
Reconstructed dmesg information will be files named dmesg-001.txt, where 001 is the numeric count of the "oops" (it's possible for there to be multiple \
"oops"es from different CPU cores).

If a kernel crash occurred and dmesg information was reconstructed, messages will be printed to the kernel message buffer and system log of the \
current boot. For example: 

::

    admin@NI-cRIO-9035-01234567:~# cat /var/log/messages | grep pstore-save
    2022-08-19T20:50:04.921+00:00 NI-cRIO-9035-01234567 [    1.143127] pstore-save: Saving prior dmesg from crash to /var/lib/pstore/20220819_204926

This implementation of saving logs from `pstore` is intended to mimic `systemd-pstore` on systems which have `systemd` enabled. However, this implementation is simpler \
and there may be differences in behavior.
