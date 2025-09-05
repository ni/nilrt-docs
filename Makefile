
.DEFAULT_GOAL := all

# DIRECTORIES
srcdir := src
# /DIRECTORIES

# BINARIES
export MAKE ?= make
export PYTHON ?= python3
export SPHINXBUILD = $(PYTHON) -m sphinx
# /BINARIES


# REAL TARGETS #
################


# PHONY TARGETS #
#################

all :
	$(MAKE) -C docs html
.PHONY : all


clean :
	$(MAKE) -C docs clean
.PHONY : clean
