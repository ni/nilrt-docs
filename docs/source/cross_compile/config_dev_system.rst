===========================================================================================================
Part 2: Configuring a Development System with Visual Studio Code and the NI Linux Real-Time C/C++ Compilers
===========================================================================================================

.. contents:: Table of Contents
   :depth: 2
   :local:

Introduction
------------

The NI Linux Real-Time C/C++ Compiler toolchain provides the components
needed to cross compile but does not include a specific development
environment, deployment tool, build tool, or many other tools developers
may use as part of a normal workflow. This document walks through the
steps necessary to set up a basic configuration on a development
computer for use with the NI Linux Real-Time C/C++ compiler including
various third-party open-source software to fill these gaps.

Required Software
-----------------

The following tools are used for this series of tutorials. This document
briefly covers each tool and how to set it up.

-  Visual Studio Code

   -  `C/C++
      extension <https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools>`__
      – Microsoft extension which adds IntelliSense and debugging
      support for C/C++

-  One of the following compiler toolchains:

   -  `GNU C & C++ Compilers for x64
      Linux <https://www.ni.com/en-us/support/downloads/software-products/download.gnu-c---c---compile-tools-x64.html#477802>`__
      (Windows host) 2017 or later
   -  `GNU C & C++ Compilers for ARMv7
      Linux <https://www.ni.com/en-us/support/downloads/software-products/download.gnu-c---c---compile-tools-for-armv7.html#338448>`__
      (Windows host) 2017 or later

-  FileZilla

-  `PuTTY`_

-  CMake

-  Ninja

-  7-Zip (v22.01 or higher)

These tools are not the only options and are mainly used to demonstrate
configuration and usage of the toolchain. Visual Studio Code allows
completely different tooling with various extensions and command line
tasks. For example, it’s possible to use build automation software other
than CMake and Ninja or to use different sFTP or SSH clients. While NI
recommends Visual Studio Code, it’s possible to use other development
environments or editors as well.

Installing Visual Studio Code
-----------------------------

Visual Studio Code is a code editor created by Microsoft as a
lightweight, stream-lined solution for common development operations.
Thanks to its lightweight and open-source nature, Visual Studio Code
makes an excellent environment for starting to work with various
open-source build tools and compilers while providing many features
users expect from modern code editors such as IntelliSense and
debugging.

.. note::
   Visual Studio Code frequently receives updates and
   improvements to appearance, usability, and functionality. This tutorial
   was created with version 1.38.1 of the environment. Other versions may
   differ in appearance.

Installing the IDE
~~~~~~~~~~~~~~~~~~

1. Navigate to the `Visual Studio Code home
   page <https://code.visualstudio.com>`__.

2. Download the IDE installer for your Operating System.

3. Follow the platform-specific guide for `Setting up Visual
   Studio Code <https://code.visualstudio.com/docs/setup/setup-overview>`__.

4. Once finished, launch Visual Studio Code.

Installing Extensions
~~~~~~~~~~~~~~~~~~~~~

1. | In Visual Studio Code, open the **Extensions** pane by clicking the
     extensions icon on the left of the IDE.

   .. image:: media/config_pc/image2.png

2. Search for and install each extension you want to use. Extensions
   will be automatically updated as new releases come out. For using
   with the NI Linux Real-Time Toolchain, the following extensions are
   recommended:

   - | `C/C++
        extension <https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools>`__
        – Microsoft extension which adds IntelliSense and debugging
        support for C/C++

      .. image:: media/config_pc/image3.png

Installing the C/C++ Cross Compile Toolchains
---------------------------------------------

Option 1: Extract the Toolchain
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For the toolchain installation, NI recommends using the same directory
structure for each version of the tools installed on a system. This is
flexible as long as the cross compile configuration in the IDE points to
the right location.

1. Navigate to the `ni.com/downloads <https://ni.com/downloads>` page and
   download the **GNU C & C++ Compile Tools** for ARMv7 or x64, depending
   on the Real-Time device and software versions used on the device. Each
   toolchain is a compressed collection of the required files rather than
   an installer. To check which toolchain is necessary for a given device,
   refer to `Real-Time Controllers and Real-Time Operating System
   Compatibility. <https://www.ni.com/en-us/support/documentation/compatibility/17/real-time-controllers-and-real-time-operating-system-compatibili.html>`__

Windows
^^^^^^^

