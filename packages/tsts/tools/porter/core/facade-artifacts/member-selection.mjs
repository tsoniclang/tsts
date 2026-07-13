export function directAuthoredMethodSetMode(facade) {
  return facade.runtimeAdaptation?.pointer === "aggregate" ? "pointer" : "value";
}

export function memberIsSelected(selection, kind, name) {
  return selection === undefined || selection.has(`${kind}\0${name}`);
}
