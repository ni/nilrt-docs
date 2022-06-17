Search.setIndex({"docnames": ["cross_compile/build_shared_library", "cross_compile/call_shared_library", "cross_compile/config_dev_system", "cross_compile/config_vs_code", "cross_compile/cross_compile_index", "cross_compile/hello_world", "cross_compile/introduction", "cross_compile/template_downloads", "index", "opkg/dkms_opkg", "opkg/opkg_intro", "opkg/opkg_tutorials_index", "remote/vscode_remote", "remote/vscode_remote_index"], "filenames": ["cross_compile/build_shared_library.rst", "cross_compile/call_shared_library.rst", "cross_compile/config_dev_system.rst", "cross_compile/config_vs_code.rst", "cross_compile/cross_compile_index.rst", "cross_compile/hello_world.rst", "cross_compile/introduction.rst", "cross_compile/template_downloads.rst", "index.rst", "opkg/dkms_opkg.rst", "opkg/opkg_intro.rst", "opkg/opkg_tutorials_index.rst", "remote/vscode_remote.rst", "remote/vscode_remote_index.rst"], "titles": ["Part 5: Building a Shared Library with Visual Studio Code and NI Linux Real-Time", "Part 6: Calling and Debugging a Shared Library with Visual Studio Code and NI Linux Real-Time", "Part 2: Configuring a Development System with Visual Studio Code and the NI Linux Real-Time C/C++ Compilers", "Part 3: Configuring Visual Studio Code for Building NI Linux Real-Time C/C++ Code", "NI Linux Real-Time Cross Compiling: Using the NI Linux Real-Time Cross Compile Toolchain with Visual Studio Code", "Part 4: \u201cHello, World!\u201d with Visual Studio Code and NI Linux Real-Time", "Part 1: Cross Compiling C/C++ Code for NI Linux Real-Time", "Visual Studio Code Sample Project Templates", "NI Linux Real-Time Documentation and Tutorials", "NI Linux Real-Time and opkg: Distributing DKMS-based Kernel Modules", "NI Linux Real-Time and opkg: Distributing Packages", "Opkg Package System Tutorials", "Developing C/C++ Code for NI Linux Real-Time with the Visual Studio Code Remote Development Extension", "Visual Studio Code Remote Extension Tutorials"], "terms": {"The": [0, 1, 2, 3, 5, 12], "gnu": [0, 1, 2, 3, 5, 12], "compil": [0, 3, 8, 9, 10, 12], "allow": [0, 1, 2, 3, 5, 6, 9, 10, 12], "creation": [0, 1, 3, 5, 9, 12], "custom": [0, 1, 3, 5, 6, 10], "user": [0, 1, 2, 3, 5, 6, 9, 10, 12], "which": [0, 2, 3, 5, 6, 9, 10, 12], "can": [0, 1, 2, 3, 5, 6, 9, 10, 12], "reus": 0, "distribut": [0, 5, 6, 8, 11], "across": 0, "applic": [0, 1, 2, 3, 5, 6, 12], "system": [0, 1, 3, 4, 5, 6, 8, 12], "thi": [0, 1, 2, 3, 5, 6, 9, 10, 12], "tutori": [0, 1, 2, 3, 5, 6, 9, 10, 12], "walk": [0, 1, 2, 3, 5, 9, 10], "through": [0, 1, 2, 3, 5, 6, 9, 10, 12], "simpl": [0, 1, 3, 9, 10], "us": [0, 1, 2, 3, 6, 8, 9, 11, 12], "follow": [0, 1, 2, 3, 5, 6, 9, 10, 12], "softwar": [0, 1, 4, 5, 6, 9, 10, 12], "hardwar": [0, 1, 5, 6, 9, 10], "A": [0, 1, 3, 5, 11], "develop": [0, 1, 3, 4, 5, 6, 8, 9, 10, 13], "pc": [0, 1, 5, 12], "describ": [0, 1, 5, 9, 10, 12], "templat": [0, 1, 4, 5, 8, 12], "note": [0, 1, 2, 3, 5, 6, 11], "recommend": [0, 2, 3, 5, 6, 9, 10, 12], "complet": [0, 1, 2, 3, 5, 9, 10, 12], "hello": [0, 1, 3, 4, 8, 10, 13], "world": [0, 1, 3, 4, 8, 9, 10, 13], "befor": [0, 1, 5, 9, 10, 12], "attempt": [0, 1, 5, 9, 10], "ensur": [0, 1, 2, 3, 5, 6, 9, 10, 12], "ar": [0, 1, 2, 3, 5, 6, 9, 10, 12], "correctli": [0, 2, 9], "assum": [0, 1, 3, 5], "armv7": [0, 1, 2, 3, 5, 7, 12], "x64": [0, 1, 2, 3, 5, 6, 7, 10, 12], "target": [0, 1, 2, 3, 5, 6, 7, 9, 10], "ha": [0, 1, 2, 5, 9, 12], "been": [0, 1, 5, 9, 12], "detail": [0, 1, 5, 9], "With": [0, 1, 2, 3, 5, 6, 9, 10, 12], "taken": [0, 1, 5, 9], "new": [0, 1, 2, 3, 5, 9, 12], "directori": [0, 1, 2, 3, 5, 6, 12], "serv": [0, 1, 5], "top": [0, 1, 3, 5, 9, 10], "level": [0, 1, 3, 5, 9, 10], "copi": [0, 1, 2, 5, 6, 9], "newli": [0, 1, 5], "open": [0, 1, 2, 3, 5, 6, 9, 10, 12], "folder": [0, 1, 3, 5, 12], "do": [0, 1, 5, 9, 10, 12], "one": [0, 1, 2, 3, 5, 6, 9, 10], "right": [0, 1, 2, 3, 5, 6, 12], "click": [0, 1, 2, 5, 12], "anywher": [0, 1, 5], "select": [0, 1, 2, 3, 5, 12], "launch": [0, 2, 3, 12], "file": [0, 1, 2, 3, 5, 6, 11, 12], "choos": [0, 1, 5, 12], "confirm": [0, 1, 2, 3, 5, 9, 10, 12], "properli": [0, 1, 5, 6, 9, 12], "explor": [0, 1, 3, 5, 12], "To": [0, 1, 2, 3, 5, 6, 9, 10, 12], "two": [0, 6, 9, 10, 12], "typic": [0, 2, 6, 9], "section": [0, 2, 3, 9, 10, 12], "demonstr": [0, 2, 3, 5, 6, 9, 10], "how": [0, 2, 3, 9, 10], "exampl": [0, 1, 2, 3, 6, 9, 10, 12], "In": [0, 1, 2, 3, 5, 6, 9, 10, 12], "src": [0, 1, 3, 5, 9, 12], "titl": [0, 1, 5, 12], "mylib": [0, 1], "h": [0, 1, 5, 9, 10, 12], "public": 0, "shown": [0, 1, 3, 5, 6, 9, 10, 12], "below": [0, 1, 2, 3, 5, 12], "ifndef": 0, "_mylib_h_": 0, "defin": [0, 1, 3, 5, 9], "extern": [0, 1, 3, 5], "int": [0, 1, 5, 9, 10, 12], "add": [0, 1, 2, 3, 5, 9, 12], "x": [0, 1, 9, 10], "y": [0, 1], "endif": 0, "save": [0, 1, 3, 5, 12], "includ": [0, 1, 2, 3, 5, 6, 9, 10, 12], "return": [0, 1, 5, 9, 10, 12], "cmakelist": [0, 1, 3, 5, 12], "txt": [0, 1, 3, 5, 12], "ani": [0, 1, 2, 5, 9, 10], "more": [0, 1, 2, 3, 5, 9, 11, 12], "necessari": [0, 1, 2, 3, 5, 6, 9, 10, 12], "them": [0, 1, 3, 5, 9, 10], "onli": [0, 1, 2, 3, 5, 6, 9, 10], "specif": [0, 1, 2, 3, 5, 6, 9, 12], "must": [0, 1, 3, 5, 9, 10], "ad": [0, 1, 2, 3, 5, 9], "alreadi": [0, 1, 3, 5, 9], "contain": [0, 1, 2, 5, 9, 10, 12], "all": [0, 1, 3, 5, 9, 10], "For": [0, 1, 2, 3, 5, 6, 9, 10, 12], "inform": [0, 1, 2, 3, 5, 9, 10, 12], "refer": [0, 1, 2, 3, 5, 9, 10, 12], "offici": [0, 1, 2, 3, 5, 6, 9, 10, 12], "document": [0, 1, 2, 3, 5, 6, 9, 10, 12], "editor": [0, 1, 2, 3, 5, 6, 12], "line": [0, 1, 2, 5, 9, 10], "end": [0, 1, 5], "cmake_minimum_requir": [0, 1, 5, 12], "version": [0, 1, 2, 3, 5, 6, 9, 10, 12], "3": [0, 1, 2, 4, 5, 6, 8, 12], "14": [0, 1, 2, 5], "set": [0, 1, 2, 3, 5, 6, 9, 12], "cmake_library_output_directori": 0, "bin": [0, 1, 3, 5, 9, 10, 12], "cmake_build_typ": [0, 1, 5, 12], "debug": [0, 2, 4, 6, 8, 13], "add_librari": 0, "If": [0, 1, 2, 3, 5, 9, 10, 12], "desir": [0, 2, 3, 5, 9, 10, 12], "built": [0, 1, 5, 6, 9, 10, 12], "binari": [0, 1, 2, 3, 5, 6], "other": [0, 1, 3, 4, 5, 6, 9, 10, 12], "instal": [0, 1, 4, 5, 6, 9, 10], "local": [0, 1, 5, 6, 10, 12], "command": [0, 1, 2, 4, 5, 9, 10, 12], "autom": [0, 2], "process": [0, 1, 2, 3, 5, 6, 9, 10, 12], "host": [0, 1, 2, 3, 5, 12], "futur": 0, "now": [0, 1, 2, 3, 5, 9, 10, 12], "need": [0, 1, 2, 3, 5, 6, 9, 10, 12], "ninja": [0, 1, 3, 4], "final": [0, 1, 5, 9, 10], "invok": [0, 1, 5, 12], "via": [0, 1, 3, 5, 9, 10, 12], "task": [0, 1, 2, 4, 5, 6, 12], "json": [0, 3, 12], "vscode": [0, 1, 3, 5, 12], "integr": [0, 1, 2, 3, 5], "tool": [0, 1, 3, 4, 5, 9, 10, 12], "run": [0, 2, 3, 4, 6, 9, 10, 13], "palett": [0, 1, 4, 5, 12], "ctrl": [0, 1, 3, 5, 12], "shift": [0, 1, 3, 5, 12], "p": [0, 1, 3, 5, 10, 12], "view": [0, 1, 3, 5, 9, 12], "search": [0, 1, 2, 3, 5, 12], "pull": [0, 1, 3, 5], "up": [0, 1, 2, 5, 6, 9], "list": [0, 1, 3, 5, 9, 10, 12], "avail": [0, 1, 2, 3, 5, 6, 9, 10, 12], "from": [0, 1, 2, 3, 5, 9, 10, 12], "gener": [0, 1, 2, 3, 5, 6, 9, 11, 12], "equival": [0, 1, 5], "s": [0, 1, 2, 3, 5, 6, 9, 10, 12], "differ": [0, 1, 2, 3, 5, 6, 9, 10, 12], "name": [0, 1, 3, 5, 9, 10, 12], "wa": [0, 1, 2, 5, 9, 10, 12], "successfulli": [0, 1, 5, 9, 10, 12], "termin": [0, 1, 2, 3, 5, 12], "window": [0, 1, 2, 3, 5, 6, 12], "There": [0, 1, 5, 6, 9, 12], "should": [0, 1, 2, 3, 5, 9, 10, 12], "sever": [0, 1, 5, 6, 12], "output": [0, 1, 3, 5, 9, 12], "cmakecach": [0, 1, 5], "again": [0, 1, 5], "libmylib": 0, "so": [0, 1, 6, 9, 10, 12], "after": [0, 10, 12], "deploi": [0, 4, 6, 9, 12], "labview": 0, "manual": [0, 1, 5, 9, 12], "usr": [0, 1, 3, 5, 6, 9, 10, 12], "lib": [0, 1, 6, 9, 10], "correspond": [0, 2, 5], "an": [0, 1, 2, 3, 5, 6, 9, 10, 12], "ipk": [0, 1, 5, 9, 10], "packag": [0, 1, 6, 8], "opkg": [0, 1, 6, 8, 12], "manag": [0, 1, 2, 6, 9, 10, 12], "call": [0, 3, 4, 8, 9, 10], "execut": [0, 2, 3, 4, 6, 9, 10], "see": [0, 3, 12], "6": [0, 3, 4, 8, 9, 12], "addit": [1, 3, 6, 9, 10, 13], "standalon": 1, "toolchain": [1, 3, 5, 6, 8, 9, 10, 12], "proper": [1, 5, 6, 9, 10, 12], "adjust": 1, "appli": [1, 5, 9, 10, 12], "header": [1, 4, 6, 9], "option": [1, 2, 3, 4, 5, 9, 10, 12], "e": [1, 2, 5, 6, 9, 12], "g": [1, 2, 3, 5, 6, 12], "pxi": [1, 5, 9], "compactrio": [1, 5, 12], "ssh": [1, 2, 3, 5, 9, 10, 13], "access": [1, 2, 3, 5, 6, 9, 10], "enabl": [1, 2, 3, 5], "deploy": [1, 2, 5, 6, 9], "devic": [1, 2, 3, 5, 6, 9, 10, 12], "match": [1, 3, 5], "dynam": [1, 9, 10], "link": [1, 6, 9], "That": [1, 3, 5, 6, 9], "remain": 1, "load": [1, 9], "work": [1, 2, 3, 5, 9, 12], "linker": [1, 6, 12], "abl": [1, 6], "find": [1, 3, 5], "same": [1, 2, 3, 5, 6, 9, 10], "locat": [1, 2, 3, 5, 12], "unabl": [1, 5], "without": [1, 3, 5, 6, 12], "further": [1, 2, 9, 10], "chang": [1, 2, 5, 9, 10, 12], "standard": [1, 5, 9, 10], "essenti": [1, 2], "os": [1, 5, 6, 9, 10], "normal": [1, 2, 6, 9, 12], "mode": [1, 12], "place": [1, 5, 6, 9, 10, 12], "sinc": [1, 2, 3, 5], "aim": 1, "cross": [1, 3, 5, 8, 12], "workflow": [1, 2, 3, 12], "enough": 1, "simpli": [1, 2, 5, 9, 10], "both": [1, 3, 5, 12], "case": [1, 2, 6, 9, 11], "either": [1, 5, 9, 12], "look": [1, 2, 3, 6], "incorrect": 1, "third": [1, 2, 6, 12], "parti": [1, 2, 6, 12], "well": [1, 2, 3, 6, 9], "step": [1, 4, 5, 6, 9, 10, 12], "later": [1, 2, 3, 9], "navig": [1, 2, 3, 5, 12], "context": [1, 5], "menu": [1, 5, 12], "root": [1, 3, 6, 12], "path": [1, 2, 3, 12], "core2": [1, 3], "64": [1, 3], "nilrt": [1, 3, 5], "cortexa9": [1, 3], "vfpv3": [1, 3], "gnueabi": [1, 3], "past": 1, "repeat": 1, "1": [1, 2, 4, 8, 9, 10, 12], "4": [1, 2, 3, 4, 8, 12], "abov": [1, 3, 9, 10], "depend": [1, 2, 3, 6, 9, 10, 12], "mai": [1, 2, 3, 5, 6, 12], "exist": [1, 5, 6], "default": [1, 2, 3, 5, 6, 9], "present": [1, 3, 9, 10], "c_cpp_properti": [1, 3, 12], "portion": 1, "includepath": [1, 3, 12], "found": [1, 6, 9], "intellisens": [1, 2, 4, 5, 12], "test": [1, 5, 10, 11, 12], "function": [1, 2, 5, 9, 10, 12], "straight": 1, "forward": 1, "callingsharedlibrari": 1, "stdio": [1, 5, 10, 12], "stdlib": [1, 5, 12], "main": [1, 5, 6, 9, 10, 12], "void": [1, 5, 9], "z": 1, "put": [1, 5, 10], "enter": [1, 2, 3, 5, 12], "first": [1, 2, 3, 6, 12], "number": [1, 6, 12], "scanf": 1, "d": 1, "second": [1, 6, 9], "printf": [1, 10, 12], "n": [1, 9, 10, 12], "exit_success": [1, 5, 12], "actual": [1, 5, 6], "program": [1, 2, 3, 5, 9, 10, 13], "take": [1, 5], "its": [1, 2, 3, 5, 6, 9, 10], "instruct": [1, 5], "inclus": 1, "know": 1, "item": [1, 5, 9, 10], "when": [1, 3, 6, 9, 10, 12], "callingsharedobject": 1, "executable_output_path": [1, 5], "add_execut": [1, 5, 12], "include_directori": 1, "toolchain_path": 1, "nilrtlinux": [1, 3], "target_link_librari": 1, "linuxgnueabi": [1, 3], "given": [1, 2, 3, 5, 6, 9], "permiss": [1, 5], "accomplish": [1, 2, 9, 10], "filezilla": [1, 5], "method": [1, 2, 6, 9, 12], "correct": 1, "base": [1, 3, 5, 7, 8, 10, 11], "onc": [1, 2, 5, 9, 10, 12], "imag": [1, 3, 5], "max": [1, 5, 9, 12], "connect": [1, 5, 6, 12], "ip": [1, 5], "address": [1, 5], "hostnam": [1, 5], "admin": [1, 5, 9, 10], "account": [1, 5, 9], "port": [1, 3, 5, 6, 9, 10], "22": [1, 5], "quickconnect": [1, 5], "site": [1, 5], "home": [1, 2, 5, 9], "descript": [1, 5, 9, 10], "side": [1, 5], "On": [1, 5], "doubl": [1, 5], "appear": [1, 2, 5, 12], "By": [1, 5, 6, 9], "have": [1, 3, 5, 9, 10, 12], "fix": [1, 5], "directli": [1, 3, 5, 6, 9, 12], "shell": [1, 3, 5, 9, 12], "chmod": [1, 5, 9, 10], "9": [1, 12], "skip": 1, "close": [1, 3, 5, 12], "putti": [1, 5, 9, 10], "type": [1, 2, 3, 5, 9, 10, 12], "field": [1, 3, 5], "log": [1, 5, 9, 10], "make": [1, 2, 3, 5, 6, 9, 10, 12], "sure": [1, 10], "input": 1, "prompt": [1, 2, 12], "object": [1, 9], "debugg": [1, 3, 5, 12], "gdbserver": [1, 3, 5, 6], "while": [1, 2, 3, 5, 6, 9, 10, 12], "properti": [1, 2, 5, 12], "server": [1, 2, 5, 6, 10, 12], "some": [1, 2, 3, 5, 12], "midebuggerpath": [1, 3, 5], "midebuggerserveraddress": [1, 3, 5], "learn": [1, 5, 6], "about": [1, 3, 5, 6, 12], "possibl": [1, 2, 3, 5, 6, 9, 12], "attribut": [1, 5], "hover": [1, 5], "visit": [1, 5], "http": [1, 3, 5, 10, 12], "go": [1, 3, 5, 12], "microsoft": [1, 2, 3, 5, 6, 12], "com": [1, 3, 5, 9, 10, 12], "fwlink": [1, 3, 5, 12], "linkid": [1, 3, 5, 12], "830387": [1, 5], "0": [1, 2, 3, 5, 9, 10, 12], "2": [1, 3, 4, 5, 8, 9, 10, 12], "cppdbg": [1, 3, 5], "request": [1, 3, 5], "workspacefold": [1, 3, 5, 12], "arg": [1, 3, 5], "stopatentri": [1, 3, 5], "fals": [1, 3, 5], "cwd": [1, 3, 5, 12], "environ": [1, 2, 3, 5, 6, 12], "showdisplaystr": [1, 3, 5], "true": [1, 3, 5, 9], "mimod": [1, 3, 5], "18": [1, 2, 3, 5], "i686": [1, 3, 5], "nilrtsdk": [1, 3, 5], "mingw32": [1, 3, 5], "x86_64": [1, 3, 5, 9], "ex": [1, 2, 3, 5, 6], "10": [1, 2, 5, 12], "110": [1, 5], "136": [1, 5], "9092": [1, 5], "thei": [1, 2], "were": [1, 2, 6], "machin": 1, "move": [1, 9, 10], "sourcefilemap": 1, "redirect": 1, "specifi": [1, 3, 5, 6], "profil": [1, 5, 12], "breakpoint": [1, 5, 12], "result": [1, 2, 3, 5], "listen": [1, 5], "switch": [1, 3, 5, 9, 10], "icon": [1, 2, 5], "left": [1, 2, 5], "paus": 1, "point": [1, 2, 3, 6, 9, 10], "start": [1, 2, 3, 4, 5, 9, 10, 12], "button": [1, 3, 5, 12], "interact": [1, 2, 12], "progress": 1, "show": [1, 3, 5, 12], "stop": [1, 5], "particular": 1, "try": 1, "continu": [1, 5], "hit": [1, 2, 3, 5, 12], "f5": [1, 5], "exit": [1, 2, 5, 9], "statu": [1, 5, 9], "consol": [1, 2, 5, 9, 10, 12], "session": [1, 3, 5], "symbol": [1, 5], "kernel": [1, 5, 8, 10, 11, 12], "made": [1, 2, 3, 5, 12], "certain": [1, 5, 12], "occur": [1, 5], "finish": [1, 2, 5, 9, 10], "provid": [2, 3, 9, 10, 12], "compon": [2, 6, 9, 10, 12], "doe": [2, 3, 6, 9, 10], "build": [2, 4, 6, 8, 11, 13], "mani": [2, 3, 6, 9, 12], "basic": [2, 3, 6], "comput": 2, "variou": [2, 3, 10], "sourc": [2, 3, 4, 6, 11, 12], "fill": 2, "gap": 2, "seri": 2, "focu": [2, 6], "could": [2, 3, 10], "desktop": [2, 6], "minor": 2, "instead": [2, 3, 5, 6, 9], "briefli": 2, "cover": [2, 3, 6, 9, 10, 12], "each": [2, 3, 12], "support": [2, 3, 6], "One": 2, "2017": 2, "These": [2, 3, 5, 6, 9, 10], "mainli": 2, "usag": [2, 3, 6, 9], "than": [2, 6, 9], "sftp": [2, 5, 9], "client": 2, "creat": [2, 4, 6, 11], "lightweight": [2, 9, 10], "stream": 2, "solut": 2, "common": [2, 3, 6, 9, 12], "oper": [2, 3, 5, 6, 9, 12], "thank": 2, "natur": [2, 9, 10], "excel": 2, "featur": [2, 3, 12], "expect": 2, "modern": [2, 9], "frequent": [2, 12], "receiv": [2, 12], "updat": [2, 9, 10, 12], "improv": [2, 3, 12], "usabl": 2, "38": 2, "page": [2, 3, 9, 10], "download": 2, "your": [2, 9, 10], "setup": [2, 3, 12], "onscreen": 2, "pane": 2, "you": [2, 9, 10, 12], "want": [2, 10], "automat": [2, 3, 9], "releas": [2, 3], "come": 2, "out": [2, 3, 5, 9], "structur": [2, 3], "flexibl": [2, 3], "long": 2, "websit": [2, 9], "compress": [2, 9, 10], "collect": 2, "rather": [2, 3, 6, 9], "check": [2, 9, 12], "control": [2, 3, 5, 6], "compat": 2, "2018": [2, 12], "2019": 2, "extract": 2, "arm": [2, 3, 6], "twice": 2, "unzip": 2, "unpack": 2, "tar": 2, "dure": [2, 9, 10], "dialog": 2, "replac": [2, 5], "warn": [2, 12], "safe": [2, 12], "ignor": [2, 12], "meant": [2, 9, 10], "tailor": 2, "much": [2, 9, 10], "decoupl": 2, "itself": 2, "advantag": [2, 12], "advanc": [2, 6], "along": 2, "mostli": 2, "separ": 2, "help": 2, "better": [2, 3, 6], "fulfil": 2, "free": 2, "platform": [2, 12], "ftp": [2, 9], "consist": [2, 6, 9, 10], "transfer": [2, 5, 10, 12], "As": [2, 3, 9, 10], "altern": [2, 5, 12], "openssh": [2, 12], "util": [2, 3, 6, 9, 10], "autumn": [2, 12], "emul": 2, "serial": [2, 9, 10], "network": 2, "we": [2, 12], "ll": 2, "remot": [2, 4, 6, 8, 10], "independ": 2, "It": [2, 3, 10, 12], "friendli": 2, "eas": 2, "small": 2, "like": [2, 6, 9], "unix": [2, 12], "bit": [2, 6], "involv": [2, 6], "suitabl": 2, "easier": [2, 3, 12], "press": [2, 3], "r": [2, 9], "sysdm": 2, "cpl": 2, "ok": 2, "variabl": [2, 3], "edit": [2, 3, 9, 10, 12], "project": [2, 4, 6, 8], "repres": 3, "similar": [3, 5, 9, 10, 12], "perform": [3, 5, 9, 10, 12], "initi": [3, 12], "done": [3, 9, 12], "here": [3, 9, 10, 12], "consid": 3, "idea": 3, "act": [3, 12], "within": [3, 5, 9, 10], "special": [3, 6, 9, 10, 12], "concept": [3, 4, 9, 10], "workspac": [3, 12], "group": [3, 6, 12], "multipl": [3, 9], "focus": 3, "establish": 3, "best": [3, 10], "practic": [3, 10], "singl": [3, 9], "requir": [3, 4, 6], "multi": 3, "accompani": 3, "subdirectori": 3, "vs": [3, 6, 12], "my": 3, "helloworld": [3, 5, 12], "land": 3, "previous": [3, 6, 9, 10, 12], "shortcut": 3, "action": 3, "searchabl": 3, "pre": [3, 10], "arbitrari": 3, "empow": 3, "direct": [3, 5, 9, 10, 12], "interfac": [3, 6], "storag": 3, "quick": 3, "733558": [3, 12], "format": [3, 9, 10, 12], "label": [3, 12], "problemmatch": [3, 12], "gcc": [3, 9, 10, 12], "clean": [3, 9, 12], "valu": 3, "report": 3, "error": [3, 5, 6, 9, 12], "problem": [3, 5, 6, 9, 10], "mean": 3, "notscan": 3, "review": [3, 9], "write": [3, 12], "power": 3, "autocomplet": [3, 5], "capabl": 3, "resourc": [3, 6, 11, 13], "also": [3, 9, 10, 12], "modifi": [3, 9, 10], "env": 3, "compilersysroot": 3, "sysroot": [3, 4, 5, 12], "compilerpath": [3, 12], "compilerarg": 3, "intellisensemod": [3, 12], "x86": 3, "lower": 3, "corner": 3, "between": [3, 5, 6], "extend": [3, 6, 9, 10], "aka": 3, "own": [3, 10], "being": [3, 9, 10], "Then": 3, "gdb": [3, 4, 6, 12], "current": [3, 9, 12], "serveraddress": 3, "determin": 3, "what": 3, "design": [3, 9, 10, 12], "script": [3, 5], "text": [3, 9, 10], "flag": [3, 5, 6, 12], "everi": [3, 6], "term": 3, "dive": 3, "wiki": 3, "crosscompil": 3, "thing": [3, 9, 10], "cmake_system_nam": 3, "cmake_system_processor": 3, "unam": [3, 9], "armv71": 3, "troubl": 3, "full": [3, 12], "toolchainpath": 3, "decid": 3, "cmake_c_compil": 3, "cmake_cxx_compil": 3, "armnilrt": 3, "cmake_sysroot": 3, "cmake_": 3, "lang": 3, "_standard_include_directori": 3, "_flag": 3, "wall": 3, "fmessag": 3, "length": 3, "_flags_debug": 3, "o0": 3, "g3": 3, "_flags_releas": 3, "o3": 3, "mfpu": 3, "mfloat": 3, "abi": 3, "softfp": 3, "float": 3, "behavior": 3, "doesn": 3, "t": 3, "unnecessarili": 3, "cmake_find_root_path_mode_program": 3, "never": 3, "cmake_find_root_path_mode_librari": 3, "cmake_find_root_path_mode_includ": 3, "cmake_find_root_path_mode_packag": 3, "incomplet": 3, "upon": [3, 9, 10], "inher": 3, "greater": 3, "wai": [3, 9, 10], "prelaunchtask": 3, "quicker": 3, "portabl": 3, "topic": 3, "regist": [3, 9, 10], "git": 3, "part": [4, 8, 9], "c": [4, 8, 13], "introduct": [4, 11, 13], "understand": [4, 5], "get": [4, 9, 10, 12], "configur": [4, 6, 8, 11, 13], "next": [4, 5, 9, 10], "extens": [4, 6, 8, 9], "cmake": 4, "expand": [4, 5], "5": [4, 8], "share": [4, 8, 9, 10], "librari": [4, 6, 8, 10], "sampl": [4, 8, 9], "differenti": 5, "highlight": 5, "handl": [5, 9, 10], "easili": [5, 9, 12], "swap": 5, "syntax": 5, "matcher": 5, "introduc": [5, 6], "alongsid": [5, 9], "rebuild": [5, 9], "chain": 5, "cannot": 5, "purpos": 5, "approach": 5, "secur": [5, 12], "keyboard": [5, 9, 10], "monitor": [5, 9, 10], "usb": 5, "thumb": 5, "drive": 5, "combin": [5, 12], "easi": [5, 6], "print": [5, 9, 12], "messag": [5, 9, 12], "wealth": 6, "nation": 6, "instrument": 6, "ecosystem": 6, "tend": 6, "easiest": 6, "deal": 6, "complex": [6, 9, 10], "larg": [6, 12], "where": [6, 9, 12], "solv": 6, "anyon": 6, "known": 6, "ship": 6, "intel": 6, "32": 6, "import": [6, 9], "clearer": 6, "core": [6, 12], "relat": [6, 9, 12], "o": [6, 9, 10], "etc": 6, "accept": 6, "preprocessor": 6, "definit": 6, "nativ": 6, "order": [6, 9, 10], "accur": 6, "would": [6, 12], "just": [6, 10], "tell": 6, "logic": 6, "extra": 6, "veri": [6, 9, 10, 12], "otherwis": [6, 9], "issu": 6, "mention": [6, 9, 10], "encount": [6, 9, 10], "even": [6, 10], "still": [6, 10], "visual": [6, 8], "studio": [6, 8], "streamlin": 6, "sai": 6, "ones": 6, "suggest": 6, "reason": [6, 9], "product": 6, "overal": 6, "potenti": [6, 12], "intent": 6, "pick": 6, "noth": 6, "restrict": 6, "id": 6, "ni": [7, 11, 13], "linux": [7, 11, 13], "real": [7, 11, 13], "time": [7, 11, 13], "code": [8, 9, 10], "dkm": [8, 10, 11], "modul": [8, 10, 11, 12], "oftentim": [9, 10], "driver": 9, "often": 9, "tree": [9, 10], "loadabl": [9, 10], "discuss": [9, 10], "walkthrough": [9, 10], "assist": [9, 10], "technic": [9, 10], "channel": [9, 10], "faq": [9, 10, 12], "post": [9, 10], "commun": [9, 10, 12], "board": [9, 10], "guidanc": [9, 10], "8": 9, "newer": 9, "under": [9, 12], "onlin": [9, 10], "repositori": [9, 10, 12], "offlin": 9, "repo": 9, "module_sourc": 9, "basi": [9, 10], "ko": 9, "denot": 9, "against": 9, "obtain": 9, "guid": [9, 10], "i": 9, "former": 9, "disadvantag": 9, "upgrad": 9, "recompil": 9, "repackag": 9, "around": 9, "limit": 9, "implement": 9, "outsid": 9, "rebuilt": 9, "addition": 9, "less": 9, "break": 9, "neg": 9, "impact": 9, "light": [9, 10], "weight": [9, 10], "filesystem": [9, 10], "slightli": [9, 10], "deb": [9, 10], "due": [9, 10], "chose": [9, 10], "simplic": [9, 10], "older": 9, "updatenidriv": 9, "non": 9, "caus": 9, "screenshot": [9, 10], "refresh": [9, 10], "dev": 9, "those": 9, "unload": 9, "three": [9, 10], "printk": 9, "kern_notic": 9, "kern_info": 9, "init": 9, "static": 9, "__init": 9, "hello_init": 9, "__exit": 9, "hello_exit": 9, "goodby": 9, "module_init": 9, "module_exit": 9, "obj": 9, "m": 9, "kversion": 9, "pwd": 9, "destin": 9, "whether": 9, "boot": 9, "man": [9, 10], "package_nam": 9, "package_vers": 9, "kernelv": 9, "built_module_nam": 9, "dest_module_loc": 9, "autoinstal": 9, "ye": 9, "prior": [9, 10], "scp": 9, "modprob": 9, "remov": [9, 10], "hand": [9, 10], "redistribut": [9, 10], "everyth": [9, 10, 12], "prerm": [9, 10], "mirror": [9, 10], "form": [9, 10], "keep": [9, 10, 12], "mind": [9, 10], "sensit": [9, 10], "data": [9, 10], "unregist": [9, 10], "proce": [9, 10], "recreat": [9, 10], "maintain": [9, 10], "info": [9, 10], "particularli": 9, "architectur": [9, 10], "email": 9, "prioriti": [9, 10], "registr": [9, 10], "privileg": [9, 10], "2020": 9, "sh": 9, "dkms_name": 9, "dkms_package_nam": 9, "dkms_version": 9, "els": 9, "echo": 9, "too": 9, "old": 9, "legaci": 9, "fi": 9, "esac": 9, "deconfigur": 9, "v": 9, "dmesg": 9, "rmmod": 9, "uninstal": 9, "At": [9, 10], "scratch": [9, 10], "forum": [9, 10], "eclips": [9, 10], "howev": 10, "bash": 10, "debain": 10, "binutil": [10, 12], "symlink": 10, "hellopkg": 10, "few": 10, "somebodi": 10, "somewher": 10, "wish": [10, 12], "turn": 10, "gz": 10, "index": 10, "onto": 10, "web": 10, "origin": 10, "examplepkg": 10, "exampleex": 10, "rest": 10, "feed": 11, "intend": 12, "overview": 12, "modif": 12, "crio": 12, "9035": 12, "19": 12, "43": 12, "50": 12, "polici": 12, "unfortun": 12, "drawback": 12, "embed": 12, "headless": 12, "unwieldi": 12, "coupl": 12, "lack": 12, "quickli": 12, "becom": 12, "complic": 12, "No": 12, "concern": 12, "startup": 12, "sshd": 12, "reboot": 12, "pair": 12, "login": 12, "outlin": 12, "tip": 12, "trick": 12, "powershel": 12, "packagegroup": 12, "buildessenti": 12, "python": 12, "7": 12, "interpret": 12, "usernam": 12, "sshconfig": 12, "wsl": 12, "prerequisit": 12, "instanc": 12, "reload": 12, "restart": 12, "cach": 12, "larger": 12, "c_cpp": 12, "intellisensecaches": 12, "mitig": 12, "bar": 12, "revert": 12, "cstandard": 12, "c11": 12, "cppstandard": 12, "17": 12, "paramet": 12, "cmake_runtime_output_directori": 12, "cmake_gener": 12, "makefil": 12, "lldb": 12, "green": 12, "arrow": 12, "why": 13}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"part": [0, 1, 2, 3, 5, 6], "5": 0, "build": [0, 1, 3, 5, 9, 10, 12], "share": [0, 1], "librari": [0, 1], "visual": [0, 1, 2, 3, 4, 5, 7, 12, 13], "studio": [0, 1, 2, 3, 4, 5, 7, 12, 13], "code": [0, 1, 2, 3, 4, 5, 6, 7, 12, 13], "ni": [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12], "linux": [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12], "real": [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12], "time": [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12], "tabl": [0, 1, 2, 3, 5, 6, 9, 10, 12], "content": [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13], "introduct": [0, 1, 2, 3, 5, 6, 9, 10, 12], "requir": [0, 1, 2, 5, 9, 10, 12], "creat": [0, 1, 3, 5, 9, 10, 12], "project": [0, 1, 3, 5, 7, 12], "c": [0, 1, 2, 3, 5, 6, 9, 10, 12], "header": 0, "sourc": [0, 1, 5, 9, 10], "cmake": [0, 1, 2, 3, 5, 12], "configur": [0, 1, 2, 3, 5, 9, 10, 12], "next": [0, 2, 3], "step": [0, 2, 3], "6": 1, "call": 1, "debug": [1, 3, 5, 12], "sysroot": [1, 6], "deploi": [1, 5], "run": [1, 5, 12], "compil": [1, 2, 4, 5, 6], "execut": [1, 5, 12], "remot": [1, 5, 12, 13], "gdb": [1, 5], "launch": [1, 5], "json": [1, 5], "2": 2, "develop": [2, 12], "system": [2, 9, 10, 11], "softwar": 2, "instal": [2, 12], "id": 2, "extens": [2, 3, 12, 13], "cross": [2, 4, 6], "toolchain": [2, 4], "other": 2, "tool": [2, 6], "filezilla": 2, "putti": 2, "ninja": [2, 5], "3": 3, "task": 3, "command": 3, "palett": 3, "intellisens": 3, "expand": 3, "templat": [3, 7], "us": [4, 5, 10], "4": 5, "hello": [5, 9, 12], "world": [5, 12], "1": 6, "understand": 6, "option": 6, "concept": 6, "gnu": 6, "The": [6, 9, 10], "debugg": 6, "get": 6, "start": 6, "what": 6, "why": [6, 12], "sampl": 7, "document": 8, "tutori": [8, 11, 13], "opkg": [9, 10, 11], "distribut": [9, 10], "dkm": 9, "base": 9, "kernel": 9, "modul": 9, "A": [9, 10, 12], "note": [9, 10, 12], "support": [9, 10, 12], "file": [9, 10], "makefil": 9, "conf": 9, "test": 9, "packag": [9, 10, 11, 12], "directori": [9, 10], "structur": [9, 10], "control": [9, 10], "debian": [9, 10], "binari": [9, 10, 12], "script": [9, 10], "postinst": [9, 10], "premrm": [9, 10], "resourc": [9, 10, 12], "helloworld": 10, "preinst": 10, "postrm": 10, "feed": 10, "more": 10, "gener": 10, "case": 10, "ssh": 12, "enabl": 12, "target": 12, "kei": 12, "ad": 12, "program": 12, "simpl": 12, "defin": 12, "addit": 12}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx": 56}})