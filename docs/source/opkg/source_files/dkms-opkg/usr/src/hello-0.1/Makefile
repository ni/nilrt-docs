obj-m := hello.o
KVERSION := $(shell uname -r)


all:
	$(MAKE) -C /lib/modules/$(KVERSION)/build M=$(PWD) modules
.PHONY : all


clean:
	$(MAKE) -C /lib/modules/$(KVERSION)/build M=$(PWD) clean
.PHONY : clean
