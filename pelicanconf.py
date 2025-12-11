from datetime import datetime

# Pelican vars
PATH = "content"

# Basic settings
AUTHOR = 'dezeat'
SITENAME = 'dz.dev'
SITEURL = ""
DEFAULT_LANG = 'en'
TIMEZONE = 'Europe/Paris'

THEME = "themes/mytheme"

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
ARTICLE_PATHS = ['blog', 'projects']
PAGE_PATHS = ['pages']
STATIC_PATHS = ['images']
PROJECT_PATHS = ['projects'] 

# Only generate the direct templates we need (index, plus custom blog/projects pages)
DIRECT_TEMPLATES = ['index', 'blog', 'projects']

# Prevent creation of tag/category/author/archive pages unless explicitly desired
TAGS_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
ARCHIVES_SAVE_AS = ''

# --- FIX: Explicitly disable pagination since we handle article lists manually ---
PAGINATE = False 
# --- FIX: We remove DEFAULT_PAGINATION = 5 to ensure pagination is disabled ---


# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True