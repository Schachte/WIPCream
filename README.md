# WIPCream
> A Github bot that helps limit the number of pull requests that are open to promote closing completed tickets and tickets in review.

## How Configuration Works
```
##############################################################################
#                     CONFIGURATION YML FOR BOT SETTINGS
#############################################################################

# Max number of pull requests that can be in review at any given time
pull_request_limit: 10

# Reply the bot will leave when a PR is in violation of the ruleset
comment_reply: "Default comment reply"

# Prefix to look for to make PRs exempt of the ruleset
preset_exemption: "PROJECT-127"
```

Configuration is stored via a YML file and that acts as the applications data layer. (This is temporary). File reads/writes continue as the settings are changed and that's what is used to cross-reference github data as events occur within the repository. Inside the `data/` directory, this `.yml` file is read and the keys are immutable and case-sesitive. 

If you happen to run the file, you can run a `node` script from the `util` directory to revert back to defaults

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Contributing

If you have suggestions for how wip-cream could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2019 Ryan Schachte <code@ryan-schachte.com>
