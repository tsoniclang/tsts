import { test } from "node:test";
import assert from "node:assert/strict";
import type { GoPtr, GoRef, GoSlice } from "../../go/compat.js";
import { NodeFactory_NewNodeList } from "../ast/spine.js";
import { NewOrderedMapWithSizeHint } from "../collections/ordered_map.js";
import { NewClassDeclaration, NewEmptyStatement, NewIdentifier, NewSyntaxList } from "../ast/generated/factory.js";
import type { Statement } from "../ast/generated/unions.js";
import { NewEmitContext } from "../printer/emitcontext.js";
import {
  classFieldsTransformer_addPendingExpressions,
  classFieldsTransformer_addPropertyOrClassStaticBlockStatements,
  classFieldsTransformer_generateInitializedPropertyExpressionsOrClassStaticBlock,
  classFieldsTransformer_getPrivateInstanceMethodsAndAccessors,
  classFieldsTransformer_getProperties,
  classFieldsTransformer_getStaticPropertiesAndClassStaticBlock,
  type classFieldsTransformer,
} from "./estransforms/classfields.js";
import { esDecoratorTransformer_prepareConstructor, esDecoratorTransformer_transformAllDecoratorsOfDeclaration, type classInfo } from "./estransforms/esdecorator.js";
import { objectRestSpreadTransformer_chunkObjectLiteralElements } from "./estransforms/objectrestspread.js";
import { usingDeclarationTransformer_hoistImportOrExportOrHoistedDeclaration } from "./estransforms/using.js";
import {
  LegacyDecoratorsTransformer_generateClassElementDecorationExpressions,
  LegacyDecoratorsTransformer_getClassElementDecorationStatements,
  LegacyDecoratorsTransformer_transformAllDecoratorsOfDeclaration,
  LegacyDecoratorsTransformer_transformDecoratorsOfClassElements,
  LegacyDecoratorsTransformer_transformDecorators,
  LegacyDecoratorsTransformer_transformDecoratorsOfParameters,
} from "./tstransforms/legacydecorators.js";
import { MetadataTransformer_getTypeMetadata, type MetadataTransformer } from "./tstransforms/metadata.js";
import type { ClassDeclaration } from "../ast/generated/data.js";
import { FindSuperStatementIndexPath } from "./utilities.js";
import { flattenSyntaxLists, nodeOrSyntaxListChildren } from "./declarations/transform.js";

test("object-rest chunking returns Go nil before consulting transformer state", () => {
  const context = NewEmitContext();
  const factory = context!.Factory!.AsNodeFactory();
  assert.equal(objectRestSpreadTransformer_chunkObjectLiteralElements(undefined, undefined), undefined);
  assert.equal(objectRestSpreadTransformer_chunkObjectLiteralElements(undefined, NodeFactory_NewNodeList(factory, undefined)), undefined);
  assert.equal(objectRestSpreadTransformer_chunkObjectLiteralElements(undefined, NodeFactory_NewNodeList(factory, [])), undefined);
});

test("ES decorator nil paths do not allocate or consult transformer state", () => {
  const noInitializers: classInfo = {
    class: undefined,
    classDecoratorsName: undefined,
    classDescriptorName: undefined,
    classExtraInitializersName: undefined,
    classThis: undefined,
    classSuper: undefined,
    metadataReference: undefined,
    memberInfos: NewOrderedMapWithSizeHint(0)!,
    instanceMethodExtraInitializersName: undefined,
    staticMethodExtraInitializersName: undefined,
    staticNonFieldDecorationStatements: undefined,
    nonStaticNonFieldDecorationStatements: undefined,
    staticFieldDecorationStatements: undefined,
    nonStaticFieldDecorationStatements: undefined,
    hasStaticInitializers: false,
    hasNonAmbientInstanceFields: false,
    hasStaticPrivateClassElements: false,
    pendingStaticInitializers: undefined,
    pendingInstanceInitializers: undefined,
  };
  assert.equal(esDecoratorTransformer_transformAllDecoratorsOfDeclaration(undefined, undefined), undefined);
  assert.equal(esDecoratorTransformer_transformAllDecoratorsOfDeclaration(undefined, []), undefined);
  assert.equal(esDecoratorTransformer_prepareConstructor(undefined, noInitializers), undefined);
  noInitializers.pendingInstanceInitializers = [];
  assert.equal(esDecoratorTransformer_prepareConstructor(undefined, noInitializers), undefined);
});

