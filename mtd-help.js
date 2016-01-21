var chalk = require('chalk');

var withAlias = chalk.green('\t--%s, -%s\t') + '%s',
    withoutAlias = chalk.green('\t--%s\t\t') + '%s',
    nameAndDescription = '\n' + chalk.red('[ %s ]') + ' %s',
    optionalOpt = chalk.gray('(optional)');

var generated = /^MTD_/;

function writeOption (option, alias, description) {
  if (alias) console.log(withAlias, option, alias, description);
  else console.log(withoutAlias, option, description);
}

module.exports = function wrap (settings, details) {
  return (function help () {
    var
    tracks = this.tracks,
    info = this.information,
    options = this.options,
    aliases = info.aliases,
    descriptions = info.descriptions,
    hiding = settings.hide;

    console.log('%s', settings.name);

    Object.keys(tracks).sort().forEach(function (name) {
      var
      track = tracks[name],
      detail, description,
      requirements, index, length, option;

      if ((hiding && track.block === help) || generated.test(name))
        return;

      detail = description = details[name];

      console.log(nameAndDescription, name,  description || '');

      requirements = track.requirements;
      index = 0;
      length = requirements.length;

      while (index < length) {
        option = requirements[index++];
        writeOption(option, aliases[option], descriptions[option] || '');
      }
    });
  });
};
