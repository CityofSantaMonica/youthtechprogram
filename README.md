# Santa Monica Youth Tech Program

A Jekyll website for the [Youth Tech Program](http://santamonicayouthtech.com/).

## Development

### Pages

Each page has its own folder inside of the `_pages` directory with an `index.html` that has a `permalink` set in the front matter. In this folder, the separate partials of the page (if it's a long page) can be put in this directory with an underscore (`_`) at the beginning of the file name. The main `index.html` then uses the `{% include_relative %}` Liquid tag to include those partial files.

### Building

In order to cache your gems, running `bundle package` will fetch and cache your gems at `vendor/cache`. After this, run `bundle install` and it will install the dependencies from the local cache; this method can be used if Internet access is unavailable or offline development is necessary.

Building the website is as simple as:

```bash
bundle exec jekyll serve
```