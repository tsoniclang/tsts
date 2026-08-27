import type { bool, gostring, int, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { ACRN$constant, AMD$constant, AVX$constant, AVX2$constant, AVX512BW$constant, AVX512CD$constant, AVX512DQ$constant, AVX512F$constant, AVX512VL$constant, Apple$constant, BMI1$constant, BMI2$constant, Bhyve$constant, CMOV$constant, CMPXCHG8$constant, CPUInfo, CX16$constant, CombineFeatures, F16C$constant, FMA3$constant, FXSR$constant, Features, Hygon$constant, Intel$constant, KVM$constant, LAHF$constant, LZCNT$constant, MMX$constant, MOVBE$constant, MSVM$constant, NSC$constant, OSXSAVE$constant, POPCNT$constant, QEMU$constant, QNX$constant, RDC$constant, SRE$constant, SSE$constant, SSE2$constant, SSE3$constant, SSE4$constant, SSE42$constant, SSSE3$constant, SYSCALL$constant, SYSEE$constant, SiS$constant, Transmeta$constant, VIA$constant, VMware$constant, Vendor, X87$constant, XenHVM$constant, init } from "../../../../../../modules/github.com/klauspost/cpuid/v2@v2.2.10/_root/cpuid.js";
import { $state } from "./state.js";
import { GoArray } from "@gotots/runtime/array.js";
import { GoMap } from "@gotots/runtime/map.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    ACRN = ACRN$constant();
    AMD = AMD$constant();
    AVX = AVX$constant();
    AVX2 = AVX2$constant();
    AVX512BW = AVX512BW$constant();
    AVX512CD = AVX512CD$constant();
    AVX512DQ = AVX512DQ$constant();
    AVX512F = AVX512F$constant();
    AVX512VL = AVX512VL$constant();
    Apple = Apple$constant();
    BMI1 = BMI1$constant();
    BMI2 = BMI2$constant();
    Bhyve = Bhyve$constant();
    CMOV = CMOV$constant();
    CMPXCHG8 = CMPXCHG8$constant();
    CX16 = CX16$constant();
    F16C = F16C$constant();
    FMA3 = FMA3$constant();
    FXSR = FXSR$constant();
    Hygon = Hygon$constant();
    Intel = Intel$constant();
    KVM = KVM$constant();
    LAHF = LAHF$constant();
    LZCNT = LZCNT$constant();
    MMX = MMX$constant();
    MOVBE = MOVBE$constant();
    MSVM = MSVM$constant();
    NSC = NSC$constant();
    OSXSAVE = OSXSAVE$constant();
    POPCNT = POPCNT$constant();
    QEMU = QEMU$constant();
    QNX = QNX$constant();
    RDC = RDC$constant();
    SRE = SRE$constant();
    SSE = SSE$constant();
    SSE2 = SSE2$constant();
    SSE3 = SSE3$constant();
    SSE4 = SSE4$constant();
    SSE42 = SSE42$constant();
    SSSE3 = SSSE3$constant();
    SYSCALL = SYSCALL$constant();
    SYSEE = SYSEE$constant();
    SiS = SiS$constant();
    Transmeta = Transmeta$constant();
    VIA = VIA$constant();
    VMware = VMware$constant();
    X87 = X87$constant();
    XenHVM = XenHVM$constant();
    $state.CPU = CPUInfo.$storageOf(CPUInfo.$zero());
    $state._FeatureID_index = GoArray.zero<uint16, 228>(228, 0);
    $state._Vendor_index = GoArray.zero<uint8, 33>(33, 0);
    $state.cpuid = void 0;
    $state.cpuidex = void 0;
    $state.darwinHasAVX512 = void 0;
    $state.detectArmFlag = void 0;
    $state.disableFlag = void 0;
    $state.displayFeats = void 0;
    $state.level1Features = new Features(void 0);
    $state.level2Features = new Features(void 0);
    $state.level3Features = new Features(void 0);
    $state.level4Features = new Features(void 0);
    $state.oneOfLevel = new Features(void 0);
    $state.rdtscpAsm = void 0;
    $state.vendorMapping = GoMap.nil<gostring, Vendor>(new Vendor(0));
    $state.xgetbv = void 0;
    {
        $state.darwinHasAVX512 = (): bool => {
            return false;
        };
    }
    {
        $state.oneOfLevel = CombineFeatures(RuntimeSlice.literal<int>([SYSEE$constant().$value, SYSCALL$constant().$value]));
    }
    {
        $state.level1Features = CombineFeatures(RuntimeSlice.literal<int>([CMOV$constant().$value, CMPXCHG8$constant().$value, X87$constant().$value, FXSR$constant().$value, MMX$constant().$value, SSE$constant().$value, SSE2$constant().$value]));
    }
    {
        $state.level2Features = CombineFeatures(RuntimeSlice.literal<int>([CMOV$constant().$value, CMPXCHG8$constant().$value, X87$constant().$value, FXSR$constant().$value, MMX$constant().$value, SSE$constant().$value, SSE2$constant().$value, CX16$constant().$value, LAHF$constant().$value, POPCNT$constant().$value, SSE3$constant().$value, SSE4$constant().$value, SSE42$constant().$value, SSSE3$constant().$value]));
    }
    {
        $state.level3Features = CombineFeatures(RuntimeSlice.literal<int>([CMOV$constant().$value, CMPXCHG8$constant().$value, X87$constant().$value, FXSR$constant().$value, MMX$constant().$value, SSE$constant().$value, SSE2$constant().$value, CX16$constant().$value, LAHF$constant().$value, POPCNT$constant().$value, SSE3$constant().$value, SSE4$constant().$value, SSE42$constant().$value, SSSE3$constant().$value, AVX$constant().$value, AVX2$constant().$value, BMI1$constant().$value, BMI2$constant().$value, F16C$constant().$value, FMA3$constant().$value, LZCNT$constant().$value, MOVBE$constant().$value, OSXSAVE$constant().$value]));
    }
    {
        $state.level4Features = CombineFeatures(RuntimeSlice.literal<int>([CMOV$constant().$value, CMPXCHG8$constant().$value, X87$constant().$value, FXSR$constant().$value, MMX$constant().$value, SSE$constant().$value, SSE2$constant().$value, CX16$constant().$value, LAHF$constant().$value, POPCNT$constant().$value, SSE3$constant().$value, SSE4$constant().$value, SSE42$constant().$value, SSSE3$constant().$value, AVX$constant().$value, AVX2$constant().$value, BMI1$constant().$value, BMI2$constant().$value, F16C$constant().$value, FMA3$constant().$value, LZCNT$constant().$value, MOVBE$constant().$value, OSXSAVE$constant().$value, AVX512F$constant().$value, AVX512BW$constant().$value, AVX512CD$constant().$value, AVX512DQ$constant().$value, AVX512VL$constant().$value]));
    }
    {
        $state.vendorMapping = GoMap.make<gostring, Vendor>(new Vendor(0), 24, [["AMDisbetter!", AMD$constant()], ["AuthenticAMD", AMD$constant()], ["CentaurHauls", VIA$constant()], ["GenuineIntel", Intel$constant()], ["TransmetaCPU", Transmeta$constant()], ["GenuineTMx86", Transmeta$constant()], ["Geode by NSC", NSC$constant()], ["VIA VIA VIA ", VIA$constant()], ["KVMKVMKVM", KVM$constant()], ["Linux KVM Hv", KVM$constant()], ["TCGTCGTCGTCG", QEMU$constant()], ["Microsoft Hv", MSVM$constant()], ["VMwareVMware", VMware$constant()], ["XenVMMXenVMM", XenHVM$constant()], ["bhyve bhyve ", Bhyve$constant()], ["HygonGenuine", Hygon$constant()], ["Vortex86 SoC", SiS$constant()], ["SiS SiS SiS ", SiS$constant()], ["RiseRiseRise", SiS$constant()], ["Genuine  RDC", RDC$constant()], ["QNXQVMBSQG", QNX$constant()], ["ACRNACRNACRN", ACRN$constant()], ["SRESRESRESRE", SRE$constant()], ["Apple VZ", Apple$constant()]]);
    }
    {
        $state._FeatureID_index = GoArray.literal<uint16, 228>(228, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227], [0, 7, 10, 15, 23, 34, 41, 48, 55, 61, 68, 75, 85, 90, 93, 98, 107, 116, 125, 129, 139, 151, 159, 167, 175, 183, 190, 200, 210, 218, 228, 239, 247, 257, 275, 290, 297, 309, 316, 323, 334, 346, 354, 358, 362, 368, 373, 381, 386, 392, 396, 405, 423, 431, 438, 442, 446, 460, 466, 470, 474, 483, 487, 491, 496, 501, 505, 509, 516, 520, 523, 529, 532, 535, 545, 555, 568, 581, 585, 596, 600, 614, 631, 634, 644, 655, 661, 669, 680, 688, 700, 716, 730, 741, 751, 766, 774, 785, 795, 802, 811, 821, 825, 828, 835, 840, 851, 858, 865, 873, 876, 882, 887, 896, 903, 911, 915, 918, 924, 931, 944, 949, 951, 958, 965, 971, 975, 984, 988, 993, 999, 1005, 1011, 1021, 1024, 1040, 1044, 1053, 1056, 1065, 1080, 1093, 1099, 1113, 1120, 1123, 1128, 1131, 1134, 1146, 1160, 1170, 1182, 1189, 1208, 1211, 1215, 1219, 1223, 1228, 1233, 1238, 1243, 1257, 1268, 1274, 1277, 1282, 1291, 1295, 1300, 1305, 1311, 1318, 1323, 1326, 1335, 1351, 1354, 1360, 1370, 1378, 1382, 1391, 1395, 1407, 1410, 1420, 1423, 1430, 1438, 1445, 1448, 1455, 1458, 1463, 1469, 1477, 1483, 1489, 1497, 1502, 1509, 1516, 1524, 1531, 1536, 1541, 1548, 1552, 1555, 1557, 1561, 1564, 1569, 1574, 1579, 1583, 1586, 1588, 1592, 1596, 1600, 1606, 1609, 1612, 1615, 1621]);
    }
    {
        $state._Vendor_index = GoArray.literal<uint8, 33>(33, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], [0, 13, 18, 21, 24, 33, 36, 39, 43, 49, 55, 60, 65, 68, 71, 77, 80, 88, 94, 97, 104, 112, 120, 126, 130, 138, 145, 149, 152, 156, 159, 164, 174]);
    }
    init();
}
export { ACRN$constant, AMD$constant, AMDMemEncryptionSupport, AMDMemEncryptionSupport$Storage, AVX$constant, AVX2$constant, AVX512BW$constant, AVX512CD$constant, AVX512DQ$constant, AVX512F$constant, AVX512VL$constant, Apple$constant, BMI1$constant, BMI2$constant, Bhyve$constant, CMOV$constant, CMPXCHG8$constant, CPUInfo, CPUInfo$Storage, CX16$constant, CombineFeatures, Detect, F16C$constant, FMA3$constant, FXSR$constant, FeatureID, Features, Hygon$constant, Intel$constant, KVM$constant, LAHF$constant, LZCNT$constant, MMX$constant, MOVBE$constant, MSVM$constant, NSC$constant, OSXSAVE$constant, POPCNT$constant, ParseFeature, QEMU$constant, QNX$constant, RDC$constant, SGXEPCSection, SGXEPCSection$Storage, SGXSupport, SGXSupport$Storage, SRE$constant, SSE$constant, SSE2$constant, SSE3$constant, SSE4$constant, SSE42$constant, SSSE3$constant, SYSCALL$constant, SYSEE$constant, SiS$constant, Transmeta$constant, UNKNOWN$int, VIA$constant, VMware$constant, Vendor, X87$constant, XenHVM$constant } from "../../../../../../modules/github.com/klauspost/cpuid/v2@v2.2.10/_root/cpuid.js";
export let ACRN: ReturnType<typeof ACRN$constant>;
export let AMD: ReturnType<typeof AMD$constant>;
export let AVX: ReturnType<typeof AVX$constant>;
export let AVX2: ReturnType<typeof AVX2$constant>;
export let AVX512BW: ReturnType<typeof AVX512BW$constant>;
export let AVX512CD: ReturnType<typeof AVX512CD$constant>;
export let AVX512DQ: ReturnType<typeof AVX512DQ$constant>;
export let AVX512F: ReturnType<typeof AVX512F$constant>;
export let AVX512VL: ReturnType<typeof AVX512VL$constant>;
export let Apple: ReturnType<typeof Apple$constant>;
export let BMI1: ReturnType<typeof BMI1$constant>;
export let BMI2: ReturnType<typeof BMI2$constant>;
export let Bhyve: ReturnType<typeof Bhyve$constant>;
export let CMOV: ReturnType<typeof CMOV$constant>;
export let CMPXCHG8: ReturnType<typeof CMPXCHG8$constant>;
export let CX16: ReturnType<typeof CX16$constant>;
export let F16C: ReturnType<typeof F16C$constant>;
export let FMA3: ReturnType<typeof FMA3$constant>;
export let FXSR: ReturnType<typeof FXSR$constant>;
export let Hygon: ReturnType<typeof Hygon$constant>;
export let Intel: ReturnType<typeof Intel$constant>;
export let KVM: ReturnType<typeof KVM$constant>;
export let LAHF: ReturnType<typeof LAHF$constant>;
export let LZCNT: ReturnType<typeof LZCNT$constant>;
export let MMX: ReturnType<typeof MMX$constant>;
export let MOVBE: ReturnType<typeof MOVBE$constant>;
export let MSVM: ReturnType<typeof MSVM$constant>;
export let NSC: ReturnType<typeof NSC$constant>;
export let OSXSAVE: ReturnType<typeof OSXSAVE$constant>;
export let POPCNT: ReturnType<typeof POPCNT$constant>;
export let QEMU: ReturnType<typeof QEMU$constant>;
export let QNX: ReturnType<typeof QNX$constant>;
export let RDC: ReturnType<typeof RDC$constant>;
export let SRE: ReturnType<typeof SRE$constant>;
export let SSE: ReturnType<typeof SSE$constant>;
export let SSE2: ReturnType<typeof SSE2$constant>;
export let SSE3: ReturnType<typeof SSE3$constant>;
export let SSE4: ReturnType<typeof SSE4$constant>;
export let SSE42: ReturnType<typeof SSE42$constant>;
export let SSSE3: ReturnType<typeof SSSE3$constant>;
export let SYSCALL: ReturnType<typeof SYSCALL$constant>;
export let SYSEE: ReturnType<typeof SYSEE$constant>;
export let SiS: ReturnType<typeof SiS$constant>;
export let Transmeta: ReturnType<typeof Transmeta$constant>;
export let VIA: ReturnType<typeof VIA$constant>;
export let VMware: ReturnType<typeof VMware$constant>;
export let X87: ReturnType<typeof X87$constant>;
export let XenHVM: ReturnType<typeof XenHVM$constant>;
export { $state };
