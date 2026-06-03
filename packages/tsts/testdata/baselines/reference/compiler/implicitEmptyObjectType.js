//// [implicitEmptyObjectType.ts] ////

//// [/.src/implicitEmptyObjectType.ts] ////
// https://github.com/microsoft/typescript-go/issues/1563

function f() {
  const v: unknown = "lol";
  const acceptsRecord = (record: Record<string, string>) => {};
  acceptsRecord(v || {});
}


//// [Diagnostics]

error TS0: Cannot find name 'Record'.

==== /.src/implicitEmptyObjectType.ts (1 errors) ====
    // https://github.com/microsoft/typescript-go/issues/1563
    ~
!!! error TS0: Cannot find name 'Record'.
    
    function f() {
      const v: unknown = "lol";
      const acceptsRecord = (record: Record<string, string>) => {};
      acceptsRecord(v || {});
    }
    