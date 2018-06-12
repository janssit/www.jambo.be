# ruby-thumbor is the client library to thumbor
# https://github.com/thumbor/ruby-thumbor

# Usage: {% image {width: 768, smart: true, image: image} %}

module Jekyll
  class RenderImageTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
        require 'ruby-thumbor'

        @text = text
    end

    def lookup(context, name)
        lookup = context
        name.split(".").each { |value| lookup = lookup[value] }
        lookup
    end

    def render(context)
        hash = eval(@text)

        # Gather settings
        site = context.registers[:site]

        image = Thumbor::Cascade.new(site.config['thumbor-key'], lookup(context, 'image'))

        image.meta(hash[:meta])
        image.crop(hash[:crop])
        image.width(hash[:width])
        image.height(hash[:height])
        image.flip(hash[:flip])
        image.flop(hash[:flop])
        image.halign(hash[:halign])
        image.valign(hash[:valign])
        image.smart(hash[:smart])

        "#{site.config['thumbor-url']}#{image.generate}"
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::RenderImageTag)