.. note::
   The steps below refer to the *toolchain version*.
   Typically, this corresponds to the first version that the toolchain
   supports. For example, the 2018-2019 toolchain is typically referred
   to as the 18.0 version.`

1. Use 7-Zip to extract the contents of the toolchain.

.. note::
   Extracting the toolchain requires the ability to create
   symbolic links or the toolchain will not work properly. On Windows,
   this requires that the current user have permissions to create
   symbolic links or that 7-Zip be run as an administrator.

2. | If using an ARMv7 target, extract and copy the contents of the
     toolchain to *C:\\build\\<toolchain version>\\arm\\*. The resulting file
     structure should look as follows:

   .. image:: media/config_pc/image4.png

3. | If using a x64 target, extract and copy the contents of the toolchain
     to *C:\\build\\<toolchain version>\\x64\\*. The resulting file structure
     should look similar to the following:

   .. image:: media/config_pc/image5.png

.. note::
   Extracting the files may require extracting twice – once to
   unzip, and once to unpack the tar file. During these extractions there
   may be dialogs prompting the replacement of files or warnings. The
   warnings can be safely ignored.

4. | If using x64 toolchain versions 2023Q1 and later, follow these steps
     to setup **PATH**.

   a. | Press **Start+R** to open the **Run** window, then type in
        *sysdm.cpl* and hit **OK.** This will launch the **System
        Properties** window.

      .. image:: media/config_pc/image10.png

   b. | In the **System Properties** window, navigate to the **Advanced**
        page and select **Environment Variables…** to open the
        **Environment Variables** window.

         .. image:: media/config_pc/image11.png

   c. | In the **System variables** section of the **Environment
        Variables** window, navigate to and select **Path** then click
        **Edit…**

      .. image:: media/config_pc/image12.png

   d. | In the **Edit environment variable** window, click **New** to add a
        new path.

      .. image:: media/config_pc/image13.png

   e. | Enter *C:\\build\\<toolchain version>\\x64\\sysroots\\x86_64-w64-mingw32\\usr\\bin*.
        Click **OK**.

      .. image:: media/config_pc/image17.png

   f. Click **OK** twice more to exit the **System Properties** window.

   .. note::
      If multiple toolchain versions are installed on the same system,
      update this PATH to the currently-in-use version.

Linux
^^^^^

1. Open a terminal and navigate to the directory where the toolchain was
   downloaded.

2. | Modify the script permissions to enable execution:

   .. code:: bash

      chmod +x <toolchain>.sh

3. | Run the script to extract the toolchain:

   .. code:: bash

      sudo ./<toolchain>.sh
      # Options:
      # -y: Automatic yes to all prompts
      # -d <dir>: Install the SDK to <dir>
      #  Default dir: /usr/local/oecore-x86_64

4. | Update the PATH environment variable to include the toolchain path, by modifying *~/.profile* or *~/.bashrc*, adding:

   .. code:: bash

      export PATH="$PATH:/usr/local/oecore-x86_64/sysroots/x86_64-nilrtsdk-linux/usr/bin"

      source ~/.profile
      # or
      source ~/.bashrc

Option 2: Install the Toolchain (x64 Only)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Windows
^^^^^^^

1. | Download the **NILRT CrossCompile Toolchain** installer from ni.com/downloads. Refer to **Installing, Updating, Repairing, and Removing NI Software** using Package Manager on ni.com/docs.

   .. note::
      The **NILRT CrossCompile Toolchain** will install to *C:\\build\\<toolchain version>\\x64*.

Linux
^^^^^

1. Follow the instructions for `Installing NI Drivers and Software on Linux Desktop <https://www.ni.com/docs/en-US/bundle/ni-platform-on-linux-desktop/page/installing-ni-drivers-and-software-on-linux-desktop.html>`

2. | Use the system package manager to install NI LinuxRT Toolchain.

   .. code:: bash

      sudo apt-get install ni-linuxrt-toolchain
      sudo zypper install ni-linuxrt-toolchain
      sudo yum install ni-linuxrt-toolchain


3. | Update the PATH environment variable to include the toolchain path, by modifying *~/.profile* or *~/.bashrc*, adding:

   .. code:: bash

      export PATH="$PATH:/usr/local/oecore-x86_64/sysroots/x86_64-nilrtsdk-linux/usr/bin"

      source ~/.profile
      # or
      source ~/.bashrc

Other Tools
-----------

Since Visual Studio Code is meant to be flexible and is not tailored to
a specific use case, much of the build and deployment process is
decoupled from the IDE itself. This has the advantage that more advanced
users can configure and use any third-party tools they want with many
extensions enabling this further. Below are the options used in this
series of tutorials and which should be installed to follow along with
this tutorial series. Note that these options will mostly be used
through Tasks in Visual Studio Code or separately from the environment
but that various extensions may help integrate or better fulfil usage
requirements.

