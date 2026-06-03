//// [parameterPropertyWithDefaultValue.ts] ////

//// [/.src/parameterPropertyWithDefaultValue.ts] ////
export class SomeClass {
  constructor(readonly timestamp = new Date()) {}
}

//// [parameterPropertyWithDefaultValue.js]
export class SomeClass {
  constructor(timestamp = new Date()) {
    this.timestamp = timestamp;
  }
}
