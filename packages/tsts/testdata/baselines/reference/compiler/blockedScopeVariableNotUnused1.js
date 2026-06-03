//// [blockedScopeVariableNotUnused1.ts] ////

//// [/.src/blockedScopeVariableNotUnused1.ts] ////
export function foo() {
  const _fn = () => {
    ;(() => numFilesSelected)()
  }

  const numFilesSelected = 1
}


//// [blockedScopeVariableNotUnused1.js]
export function foo() {
  const _fn = () => {
  ;
  (() => numFilesSelected)();
};
  const numFilesSelected = 1;
}
