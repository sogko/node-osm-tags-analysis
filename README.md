[![osm-tags-analysis](/public/assets/images/osm-tags-analysis-logo.png?
raw=true "osm-tags-analysis")](https://github.com/sogko/osm-tags-analysis)

osm-tags-analysis
=================

Analyse .osm tagged data using NodeJS and Osmosis

## Screenshots
[![Screenshot](/public/assets/images/osm-tags-analysis-screenshot.png?raw=true "osm-tags-analysis")](https://github.com/sogko/osm-tags-analysis/blob/master/public/assets/images/osm-tags-analysis-screenshot.png)

## What is this?
Basically a local webapp front-end to [Osmosis](https://github.com/openstreetmap/osmosis) with dynamic HTML5 tables to help you visually make informed analysis and decisions about your .osm files

## Why do this?
While working on a geo-related project and having to deal with massive OpenStreetMap .osm files, it was a challenge trying to figure out what are tagged features available best to extract.

Problem/challenges with .osm files

* **Huge-ass XML file**. Processing files are quite straightforward but can be time-consuming. A lot of trial and error extracting the best features. If I can properly know the structure of tagged data, I can plan ahead and minimize going back and forth re-generating the .osm files.
* **Crowdsourced tagged data** (Read: generally non-normalized data. Even though [OpenStreetMap does a great job documenting guidelines](http://wiki.openstreetmap.org), contributors sometimes can be dickheads) 

So, what I needed was a way to do some basic analysis on the tagged key=value pairs, stuff like

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
  

## How does it work?
* Uses **Osmosis** to filter tags, accept/reject ways or nodes or relations etc
* After generating filtered data, analysis is done on the tagged data to extract the following information:
  * OSM entities (nodes/ways/relations) count
  * Frequency of tagged key=value pairs for each entity type
  * List of unique tagged keys and values

## Notes
* Only Data Manipulation Tasks are allowed currently. You can raise an issue if you have an use-case for other options.
* Go to /clean to clean up generated files (downloads, uploads, cache)
* This app is generally meant to be run locally, partly due to the typically large .osm files.
* But if anyone feels that they want to fire up an AWS instance to host this, please do :)
* Contributions/suggestions are greatly welcomed

## Dependencies
* Requires Java Runtime to run Osmosis behind the scenes
* NodeJS


## Links
* [Osmosis Usage Guide](https://wiki.openstreetmap.org/wiki/Osmosis/Detailed_Usage#Data_Manipulation_Tasks)
* [wehavefaces.net](http://wehavefaces.net)
* [twitter/sogko](http://twitter.com/sogko)

## Contributions
* Hafiz Ismail (sogko at wehavefaces dot net)

## TODO
* Write a TODO
