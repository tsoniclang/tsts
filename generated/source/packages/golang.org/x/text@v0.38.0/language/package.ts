import type { mutualIntelligibility$Storage as mutualIntelligibility__from_language__package_1$Storage, regionIntelligibility$Storage as regionIntelligibility__from_language__package_1$Storage, scriptIntelligibility$Storage as scriptIntelligibility__from_language__package_1$Storage } from "../../../../../modules/golang.org/x/text@v0.38.0/language/tables.js";
import type { Language as Language__from_language } from "../internal/language/package.js";
import type { bool, gostring, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { allSubtags } from "../../../../../modules/golang.org/x/text@v0.38.0/language/coverage.js";
import { All$constant, CLDR$constant, Default$constant, DeprecatedBase$constant, DeprecatedRegion$constant, DeprecatedScript$constant, Exact$constant, High$constant, Legacy$constant, Low$constant, Macro$constant, No$constant, Raw$constant, SuppressScript$constant, Tag } from "../../../../../modules/golang.org/x/text@v0.38.0/language/language.js";
import { init } from "../../../../../modules/golang.org/x/text@v0.38.0/language/match.js";
import { _de$uint16, _en$uint16, _fr$uint16, _it$uint16, _mul$uint16, mutualIntelligibility, regionIntelligibility, scriptIntelligibility } from "../../../../../modules/golang.org/x/text@v0.38.0/language/tables.js";
import { $goInterfaceAdapter$Named_language__package_1$allSubtags as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { $state as $state__compact, Tag as Tag__from_compact } from "../internal/language/compact/package.js";
import { Tag as Tag__from_language } from "../internal/language/package.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import { GoArray } from "@gotots/runtime/array.js";
import { GoMap } from "@gotots/runtime/map.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    All = All$constant();
    CLDR = CLDR$constant();
    Default = Default$constant();
    DeprecatedBase = DeprecatedBase$constant();
    DeprecatedRegion = DeprecatedRegion$constant();
    DeprecatedScript = DeprecatedScript$constant();
    Exact = Exact$constant();
    High = High$constant();
    Legacy = Legacy$constant();
    Low = Low$constant();
    Macro = Macro$constant();
    No = No$constant();
    Raw = Raw$constant();
    SuppressScript = SuppressScript$constant();
    $state.Afrikaans = Tag.$storageOf(Tag.$zero());
    $state.Albanian = Tag.$storageOf(Tag.$zero());
    $state.AmericanEnglish = Tag.$storageOf(Tag.$zero());
    $state.Amharic = Tag.$storageOf(Tag.$zero());
    $state.Arabic = Tag.$storageOf(Tag.$zero());
    $state.Armenian = Tag.$storageOf(Tag.$zero());
    $state.Azerbaijani = Tag.$storageOf(Tag.$zero());
    $state.Bengali = Tag.$storageOf(Tag.$zero());
    $state.BrazilianPortuguese = Tag.$storageOf(Tag.$zero());
    $state.BritishEnglish = Tag.$storageOf(Tag.$zero());
    $state.Bulgarian = Tag.$storageOf(Tag.$zero());
    $state.Burmese = Tag.$storageOf(Tag.$zero());
    $state.CanadianFrench = Tag.$storageOf(Tag.$zero());
    $state.Catalan = Tag.$storageOf(Tag.$zero());
    $state.Chinese = Tag.$storageOf(Tag.$zero());
    $state.Croatian = Tag.$storageOf(Tag.$zero());
    $state.Czech = Tag.$storageOf(Tag.$zero());
    $state.Danish = Tag.$storageOf(Tag.$zero());
    $state.Dutch = Tag.$storageOf(Tag.$zero());
    $state.English = Tag.$storageOf(Tag.$zero());
    $state.ErrMissingLikelyTagsData = void 0;
    $state.Estonian = Tag.$storageOf(Tag.$zero());
    $state.EuropeanPortuguese = Tag.$storageOf(Tag.$zero());
    $state.EuropeanSpanish = Tag.$storageOf(Tag.$zero());
    $state.Filipino = Tag.$storageOf(Tag.$zero());
    $state.Finnish = Tag.$storageOf(Tag.$zero());
    $state.French = Tag.$storageOf(Tag.$zero());
    $state.Georgian = Tag.$storageOf(Tag.$zero());
    $state.German = Tag.$storageOf(Tag.$zero());
    $state.Greek = Tag.$storageOf(Tag.$zero());
    $state.Gujarati = Tag.$storageOf(Tag.$zero());
    $state.Hebrew = Tag.$storageOf(Tag.$zero());
    $state.Hindi = Tag.$storageOf(Tag.$zero());
    $state.Hungarian = Tag.$storageOf(Tag.$zero());
    $state.Icelandic = Tag.$storageOf(Tag.$zero());
    $state.Indonesian = Tag.$storageOf(Tag.$zero());
    $state.Italian = Tag.$storageOf(Tag.$zero());
    $state.Japanese = Tag.$storageOf(Tag.$zero());
    $state.Kannada = Tag.$storageOf(Tag.$zero());
    $state.Kazakh = Tag.$storageOf(Tag.$zero());
    $state.Khmer = Tag.$storageOf(Tag.$zero());
    $state.Kirghiz = Tag.$storageOf(Tag.$zero());
    $state.Korean = Tag.$storageOf(Tag.$zero());
    $state.Lao = Tag.$storageOf(Tag.$zero());
    $state.LatinAmericanSpanish = Tag.$storageOf(Tag.$zero());
    $state.Latvian = Tag.$storageOf(Tag.$zero());
    $state.Lithuanian = Tag.$storageOf(Tag.$zero());
    $state.Macedonian = Tag.$storageOf(Tag.$zero());
    $state.Malay = Tag.$storageOf(Tag.$zero());
    $state.Malayalam = Tag.$storageOf(Tag.$zero());
    $state.Marathi = Tag.$storageOf(Tag.$zero());
    $state.ModernStandardArabic = Tag.$storageOf(Tag.$zero());
    $state.Mongolian = Tag.$storageOf(Tag.$zero());
    $state.Nepali = Tag.$storageOf(Tag.$zero());
    $state.Norwegian = Tag.$storageOf(Tag.$zero());
    $state.Persian = Tag.$storageOf(Tag.$zero());
    $state.Polish = Tag.$storageOf(Tag.$zero());
    $state.Portuguese = Tag.$storageOf(Tag.$zero());
    $state.Punjabi = Tag.$storageOf(Tag.$zero());
    $state.Romanian = Tag.$storageOf(Tag.$zero());
    $state.Russian = Tag.$storageOf(Tag.$zero());
    $state.Serbian = Tag.$storageOf(Tag.$zero());
    $state.SerbianLatin = Tag.$storageOf(Tag.$zero());
    $state.SimplifiedChinese = Tag.$storageOf(Tag.$zero());
    $state.Sinhala = Tag.$storageOf(Tag.$zero());
    $state.Slovak = Tag.$storageOf(Tag.$zero());
    $state.Slovenian = Tag.$storageOf(Tag.$zero());
    $state.Spanish = Tag.$storageOf(Tag.$zero());
    $state.Supported = void 0;
    $state.Swahili = Tag.$storageOf(Tag.$zero());
    $state.Swedish = Tag.$storageOf(Tag.$zero());
    $state.Tamil = Tag.$storageOf(Tag.$zero());
    $state.Telugu = Tag.$storageOf(Tag.$zero());
    $state.Thai = Tag.$storageOf(Tag.$zero());
    $state.TraditionalChinese = Tag.$storageOf(Tag.$zero());
    $state.Turkish = Tag.$storageOf(Tag.$zero());
    $state.Ukrainian = Tag.$storageOf(Tag.$zero());
    $state.Und = Tag.$storageOf(Tag.$zero());
    $state.Urdu = Tag.$storageOf(Tag.$zero());
    $state.Uzbek = Tag.$storageOf(Tag.$zero());
    $state.Vietnamese = Tag.$storageOf(Tag.$zero());
    $state.Zulu = Tag.$storageOf(Tag.$zero());
    $state.acceptFallback = GoMap.nil<gostring, Language__from_language>(0);
    $state.confName = RuntimeSlice.nil<gostring>();
    $state.errInvalidArgument = void 0;
    $state.errInvalidWeight = void 0;
    $state.errTagListTooLarge = void 0;
    $state.matchLang = RuntimeSlice.nil<mutualIntelligibility__from_language__package_1$Storage>();
    $state.matchRegion = RuntimeSlice.nil<regionIntelligibility__from_language__package_1$Storage>();
    $state.matchScript = RuntimeSlice.nil<scriptIntelligibility__from_language__package_1$Storage>();
    $state.notEquivalent = RuntimeSlice.nil<Language__from_language>();
    $state.paradigmLocales = RuntimeSlice.nil<GoArray<uint16, 3>>();
    $state.regionToGroups = RuntimeSlice.nil<uint8>();
    $state.root = Tag__from_language.$storageOf(Tag__from_language.$zero());
    $state.und = Tag.$storageOf(Tag.$zero());
    {
        $state.Supported = new GoInterfaceAdapter(new allSubtags);
    }
    {
        $state.confName = RuntimeSlice.literal<gostring>(["No", "Low", "High", "Exact"]);
    }
    {
        const __gotots_struct_0 = Tag__from_language.$zero();
        $state.root = Tag__from_language.$storageOf(__gotots_struct_0);
    }
    {
        $state.ErrMissingLikelyTagsData = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("missing likely tags data"));
    }
    {
        $state.errInvalidArgument = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("invalid Extension or Variant"));
    }
    {
        $state.errInvalidWeight = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("ParseAcceptLanguage: invalid weight"));
    }
    {
        $state.errTagListTooLarge = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("tag list exceeds max length"));
    }
    {
        $state.acceptFallback = GoMap.make<gostring, Language__from_language>(0, 5, [["english", _en$uint16], ["deutsch", _de$uint16], ["italian", _it$uint16], ["french", _fr$uint16], ["*", _mul$uint16]]);
    }
    {
        $state.regionToGroups = RuntimeSlice.literal<uint8>([0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 4, 1, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 8, 0, 4, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 4, 1, 0, 4, 2, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 4, 0, 1, 0, 0, 0, 0, 0, 2, 1, 4, 8, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 4, 0, 5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 0, 5, 4, 0, 0, 4, 0, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    {
        const __gotots_slice_build_0 = goSliceAllocate<GoArray<uint16, 3>>(3, null);
        for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
            __gotots_slice_build_0.$initialize(__gotots_slice_build_1, GoArray.zero<uint16, 3>(3, 0));
        }
        const __gotots_slice_receiver_0 = __gotots_slice_build_0;
        __gotots_slice_receiver_0.set(0, GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [313, 0, 124]));
        __gotots_slice_receiver_0.set(1, GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [318, 0, 31]));
        __gotots_slice_receiver_0.set(2, GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [960, 65, 239]));
        $state.paradigmLocales = __gotots_slice_receiver_0;
    }
    {
        const __gotots_slice_build_2 = goSliceAllocate<mutualIntelligibility__from_language__package_1$Storage>(113, null);
        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2.capacity; __gotots_slice_build_3++) {
            __gotots_slice_build_2.$initialize(__gotots_slice_build_3, mutualIntelligibility.$storageOf(mutualIntelligibility.$zero()));
        }
        const __gotots_slice_receiver_1 = __gotots_slice_build_2;
        __gotots_slice_receiver_1.set(0, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 465,
            have: 183,
            distance: 4,
            oneway: false
        })));
        __gotots_slice_receiver_1.set(1, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1031,
            have: 183,
            distance: 4,
            oneway: false
        })));
        __gotots_slice_receiver_1.set(2, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1031,
            have: 465,
            distance: 4,
            oneway: false
        })));
        __gotots_slice_receiver_1.set(3, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1031,
            have: 1074,
            distance: 4,
            oneway: false
        })));
        __gotots_slice_receiver_1.set(4, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1082,
            have: 1,
            distance: 4,
            oneway: false
        })));
        __gotots_slice_receiver_1.set(5, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 419,
            have: 269,
            distance: 4,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(6, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 661,
            have: 269,
            distance: 4,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(7, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 257,
            have: 879,
            distance: 8,
            oneway: false
        })));
        __gotots_slice_receiver_1.set(8, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 257,
            have: 839,
            distance: 8,
            oneway: false
        })));
        __gotots_slice_receiver_1.set(9, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 5,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(10, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 13,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(11, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 22,
            have: 871,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(12, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 33,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(13, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 86,
            have: 318,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(14, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 88,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(15, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 113,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(16, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 117,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(17, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 130,
            have: 446,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(18, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 165,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(19, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 178,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(20, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 221,
            have: 339,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(21, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 229,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(22, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 233,
            have: 58,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(23, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 240,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(24, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 249,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(25, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 256,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(26, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 304,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(27, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 316,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(28, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 320,
            have: 337,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(29, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 325,
            have: 318,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(30, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 344,
            have: 257,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(31, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 365,
            have: 871,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(32, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 366,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(33, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 367,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(34, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 382,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(35, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 400,
            have: 318,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(36, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 404,
            have: 318,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(37, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 420,
            have: 446,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(38, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 436,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(39, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 440,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(40, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 468,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(41, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 471,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(42, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 473,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(43, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 487,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(44, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 504,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(45, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 526,
            have: 481,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(46, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 528,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(47, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 557,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(48, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 578,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(49, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 586,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(50, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 593,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(51, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 613,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(52, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 628,
            have: 1162,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(53, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 650,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(54, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 654,
            have: 505,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(55, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 675,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(56, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 693,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(57, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 696,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(58, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 702,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(59, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 707,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(60, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 749,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(61, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 753,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(62, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 762,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(63, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 767,
            have: 126,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(64, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 772,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(65, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 779,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(66, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 795,
            have: 446,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(67, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 799,
            have: 481,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(68, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 800,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(69, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 817,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(70, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 849,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(71, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 874,
            have: 839,
            distance: 10,
            oneway: false
        })));
        __gotots_slice_receiver_1.set(72, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 874,
            have: 879,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(73, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 890,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(74, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 903,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(75, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 905,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(76, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 907,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(77, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 912,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(78, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 917,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(79, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 925,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(80, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 933,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(81, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 958,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(82, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 964,
            have: 318,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(83, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 980,
            have: 269,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(84, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 985,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(85, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 997,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(86, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1001,
            have: 446,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(87, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1018,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(88, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1036,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(89, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1059,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(90, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1065,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(91, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1073,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(92, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1083,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(93, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1086,
            have: 481,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(94, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1093,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(95, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1104,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(96, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1121,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(97, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1127,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(98, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1135,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(99, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1142,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(100, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 14467,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(101, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1152,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(102, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1154,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(103, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1172,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(104, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1181,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(105, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1196,
            have: 1321,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(106, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1204,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(107, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1212,
            have: 994,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(108, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1253,
            have: 350,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(109, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1266,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(110, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1298,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(111, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1304,
            have: 313,
            distance: 10,
            oneway: true
        })));
        __gotots_slice_receiver_1.set(112, mutualIntelligibility.$storageOf(mutualIntelligibility.$fromStorage({
            want: 1327,
            have: 313,
            distance: 10,
            oneway: true
        })));
        $state.matchLang = __gotots_slice_receiver_1;
    }
    {
        const __gotots_slice_build_4 = goSliceAllocate<scriptIntelligibility__from_language__package_1$Storage>(26, null);
        for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_4.capacity; __gotots_slice_build_5++) {
            __gotots_slice_build_4.$initialize(__gotots_slice_build_5, scriptIntelligibility.$storageOf(scriptIntelligibility.$zero()));
        }
        const __gotots_slice_receiver_2 = __gotots_slice_build_4;
        __gotots_slice_receiver_2.set(0, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1074,
            haveLang: 1074,
            wantScript: 91,
            haveScript: 32,
            distance: 5
        })));
        __gotots_slice_receiver_2.set(1, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1074,
            haveLang: 1074,
            wantScript: 32,
            haveScript: 91,
            distance: 5
        })));
        __gotots_slice_receiver_2.set(2, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 88,
            haveLang: 994,
            wantScript: 91,
            haveScript: 32,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(3, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 165,
            haveLang: 313,
            wantScript: 14,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(4, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 471,
            haveLang: 994,
            wantScript: 8,
            haveScript: 32,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(5, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 528,
            haveLang: 313,
            wantScript: 46,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(6, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 586,
            haveLang: 313,
            wantScript: 79,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(7, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 593,
            haveLang: 313,
            wantScript: 83,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(8, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 696,
            haveLang: 313,
            wantScript: 88,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(9, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 772,
            haveLang: 313,
            wantScript: 111,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(10, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 817,
            haveLang: 313,
            wantScript: 118,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(11, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 849,
            haveLang: 313,
            wantScript: 34,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(12, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 917,
            haveLang: 313,
            wantScript: 131,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(13, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 925,
            haveLang: 313,
            wantScript: 54,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(14, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 958,
            haveLang: 313,
            wantScript: 5,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(15, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1018,
            haveLang: 313,
            wantScript: 5,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(16, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1036,
            haveLang: 313,
            wantScript: 214,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(17, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1104,
            haveLang: 313,
            wantScript: 230,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(18, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1121,
            haveLang: 313,
            wantScript: 233,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(19, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1135,
            haveLang: 313,
            wantScript: 44,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(20, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1142,
            haveLang: 994,
            wantScript: 91,
            haveScript: 32,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(21, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1204,
            haveLang: 313,
            wantScript: 5,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(22, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1212,
            haveLang: 994,
            wantScript: 91,
            haveScript: 32,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(23, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1298,
            haveLang: 313,
            wantScript: 62,
            haveScript: 91,
            distance: 10
        })));
        __gotots_slice_receiver_2.set(24, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1321,
            haveLang: 1321,
            wantScript: 59,
            haveScript: 60,
            distance: 15
        })));
        __gotots_slice_receiver_2.set(25, scriptIntelligibility.$storageOf(scriptIntelligibility.$fromStorage({
            wantLang: 1321,
            haveLang: 1321,
            wantScript: 60,
            haveScript: 59,
            distance: 19
        })));
        $state.matchScript = __gotots_slice_receiver_2;
    }
    {
        const __gotots_slice_build_6 = goSliceAllocate<regionIntelligibility__from_language__package_1$Storage>(15, null);
        for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_6.capacity; __gotots_slice_build_7++) {
            __gotots_slice_build_6.$initialize(__gotots_slice_build_7, regionIntelligibility.$storageOf(regionIntelligibility.$zero()));
        }
        const __gotots_slice_receiver_3 = __gotots_slice_build_6;
        __gotots_slice_receiver_3.set(0, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 58,
            script: 0,
            group: 4,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(1, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 58,
            script: 0,
            group: 132,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(2, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 313,
            script: 0,
            group: 1,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(3, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 313,
            script: 0,
            group: 129,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(4, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 318,
            script: 0,
            group: 3,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(5, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 318,
            script: 0,
            group: 131,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(6, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 960,
            script: 0,
            group: 3,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(7, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 960,
            script: 0,
            group: 131,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(8, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 1321,
            script: 60,
            group: 2,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(9, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 1321,
            script: 60,
            group: 130,
            distance: 4
        })));
        __gotots_slice_receiver_3.set(10, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 58,
            script: 0,
            group: 128,
            distance: 5
        })));
        __gotots_slice_receiver_3.set(11, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 313,
            script: 0,
            group: 128,
            distance: 5
        })));
        __gotots_slice_receiver_3.set(12, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 318,
            script: 0,
            group: 128,
            distance: 5
        })));
        __gotots_slice_receiver_3.set(13, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 960,
            script: 0,
            group: 128,
            distance: 5
        })));
        __gotots_slice_receiver_3.set(14, regionIntelligibility.$storageOf(regionIntelligibility.$fromStorage({
            lang: 1321,
            script: 60,
            group: 128,
            distance: 5
        })));
        $state.matchRegion = __gotots_slice_receiver_3;
    }
    {
        const __gotots_struct_1 = Tag.$zero();
        $state.und = Tag.$storageOf(__gotots_struct_1);
    }
    {
        const __gotots_struct_2 = Tag.$zero();
        $state.Und = Tag.$storageOf(__gotots_struct_2);
    }
    {
        $state.Afrikaans = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Afrikaans)))));
    }
    {
        $state.Amharic = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Amharic)))));
    }
    {
        $state.Arabic = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Arabic)))));
    }
    {
        $state.ModernStandardArabic = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.ModernStandardArabic)))));
    }
    {
        $state.Azerbaijani = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Azerbaijani)))));
    }
    {
        $state.Bulgarian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Bulgarian)))));
    }
    {
        $state.Bengali = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Bengali)))));
    }
    {
        $state.Catalan = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Catalan)))));
    }
    {
        $state.Czech = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Czech)))));
    }
    {
        $state.Danish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Danish)))));
    }
    {
        $state.German = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.German)))));
    }
    {
        $state.Greek = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Greek)))));
    }
    {
        $state.English = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.English)))));
    }
    {
        $state.AmericanEnglish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.AmericanEnglish)))));
    }
    {
        $state.BritishEnglish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.BritishEnglish)))));
    }
    {
        $state.Spanish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Spanish)))));
    }
    {
        $state.EuropeanSpanish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.EuropeanSpanish)))));
    }
    {
        $state.LatinAmericanSpanish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.LatinAmericanSpanish)))));
    }
    {
        $state.Estonian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Estonian)))));
    }
    {
        $state.Persian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Persian)))));
    }
    {
        $state.Finnish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Finnish)))));
    }
    {
        $state.Filipino = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Filipino)))));
    }
    {
        $state.French = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.French)))));
    }
    {
        $state.CanadianFrench = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.CanadianFrench)))));
    }
    {
        $state.Gujarati = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Gujarati)))));
    }
    {
        $state.Hebrew = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Hebrew)))));
    }
    {
        $state.Hindi = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Hindi)))));
    }
    {
        $state.Croatian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Croatian)))));
    }
    {
        $state.Hungarian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Hungarian)))));
    }
    {
        $state.Armenian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Armenian)))));
    }
    {
        $state.Indonesian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Indonesian)))));
    }
    {
        $state.Icelandic = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Icelandic)))));
    }
    {
        $state.Italian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Italian)))));
    }
    {
        $state.Japanese = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Japanese)))));
    }
    {
        $state.Georgian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Georgian)))));
    }
    {
        $state.Kazakh = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Kazakh)))));
    }
    {
        $state.Khmer = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Khmer)))));
    }
    {
        $state.Kannada = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Kannada)))));
    }
    {
        $state.Korean = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Korean)))));
    }
    {
        $state.Kirghiz = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Kirghiz)))));
    }
    {
        $state.Lao = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Lao)))));
    }
    {
        $state.Lithuanian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Lithuanian)))));
    }
    {
        $state.Latvian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Latvian)))));
    }
    {
        $state.Macedonian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Macedonian)))));
    }
    {
        $state.Malayalam = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Malayalam)))));
    }
    {
        $state.Mongolian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Mongolian)))));
    }
    {
        $state.Marathi = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Marathi)))));
    }
    {
        $state.Malay = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Malay)))));
    }
    {
        $state.Burmese = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Burmese)))));
    }
    {
        $state.Nepali = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Nepali)))));
    }
    {
        $state.Dutch = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Dutch)))));
    }
    {
        $state.Norwegian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Norwegian)))));
    }
    {
        $state.Punjabi = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Punjabi)))));
    }
    {
        $state.Polish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Polish)))));
    }
    {
        $state.Portuguese = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Portuguese)))));
    }
    {
        $state.BrazilianPortuguese = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.BrazilianPortuguese)))));
    }
    {
        $state.EuropeanPortuguese = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.EuropeanPortuguese)))));
    }
    {
        $state.Romanian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Romanian)))));
    }
    {
        $state.Russian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Russian)))));
    }
    {
        $state.Sinhala = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Sinhala)))));
    }
    {
        $state.Slovak = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Slovak)))));
    }
    {
        $state.Slovenian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Slovenian)))));
    }
    {
        $state.Albanian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Albanian)))));
    }
    {
        $state.Serbian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Serbian)))));
    }
    {
        $state.SerbianLatin = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.SerbianLatin)))));
    }
    {
        $state.Swedish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Swedish)))));
    }
    {
        $state.Swahili = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Swahili)))));
    }
    {
        $state.Tamil = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Tamil)))));
    }
    {
        $state.Telugu = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Telugu)))));
    }
    {
        $state.Thai = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Thai)))));
    }
    {
        $state.Turkish = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Turkish)))));
    }
    {
        $state.Ukrainian = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Ukrainian)))));
    }
    {
        $state.Urdu = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Urdu)))));
    }
    {
        $state.Uzbek = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Uzbek)))));
    }
    {
        $state.Vietnamese = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Vietnamese)))));
    }
    {
        $state.Chinese = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Chinese)))));
    }
    {
        $state.SimplifiedChinese = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.SimplifiedChinese)))));
    }
    {
        $state.TraditionalChinese = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.TraditionalChinese)))));
    }
    {
        $state.Zulu = Tag.$storageOf(Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Zulu)))));
    }
    init();
}
export { Coverage, Coverage$contract, Coverage$is } from "../../../../../modules/golang.org/x/text@v0.38.0/language/coverage.js";
export { All$constant, Base, Base$Storage, CLDR$constant, CanonType, Confidence, Default$constant, DeprecatedBase$constant, DeprecatedRegion$constant, DeprecatedScript$constant, Exact$constant, Extension, Extension$Storage, High$constant, Legacy$constant, Low$constant, Macro$constant, No$constant, Raw$constant, Region, Region$Storage, Script, Script$Storage, SuppressScript$constant, Tag, Tag$Storage, Variant, Variant$Storage } from "../../../../../modules/golang.org/x/text@v0.38.0/language/language.js";
export { MatchOption, Matcher, Matcher$contract, Matcher$is, NewMatcher } from "../../../../../modules/golang.org/x/text@v0.38.0/language/match.js";
export { Parse } from "../../../../../modules/golang.org/x/text@v0.38.0/language/parse.js";
export { MustParse } from "../../../../../modules/golang.org/x/text@v0.38.0/language/tags.js";
export let All: ReturnType<typeof All$constant>;
export let CLDR: ReturnType<typeof CLDR$constant>;
export let Default: ReturnType<typeof Default$constant>;
export let DeprecatedBase: ReturnType<typeof DeprecatedBase$constant>;
export let DeprecatedRegion: ReturnType<typeof DeprecatedRegion$constant>;
export let DeprecatedScript: ReturnType<typeof DeprecatedScript$constant>;
export let Exact: ReturnType<typeof Exact$constant>;
export let High: ReturnType<typeof High$constant>;
export let Legacy: ReturnType<typeof Legacy$constant>;
export let Low: ReturnType<typeof Low$constant>;
export let Macro: ReturnType<typeof Macro$constant>;
export let No: ReturnType<typeof No$constant>;
export let Raw: ReturnType<typeof Raw$constant>;
export let SuppressScript: ReturnType<typeof SuppressScript$constant>;
export { $state };
