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
    $state.Afrikaans = Tag.$zeroStorage();
    $state.Albanian = Tag.$zeroStorage();
    $state.AmericanEnglish = Tag.$zeroStorage();
    $state.Amharic = Tag.$zeroStorage();
    $state.Arabic = Tag.$zeroStorage();
    $state.Armenian = Tag.$zeroStorage();
    $state.Azerbaijani = Tag.$zeroStorage();
    $state.Bengali = Tag.$zeroStorage();
    $state.BrazilianPortuguese = Tag.$zeroStorage();
    $state.BritishEnglish = Tag.$zeroStorage();
    $state.Bulgarian = Tag.$zeroStorage();
    $state.Burmese = Tag.$zeroStorage();
    $state.CanadianFrench = Tag.$zeroStorage();
    $state.Catalan = Tag.$zeroStorage();
    $state.Chinese = Tag.$zeroStorage();
    $state.Croatian = Tag.$zeroStorage();
    $state.Czech = Tag.$zeroStorage();
    $state.Danish = Tag.$zeroStorage();
    $state.Dutch = Tag.$zeroStorage();
    $state.English = Tag.$zeroStorage();
    $state.ErrMissingLikelyTagsData = void 0;
    $state.Estonian = Tag.$zeroStorage();
    $state.EuropeanPortuguese = Tag.$zeroStorage();
    $state.EuropeanSpanish = Tag.$zeroStorage();
    $state.Filipino = Tag.$zeroStorage();
    $state.Finnish = Tag.$zeroStorage();
    $state.French = Tag.$zeroStorage();
    $state.Georgian = Tag.$zeroStorage();
    $state.German = Tag.$zeroStorage();
    $state.Greek = Tag.$zeroStorage();
    $state.Gujarati = Tag.$zeroStorage();
    $state.Hebrew = Tag.$zeroStorage();
    $state.Hindi = Tag.$zeroStorage();
    $state.Hungarian = Tag.$zeroStorage();
    $state.Icelandic = Tag.$zeroStorage();
    $state.Indonesian = Tag.$zeroStorage();
    $state.Italian = Tag.$zeroStorage();
    $state.Japanese = Tag.$zeroStorage();
    $state.Kannada = Tag.$zeroStorage();
    $state.Kazakh = Tag.$zeroStorage();
    $state.Khmer = Tag.$zeroStorage();
    $state.Kirghiz = Tag.$zeroStorage();
    $state.Korean = Tag.$zeroStorage();
    $state.Lao = Tag.$zeroStorage();
    $state.LatinAmericanSpanish = Tag.$zeroStorage();
    $state.Latvian = Tag.$zeroStorage();
    $state.Lithuanian = Tag.$zeroStorage();
    $state.Macedonian = Tag.$zeroStorage();
    $state.Malay = Tag.$zeroStorage();
    $state.Malayalam = Tag.$zeroStorage();
    $state.Marathi = Tag.$zeroStorage();
    $state.ModernStandardArabic = Tag.$zeroStorage();
    $state.Mongolian = Tag.$zeroStorage();
    $state.Nepali = Tag.$zeroStorage();
    $state.Norwegian = Tag.$zeroStorage();
    $state.Persian = Tag.$zeroStorage();
    $state.Polish = Tag.$zeroStorage();
    $state.Portuguese = Tag.$zeroStorage();
    $state.Punjabi = Tag.$zeroStorage();
    $state.Romanian = Tag.$zeroStorage();
    $state.Russian = Tag.$zeroStorage();
    $state.Serbian = Tag.$zeroStorage();
    $state.SerbianLatin = Tag.$zeroStorage();
    $state.SimplifiedChinese = Tag.$zeroStorage();
    $state.Sinhala = Tag.$zeroStorage();
    $state.Slovak = Tag.$zeroStorage();
    $state.Slovenian = Tag.$zeroStorage();
    $state.Spanish = Tag.$zeroStorage();
    $state.Supported = void 0;
    $state.Swahili = Tag.$zeroStorage();
    $state.Swedish = Tag.$zeroStorage();
    $state.Tamil = Tag.$zeroStorage();
    $state.Telugu = Tag.$zeroStorage();
    $state.Thai = Tag.$zeroStorage();
    $state.TraditionalChinese = Tag.$zeroStorage();
    $state.Turkish = Tag.$zeroStorage();
    $state.Ukrainian = Tag.$zeroStorage();
    $state.Und = Tag.$zeroStorage();
    $state.Urdu = Tag.$zeroStorage();
    $state.Uzbek = Tag.$zeroStorage();
    $state.Vietnamese = Tag.$zeroStorage();
    $state.Zulu = Tag.$zeroStorage();
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
    $state.root = Tag__from_language.$zeroStorage();
    $state.und = Tag.$zeroStorage();
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
            __gotots_slice_build_2.$initialize(__gotots_slice_build_3, mutualIntelligibility.$zeroStorage());
        }
        const __gotots_slice_receiver_1 = __gotots_slice_build_2;
        __gotots_slice_receiver_1.set(0, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 465,
                have: 183,
                distance: 4,
                oneway: false
            })));
        __gotots_slice_receiver_1.set(1, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1031,
                have: 183,
                distance: 4,
                oneway: false
            })));
        __gotots_slice_receiver_1.set(2, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1031,
                have: 465,
                distance: 4,
                oneway: false
            })));
        __gotots_slice_receiver_1.set(3, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1031,
                have: 1074,
                distance: 4,
                oneway: false
            })));
        __gotots_slice_receiver_1.set(4, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1082,
                have: 1,
                distance: 4,
                oneway: false
            })));
        __gotots_slice_receiver_1.set(5, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 419,
                have: 269,
                distance: 4,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(6, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 661,
                have: 269,
                distance: 4,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(7, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 257,
                have: 879,
                distance: 8,
                oneway: false
            })));
        __gotots_slice_receiver_1.set(8, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 257,
                have: 839,
                distance: 8,
                oneway: false
            })));
        __gotots_slice_receiver_1.set(9, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 5,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(10, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 13,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(11, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 22,
                have: 871,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(12, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 33,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(13, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 86,
                have: 318,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(14, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 88,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(15, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 113,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(16, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 117,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(17, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 130,
                have: 446,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(18, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 165,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(19, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 178,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(20, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 221,
                have: 339,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(21, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 229,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(22, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 233,
                have: 58,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(23, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 240,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(24, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 249,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(25, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 256,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(26, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 304,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(27, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 316,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(28, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 320,
                have: 337,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(29, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 325,
                have: 318,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(30, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 344,
                have: 257,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(31, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 365,
                have: 871,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(32, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 366,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(33, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 367,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(34, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 382,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(35, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 400,
                have: 318,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(36, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 404,
                have: 318,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(37, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 420,
                have: 446,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(38, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 436,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(39, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 440,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(40, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 468,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(41, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 471,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(42, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 473,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(43, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 487,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(44, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 504,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(45, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 526,
                have: 481,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(46, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 528,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(47, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 557,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(48, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 578,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(49, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 586,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(50, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 593,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(51, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 613,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(52, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 628,
                have: 1162,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(53, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 650,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(54, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 654,
                have: 505,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(55, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 675,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(56, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 693,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(57, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 696,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(58, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 702,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(59, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 707,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(60, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 749,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(61, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 753,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(62, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 762,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(63, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 767,
                have: 126,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(64, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 772,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(65, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 779,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(66, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 795,
                have: 446,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(67, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 799,
                have: 481,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(68, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 800,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(69, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 817,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(70, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 849,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(71, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 874,
                have: 839,
                distance: 10,
                oneway: false
            })));
        __gotots_slice_receiver_1.set(72, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 874,
                have: 879,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(73, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 890,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(74, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 903,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(75, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 905,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(76, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 907,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(77, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 912,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(78, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 917,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(79, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 925,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(80, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 933,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(81, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 958,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(82, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 964,
                have: 318,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(83, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 980,
                have: 269,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(84, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 985,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(85, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 997,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(86, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1001,
                have: 446,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(87, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1018,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(88, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1036,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(89, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1059,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(90, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1065,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(91, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1073,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(92, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1083,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(93, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1086,
                have: 481,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(94, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1093,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(95, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1104,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(96, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1121,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(97, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1127,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(98, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1135,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(99, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1142,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(100, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 14467,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(101, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1152,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(102, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1154,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(103, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1172,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(104, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1181,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(105, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1196,
                have: 1321,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(106, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1204,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(107, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1212,
                have: 994,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(108, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1253,
                have: 350,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(109, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1266,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(110, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1298,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(111, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
                want: 1304,
                have: 313,
                distance: 10,
                oneway: true
            })));
        __gotots_slice_receiver_1.set(112, (void mutualIntelligibility.$storageOf, (void mutualIntelligibility.$fromStorage,
            {
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
            __gotots_slice_build_4.$initialize(__gotots_slice_build_5, scriptIntelligibility.$zeroStorage());
        }
        const __gotots_slice_receiver_2 = __gotots_slice_build_4;
        __gotots_slice_receiver_2.set(0, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1074,
                haveLang: 1074,
                wantScript: 91,
                haveScript: 32,
                distance: 5
            })));
        __gotots_slice_receiver_2.set(1, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1074,
                haveLang: 1074,
                wantScript: 32,
                haveScript: 91,
                distance: 5
            })));
        __gotots_slice_receiver_2.set(2, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 88,
                haveLang: 994,
                wantScript: 91,
                haveScript: 32,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(3, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 165,
                haveLang: 313,
                wantScript: 14,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(4, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 471,
                haveLang: 994,
                wantScript: 8,
                haveScript: 32,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(5, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 528,
                haveLang: 313,
                wantScript: 46,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(6, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 586,
                haveLang: 313,
                wantScript: 79,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(7, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 593,
                haveLang: 313,
                wantScript: 83,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(8, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 696,
                haveLang: 313,
                wantScript: 88,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(9, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 772,
                haveLang: 313,
                wantScript: 111,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(10, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 817,
                haveLang: 313,
                wantScript: 118,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(11, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 849,
                haveLang: 313,
                wantScript: 34,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(12, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 917,
                haveLang: 313,
                wantScript: 131,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(13, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 925,
                haveLang: 313,
                wantScript: 54,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(14, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 958,
                haveLang: 313,
                wantScript: 5,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(15, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1018,
                haveLang: 313,
                wantScript: 5,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(16, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1036,
                haveLang: 313,
                wantScript: 214,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(17, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1104,
                haveLang: 313,
                wantScript: 230,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(18, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1121,
                haveLang: 313,
                wantScript: 233,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(19, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1135,
                haveLang: 313,
                wantScript: 44,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(20, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1142,
                haveLang: 994,
                wantScript: 91,
                haveScript: 32,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(21, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1204,
                haveLang: 313,
                wantScript: 5,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(22, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1212,
                haveLang: 994,
                wantScript: 91,
                haveScript: 32,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(23, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1298,
                haveLang: 313,
                wantScript: 62,
                haveScript: 91,
                distance: 10
            })));
        __gotots_slice_receiver_2.set(24, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
                wantLang: 1321,
                haveLang: 1321,
                wantScript: 59,
                haveScript: 60,
                distance: 15
            })));
        __gotots_slice_receiver_2.set(25, (void scriptIntelligibility.$storageOf, (void scriptIntelligibility.$fromStorage,
            {
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
            __gotots_slice_build_6.$initialize(__gotots_slice_build_7, regionIntelligibility.$zeroStorage());
        }
        const __gotots_slice_receiver_3 = __gotots_slice_build_6;
        __gotots_slice_receiver_3.set(0, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 58,
                script: 0,
                group: 4,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(1, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 58,
                script: 0,
                group: 132,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(2, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 313,
                script: 0,
                group: 1,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(3, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 313,
                script: 0,
                group: 129,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(4, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 318,
                script: 0,
                group: 3,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(5, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 318,
                script: 0,
                group: 131,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(6, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 960,
                script: 0,
                group: 3,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(7, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 960,
                script: 0,
                group: 131,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(8, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 1321,
                script: 60,
                group: 2,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(9, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 1321,
                script: 60,
                group: 130,
                distance: 4
            })));
        __gotots_slice_receiver_3.set(10, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 58,
                script: 0,
                group: 128,
                distance: 5
            })));
        __gotots_slice_receiver_3.set(11, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 313,
                script: 0,
                group: 128,
                distance: 5
            })));
        __gotots_slice_receiver_3.set(12, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 318,
                script: 0,
                group: 128,
                distance: 5
            })));
        __gotots_slice_receiver_3.set(13, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
                lang: 960,
                script: 0,
                group: 128,
                distance: 5
            })));
        __gotots_slice_receiver_3.set(14, (void regionIntelligibility.$storageOf, (void regionIntelligibility.$fromStorage,
            {
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
        $state.Afrikaans =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Afrikaans)))));
    }
    {
        $state.Amharic =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Amharic)))));
    }
    {
        $state.Arabic =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Arabic)))));
    }
    {
        $state.ModernStandardArabic =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.ModernStandardArabic)))));
    }
    {
        $state.Azerbaijani =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Azerbaijani)))));
    }
    {
        $state.Bulgarian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Bulgarian)))));
    }
    {
        $state.Bengali =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Bengali)))));
    }
    {
        $state.Catalan =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Catalan)))));
    }
    {
        $state.Czech =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Czech)))));
    }
    {
        $state.Danish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Danish)))));
    }
    {
        $state.German =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.German)))));
    }
    {
        $state.Greek =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Greek)))));
    }
    {
        $state.English =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.English)))));
    }
    {
        $state.AmericanEnglish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.AmericanEnglish)))));
    }
    {
        $state.BritishEnglish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.BritishEnglish)))));
    }
    {
        $state.Spanish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Spanish)))));
    }
    {
        $state.EuropeanSpanish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.EuropeanSpanish)))));
    }
    {
        $state.LatinAmericanSpanish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.LatinAmericanSpanish)))));
    }
    {
        $state.Estonian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Estonian)))));
    }
    {
        $state.Persian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Persian)))));
    }
    {
        $state.Finnish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Finnish)))));
    }
    {
        $state.Filipino =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Filipino)))));
    }
    {
        $state.French =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.French)))));
    }
    {
        $state.CanadianFrench =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.CanadianFrench)))));
    }
    {
        $state.Gujarati =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Gujarati)))));
    }
    {
        $state.Hebrew =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Hebrew)))));
    }
    {
        $state.Hindi =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Hindi)))));
    }
    {
        $state.Croatian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Croatian)))));
    }
    {
        $state.Hungarian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Hungarian)))));
    }
    {
        $state.Armenian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Armenian)))));
    }
    {
        $state.Indonesian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Indonesian)))));
    }
    {
        $state.Icelandic =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Icelandic)))));
    }
    {
        $state.Italian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Italian)))));
    }
    {
        $state.Japanese =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Japanese)))));
    }
    {
        $state.Georgian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Georgian)))));
    }
    {
        $state.Kazakh =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Kazakh)))));
    }
    {
        $state.Khmer =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Khmer)))));
    }
    {
        $state.Kannada =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Kannada)))));
    }
    {
        $state.Korean =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Korean)))));
    }
    {
        $state.Kirghiz =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Kirghiz)))));
    }
    {
        $state.Lao =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Lao)))));
    }
    {
        $state.Lithuanian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Lithuanian)))));
    }
    {
        $state.Latvian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Latvian)))));
    }
    {
        $state.Macedonian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Macedonian)))));
    }
    {
        $state.Malayalam =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Malayalam)))));
    }
    {
        $state.Mongolian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Mongolian)))));
    }
    {
        $state.Marathi =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Marathi)))));
    }
    {
        $state.Malay =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Malay)))));
    }
    {
        $state.Burmese =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Burmese)))));
    }
    {
        $state.Nepali =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Nepali)))));
    }
    {
        $state.Dutch =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Dutch)))));
    }
    {
        $state.Norwegian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Norwegian)))));
    }
    {
        $state.Punjabi =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Punjabi)))));
    }
    {
        $state.Polish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Polish)))));
    }
    {
        $state.Portuguese =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Portuguese)))));
    }
    {
        $state.BrazilianPortuguese =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.BrazilianPortuguese)))));
    }
    {
        $state.EuropeanPortuguese =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.EuropeanPortuguese)))));
    }
    {
        $state.Romanian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Romanian)))));
    }
    {
        $state.Russian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Russian)))));
    }
    {
        $state.Sinhala =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Sinhala)))));
    }
    {
        $state.Slovak =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Slovak)))));
    }
    {
        $state.Slovenian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Slovenian)))));
    }
    {
        $state.Albanian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Albanian)))));
    }
    {
        $state.Serbian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Serbian)))));
    }
    {
        $state.SerbianLatin =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.SerbianLatin)))));
    }
    {
        $state.Swedish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Swedish)))));
    }
    {
        $state.Swahili =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Swahili)))));
    }
    {
        $state.Tamil =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Tamil)))));
    }
    {
        $state.Telugu =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Telugu)))));
    }
    {
        $state.Thai =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Thai)))));
    }
    {
        $state.Turkish =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Turkish)))));
    }
    {
        $state.Ukrainian =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Ukrainian)))));
    }
    {
        $state.Urdu =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Urdu)))));
    }
    {
        $state.Uzbek =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Uzbek)))));
    }
    {
        $state.Vietnamese =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Vietnamese)))));
    }
    {
        $state.Chinese =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Chinese)))));
    }
    {
        $state.SimplifiedChinese =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.SimplifiedChinese)))));
    }
    {
        $state.TraditionalChinese =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.TraditionalChinese)))));
    }
    {
        $state.Zulu =
            (void Tag.$storageOf, (void Tag.$fromStorage,
                Tag__from_compact.$storageOf(Tag__from_compact.$copy(Tag__from_compact.$fromStorage($state__compact.Zulu)))));
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
