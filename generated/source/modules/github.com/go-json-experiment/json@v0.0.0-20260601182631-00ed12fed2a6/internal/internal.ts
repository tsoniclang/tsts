export type NotForPublicUse$Storage = {};
export class NotForPublicUse {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: NotForPublicUse$Storage) {
    }
    public static $storageOf($source: NotForPublicUse): NotForPublicUse$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: NotForPublicUse$Storage): NotForPublicUse {
        return new NotForPublicUse($source);
    }
    static $zero(): NotForPublicUse {
        return new NotForPublicUse({});
    }
    declare private readonly then?: never;
}
