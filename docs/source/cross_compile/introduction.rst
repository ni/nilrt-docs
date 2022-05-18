=========================================================
Part 1: Cross Compiling C/C++ Code for NI Linux Real-Time
=========================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Introduction
------------

NI Linux Real-Time opens a wealth of possibilities for interfacing
between the National Instruments and Linux ecosystems. With access to
many common Linux utilities and libraries, it’s possible to create
custom applications and libraries to interface with NI Hardware and
Software or to port existing Linux libraries to NI systems. This
document introduces the concepts of cross compiling and the NI Linux
Real-Time Cross Compile Toolchain for compiling C/C++ projects on NI
Linux Real-Time.

Understanding Compilation Options
---------------------------------

To build C/C++ code for the NI Linux Real-Time operating system, there
are two options:

1. Install the C/C++ toolchain to a Linux Real-Time system directly
   through the OS package manager (opkg) and compile on target.
2. Install the C/C++ toolchain to a system with a different operating
   system (e.g., Windows or other Linux distributions) and compile on
   that system.

The first option tends to be the easiest when dealing with complex
projects with large numbers of dependencies but requires access to a
system running NI Linux Real-Time. In cases where such a system is not
available, this option is not possible.

The second option solves this problem by allowing anyone with the NI
Linux Real-Time GNU C/C++ Compilers to create and compile code to run on
NI Linux Real-Time devices. Compiling code on an operating system other
than the one to be deployed to – known as cross compiling – will be the
focus of this document and the tutorials which follow.

Cross Compiling Concepts
------------------------

NI Linux Real-Time C/C++ Compiler Tools consist of 3 main groups of
tools or resources: The actual GNU C/C++ Compiler, the sysroot, and the
debugger. NI ships two versions of these compiler tools: one for Intel
x64 Linux Real-Time devices and one for ARM 32-bit Linux Real-Time
devices. Understanding the basics of these components is important to
make development and the steps involved clearer.

GNU C/C++ Compiler
~~~~~~~~~~~~~~~~~~

The core of the NI Linux cross compiler toolchains is the GNU C/C++
Compiler and its related tools such as the linker. In a cross compiler
the compiler is an executable built for one system that builds code
targeted to a different system. That is, if using the compiler on
Windows it’s a Windows executable (*.exe) that generates binaries for NI
Linux Real-Time (*.o, \*.so, \*.a, etc.). The compiler accepts the same
flags, preprocessor definitions, and configurations as if it were on a
system natively running NI Linux Real-Time but allows users to compile
on Windows or Linux Desktop distributions.

The Sysroot
~~~~~~~~~~~

In order to develop accurately and compile code that will run when
deployed, developers need access to files that would normally be on the
deployment system such as includes, headers, or third-party libraries.
Without these the compiler will not be able to properly link
dependencies or use system libraries. To solve this problem when
compiling on a different operating system (or just a different system)
than the deployment target, the GNU C/C++ Compiler allows the use of a
“sysroot” through the *–sysroot=<directory>* flag.

The sysroot tells the compiler to use a specified directory as the
logical root directory for libraries and headers. For example, if a file
were found at */usr/lib* on a Linux Real-Time system, specifying a
sysroot on a Windows cross compiler will tell the compiler to instead
look at *<directory>/usr/lib* where *<directory>* is the sysroot.
Without this extra step, linker errors or other problems are very common
when cross compiling or deploying a cross compiled application.

The NI Linux Real-Time C/C++ Compiler Tools ship with a copy of a
sysroot for a given version of the NI Linux Real-Time operating system.
This sysroot includes a set of the typical includes and libraries
installed on NI Linux Real-Time systems and can be used to ensure proper
linking and includes. When using additional third-party libraries or
custom-built utilities it’s important to ensure these are included in
the local sysroot as well. Otherwise the issues mentioned previously may
be encountered.

Debugger
~~~~~~~~

In addition to the tooling required to create a binary, the cross
compile tools include a version of the GNU Debugger (gdb) compiled to
run on Windows for usage with the NI Linux Real-Time tools and sysroot.
This debugger connects to the remotely running GNU Debugger Server
(gdbserver) which is included by default on every NI Linux Real-Time
distribution.

**Note:** Even with the cross compile tools, debugging requires a system
which can actually run the compiled code. That is, a system running NI
Linux Real-Time is still necessary for debugging.

Getting Started
---------------

What Tools and Why?
~~~~~~~~~~~~~~~~~~~

For these tutorials, Visual Studio Code and several open source
third-party tools are used. Visual Studio Code, or VS Code, is a
streamlined code editor created by Microsoft with support for
development operations like debugging, task running, and version
control. The environment allows easy installation and configuration with
custom extensions and is used in these tutorials as a starting point to
introduce users to possible development tooling.

This is not to say that Visual Studio Code and the tools used in these
tutorials are the only ones which support NI Linux Real-Time
compilations. These tools are suggested as a starting place to learn
about using the C/C++ compiler toolchain. There are two main reasons for
using these tools rather than an official shipping NI product:

1. By using open source and third-party tools, it is shown that the
   compile toolchain is just a normal C/C++ cross compiler and does not
   require specialized development tools to use.

2. Setting up third-party tools allows users to better understand the
   overall process by demonstrating one potential set of options that
   can then be extended to other tools.

While NI is recommending these tools as a starting point the intention
is that advanced users will pick the right options for their specific
needs. There is nothing restricting usage of the compile tools to the
specific IDE, build tool, or deployment methods covered in these
documents.
