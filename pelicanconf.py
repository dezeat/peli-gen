from datetime import datetime

# Pelican vars
PATH = "content"

# Basic settings
AUTHOR = 'dezeat'
SITENAME = 'development-with-david'
SITEURL = ""
DEFAULT_LANG = 'en'
TIMEZONE = 'Europe/Paris'

THEME = "themes/zerofour"

# Index template vars
SITE_DESCRIPTION = "A blog about development, programming, and technology"
COPYRIGHT_YEAR = datetime.now().year


# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ("Pelican", "https://getpelican.com/"),
    ("Python.org", "https://www.python.org/"),
    ("Jinja2", "https://palletsprojects.com/p/jinja/"),
    ("You can modify those links in your config file", "#"),
)

# Social widget
SOCIAL = (
    ("You can add links in your config file", "#"),
    ("Another social link", "#"),
)

DEFAULT_PAGINATION = 5

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True
