export const nImported = "nImported"
export const nNotImported = "nNotImported"
const nPrivate = "private"
export const o = (p1: typeof nImported, p2: typeof nNotImported, p3: typeof nPrivate) => null! as { foo: typeof nImported, bar: typeof nPrivate, baz: typeof nNotImported }