FileZilla
~~~~~~~~~

`FileZilla <https://filezilla-project.org/>`__ is a free, cross-platform
FTP application, consisting of FileZilla Client and FileZilla Server.
FileZilla Client will be used as a sFTP client to transfer files to and
from a NI Linux Real-Time system as needed. Note that this is not
required if a system will only be used for compilation and not
deployment.

   .. image:: media/config_pc/image6.png

.. note::
   As an alternative to FileZilla, NI recommends the OpenSSH
   command line utilities included with Windows 10 as of the Autumn 2018
   release of that Operating System. Refer to the `official OpenSSH
   documentation <https://www.openssh.com/manual.html>`__ for information
   on its use.

Putty
~~~~~

.. note::
   Windows only application

`PuTTY`_ is a free and open-source terminal
emulator, serial console and network file transfer application. In this
use case, we’ll be using it as an SSH Client to interact with the remote
system.

.. image:: media/config_pc/image7.png

CMake
~~~~~

`CMake <https://cmake.org/download>`__ is a cross-platform free and
open-source software tool for managing the build process of software
using a compiler-independent method. Essentially, CMake is a tool that
generates the files needed for build tools such as Make or Ninja. It
will allow configurable builds which, with some work, can be made cross
platform friendly as well.

.. note::
   On Linux Desktop, you have the option of installing CMAKE via
   the system package manager. eg: *sudo zypper install cmake*

This series of tutorials were created using CMake 3.14.4. For more
information on using CMake and version difference, refer to the
`official CMake documentation <https://cmake.org/documentation/>`__.

| NI recommends adding CMake to the system PATH during installation for
  ease of use:

.. image:: media/config_pc/image8.png

Ninja
~~~~~

.. note::
   Recommended only for Windows. For Linux Desktop use GNU Make

`Ninja <https://ninja-build.org>`__ is a small build system and one of
the tools `CMake can generate build files
for <https://cmake.org/cmake/help/latest/manual/cmake-generators.7.html>`__.
These files allow Ninja to automate the build process for (in this case)
C/C++ code like using GNU Make on a UNIX system. Since installing Ninja
is a bit more involved than simply running a Windows installer, follow
the below steps to ensure it’s configured correctly for the tutorials.

1. Download the Ninja binary files for Windows.

2. | Extract and copy Ninja.exe to a suitable location (e.g.,
     *C:\\Program Files\\Ninja\\*)

   .. image:: media/config_pc/image9.png

3. | The executable can be added to the system PATH for easier use.
     Press **Start+R** to open the **Run** window, then type in
     *sysdm.cpl* and hit **OK.** This will launch the **System
     Properties** window.

   .. image:: media/config_pc/image10.png

4. | In the **System Properties** window, navigate to the **Advanced**
     page and select **Environment Variables…** to open the
     **Environment Variables** window.

      .. image:: media/config_pc/image11.png

5. | In the **System variables** section of the **Environment
     Variables** window, navigate to and select **Path** then click
     **Edit…**

   .. image:: media/config_pc/image12.png

6. | In the **Edit environment variable** window, click **New** to add a
     new path.

   .. image:: media/config_pc/image13.png

7. | Enter the path to the directory containing the ninja binary (e.g.,
     C:\\Program Files\\Ninja\\). Click **OK**.

      .. image:: media/config_pc/image14.png

8. Click **OK** twice more to exit the **System Properties** window.

9. | Confirm that Ninja is now accessible in a new command prompt by
     running *ninja --version*. This

      .. image:: media/config_pc/image15.png

GNU Make
~~~~~~~~

.. note::
   Recommended only for Linux Desktop

1. | Use the system package manager to install GNU Make.

   .. code:: bash

      sudo apt-get install make
      sudo zypper install make
      sudo yum install make

2. | Optional: Install development tools that come with your distribution.

   .. code:: bash

      sudo apt-get install build-essential
      sudo zypper install -t pattern devel_basis
      sudo yum groupinstall "Development Tools"

7-Zip
~~~~~

.. note::
   Recommended only for Windows

`7-Zip <https://www.7-zip.org/download.html>`__ is a free and open-source
file-archiver. In this case, use this tool to extract the toolchain
downloaded from ni.com.

.. image:: media/config_pc/image16.png

Next Steps
----------

With the software installed, it’s time to configure Visual Studio Code
for a project using the NI Linux Real-Time compilers.


.. _PuTTY: https://putty.software/
