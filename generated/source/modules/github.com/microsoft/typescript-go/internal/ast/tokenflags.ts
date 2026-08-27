import type { int32 } from "@gotots/runtime/scalars.js";
export type TokenFlags = int32;
export function TokenFlagsNone$constant(): TokenFlags {
    return 0;
}
export function TokenFlagsPrecedingLineBreak$constant(): TokenFlags {
    return 1;
}
export function TokenFlagsPrecedingJSDocComment$constant(): TokenFlags {
    return 2;
}
export function TokenFlagsUnterminated$constant(): TokenFlags {
    return 4;
}
export function TokenFlagsExtendedUnicodeEscape$constant(): TokenFlags {
    return 8;
}
export function TokenFlagsScientific$constant(): TokenFlags {
    return 16;
}
export function TokenFlagsOctal$constant(): TokenFlags {
    return 32;
}
export function TokenFlagsHexSpecifier$constant(): TokenFlags {
    return 64;
}
export function TokenFlagsBinarySpecifier$constant(): TokenFlags {
    return 128;
}
export function TokenFlagsOctalSpecifier$constant(): TokenFlags {
    return 256;
}
export function TokenFlagsContainsSeparator$constant(): TokenFlags {
    return 512;
}
export function TokenFlagsUnicodeEscape$constant(): TokenFlags {
    return 1024;
}
export function TokenFlagsContainsInvalidEscape$constant(): TokenFlags {
    return 2048;
}
export function TokenFlagsHexEscape$constant(): TokenFlags {
    return 4096;
}
export function TokenFlagsContainsLeadingZero$constant(): TokenFlags {
    return 8192;
}
export function TokenFlagsContainsInvalidSeparator$constant(): TokenFlags {
    return 16384;
}
export function TokenFlagsPrecedingJSDocLeadingAsterisks$constant(): TokenFlags {
    return 32768;
}
export function TokenFlagsSingleQuote$constant(): TokenFlags {
    return 65536;
}
export function TokenFlagsPrecedingJSDocWithDeprecated$constant(): TokenFlags {
    return 131072;
}
export function TokenFlagsPrecedingJSDocWithSeeOrLink$constant(): TokenFlags {
    return 262144;
}
export function TokenFlagsBinaryOrOctalSpecifier$constant(): TokenFlags {
    return 384;
}
export function TokenFlagsWithSpecifier$constant(): TokenFlags {
    return 448;
}
export function TokenFlagsStringLiteralFlags$constant(): TokenFlags {
    return 72716;
}
export function TokenFlagsNumericLiteralFlags$constant(): TokenFlags {
    return 25584;
}
export function TokenFlagsTemplateLiteralLikeFlags$constant(): TokenFlags {
    return 7180;
}
export function TokenFlagsRegularExpressionLiteralFlags$constant(): TokenFlags {
    return 4;
}
export function TokenFlagsIsInvalid$constant(): TokenFlags {
    return 26656;
}