test("legacy decorator nil accumulators stay nil", () => {
  assert.equal(LegacyDecoratorsTransformer_transformAllDecoratorsOfDeclaration(undefined, undefined), undefined);
  assert.equal(LegacyDecoratorsTransformer_transformDecorators(undefined, undefined), undefined);
  assert.equal(LegacyDecoratorsTransformer_transformDecorators(undefined, []), undefined);
  assert.equal(LegacyDecoratorsTransformer_transformDecoratorsOfParameters(undefined, undefined), undefined);
  assert.equal(LegacyDecoratorsTransformer_transformDecoratorsOfParameters(undefined, []), undefined);

  const undecoratedClass = { Members: undefined } as ClassDeclaration;
  assert.equal(LegacyDecoratorsTransformer_generateClassElementDecorationExpressions(undefined, undecoratedClass, false), undefined);
  assert.equal(LegacyDecoratorsTransformer_getClassElementDecorationStatements(undefined, undecoratedClass, false), undefined);
  assert.deepEqual(
    LegacyDecoratorsTransformer_transformDecoratorsOfClassElements(undefined, undecoratedClass, undefined),
    [undefined, undefined],
  );
});

test("metadata-disabled decorator path returns Go nil before visiting a node", () => {
  assert.equal(
    MetadataTransformer_getTypeMetadata({ legacyDecorators: false } as MetadataTransformer, undefined, undefined),
    undefined,
  );
});

test("super-path search returns Go nil for nil and allocated-empty statements", () => {
  assert.equal(FindSuperStatementIndexPath(undefined, 0), undefined);
  assert.equal(FindSuperStatementIndexPath([], 0), undefined);
});

test("class-field collectors preserve allocated and nil empty results", () => {
  const context = NewEmitContext();
  const factory = context!.Factory!.AsNodeFactory();
  const members: GoSlice<never> = [];
  const classNode = NewClassDeclaration(
    factory,
    undefined,
    NewIdentifier(factory, "Empty"),
    undefined,
    undefined,
    NodeFactory_NewNodeList(factory, members),
  );

  assert.equal(classFieldsTransformer_getPrivateInstanceMethodsAndAccessors(undefined, classNode), members);
  assert.equal(classFieldsTransformer_getProperties(undefined, classNode, false, false), undefined);
  assert.equal(classFieldsTransformer_getStaticPropertiesAndClassStaticBlock(undefined, classNode), undefined);
});

test("class-field nil accumulators stay nil until a transformed item is appended", () => {
  assert.equal(classFieldsTransformer_addPropertyOrClassStaticBlockStatements(undefined, undefined, undefined, undefined), undefined);
  const allocated: GoSlice<never> = [];
  assert.equal(classFieldsTransformer_addPropertyOrClassStaticBlockStatements(undefined, allocated, undefined, undefined), allocated);
  assert.equal(classFieldsTransformer_generateInitializedPropertyExpressionsOrClassStaticBlock(undefined, undefined, undefined), undefined);
});

test("class-field pending expressions preserve nil on an empty append", () => {
  const transformer = { pendingExpressions: undefined } as classFieldsTransformer;

  classFieldsTransformer_addPendingExpressions(transformer);
  assert.equal(transformer.pendingExpressions, undefined);

  classFieldsTransformer_addPendingExpressions(transformer, undefined);
  assert.deepEqual(transformer.pendingExpressions, [undefined]);
});

test("using-declaration hoisting mutates a nonnil pointer to a nil slice", () => {
  const context = NewEmitContext();
  const statement = NewEmptyStatement(context!.Factory!.AsNodeFactory()) as GoPtr<Statement>;
  const topLevelStatements: GoRef<GoPtr<GoSlice<GoPtr<Statement>>>> = { v: undefined };

  usingDeclarationTransformer_hoistImportOrExportOrHoistedDeclaration(
    undefined,
    statement,
    topLevelStatements,
  );

  assert.deepEqual(topLevelStatements.v, [statement]);
});

test("declaration syntax-list flattening preserves nil children", () => {
  const context = NewEmitContext();
  const syntaxList = NewSyntaxList(context!.Factory!.AsNodeFactory(), undefined);

  assert.equal(nodeOrSyntaxListChildren(syntaxList), undefined);
  assert.equal(flattenSyntaxLists([syntaxList]), undefined);
});
