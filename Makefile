
.DEFAULT_GOAL := all

# DIRECTORIES
srcdir = docs/source


# BINARIES
export MAKE ?= make
export PYTHON ?= python3
export SPHINXBUILD = $(PYTHON) -m sphinx
export TAR ?= tar


# ==============================================================================
# REAL TARGETS
# ==============================================================================

opkg_intro_dist = $(srcdir)/opkg/source_files/opkg-intro.tar.gz
$(opkg_intro_dist) : $(shell find $(srcdir)/opkg/source_files/opkg-intro/ -type f)
	$(TAR) -czf $@ -C $(@D) opkg-intro/


dkms_opkg_IPK = $(srcdir)/opkg/source_files/dkms_opkg.tar.gz
$(dkms_opkg_IPK) : $(shell find $(srcdir)/opkg/source_files/dkms_opkg/ -type f)
	$(TAR) -czf $@ -C $(srcdir)/opkg/source_files/dkms_opkg/ .


OBJ = \
	$(opkg_intro_dist) \
	$(dkms_opkg_IPK)


# ==============================================================================
# PHONY TARGETS
# ==============================================================================

all : $(OBJ)
	$(MAKE) -C docs html
.PHONY : all


clean :
	rm -rf $(OBJ)
	$(MAKE) -C docs clean
.PHONY : clean


linkcheck :
	$(MAKE) -C docs linkcheck
.PHONY : linkcheck


lint : linkcheck
.PHONY : lint
