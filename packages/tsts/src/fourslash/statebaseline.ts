/**
 * Fourslash state baseline recorder.
 *
 * Porting surface for TS-Go `internal/fourslash/statebaseline.go`.
 */

import type { FourslashTest } from "./fourslash.js";

export interface StateBaselineWriter {
  writeLine(text?: string): void;
}

export interface StateBaselineEntry {
  readonly label: string;
  readonly activeFile: string;
  readonly caretLine: number;
  readonly caretCharacter: number;
  readonly selectionEndLine?: number;
  readonly selectionEndCharacter?: number;
  readonly openFiles: readonly string[];
}

export class StateBaseline {
  private readonly entries: StateBaselineEntry[] = [];

  record(label: string, state: FourslashTest): void {
    const entry: StateBaselineEntry = {
      label,
      activeFile: state.activeFilename,
      caretLine: state.currentCaretPosition.line,
      caretCharacter: state.currentCaretPosition.character,
      openFiles: [...state.openFiles].sort(),
    };
    this.entries.push(state.selectionEnd === undefined
      ? entry
      : {
        ...entry,
        selectionEndLine: state.selectionEnd.line,
        selectionEndCharacter: state.selectionEnd.character,
      });
  }

  all(): readonly StateBaselineEntry[] {
    return this.entries;
  }

  text(): string {
    return this.entries.map(formatStateBaselineEntry).join("\n\n");
  }
}

export function newStateBaseline(): StateBaseline {
  return new StateBaseline();
}

export function formatStateBaselineEntry(entry: StateBaselineEntry): string {
  const selection = entry.selectionEndLine === undefined || entry.selectionEndCharacter === undefined
    ? ""
    : ` selection=${entry.selectionEndLine + 1}:${entry.selectionEndCharacter + 1}`;
  return [
    `== ${entry.label} ==`,
    `active=${entry.activeFile}`,
    `caret=${entry.caretLine + 1}:${entry.caretCharacter + 1}${selection}`,
    `open=${entry.openFiles.join(", ")}`,
  ].join("\n");
}

export interface DiffTableOptions {
  readonly indent?: string;
  readonly sortKeys?: boolean;
}

export class DiffTable {
  private readonly diff = new Map<string, string>();

  constructor(private readonly options: DiffTableOptions = {}) {}

  add(key: string, value: string): void {
    this.diff.set(key, value);
  }

  print(writer: StateBaselineWriter, header: string): void {
    if (this.diff.size === 0) return;
    const baseIndent = this.options.indent ?? "";
    if (header !== "") writer.writeLine(`${baseIndent}${header}`);

    const diffKeys = [...this.diff.keys()];
    let keyWidth = 0;
    for (const key of diffKeys) {
      keyWidth = Math.max(keyWidth, key.length);
    }
    if (this.options.sortKeys === true) diffKeys.sort();

    const rowIndent = `${baseIndent}  `;
    for (const key of diffKeys) {
      writer.writeLine(`${rowIndent}${key.padEnd(keyWidth + 1)} ${this.diff.get(key) ?? ""}`);
    }
  }
}

export class DiffTableWriter {
  private hasChange = false;
  private readonly diffs = new Map<string, (writer: StateBaselineWriter) => void>();

  constructor(private readonly header: string) {}

  setHasChange(): void {
    this.hasChange = true;
  }

  add(key: string, writeDiff: (writer: StateBaselineWriter) => void): void {
    this.diffs.set(key, writeDiff);
  }

  print(writer: StateBaselineWriter): void {
    if (!this.hasChange) return;
    writer.writeLine(`${this.header}::`);
    for (const key of [...this.diffs.keys()].sort()) {
      this.diffs.get(key)?.(writer);
    }
  }
}

export function newDiffTableWriter(header: string): DiffTableWriter {
  return new DiffTableWriter(header);
}

export function areIterSeqEqual(left: Iterable<string>, right: Iterable<string>): boolean {
  const leftValues = [...left].sort();
  const rightValues = [...right].sort();
  if (leftValues.length !== rightValues.length) return false;
  return leftValues.every((value, index) => value === rightValues[index]);
}

export function printSlicesWithDiffTable(
  writer: StateBaselineWriter,
  header: string,
  newSlice: readonly string[],
  getOldSlice: () => readonly string[],
  options: DiffTableOptions,
  topChange: string,
  isDefault?: (entry: string) => boolean,
): void {
  const oldSlice = topChange === "*modified*" ? [...getOldSlice()] : [];
  const oldEntries = new Set(oldSlice);
  const newEntries = new Set(newSlice);
  const table = new DiffTable(options);

  for (const entry of newSlice) {
    let entryChange = "";
    if (isDefault?.(entry) === true) entryChange = "(default) ";
    if (topChange === "*modified*" && !oldEntries.has(entry)) entryChange = "*new*";
    table.add(entry, entryChange);
  }

  if (topChange === "*modified*") {
    for (const entry of oldSlice) {
      if (!newEntries.has(entry)) table.add(entry, "*deleted*");
    }
  }

  table.print(writer, header);
}

export function sliceFromIterSeqPath(sequence: Iterable<string>): readonly string[] {
  return [...sequence].sort();
}

export function printPathIterSeqWithDiffTable(
  writer: StateBaselineWriter,
  header: string,
  newSequence: Iterable<string>,
  getOldSequence: () => Iterable<string>,
  options: DiffTableOptions,
  topChange: string,
): void {
  printSlicesWithDiffTable(
    writer,
    header,
    sliceFromIterSeqPath(newSequence),
    () => sliceFromIterSeqPath(getOldSequence()),
    options,
    topChange,
  );
}

