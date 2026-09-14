=============================================================================================
Known Issues
=============================================================================================

.. contents:: Table of Contents
    :depth: 2
    :local:

collect2.exe: error: ld returned 1 exit status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rubric:: Problem

When building source code using the `GNU C & C++ Compilers for x64`, the following error may be returned:

   ::

      .../usr/lib/../lib\libdl.a: file not recognized: file format not recognized
      collect2.exe: error: ld returned 1 exit status

This issue has been observed with the following files:

   - libanl.a
   - libdl.a
   - libpthread.a
   - libutil.a

.. rubric:: Cause

This issue was identified in versions 2025Q1 through 2026Q3 of the `GNU C & C++ Compilers for x64` toolchain, where the static library files listed above were exported with incorrect line endings.

.. rubric:: Resolution

Open the affected static library file in a text editor and convert the line endings from `CRLF` to `LF`.
