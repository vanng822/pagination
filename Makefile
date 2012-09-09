VOWS=./node_modules/vows/bin/vows

TEST_FILES=$(shell find tests/*.js)


test:
	 $(foreach F, ${TEST_FILES},$(VOWS) $(F);)

clean cleandir:
	
.PHONY: test

