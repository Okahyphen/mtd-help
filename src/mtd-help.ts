import * as chalk from 'chalk';

const ON: string = chalk.green('On');
const OFF: string = chalk.red('Off');

function onOff (flag: boolean): string {
    return flag ? ON : OFF;
}

function prefix (arg: string): string {
    switch (arg.length) {
        case 0: return '';
        case 1: return `-${arg}`;
        default: return `--${arg}`;
    }
}

module.exports =
(function factory (
    settings: HelpSettings,
    descriptions: GenericObject = {}
): Block {
    if (!settings) {
        settings = {
            hide: false,
            name: ''
        };
    }

    return (function help (): void {
        if (settings.name) {
            console.log(settings.name, '\n');
        }

        const self: MTD = this;

        console.log(chalk.gray(`\
[ Multiple: ${onOff(self.settings.multi)} ]\
[ Reruns: ${onOff(self.settings.reruns)} ]\
[ Warnings: ${onOff(self.settings.reportErrors)} ]`));

        const tracks: Track[] = Object.keys(self.tracks)
            .sort((a: string, b: string): number => a.localeCompare(b))
            .map((name: string): any => self.tracks[name]);

        tracks.forEach((track: Track): void => {
            if (settings.hide && track.block === help) {
                return;
            }

            const handle: string = track.handle;

            const defaultTrack: string = (
                handle === self._default
                ? chalk.gray(' (default)')
                : ''
            );

            console.log(`\n${chalk.blue('[ %s ]')}${defaultTrack} %s`,
                handle,
                (descriptions.hasOwnProperty(handle)
                    ? descriptions[handle]
                    : '')
            );

            track.options.forEach((opt: Option): void => {
                const name: string = chalk.yellow(prefix(opt.$));
                const info: string = opt.info || self.infoStrings[opt.$] || '';
                let alias: string = self.getAlias(opt);

                if (alias) {
                    alias = chalk.yellow(`, ${prefix(alias)}`);
                }

                let optional: string = '';
                const hasOwnDefault: boolean = opt.hasOwnProperty('_');

                if (hasOwnDefault || self.defaults.hasOwnProperty(opt.$)) {
                    const def: string = hasOwnDefault ? opt._ : self.defaults[opt.$];
                    optional = chalk.gray(`(default: ${def})`);
                }

                console.warn(`\t${name}${alias}  ${optional}\n\t\t${info}`);
            });
        });

        console.log('');
    });
});
