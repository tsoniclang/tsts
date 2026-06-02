//// [checkInheritedProperty.ts] ////

//// [/.src/checkInheritedProperty.ts] ////
class Base {
}

declare const BaseFactory: new() => Base & { c: string }

class Derived extends BaseFactory {
    a = this.b
    b = "abc"
}


//// [checkInheritedProperty.js]
class Base {
}

declare const BaseFactory: new() => Base & { c: string }

class Derived extends BaseFactory {
    a = this.b
    b = "abc"
}


//// [Diagnostics]

error TS0: Cannot find name 'BaseFactory'.

==== /.src/checkInheritedProperty.ts (1 errors) ====
    class Base {
    ~
!!! error TS0: Cannot find name 'BaseFactory'.
    }
    
    declare const BaseFactory: new() => Base & { c: string }
    
    class Derived extends BaseFactory {
        a = this.b
        b = "abc"
    }
    