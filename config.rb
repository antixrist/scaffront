require "compass"
require "breakpoint"
require "breakpoint-slicer"
require "singularitygs"
require "toolkit"
require "SassyLists"
require "sassy-map"
require "sassy-buttons"
require "singularity-quick-spanner"

# require "sass-css-importer"
# require "compass-recipes"

# Require any additional compass plugins here.


# Set this to the root of your project when deployed:
# http_path = "/"
# css_dir = "css"
# sass_dir = "scss"
images_dir = "dist/i"
http_images_path = "/i"
http_generated_images_path = "/i"
# sprite_load_path = "dist/i"
# generated_images_dir  = "/i"
# generated_images_path = "/i"
# javascripts_dir = "js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :compressed
# output_style = (environment == :production) ? :compressed : :compact

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
sass_options = {:debug_info => false}

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass