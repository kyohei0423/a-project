module ChatSpace
  class Application < Rails::Application
    config.generators do |g|
      g.helper false
      g.javascripts false
      g.stylesheets false
      g.test_framework :rspec,
        fixture: true,
        fixture_replacement: :factory_girl,
        view_specs: false,
        routing_specs: false,
        helper_specs: false,
        integration_tool: false
    end
  end
end
