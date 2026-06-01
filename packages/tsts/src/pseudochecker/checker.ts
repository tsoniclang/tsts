import type { Node } from "../ast/index.js";

import {
  getReturnTypeOfSignature,
  getTypeOfAccessor,
  getTypeOfDeclaration,
  getTypeOfExpression,
} from "./lookup.js";
import type { PseudoType } from "./type.js";

export interface PseudoCheckerState {
  readonly strictNullChecks: boolean;
  readonly exactOptionalPropertyTypes: boolean;
}

export class PseudoChecker implements PseudoCheckerState {
  readonly strictNullChecks: boolean;
  readonly exactOptionalPropertyTypes: boolean;

  constructor(strictNullChecks: boolean, exactOptionalPropertyTypes: boolean) {
    this.strictNullChecks = strictNullChecks;
    this.exactOptionalPropertyTypes = exactOptionalPropertyTypes;
  }

  getReturnTypeOfSignature(signatureNode: Node): PseudoType {
    return getReturnTypeOfSignature(this, signatureNode);
  }

  getTypeOfAccessor(accessor: Node): PseudoType {
    return getTypeOfAccessor(this, accessor);
  }

  getTypeOfExpression(node: Node): PseudoType {
    return getTypeOfExpression(this, node);
  }

  getTypeOfDeclaration(node: Node): PseudoType {
    return getTypeOfDeclaration(this, node);
  }
}

export function newPseudoChecker(strictNullChecks: boolean, exactOptionalPropertyTypes: boolean): PseudoChecker {
  return new PseudoChecker(strictNullChecks, exactOptionalPropertyTypes);
}

