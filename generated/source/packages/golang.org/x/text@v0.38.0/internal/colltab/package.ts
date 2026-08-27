import { Identity$constant, Quaternary$constant, Secondary$constant, Tertiary$constant } from "../../../../../../modules/golang.org/x/text@v0.38.0/internal/colltab/collelem.js";
export function $initialize(): void {
    Identity = Identity$constant();
    Quaternary = Quaternary$constant();
    Secondary = Secondary$constant();
    Tertiary = Tertiary$constant();
}
export { Elem, Elem_CCC, Elem_Primary, Elem_Quaternary, Elem_Secondary, Elem_Tertiary, Identity$constant, Ignore$uint32, Level, MakeElem, MaxQuaternary$int, Quaternary$constant, Secondary$constant, Tertiary$constant } from "../../../../../../modules/golang.org/x/text@v0.38.0/internal/colltab/collelem.js";
export { MatchLang } from "../../../../../../modules/golang.org/x/text@v0.38.0/internal/colltab/colltab.js";
export { ContractTrieSet } from "../../../../../../modules/golang.org/x/text@v0.38.0/internal/colltab/contract.js";
export { Iter, Iter$Storage } from "../../../../../../modules/golang.org/x/text@v0.38.0/internal/colltab/iter.js";
export { NewNumericWeighter } from "../../../../../../modules/golang.org/x/text@v0.38.0/internal/colltab/numeric.js";
export { Table } from "../../../../../../modules/golang.org/x/text@v0.38.0/internal/colltab/table.js";
export { Trie } from "../../../../../../modules/golang.org/x/text@v0.38.0/internal/colltab/trie.js";
export { Weighter, Weighter$contract, Weighter$is } from "../../../../../../modules/golang.org/x/text@v0.38.0/internal/colltab/weighter.js";
export let Identity: ReturnType<typeof Identity$constant>;
export let Quaternary: ReturnType<typeof Quaternary$constant>;
export let Secondary: ReturnType<typeof Secondary$constant>;
export let Tertiary: ReturnType<typeof Tertiary$constant>;
