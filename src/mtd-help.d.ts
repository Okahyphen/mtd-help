interface GenericObject extends Object {
    [index: string]: any;
}

interface Settings extends Object {
    [index: string]: any;

    multi?: boolean;
    reportErrors?: boolean;
    reruns?: boolean;
}

interface Option extends Object {
    [index: string]: any;

    $: string;
    _?: any;

    alias?: string;
    info?: string;
}

interface TypedOption extends Option {
    bool?: boolean;
    string?: boolean;
}

interface Parsed {
    [index: string]: Object | string[];

    alias: Object;
    default: Object;
    boolean: string[];
    string: string[];
}

interface Block {
    (...args: any[]): any;
}

interface MTD {
    aliases: GenericObject;
    defaults: GenericObject;
    infoStrings: GenericObject;
    settings: Settings;
    tracks: GenericObject;

    getAlias: (o: Option) => string;


    _default: string;
}

interface Track {
    block: Block;
    handle: string;
    options: Option[];
}

interface HelpSettings {
    name: string;
    hide: boolean;
}