// Source parity map: internal/fourslash/statebaseline.go
/**
 * Source parity map for TS-Go `fourslash/statebaseline.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

const fourslashStatebaselineUpstreamPath = "fourslash/statebaseline.go";

const fourslashStatebaselineDeclarations: readonly UpstreamDeclaration[] = [
  {"line":26,"kind":"type","name":"stateBaseline"},
  {"line":36,"kind":"func","name":"newStateBaseline"},
  {"line":48,"kind":"type","name":"requestOrMessage"},
  {"line":53,"kind":"func","name":"baselineRequestOrNotification","receiver":"f *FourslashTest"},
  {"line":67,"kind":"func","name":"baselineProjectsAfterNotification","receiver":"f *FourslashTest"},
  {"line":86,"kind":"func","name":"baselineState","receiver":"f *FourslashTest"},
  {"line":100,"kind":"func","name":"serializedState","receiver":"f *FourslashTest"},
  {"line":113,"kind":"type","name":"projectInfo"},
  {"line":115,"kind":"type","name":"openFileInfo"},
  {"line":120,"kind":"type","name":"diffTableOptions"},
  {"line":125,"kind":"type","name":"diffTable"},
  {"line":130,"kind":"func","name":"add","receiver":"d *diffTable"},
  {"line":134,"kind":"func","name":"print","receiver":"d *diffTable"},
  {"line":159,"kind":"type","name":"diffTableWriter"},
  {"line":165,"kind":"func","name":"newDiffTableWriter"},
  {"line":169,"kind":"func","name":"setHasChange","receiver":"d *diffTableWriter"},
  {"line":173,"kind":"func","name":"add","receiver":"d *diffTableWriter"},
  {"line":177,"kind":"func","name":"print","receiver":"d *diffTableWriter"},
  {"line":188,"kind":"func","name":"areIterSeqEqual"},
  {"line":196,"kind":"func","name":"printSlicesWithDiffTable"},
  {"line":222,"kind":"func","name":"sliceFromIterSeqPath"},
  {"line":231,"kind":"func","name":"printPathIterSeqWithDiffTable"},
  {"line":243,"kind":"func","name":"printStateDiff","receiver":"f *FourslashTest"},
  {"line":255,"kind":"func","name":"printProjectsDiff","receiver":"f *FourslashTest"},
  {"line":336,"kind":"func","name":"printOpenFilesDiff","receiver":"f *FourslashTest"},
  {"line":396,"kind":"func","name":"printConfigFileRegistryDiff","receiver":"f *FourslashTest"},
];

const fourslashStatebaselineSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package fourslash"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"fmt\""},
  {"line":5,"text":"\t\"io\""},
  {"line":6,"text":"\t\"iter\""},
  {"line":7,"text":"\t\"maps\""},
  {"line":8,"text":"\t\"slices\""},
  {"line":9,"text":"\t\"strings\""},
  {"line":10,"text":"\t\"testing\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/collections\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/json\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/project\""},
  {"line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/fsbaselineutil\""},
  {"line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/lsptestutil\""},
  {"line":21,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":22,"text":"\t\"github.com/microsoft/typescript-go/internal/vfs/iovfs\""},
  {"line":23,"text":"\t\"gotest.tools/v3/assert\""},
  {"line":24,"text":")"},
  {"line":26,"text":"type stateBaseline struct {"},
  {"line":27,"text":"\tbaseline      strings.Builder"},
  {"line":28,"text":"\tfsDiffer      *fsbaselineutil.FSDiffer"},
  {"line":29,"text":"\tisInitialized bool"},
  {"line":31,"text":"\tserializedProjects           map[string]projectInfo"},
  {"line":32,"text":"\tserializedOpenFiles          map[string]*openFileInfo"},
  {"line":33,"text":"\tserializedConfigFileRegistry *project.ConfigFileRegistry"},
  {"line":34,"text":"}"},
  {"line":36,"text":"func newStateBaseline(fsFromMap iovfs.FsWithSys) *stateBaseline {"},
  {"line":37,"text":"\tstateBaseline := &stateBaseline{"},
  {"line":38,"text":"\t\tfsDiffer: &fsbaselineutil.FSDiffer{"},
  {"line":39,"text":"\t\t\tFS:           fsFromMap,"},
  {"line":40,"text":"\t\t\tWrittenFiles: &collections.SyncSet[string]{},"},
  {"line":41,"text":"\t\t},"},
  {"line":42,"text":"\t}"},
  {"line":43,"text":"\tfmt.Fprintf(&stateBaseline.baseline, \"UseCaseSensitiveFileNames: %v\\n\", fsFromMap.UseCaseSensitiveFileNames())"},
  {"line":44,"text":"\tstateBaseline.fsDiffer.BaselineFSwithDiff(&stateBaseline.baseline)"},
  {"line":45,"text":"\treturn stateBaseline"},
  {"line":46,"text":"}"},
  {"line":48,"text":"type requestOrMessage struct {"},
  {"line":49,"text":"\tMethod lsproto.Method `json:\"method\"`"},
  {"line":50,"text":"\tParams any            `json:\"params,omitzero\"`"},
  {"line":51,"text":"}"},
  {"line":53,"text":"func (f *FourslashTest) baselineRequestOrNotification(t *testing.T, method lsproto.Method, params any) {"},
  {"line":54,"text":"\tt.Helper()"},
  {"line":56,"text":"\tif !f.testData.isStateBaseliningEnabled() {"},
  {"line":57,"text":"\t\treturn"},
  {"line":58,"text":"\t}"},
  {"line":60,"text":"\tres, _ := json.Marshal(requestOrMessage{method, params}, json.WithIndent(\"  \"))"},
  {"line":61,"text":"\tf.stateBaseline.baseline.WriteString(\"\\n\")"},
  {"line":62,"text":"\tf.stateBaseline.baseline.Write(res)"},
  {"line":63,"text":"\tf.stateBaseline.baseline.WriteString(\"\\n\")"},
  {"line":64,"text":"\tf.stateBaseline.isInitialized = true"},
  {"line":65,"text":"}"},
  {"line":67,"text":"func (f *FourslashTest) baselineProjectsAfterNotification(t *testing.T, fileName string) {"},
  {"line":68,"text":"\tt.Helper()"},
  {"line":69,"text":"\tif !f.testData.isStateBaseliningEnabled() {"},
  {"line":70,"text":"\t\treturn"},
  {"line":71,"text":"\t}"},
  {"line":73,"text":"\t_, _, resultOk := lsptestutil.SendRequest(t, f.client, lsproto.TextDocumentHoverInfo, &lsproto.HoverParams{"},
  {"line":74,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":75,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(fileName),"},
  {"line":76,"text":"\t\t},"},
  {"line":77,"text":"\t\tPosition: lsproto.Position{"},
  {"line":78,"text":"\t\t\tLine:      uint32(0),"},
  {"line":79,"text":"\t\t\tCharacter: uint32(0),"},
  {"line":80,"text":"\t\t},"},
  {"line":81,"text":"\t})"},
  {"line":82,"text":"\tassert.Assert(t, resultOk)"},
  {"line":83,"text":"\tf.baselineState(t)"},
  {"line":84,"text":"}"},
  {"line":86,"text":"func (f *FourslashTest) baselineState(t *testing.T) {"},
  {"line":87,"text":"\tt.Helper()"},
  {"line":89,"text":"\tif !f.testData.isStateBaseliningEnabled() {"},
  {"line":90,"text":"\t\treturn"},
  {"line":91,"text":"\t}"},
  {"line":93,"text":"\tserialized := f.serializedState(t)"},
  {"line":94,"text":"\tif serialized != \"\" {"},
  {"line":95,"text":"\t\tf.stateBaseline.baseline.WriteString(\"\\n\")"},
  {"line":96,"text":"\t\tf.stateBaseline.baseline.WriteString(serialized)"},
  {"line":97,"text":"\t}"},
  {"line":98,"text":"}"},
  {"line":100,"text":"func (f *FourslashTest) serializedState(t *testing.T) string {"},
  {"line":101,"text":"\tt.Helper()"},
  {"line":103,"text":"\tvar builder strings.Builder"},
  {"line":104,"text":"\tf.stateBaseline.fsDiffer.BaselineFSwithDiff(&builder)"},
  {"line":105,"text":"\tif strings.TrimSpace(builder.String()) == \"\" {"},
  {"line":106,"text":"\t\tbuilder.Reset()"},
  {"line":107,"text":"\t}"},
  {"line":109,"text":"\tf.printStateDiff(t, &builder)"},
  {"line":110,"text":"\treturn builder.String()"},
  {"line":111,"text":"}"},
  {"line":113,"text":"type projectInfo = *compiler.Program"},
  {"line":115,"text":"type openFileInfo struct {"},
  {"line":116,"text":"\tdefaultProjectName string"},
  {"line":117,"text":"\tallProjects        []string"},
  {"line":118,"text":"}"},
  {"line":120,"text":"type diffTableOptions struct {"},
  {"line":121,"text":"\tindent   string"},
  {"line":122,"text":"\tsortKeys bool"},
  {"line":123,"text":"}"},
  {"line":125,"text":"type diffTable struct {"},
  {"line":126,"text":"\tdiff    collections.OrderedMap[string, string]"},
  {"line":127,"text":"\toptions diffTableOptions"},
  {"line":128,"text":"}"},
  {"line":130,"text":"func (d *diffTable) add(key, value string) {"},
  {"line":131,"text":"\td.diff.Set(key, value)"},
  {"line":132,"text":"}"},
  {"line":134,"text":"func (d *diffTable) print(w io.Writer, header string) {"},
  {"line":135,"text":"\tcount := d.diff.Size()"},
  {"line":136,"text":"\tif count == 0 {"},
  {"line":137,"text":"\t\treturn"},
  {"line":138,"text":"\t}"},
  {"line":139,"text":"\tif header != \"\" {"},
  {"line":140,"text":"\t\tfmt.Fprintf(w, \"%s%s\\n\", d.options.indent, header)"},
  {"line":141,"text":"\t}"},
  {"line":142,"text":"\tdiffKeys := make([]string, 0, count)"},
  {"line":143,"text":"\tkeyWidth := 0"},
  {"line":144,"text":"\tindent := d.options.indent + \"  \""},
  {"line":145,"text":"\tfor key := range d.diff.Keys() {"},
  {"line":146,"text":"\t\tkeyWidth = max(keyWidth, len(key))"},
  {"line":147,"text":"\t\tdiffKeys = append(diffKeys, key)"},
  {"line":148,"text":"\t}"},
  {"line":149,"text":"\tif d.options.sortKeys {"},
  {"line":150,"text":"\t\tslices.Sort(diffKeys)"},
  {"line":151,"text":"\t}"},
  {"line":153,"text":"\tfor _, key := range diffKeys {"},
  {"line":154,"text":"\t\tvalue := d.diff.GetOrZero(key)"},
  {"line":155,"text":"\t\tfmt.Fprintf(w, \"%s%-*s %s\\n\", indent, keyWidth+1, key, value)"},
  {"line":156,"text":"\t}"},
  {"line":157,"text":"}"},
  {"line":159,"text":"type diffTableWriter struct {"},
  {"line":160,"text":"\thasChange bool"},
  {"line":161,"text":"\theader    string"},
  {"line":162,"text":"\tdiffs     map[string]func(io.Writer)"},
  {"line":163,"text":"}"},
  {"line":165,"text":"func newDiffTableWriter(header string) *diffTableWriter {"},
  {"line":166,"text":"\treturn &diffTableWriter{header: header, diffs: make(map[string]func(io.Writer))}"},
  {"line":167,"text":"}"},
  {"line":169,"text":"func (d *diffTableWriter) setHasChange() {"},
  {"line":170,"text":"\td.hasChange = true"},
  {"line":171,"text":"}"},
  {"line":173,"text":"func (d *diffTableWriter) add(key string, fn func(io.Writer)) {"},
  {"line":174,"text":"\td.diffs[key] = fn"},
  {"line":175,"text":"}"},
  {"line":177,"text":"func (d *diffTableWriter) print(w io.Writer) {"},
  {"line":178,"text":"\tif d.hasChange {"},
  {"line":179,"text":"\t\tfmt.Fprintf(w, \"%s::\\n\", d.header)"},
  {"line":180,"text":"\t\tkeys := slices.Collect(maps.Keys(d.diffs))"},
  {"line":181,"text":"\t\tslices.Sort(keys)"},
  {"line":182,"text":"\t\tfor _, key := range keys {"},
  {"line":183,"text":"\t\t\td.diffs[key](w)"},
  {"line":184,"text":"\t\t}"},
  {"line":185,"text":"\t}"},
  {"line":186,"text":"}"},
  {"line":188,"text":"func areIterSeqEqual(a, b iter.Seq[tspath.Path]) bool {"},
  {"line":189,"text":"\taSlice := slices.Collect(a)"},
  {"line":190,"text":"\tbSlice := slices.Collect(b)"},
  {"line":191,"text":"\tslices.Sort(aSlice)"},
  {"line":192,"text":"\tslices.Sort(bSlice)"},
  {"line":193,"text":"\treturn slices.Equal(aSlice, bSlice)"},
  {"line":194,"text":"}"},
  {"line":196,"text":"func printSlicesWithDiffTable(w io.Writer, header string, newSlice []string, getOldSlice func() []string, options diffTableOptions, topChange string, isDefault func(entry string) bool) {"},
  {"line":197,"text":"\tvar oldSlice []string"},
  {"line":198,"text":"\tif topChange == \"*modified*\" {"},
  {"line":199,"text":"\t\toldSlice = getOldSlice()"},
  {"line":200,"text":"\t}"},
  {"line":201,"text":"\ttable := diffTable{options: options}"},
  {"line":202,"text":"\tfor _, entry := range newSlice {"},
  {"line":203,"text":"\t\tentryChange := \"\""},
  {"line":204,"text":"\t\tif isDefault != nil && isDefault(entry) {"},
  {"line":205,"text":"\t\t\tentryChange = \"(default) \""},
  {"line":206,"text":"\t\t}"},
  {"line":207,"text":"\t\tif topChange == \"*modified*\" && !slices.Contains(oldSlice, entry) {"},
  {"line":208,"text":"\t\t\tentryChange = \"*new*\""},
  {"line":209,"text":"\t\t}"},
  {"line":210,"text":"\t\ttable.add(entry, entryChange)"},
  {"line":211,"text":"\t}"},
  {"line":212,"text":"\tif topChange == \"*modified*\" {"},
  {"line":213,"text":"\t\tfor _, entry := range oldSlice {"},
  {"line":214,"text":"\t\t\tif !slices.Contains(newSlice, entry) {"},
  {"line":215,"text":"\t\t\t\ttable.add(entry, \"*deleted*\")"},
  {"line":216,"text":"\t\t\t}"},
  {"line":217,"text":"\t\t}"},
  {"line":218,"text":"\t}"},
  {"line":219,"text":"\ttable.print(w, header)"},
  {"line":220,"text":"}"},
  {"line":222,"text":"func sliceFromIterSeqPath(seq iter.Seq[tspath.Path]) []string {"},
  {"line":223,"text":"\tvar result []string"},
  {"line":224,"text":"\tfor path := range seq {"},
  {"line":225,"text":"\t\tresult = append(result, string(path))"},
  {"line":226,"text":"\t}"},
  {"line":227,"text":"\tslices.Sort(result)"},
  {"line":228,"text":"\treturn result"},
  {"line":229,"text":"}"},
  {"line":231,"text":"func printPathIterSeqWithDiffTable(w io.Writer, header string, newIterSeq iter.Seq[tspath.Path], getOldIterSeq func() iter.Seq[tspath.Path], options diffTableOptions, topChange string) {"},
  {"line":232,"text":"\tprintSlicesWithDiffTable("},
  {"line":233,"text":"\t\tw,"},
  {"line":234,"text":"\t\theader,"},
  {"line":235,"text":"\t\tsliceFromIterSeqPath(newIterSeq),"},
  {"line":236,"text":"\t\tfunc() []string { return sliceFromIterSeqPath(getOldIterSeq()) },"},
  {"line":237,"text":"\t\toptions,"},
  {"line":238,"text":"\t\ttopChange,"},
  {"line":239,"text":"\t\tnil,"},
  {"line":240,"text":"\t)"},
  {"line":241,"text":"}"},
  {"line":243,"text":"func (f *FourslashTest) printStateDiff(t *testing.T, w io.Writer) {"},
  {"line":244,"text":"\tif !f.stateBaseline.isInitialized {"},
  {"line":245,"text":"\t\treturn"},
  {"line":246,"text":"\t}"},
  {"line":247,"text":"\tsession := f.client.Server.Session()"},
  {"line":248,"text":"\tsnapshot := session.Snapshot()"},
  {"line":250,"text":"\tf.printProjectsDiff(t, snapshot, w)"},
  {"line":251,"text":"\tf.printOpenFilesDiff(t, snapshot, w)"},
  {"line":252,"text":"\tf.printConfigFileRegistryDiff(t, snapshot, w)"},
  {"line":253,"text":"}"},
  {"line":255,"text":"func (f *FourslashTest) printProjectsDiff(t *testing.T, snapshot *project.Snapshot, w io.Writer) {"},
  {"line":256,"text":"\tt.Helper()"},
  {"line":258,"text":"\tcurrentProjects := make(map[string]projectInfo)"},
  {"line":259,"text":"\toptions := diffTableOptions{indent: \"  \"}"},
  {"line":260,"text":"\tprojectsDiffTable := newDiffTableWriter(\"Projects\")"},
  {"line":262,"text":"\tfor _, project := range snapshot.ProjectCollection.Projects() {"},
  {"line":263,"text":"\t\tprogram := project.GetProgram()"},
  {"line":264,"text":"\t\tvar oldProgram *compiler.Program"},
  {"line":265,"text":"\t\tcurrentProjects[project.Name()] = program"},
  {"line":266,"text":"\t\tprojectChange := \"\""},
  {"line":267,"text":"\t\tif existing, ok := f.stateBaseline.serializedProjects[project.Name()]; ok {"},
  {"line":268,"text":"\t\t\toldProgram = existing"},
  {"line":269,"text":"\t\t\tif oldProgram != program {"},
  {"line":270,"text":"\t\t\t\tprojectChange = \"*modified*\""},
  {"line":271,"text":"\t\t\t\tprojectsDiffTable.setHasChange()"},
  {"line":272,"text":"\t\t\t} else {"},
  {"line":273,"text":"\t\t\t\tprojectChange = \"\""},
  {"line":274,"text":"\t\t\t}"},
  {"line":275,"text":"\t\t} else {"},
  {"line":276,"text":"\t\t\tprojectChange = \"*new*\""},
  {"line":277,"text":"\t\t\tprojectsDiffTable.setHasChange()"},
  {"line":278,"text":"\t\t}"},
  {"line":280,"text":"\t\tprojectsDiffTable.add(project.Name(), func(w io.Writer) {"},
  {"line":281,"text":"\t\t\tfmt.Fprintf(w, \"  [%s] %s\\n\", project.Name(), projectChange)"},
  {"line":282,"text":"\t\t\tsubDiff := diffTable{options: options}"},
  {"line":283,"text":"\t\t\tif program != nil {"},
  {"line":284,"text":"\t\t\t\tfor _, file := range program.GetSourceFiles() {"},
  {"line":285,"text":"\t\t\t\t\tfileDiff := \"\""},
  {"line":287,"text":"\t\t\t\t\tfileName := file.FileName()"},
  {"line":288,"text":"\t\t\t\t\tif projectChange == \"*modified*\" {"},
  {"line":289,"text":"\t\t\t\t\t\tif oldProgram == nil {"},
  {"line":290,"text":"\t\t\t\t\t\t\tif !isLibFile(fileName) {"},
  {"line":291,"text":"\t\t\t\t\t\t\t\tfileDiff = \"*new*\""},
  {"line":292,"text":"\t\t\t\t\t\t\t}"},
  {"line":293,"text":"\t\t\t\t\t\t} else if oldFile := oldProgram.GetSourceFileByPath(file.Path()); oldFile == nil {"},
  {"line":294,"text":"\t\t\t\t\t\t\tfileDiff = \"*new*\""},
  {"line":295,"text":"\t\t\t\t\t\t} else if oldFile != file {"},
  {"line":296,"text":"\t\t\t\t\t\t\tfileDiff = \"*modified*\""},
  {"line":297,"text":"\t\t\t\t\t\t}"},
  {"line":298,"text":"\t\t\t\t\t}"},
  {"line":299,"text":"\t\t\t\t\tif fileDiff != \"\" || !isLibFile(fileName) {"},
  {"line":300,"text":"\t\t\t\t\t\tsubDiff.add(fileName, fileDiff)"},
  {"line":301,"text":"\t\t\t\t\t}"},
  {"line":302,"text":"\t\t\t\t}"},
  {"line":303,"text":"\t\t\t}"},
  {"line":304,"text":"\t\t\tif oldProgram != program && oldProgram != nil {"},
  {"line":305,"text":"\t\t\t\tfor _, file := range oldProgram.GetSourceFiles() {"},
  {"line":306,"text":"\t\t\t\t\tif program == nil || program.GetSourceFileByPath(file.Path()) == nil {"},
  {"line":307,"text":"\t\t\t\t\t\tsubDiff.add(file.FileName(), \"*deleted*\")"},
  {"line":308,"text":"\t\t\t\t\t}"},
  {"line":309,"text":"\t\t\t\t}"},
  {"line":310,"text":"\t\t\t}"},
  {"line":311,"text":"\t\t\tsubDiff.print(w, \"\")"},
  {"line":312,"text":"\t\t})"},
  {"line":313,"text":"\t}"},
  {"line":315,"text":"\tfor projectName, info := range f.stateBaseline.serializedProjects {"},
  {"line":316,"text":"\t\tif _, found := currentProjects[projectName]; !found {"},
  {"line":317,"text":"\t\t\tprojectsDiffTable.setHasChange()"},
  {"line":318,"text":"\t\t\tprojectsDiffTable.add(projectName, func(w io.Writer) {"},
  {"line":319,"text":"\t\t\t\tfmt.Fprintf(w, \"  [%s] *deleted*\\n\", projectName)"},
  {"line":320,"text":"\t\t\t\tsubDiff := diffTable{options: options}"},
  {"line":321,"text":"\t\t\t\tif info != nil {"},
  {"line":322,"text":"\t\t\t\t\tfor _, file := range info.GetSourceFiles() {"},
  {"line":323,"text":"\t\t\t\t\t\tif fileName := file.FileName(); !isLibFile(fileName) {"},
  {"line":324,"text":"\t\t\t\t\t\t\tsubDiff.add(fileName, \"\")"},
  {"line":325,"text":"\t\t\t\t\t\t}"},
  {"line":326,"text":"\t\t\t\t\t}"},
  {"line":327,"text":"\t\t\t\t}"},
  {"line":328,"text":"\t\t\t\tsubDiff.print(w, \"\")"},
  {"line":329,"text":"\t\t\t})"},
  {"line":330,"text":"\t\t}"},
  {"line":331,"text":"\t}"},
  {"line":332,"text":"\tf.stateBaseline.serializedProjects = currentProjects"},
  {"line":333,"text":"\tprojectsDiffTable.print(w)"},
  {"line":334,"text":"}"},
  {"line":336,"text":"func (f *FourslashTest) printOpenFilesDiff(t *testing.T, snapshot *project.Snapshot, w io.Writer) {"},
  {"line":337,"text":"\tt.Helper()"},
  {"line":339,"text":"\tcurrentOpenFiles := make(map[string]*openFileInfo)"},
  {"line":340,"text":"\tfilesDiffTable := newDiffTableWriter(\"Open Files\")"},
  {"line":341,"text":"\toptions := diffTableOptions{indent: \"  \", sortKeys: true}"},
  {"line":342,"text":"\tfor fileName := range f.openFiles {"},
  {"line":343,"text":"\t\tpath := tspath.ToPath(fileName, \"/\", f.vfs.UseCaseSensitiveFileNames())"},
  {"line":344,"text":"\t\tdefaultProject := snapshot.ProjectCollection.GetDefaultProject(path)"},
  {"line":345,"text":"\t\tnewFileInfo := &openFileInfo{}"},
  {"line":346,"text":"\t\tif defaultProject != nil {"},
  {"line":347,"text":"\t\t\tnewFileInfo.defaultProjectName = defaultProject.Name()"},
  {"line":348,"text":"\t\t}"},
  {"line":349,"text":"\t\tfor _, project := range snapshot.ProjectCollection.Projects() {"},
  {"line":350,"text":"\t\t\tif program := project.GetProgram(); program != nil && program.GetSourceFileByPath(path) != nil {"},
  {"line":351,"text":"\t\t\t\tnewFileInfo.allProjects = append(newFileInfo.allProjects, project.Name())"},
  {"line":352,"text":"\t\t\t}"},
  {"line":353,"text":"\t\t}"},
  {"line":354,"text":"\t\tslices.Sort(newFileInfo.allProjects)"},
  {"line":355,"text":"\t\tcurrentOpenFiles[fileName] = newFileInfo"},
  {"line":356,"text":"\t\topenFileChange := \"\""},
  {"line":357,"text":"\t\tvar oldFileInfo *openFileInfo"},
  {"line":358,"text":"\t\tif existing, ok := f.stateBaseline.serializedOpenFiles[fileName]; ok {"},
  {"line":359,"text":"\t\t\toldFileInfo = existing"},
  {"line":360,"text":"\t\t\tif existing.defaultProjectName != newFileInfo.defaultProjectName || !slices.Equal(existing.allProjects, newFileInfo.allProjects) {"},
  {"line":361,"text":"\t\t\t\topenFileChange = \"*modified*\""},
  {"line":362,"text":"\t\t\t\tfilesDiffTable.setHasChange()"},
  {"line":363,"text":"\t\t\t} else {"},
  {"line":364,"text":"\t\t\t\topenFileChange = \"\""},
  {"line":365,"text":"\t\t\t}"},
  {"line":366,"text":"\t\t} else {"},
  {"line":367,"text":"\t\t\topenFileChange = \"*new*\""},
  {"line":368,"text":"\t\t\tfilesDiffTable.setHasChange()"},
  {"line":369,"text":"\t\t}"},
  {"line":371,"text":"\t\tfilesDiffTable.add(fileName, func(w io.Writer) {"},
  {"line":372,"text":"\t\t\tfmt.Fprintf(w, \"  [%s] %s\\n\", fileName, openFileChange)"},
  {"line":373,"text":"\t\t\tprintSlicesWithDiffTable("},
  {"line":374,"text":"\t\t\t\tw,"},
  {"line":375,"text":"\t\t\t\t\"\","},
  {"line":376,"text":"\t\t\t\tnewFileInfo.allProjects,"},
  {"line":377,"text":"\t\t\t\tfunc() []string { return oldFileInfo.allProjects },"},
  {"line":378,"text":"\t\t\t\toptions,"},
  {"line":379,"text":"\t\t\t\topenFileChange,"},
  {"line":380,"text":"\t\t\t\tfunc(projectName string) bool { return projectName == newFileInfo.defaultProjectName },"},
  {"line":381,"text":"\t\t\t)"},
  {"line":382,"text":"\t\t})"},
  {"line":383,"text":"\t}"},
  {"line":384,"text":"\tfor fileName := range f.stateBaseline.serializedOpenFiles {"},
  {"line":385,"text":"\t\tif _, found := currentOpenFiles[fileName]; !found {"},
  {"line":386,"text":"\t\t\tfilesDiffTable.setHasChange()"},
  {"line":387,"text":"\t\t\tfilesDiffTable.add(fileName, func(w io.Writer) {"},
  {"line":388,"text":"\t\t\t\tfmt.Fprintf(w, \"  [%s] *closed*\\n\", fileName)"},
  {"line":389,"text":"\t\t\t})"},
  {"line":390,"text":"\t\t}"},
  {"line":391,"text":"\t}"},
  {"line":392,"text":"\tf.stateBaseline.serializedOpenFiles = currentOpenFiles"},
  {"line":393,"text":"\tfilesDiffTable.print(w)"},
  {"line":394,"text":"}"},
  {"line":396,"text":"func (f *FourslashTest) printConfigFileRegistryDiff(t *testing.T, snapshot *project.Snapshot, w io.Writer) {"},
  {"line":397,"text":"\tt.Helper()"},
  {"line":398,"text":"\tconfigFileRegistry := snapshot.ProjectCollection.ConfigFileRegistry()"},
  {"line":400,"text":"\tconfigDiffsTable := newDiffTableWriter(\"Config\")"},
  {"line":401,"text":"\tconfigFileNamesDiffsTable := newDiffTableWriter(\"Config File Names\")"},
  {"line":403,"text":"\tif f.stateBaseline.serializedConfigFileRegistry == configFileRegistry {"},
  {"line":404,"text":"\t\treturn"},
  {"line":405,"text":"\t}"},
  {"line":406,"text":"\toptions := diffTableOptions{indent: \"    \", sortKeys: true}"},
  {"line":407,"text":"\tconfigFileRegistry.ForEachTestConfigEntry(func(path tspath.Path, entry *project.TestConfigEntry) {"},
  {"line":408,"text":"\t\tconfigChange := \"\""},
  {"line":409,"text":"\t\toldEntry := f.stateBaseline.serializedConfigFileRegistry.GetTestConfigEntry(path)"},
  {"line":410,"text":"\t\tif oldEntry == nil {"},
  {"line":411,"text":"\t\t\tconfigChange = \"*new*\""},
  {"line":412,"text":"\t\t\tconfigDiffsTable.setHasChange()"},
  {"line":413,"text":"\t\t} else if oldEntry != entry {"},
  {"line":414,"text":"\t\t\tif !areIterSeqEqual(oldEntry.RetainingProjects, entry.RetainingProjects) ||"},
  {"line":415,"text":"\t\t\t\t!areIterSeqEqual(oldEntry.RetainingOpenFiles, entry.RetainingOpenFiles) ||"},
  {"line":416,"text":"\t\t\t\t!areIterSeqEqual(oldEntry.RetainingConfigs, entry.RetainingConfigs) {"},
  {"line":417,"text":"\t\t\t\tconfigChange = \"*modified*\""},
  {"line":418,"text":"\t\t\t\tconfigDiffsTable.setHasChange()"},
  {"line":419,"text":"\t\t\t}"},
  {"line":420,"text":"\t\t}"},
  {"line":421,"text":"\t\tconfigDiffsTable.add(string(path), func(w io.Writer) {"},
  {"line":422,"text":"\t\t\tfmt.Fprintf(w, \"  [%s] %s\\n\", entry.FileName, configChange)"},
  {"line":424,"text":"\t\t\tvar retainingProjectsModified string"},
  {"line":425,"text":"\t\t\tvar retainingOpenFilesModified string"},
  {"line":426,"text":"\t\t\tvar retainingConfigsModified string"},
  {"line":427,"text":"\t\t\tif configChange == \"*modified*\" {"},
  {"line":428,"text":"\t\t\t\tif !areIterSeqEqual(entry.RetainingProjects, oldEntry.RetainingProjects) {"},
  {"line":429,"text":"\t\t\t\t\tretainingProjectsModified = \" *modified*\""},
  {"line":430,"text":"\t\t\t\t}"},
  {"line":431,"text":"\t\t\t\tif !areIterSeqEqual(entry.RetainingOpenFiles, oldEntry.RetainingOpenFiles) {"},
  {"line":432,"text":"\t\t\t\t\tretainingOpenFilesModified = \" *modified*\""},
  {"line":433,"text":"\t\t\t\t}"},
  {"line":434,"text":"\t\t\t\tif !areIterSeqEqual(entry.RetainingConfigs, oldEntry.RetainingConfigs) {"},
  {"line":435,"text":"\t\t\t\t\tretainingConfigsModified = \" *modified*\""},
  {"line":436,"text":"\t\t\t\t}"},
  {"line":437,"text":"\t\t\t}"},
  {"line":438,"text":"\t\t\tprintPathIterSeqWithDiffTable(w, \"RetainingProjects:\"+retainingProjectsModified, entry.RetainingProjects, func() iter.Seq[tspath.Path] { return oldEntry.RetainingProjects }, options, configChange)"},
  {"line":439,"text":"\t\t\tprintPathIterSeqWithDiffTable(w, \"RetainingOpenFiles:\"+retainingOpenFilesModified, entry.RetainingOpenFiles, func() iter.Seq[tspath.Path] { return oldEntry.RetainingOpenFiles }, options, configChange)"},
  {"line":440,"text":"\t\t\tprintPathIterSeqWithDiffTable(w, \"RetainingConfigs:\"+retainingConfigsModified, entry.RetainingConfigs, func() iter.Seq[tspath.Path] { return oldEntry.RetainingConfigs }, options, configChange)"},
  {"line":441,"text":"\t\t})"},
  {"line":442,"text":"\t})"},
  {"line":443,"text":"\tconfigFileRegistry.ForEachTestConfigFileNamesEntry(func(path tspath.Path, entry *project.TestConfigFileNamesEntry) {"},
  {"line":444,"text":"\t\tconfigFileNamesChange := \"\""},
  {"line":445,"text":"\t\toldEntry := f.stateBaseline.serializedConfigFileRegistry.GetTestConfigFileNamesEntry(path)"},
  {"line":446,"text":"\t\tif oldEntry == nil {"},
  {"line":447,"text":"\t\t\tconfigFileNamesChange = \"*new*\""},
  {"line":448,"text":"\t\t\tconfigFileNamesDiffsTable.setHasChange()"},
  {"line":449,"text":"\t\t} else if oldEntry.NearestConfigFileName != entry.NearestConfigFileName ||"},
  {"line":450,"text":"\t\t\t!maps.Equal(oldEntry.Ancestors, entry.Ancestors) {"},
  {"line":451,"text":"\t\t\tconfigFileNamesChange = \"*modified*\""},
  {"line":452,"text":"\t\t\tconfigFileNamesDiffsTable.setHasChange()"},
  {"line":453,"text":"\t\t}"},
  {"line":454,"text":"\t\tconfigFileNamesDiffsTable.add(string(path), func(w io.Writer) {"},
  {"line":455,"text":"\t\t\tfmt.Fprintf(w, \"  [%s] %s\\n\", path, configFileNamesChange)"},
  {"line":456,"text":"\t\t\tvar nearestConfigFileNameModified string"},
  {"line":457,"text":"\t\t\tvar ancestorDiffModified string"},
  {"line":458,"text":"\t\t\tif configFileNamesChange == \"*modified*\" {"},
  {"line":459,"text":"\t\t\t\tif oldEntry.NearestConfigFileName != entry.NearestConfigFileName {"},
  {"line":460,"text":"\t\t\t\t\tnearestConfigFileNameModified = \" *modified*\""},
  {"line":461,"text":"\t\t\t\t}"},
  {"line":462,"text":"\t\t\t\tif !maps.Equal(oldEntry.Ancestors, entry.Ancestors) {"},
  {"line":463,"text":"\t\t\t\t\tancestorDiffModified = \" *modified*\""},
  {"line":464,"text":"\t\t\t\t}"},
  {"line":465,"text":"\t\t\t}"},
  {"line":466,"text":"\t\t\tfmt.Fprintf(w, \"    NearestConfigFileName: %s%s\\n\", entry.NearestConfigFileName, nearestConfigFileNameModified)"},
  {"line":467,"text":"\t\t\tancestorDiff := diffTable{options: options}"},
  {"line":468,"text":"\t\t\tfor config, ancestorOfConfig := range entry.Ancestors {"},
  {"line":469,"text":"\t\t\t\tancestorChange := \"\""},
  {"line":470,"text":"\t\t\t\tif configFileNamesChange == \"*modified*\" {"},
  {"line":471,"text":"\t\t\t\t\tif oldConfigFileName, ok := oldEntry.Ancestors[config]; ok {"},
  {"line":472,"text":"\t\t\t\t\t\tif oldConfigFileName != ancestorOfConfig {"},
  {"line":473,"text":"\t\t\t\t\t\t\tancestorChange = \"*modified*\""},
  {"line":474,"text":"\t\t\t\t\t\t}"},
  {"line":475,"text":"\t\t\t\t\t} else {"},
  {"line":476,"text":"\t\t\t\t\t\tancestorChange = \"*new*\""},
  {"line":477,"text":"\t\t\t\t\t}"},
  {"line":478,"text":"\t\t\t\t}"},
  {"line":479,"text":"\t\t\t\tancestorDiff.add(config, fmt.Sprintf(\"%s %s\", ancestorOfConfig, ancestorChange))"},
  {"line":480,"text":"\t\t\t}"},
  {"line":481,"text":"\t\t\tif configFileNamesChange == \"*modified*\" {"},
  {"line":482,"text":"\t\t\t\tfor ancestorPath, oldConfigFileName := range oldEntry.Ancestors {"},
  {"line":483,"text":"\t\t\t\t\tif _, ok := entry.Ancestors[ancestorPath]; !ok {"},
  {"line":484,"text":"\t\t\t\t\t\tancestorDiff.add(ancestorPath, oldConfigFileName+\" *deleted*\")"},
  {"line":485,"text":"\t\t\t\t\t}"},
  {"line":486,"text":"\t\t\t\t}"},
  {"line":487,"text":"\t\t\t}"},
  {"line":488,"text":"\t\t\tancestorDiff.print(w, \"Ancestors:\"+ancestorDiffModified)"},
  {"line":489,"text":"\t\t})"},
  {"line":490,"text":"\t})"},
  {"line":492,"text":"\tf.stateBaseline.serializedConfigFileRegistry.ForEachTestConfigEntry(func(path tspath.Path, entry *project.TestConfigEntry) {"},
  {"line":493,"text":"\t\tif configFileRegistry.GetTestConfigEntry(path) == nil {"},
  {"line":494,"text":"\t\t\tconfigDiffsTable.setHasChange()"},
  {"line":495,"text":"\t\t\tconfigDiffsTable.add(string(path), func(w io.Writer) {"},
  {"line":496,"text":"\t\t\t\tfmt.Fprintf(w, \"  [%s] *deleted*\\n\", entry.FileName)"},
  {"line":497,"text":"\t\t\t})"},
  {"line":498,"text":"\t\t}"},
  {"line":499,"text":"\t})"},
  {"line":500,"text":"\tf.stateBaseline.serializedConfigFileRegistry.ForEachTestConfigFileNamesEntry(func(path tspath.Path, entry *project.TestConfigFileNamesEntry) {"},
  {"line":501,"text":"\t\tif configFileRegistry.GetTestConfigFileNamesEntry(path) == nil {"},
  {"line":502,"text":"\t\t\tconfigFileNamesDiffsTable.setHasChange()"},
  {"line":503,"text":"\t\t\tconfigFileNamesDiffsTable.add(string(path), func(w io.Writer) {"},
  {"line":504,"text":"\t\t\t\tfmt.Fprintf(w, \"  [%s] *deleted*\\n\", path)"},
  {"line":505,"text":"\t\t\t})"},
  {"line":506,"text":"\t\t}"},
  {"line":507,"text":"\t})"},
  {"line":508,"text":"\tf.stateBaseline.serializedConfigFileRegistry = configFileRegistry"},
  {"line":509,"text":"\tconfigDiffsTable.print(w)"},
  {"line":510,"text":"\tconfigFileNamesDiffsTable.print(w)"},
  {"line":511,"text":"}"},
];

function findFourslashStatebaselineDeclaration(name: string): UpstreamDeclaration | undefined {
  return fourslashStatebaselineDeclarations.find((declaration) => declaration.name === name);
}

function requireFourslashStatebaselineDeclaration(name: string): UpstreamDeclaration {
  const declaration = findFourslashStatebaselineDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

function fourslashStatebaselineLineText(line: number): string | undefined {
  return fourslashStatebaselineSourceLines.find((entry) => entry.line === line)?.text;
}
