mt repository consists of two independent histories: samples and Mini-Twitter. They should not be merged to each other.

----

x.x branches are samples branches. Each next branch is based on a previous one:

1.3 -> 1.4 -> 1.5 -> ...

Build them the next way:
	cd public
	bower install
	cd ..
	jwsdk

Then copy public to mt-pages/x.x and delete the next files:
	bower_components/jquery/src
	bower.json

----

Mini-Twitter consists of 7 branches:
x.x-1
x.x-2
x.x-3
x.x-4
x.x-5
x.x-6
x.x-7

Each next branch is based on a previous one. Create/merge them the next way:

1.3-1 -> 1.4-1 -> 1.5-1 -> ...
  v        v        v
1.3-2 -> 1.4-2 -> 1.5-2 -> ...
  v        v        v
1.3-3 -> 1.4-3 -> 1.5-3 -> ...
  v        v        v
 ...      ...      ...

First 6 versions should be copied to mt-pages with no changes.

The last one should be built the next way:
	cd public
	bower install
	cd ..
	jwsdk release

Then copy public to mt-pages/x.x-7 and delete the next files:
	bower_components/jquery/src
	build/resources
	thirdparty/imports.styl
	mt
	boot.js
	bower.json
	data.json
	jwsdk.*
