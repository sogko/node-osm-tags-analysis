[![osm-tags-analysis](/public/assets/images/osm-tags-analysis-logo.png?
raw=true "osm-tags-analysis")](https://github.com/sogko/osm-tags-analysis)

osm-tags-analysis
=================

Analyse .osm tagged data using **NodeJS** and **osmfilter**

## Screenshots
[![Dayummmm look at dat screenshot](/public/assets/images/osm-tags-analysis-screenshot.png?raw=true "Dayummmm look at dat screenshot")](https://github.com/sogko/osm-tags-analysis/blob/master/public/assets/images/osm-tags-analysis-screenshot.png)

## What is this?
Basically a self-hosted local webapp front-end to [osmfilter](http://wiki.openstreetmap.org/wiki/Osmfilter) with an interactive map representing  of your .osm data and dynamic HTML5 tables to help you visually make informed analysis and decisions about your .osm files

## Why do this?
While working on a geo-related project and having to deal with massive OpenStreetMap .osm files, it was a challenge trying to figure out which available tagged features are best to extract.

Problem/challenges with .osm files

* **Huge-ass XML file**. Processing files are quite straightforward but can be time-consuming. A lot of trial and error extracting the best features. If I can properly know the structure of tagged data, I can plan ahead and minimize going back and forth re-generating the .osm files.
* **Crowdsourced tagged data** (Read: generally non-normalized data. Even though [OpenStreetMap does a great job documenting guidelines](http://wiki.openstreetmap.org), contributors sometimes can be dickheads) 
* **Bunch of text and words? Aren't we working with geo-spatial data?** So, a particular key=value tag in the .osm has 2,048 nodes and 947,321 ways and 42,420 relations. Since we are talking about spatial data, it'd be nice to actually represented visually on a map. And boom, added a map.

So, what I needed was a way to do some basic analysis on the tagged key=value pairs, stuff like

* OSM entities count *(how many nodes/ways/relations in this blackhole of an XML file)*
* unique tagged keywords used *(so I can get a list of all keywords used)*
* frequency of key=value pairs *(i.e. "how many times **type=route** and **route=trains** appear?")*
* less time hitting command-line to re-generate .osm files 
* increased productivity
* leverage synergy
* synchronized swimming

## Quickstart
	npm install
	node app.js
	# and profit! (the app is accessible on http://localhost:3333)
  
## Dependencies
* OSMFilter binary (TODO: add a makefile to build)
* NodeJS

## How does it work?
* Uses **Osmosis** to filter tags, accept/reject ways or nodes or relations etc
* After generating filtered data, analysis is done on the tagged data to extract the following information:
  * OSM entities (nodes/ways/relations) count
  * Frequency of tagged key=value pairs for each entity type
  * List of unique tagged keys and values

## Notes
* Previously, **Osmosis** was used to filter and generate .osm files. It has since been changed to **osmfilter** which gave a better performance
* Go to /clean to clean up generated files (downloads, uploads, cache)
* This app is generally meant to be run locally, partly due to the typically large .osm files.
* But if anyone feels that they want to fire up an AWS instance to host this, please do :)
* Contributions/suggestions are greatly welcomed

## Changes
* Added an interactive map to visually represent the generated .osm file
* Changed the backbone of the .osm generation from Osmosis to OSMFilter. It's a c/c++ codebase and its much faster than the Java-based Osmosis.

## Links
* [osmfilter Usage Guide](http://wiki.openstreetmap.org/wiki/Osmfilter)
* [medium.com/@sogko](http://medium.com/@sogko)
* [twitter/sogko](http://twitter.com/sogko)

## Contributions
* Hafiz Ismail

## TODO
* Write a TODO
* Write a better README
