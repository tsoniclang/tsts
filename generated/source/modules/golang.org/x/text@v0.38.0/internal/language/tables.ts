import type { gostring, int, int16, uint, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { Index as Index__from_tag } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/tag/package.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export const NumLanguages$int: int = 8798;
export const NumScripts$int: int = 261;
export const NumRegions$int: int = 358;
export type FromTo$Storage = {
    From: uint16;
    To: uint16;
};
export class FromTo {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: FromTo$Storage) {
    }
    public static $storageOf($source: FromTo): FromTo$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: FromTo$Storage): FromTo {
        return new FromTo($source);
    }
    public get From(): uint16 {
        return this.$storage.From;
    }
    public set From($value: uint16) {
        this.$storage.From = $value;
    }
    public get To(): uint16 {
        return this.$storage.To;
    }
    public set To($value: uint16) {
        this.$storage.To = $value;
    }
    static $zero(): FromTo {
        return new FromTo({
            From: 0,
            To: 0
        });
    }
    static $copy($source: FromTo): FromTo {
        return new FromTo({
            From: $source.$storage.From,
            To: $source.$storage.To
        });
    }
    declare private readonly then?: never;
}
export const nonCanonicalUnd$int: int = 1201;
export const nonCanonicalUnd$uint16: uint16 = 1201;
export const _en$uint16: uint16 = 313;
export const _nb$int16: int16 = 839;
export const _jbo$int16: int16 = 515;
export const _ami$int16: int16 = 1650;
export const _bnn$int16: int16 = 2357;
export const _hak$int16: int16 = 438;
export const _tlh$int16: int16 = 14467;
export const _lb$int16: int16 = 661;
export const _nv$int16: int16 = 899;
export const _pwn$int16: int16 = 12055;
export const _tao$int16: int16 = 14188;
export const _tay$int16: int16 = 14198;
export const _tsu$int16: int16 = 14662;
export const _nn$int16: int16 = 874;
export const _sfb$int16: int16 = 13629;
export const _vgt$int16: int16 = 15701;
export const _sgg$int16: int16 = 13660;
export const _cmn$int16: int16 = 3007;
export const _nan$int16: int16 = 835;
export const _hsn$int16: int16 = 467;
export function lang$constant(): Index__from_tag {
    return new Index__from_tag("---\0aaaraai\0aak\0aau\0abbkabi\0abq\0abr\0abt\0aby\0acd\0ace\0ach\0ada\0ade\0adj\0ady\0adz\0aeveaeb\0aey\0affragc\0agd\0agg\0agm\0ago\0agq\0aha\0ahl\0aho\0ajg\0akkaakk\0ala\0ali\0aln\0alt\0ammhamm\0amn\0amo\0amp\0anrganc\0ank\0ann\0any\0aoj\0aom\0aoz\0apc\0apd\0ape\0apr\0aps\0apz\0arraarc\0arh\0arn\0aro\0arq\0ars\0ary\0arz\0assmasa\0ase\0asg\0aso\0ast\0ata\0atg\0atj\0auy\0avvaavl\0avn\0avt\0avu\0awa\0awb\0awo\0awx\0ayymayb\0azzebaakbal\0ban\0bap\0bar\0bas\0bav\0bax\0bba\0bbb\0bbc\0bbd\0bbj\0bbp\0bbr\0bcf\0bch\0bci\0bcm\0bcn\0bco\0bcq\0bcu\0bdd\0beelbef\0beh\0bej\0bem\0bet\0bew\0bex\0bez\0bfd\0bfq\0bft\0bfy\0bgulbgc\0bgn\0bgx\0bhihbhb\0bhg\0bhi\0bhk\0bhl\0bho\0bhy\0biisbib\0big\0bik\0bim\0bin\0bio\0biq\0bjh\0bji\0bjj\0bjn\0bjo\0bjr\0bjt\0bjz\0bkc\0bkm\0bkq\0bku\0bkv\0blt\0bmambmh\0bmk\0bmq\0bmu\0bnenbng\0bnm\0bnp\0boodboj\0bom\0bon\0bpy\0bqc\0bqi\0bqp\0bqv\0brrebra\0brh\0brx\0brz\0bsosbsj\0bsq\0bss\0bst\0bto\0btt\0btv\0bua\0buc\0bud\0bug\0buk\0bum\0buo\0bus\0buu\0bvb\0bwd\0bwr\0bxh\0bye\0byn\0byr\0bys\0byv\0byx\0bza\0bze\0bzf\0bzh\0bzw\0caatcan\0cbj\0cch\0ccp\0ceheceb\0cfa\0cgg\0chhachk\0chm\0cho\0chp\0chr\0cja\0cjm\0cjv\0ckb\0ckl\0cko\0cky\0cla\0cme\0cmg\0cooscop\0cps\0crrecrh\0crj\0crk\0crl\0crm\0crs\0csescsb\0csw\0ctd\0cuhucvhvcyymdaandad\0daf\0dag\0dah\0dak\0dar\0dav\0dbd\0dbq\0dcc\0ddn\0deeuded\0den\0dga\0dgh\0dgi\0dgl\0dgr\0dgz\0dia\0dje\0dnj\0dob\0doi\0dop\0dow\0dri\0drs\0dsb\0dtm\0dtp\0dts\0dty\0dua\0duc\0dud\0dug\0dvivdva\0dww\0dyo\0dyu\0dzzodzg\0ebu\0eeweefi\0egl\0egy\0eka\0eky\0elllema\0emi\0enngenn\0enq\0eopoeri\0es\0\u0005esu\0etstetr\0ett\0etu\0etx\0euusewo\0ext\0faasfaa\0fab\0fag\0fai\0fan\0ffulffi\0ffm\0fiinfia\0fil\0fit\0fjijflr\0fmp\0foaofod\0fon\0for\0fpe\0fqs\0frrafrc\0frp\0frr\0frs\0fub\0fud\0fue\0fuf\0fuh\0fuq\0fur\0fuv\0fuy\0fvr\0fyrygalegaa\0gaf\0gag\0gah\0gaj\0gam\0gan\0gaw\0gay\0gba\0gbf\0gbm\0gby\0gbz\0gcr\0gdlagde\0gdn\0gdr\0geb\0gej\0gel\0gez\0gfk\0ggn\0ghs\0gil\0gim\0gjk\0gjn\0gju\0gkn\0gkp\0gllgglk\0gmm\0gmv\0gnrngnd\0gng\0god\0gof\0goi\0gom\0gon\0gor\0gos\0got\0grb\0grc\0grt\0grw\0gsw\0guujgub\0guc\0gud\0gur\0guw\0gux\0guz\0gvlvgvf\0gvr\0gvs\0gwc\0gwi\0gwt\0gyi\0haauhag\0hak\0ham\0haw\0haz\0hbb\0hdy\0heebhhy\0hiinhia\0hif\0hig\0hih\0hil\0hla\0hlu\0hmd\0hmt\0hnd\0hne\0hnj\0hnn\0hno\0homohoc\0hoj\0hot\0hrrvhsb\0hsn\0htathuunhui\0hyyehzerianaian\0iar\0iba\0ibb\0iby\0ica\0ich\0idndidd\0idi\0idu\0ieleife\0igboigb\0ige\0iiiiijj\0ikpkikk\0ikt\0ikw\0ikx\0ilo\0imo\0inndinh\0iodoiou\0iri\0isslittaiukuiw\0\u0003iwm\0iws\0izh\0izi\0japnjab\0jam\0jbo\0jbu\0jen\0jgk\0jgo\0ji\0\u0006jib\0jmc\0jml\0jra\0jut\0jvavjwavkaatkaa\0kab\0kac\0kad\0kai\0kaj\0kam\0kao\0kbd\0kbm\0kbp\0kbq\0kbx\0kby\0kcg\0kck\0kcl\0kct\0kde\0kdh\0kdl\0kdt\0kea\0ken\0kez\0kfo\0kfr\0kfy\0kgonkge\0kgf\0kgp\0kha\0khb\0khn\0khq\0khs\0kht\0khw\0khz\0kiikkij\0kiu\0kiw\0kjuakjd\0kjg\0kjs\0kjy\0kkazkkc\0kkj\0klalkln\0klq\0klt\0klx\0kmhmkmb\0kmh\0kmo\0kms\0kmu\0kmw\0knanknf\0knp\0koorkoi\0kok\0kol\0kos\0koz\0kpe\0kpf\0kpo\0kpr\0kpx\0kqb\0kqf\0kqs\0kqy\0kraukrc\0kri\0krj\0krl\0krs\0kru\0ksasksb\0ksd\0ksf\0ksh\0ksj\0ksr\0ktb\0ktm\0kto\0kuurkub\0kud\0kue\0kuj\0kum\0kun\0kup\0kus\0kvomkvg\0kvr\0kvx\0kw\0\u0001kwj\0kwo\0kxa\0kxc\0kxm\0kxp\0kxw\0kxz\0kyirkye\0kyx\0kzr\0laatlab\0lad\0lag\0lah\0laj\0las\0lbtzlbe\0lbu\0lbw\0lcm\0lcp\0ldb\0led\0lee\0lem\0lep\0leq\0leu\0lez\0lguglgg\0liimlia\0lid\0lif\0lig\0lih\0lij\0lis\0ljp\0lki\0lkt\0lle\0lln\0lmn\0lmo\0lmp\0lninlns\0lnu\0loaoloj\0lok\0lol\0lor\0los\0loz\0lrc\0ltitltg\0luublua\0luo\0luy\0luz\0lvavlwl\0lzh\0lzz\0mad\0maf\0mag\0mai\0mak\0man\0mas\0maw\0maz\0mbh\0mbo\0mbq\0mbu\0mbw\0mci\0mcp\0mcq\0mcr\0mcu\0mda\0mde\0mdf\0mdh\0mdj\0mdr\0mdx\0med\0mee\0mek\0men\0mer\0met\0meu\0mfa\0mfe\0mfn\0mfo\0mfq\0mglgmgh\0mgl\0mgo\0mgp\0mgy\0mhahmhi\0mhl\0mirimif\0min\0mis\0miw\0mkkdmki\0mkl\0mkp\0mkw\0mlalmle\0mlp\0mls\0mmo\0mmu\0mmx\0mnonmna\0mnf\0mni\0mnw\0moolmoa\0moe\0moh\0mos\0mox\0mpp\0mps\0mpt\0mpx\0mql\0mrarmrd\0mrj\0mro\0mssamtltmtc\0mtf\0mti\0mtr\0mua\0mul\0mur\0mus\0mva\0mvn\0mvy\0mwk\0mwr\0mwv\0mxc\0mxm\0myyamyk\0mym\0myv\0myw\0myx\0myz\0mzk\0mzm\0mzn\0mzp\0mzw\0mzz\0naaunac\0naf\0nah\0nak\0nan\0nap\0naq\0nas\0nbobnca\0nce\0ncf\0nch\0nco\0ncu\0nddendc\0nds\0neepneb\0new\0nex\0nfr\0ngdonga\0ngb\0ngl\0nhb\0nhe\0nhw\0nif\0nii\0nij\0nin\0niu\0niy\0niz\0njo\0nkg\0nko\0nlldnmg\0nmz\0nnnonnf\0nnh\0nnk\0nnm\0noornod\0noe\0non\0nop\0nou\0nqo\0nrblnrb\0nsk\0nsn\0nso\0nss\0ntm\0ntr\0nui\0nup\0nus\0nuv\0nux\0nvavnwb\0nxq\0nxr\0nyyanym\0nyn\0nzi\0occiogc\0ojjiokr\0okv\0omrmong\0onn\0ons\0opm\0orrioro\0oru\0osssosa\0ota\0otk\0ozm\0paanpag\0pal\0pam\0pap\0pau\0pbi\0pcd\0pcm\0pdc\0pdt\0ped\0peo\0pex\0pfl\0phl\0phn\0pilipil\0pip\0pka\0pko\0plolpla\0pms\0png\0pnn\0pnt\0pon\0ppo\0pra\0prd\0prg\0psuspss\0ptorptp\0puu\0pwa\0quuequc\0qug\0rai\0raj\0rao\0rcf\0rej\0rel\0res\0rgn\0rhg\0ria\0rif\0rjs\0rkt\0rmohrmf\0rmo\0rmt\0rmu\0rnunrna\0rng\0roonrob\0rof\0roo\0rro\0rtm\0ruusrue\0rug\0rw\0\u0004rwk\0rwo\0ryu\0saansaf\0sah\0saq\0sas\0sat\0sav\0saz\0sba\0sbe\0sbp\0scrdsck\0scl\0scn\0sco\0scs\0sdndsdc\0sdh\0semesef\0seh\0sei\0ses\0sgagsga\0sgs\0sgw\0sgz\0sh\0\u0002shi\0shk\0shn\0shu\0siinsid\0sig\0sil\0sim\0sjr\0sklkskc\0skr\0sks\0sllvsld\0sli\0sll\0sly\0smmosma\0smi\0smj\0smn\0smp\0smq\0sms\0snnasnc\0snk\0snp\0snx\0sny\0soomsok\0soq\0sou\0soy\0spd\0spl\0sps\0sqqisrrpsrb\0srn\0srr\0srx\0ssswssd\0ssg\0ssy\0stotstk\0stq\0suunsua\0sue\0suk\0sur\0sus\0svweswwaswb\0swc\0swg\0swp\0swv\0sxn\0sxw\0syl\0syr\0szl\0taamtaj\0tal\0tan\0taq\0tbc\0tbd\0tbf\0tbg\0tbo\0tbw\0tbz\0tci\0tcy\0tdd\0tdg\0tdh\0teelted\0tem\0teo\0tet\0tfi\0tggktgc\0tgo\0tgu\0thhathl\0thq\0thr\0tiirtif\0tig\0tik\0tim\0tio\0tiv\0tkuktkl\0tkr\0tkt\0tlgltlf\0tlx\0tly\0tmh\0tmy\0tnsntnh\0toontof\0tog\0toq\0tpi\0tpm\0tpz\0tqo\0trurtru\0trv\0trw\0tssotsd\0tsf\0tsg\0tsj\0tsw\0ttatttd\0tte\0ttj\0ttr\0tts\0ttt\0tuh\0tul\0tum\0tuq\0tvd\0tvl\0tvu\0twwitwh\0twq\0txg\0tyahtya\0tyv\0tzm\0ubu\0udm\0ugiguga\0ukkruli\0umb\0und\0unr\0unx\0urrduri\0urt\0urw\0usa\0utr\0uvh\0uvl\0uzzbvag\0vai\0van\0veenvec\0vep\0viievic\0viv\0vls\0vmf\0vmw\0voolvot\0vro\0vun\0vut\0walnwae\0waj\0wal\0wan\0war\0wbp\0wbq\0wbr\0wci\0wer\0wgi\0whg\0wib\0wiu\0wiv\0wja\0wji\0wls\0wmo\0wnc\0wni\0wnu\0woolwob\0wos\0wrs\0wsk\0wtm\0wuu\0wuv\0wwa\0xav\0xbi\0xcr\0xes\0xhhoxla\0xlc\0xld\0xmf\0xmn\0xmr\0xna\0xnr\0xog\0xon\0xpr\0xrb\0xsa\0xsi\0xsm\0xsr\0xwe\0yam\0yao\0yap\0yas\0yat\0yav\0yay\0yaz\0yba\0ybb\0yby\0yer\0ygr\0ygw\0yiidyko\0yle\0ylg\0yll\0yml\0yooryon\0yrb\0yre\0yrl\0yss\0yua\0yue\0yuj\0yut\0yuw\0zahazag\0zbl\0zdj\0zea\0zgh\0zhhozhx\0zia\0zlm\0zmi\0zne\0zuulzxx\0zza\0\u00FF\u00FF\u00FF\u00FF");
}
export const langNoIndexOffset$int: int = 1330;
export const langNoIndexOffset$uint: uint = 1330;
export const langNoIndexOffset$uint16: uint16 = 1330;
export function altLangISO3$constant(): Index__from_tag {
    return new Index__from_tag("---\0cor\0hbs\u0001heb\u0002kin\u0003spa\u0004yid\u0005\u00FF\u00FF\u00FF\u00FF");
}
export function script$constant(): Index__from_tag {
    return new Index__from_tag("----AdlmAfakAghbAhomArabAranArmiArmnAvstBaliBamuBassBatkBengBhksBlisBopoBrahBraiBugiBuhdCakmCansCariChamCherChrsCirtCoptCpmnCprtCyrlCyrsDevaDiakDogrDsrtDuplEgydEgyhEgypElbaElymEthiGeokGeorGlagGongGonmGothGranGrekGujrGuruHanbHangHaniHanoHansHantHatrHebrHiraHluwHmngHmnpHrktHungIndsItalJamoJavaJpanJurcKaliKanaKawiKharKhmrKhojKitlKitsKndaKoreKpelKthiLanaLaooLatfLatgLatnLekeLepcLimbLinaLinbLisuLomaLyciLydiMahjMakaMandManiMarcMayaMedfMendMercMeroMlymModiMongMoonMrooMteiMultMymrNagmNandNarbNbatNewaNkdbNkgbNkooNshuOgamOlckOrkhOryaOsgeOsmaOugrPalmPaucPcunPelmPermPhagPhliPhlpPhlvPhnxPiqdPlrdPrtiPsinQaaaQaabQaacQaadQaaeQaafQaagQaahQaaiQaajQaakQaalQaamQaanQaaoQaapQaaqQaarQaasQaatQaauQaavQaawQaaxQaayQaazQabaQabbQabcQabdQabeQabfQabgQabhQabiQabjQabkQablQabmQabnQaboQabpQabqQabrQabsQabtQabuQabvQabwQabxRanjRjngRohgRoroRunrSamrSaraSarbSaurSgnwShawShrdShuiSiddSindSinhSogdSogoSoraSoyoSundSunuSyloSyrcSyreSyrjSyrnTagbTakrTaleTaluTamlTangTavtTeluTengTfngTglgThaaThaiTibtTirhTnsaTotoUgarVaiiVispVithWaraWchoWoleXpeoXsuxYeziYiiiZanbZinhZmthZsyeZsymZxxxZyyyZzzz\u00FF\u00FF\u00FF\u00FF");
}
export const _XK$uint16: uint16 = 334;
export const isoRegionOffset$uint16: uint16 = 32;
export function regionISO$constant(): Index__from_tag {
    return new Index__from_tag("AAAAACSCADNDAEREAFFGAGTGAIIAALLBAMRMANNTAOGOAQTAARRGASSMATUTAUUSAWBWAXLAAZZEBAIHBBRBBDGDBEELBFFABGGRBHHRBIDIBJENBLLMBMMUBNRNBOOLBQESBRRABSHSBTTNBUURBVVTBWWABYLRBZLZCAANCCCKCDODCFAFCGOGCHHECIIVCKOKCLHLCMMRCNHNCOOLCPPTCQ  CRRICS\0\0CTTECUUBCVPVCWUWCXXRCYYPCZZEDDDRDEEUDGGADJJIDKNKDMMADOOMDYHYDZZAEA  ECCUEESTEGGYEHSHERRIESSPETTHEU\0\u0003EZ  FIINFJJIFKLKFMSMFOROFQ\0\u0018FRRAFXXXGAABGBBRGDRDGEEOGFUFGGGYGHHAGIIBGLRLGMMBGNINGPLPGQNQGRRCGS\0\u0006GTTMGUUMGWNBGYUYHKKGHMMDHNNDHRRVHTTIHUUNHVVOIC  IDDNIERLILSRIMMNINNDIOOTIQRQIRRNISSLITTAJEEYJMAMJOORJPPNJTTNKEENKGGZKHHMKIIRKM\0\tKNNAKP\0\fKRORKWWTKY\0\u000FKZAZLAAOLBBNLCCALIIELKKALRBRLSSOLTTULUUXLVVALYBYMAARMCCOMDDAMENEMFAFMGDGMHHLMIIDMKKDMLLIMMMRMNNGMOACMPNPMQTQMRRTMSSRMTLTMUUSMVDVMWWIMXEXMYYSMZOZNAAMNCCLNEERNFFKNGGANHHBNIICNLLDNOORNPPLNQ\0\u001ENRRUNTTZNUIUNZZLOMMNPAANPCCIPEERPFYFPGNGPHHLPKAKPLOLPM\0\u0012PNCNPRRIPSSEPTRTPUUSPWLWPYRYPZCZQAATQMMMQNNNQOOOQPPPQQQQQRRRQSSSQTTTQU\0\u0003QVVVQWWWQXXXQYYYQZZZREEURHHOROOURS\0\u0015RUUSRWWASAAUSBLBSCYCSDDNSEWESGGPSHHNSIVNSJJMSKVKSLLESMMRSNENSOOMSRURSSSDSTTPSUUNSVLVSXXMSYYRSZWZTAAATCCATDCDTF\0\u0018TGGOTHHATJJKTKKLTLLSTMKMTNUNTOONTPMPTRURTTTOTVUVTWWNTZZAUAKRUGGAUK  UMMIUN  USSAUYRYUZZBVAATVCCTVDDRVEENVGGBVIIRVNNMVUUTWFLFWKAKWSSMXAAAXBBBXCCCXDDDXEEEXFFFXGGGXHHHXIIIXJJJXKKKXLLLXMMMXNNNXOOOXPPPXQQQXRRRXSSSXTTTXUUUXVVVXWWWXXXXXYYYXZZZYDMDYEEMYT\0\u001BYUUGZAAFZMMBZRARZWWEZZZZ\u00FF\u00FF\u00FF\u00FF");
}
export const altRegionISO3: gostring = "SCGQUUSGSCOMPRKCYMSPMSRBATFMYTATN";
export const nRegionGroups$uint8: uint8 = 33;
export type likelyLangRegion$Storage = {
    lang: uint16;
    region: uint16;
};
export class likelyLangRegion {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: likelyLangRegion$Storage) {
    }
    public static $storageOf($source: likelyLangRegion): likelyLangRegion$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: likelyLangRegion$Storage): likelyLangRegion {
        return new likelyLangRegion($source);
    }
    public get lang(): uint16 {
        return this.$storage.lang;
    }
    public set lang($value: uint16) {
        this.$storage.lang = $value;
    }
    public get region(): uint16 {
        return this.$storage.region;
    }
    public set region($value: uint16) {
        this.$storage.region = $value;
    }
    static $zero(): likelyLangRegion {
        return new likelyLangRegion({
            lang: 0,
            region: 0
        });
    }
    static $copy($source: likelyLangRegion): likelyLangRegion {
        return new likelyLangRegion({
            lang: $source.$storage.lang,
            region: $source.$storage.region
        });
    }
    declare private readonly then?: never;
}
export type likelyScriptRegion$Storage = {
    region: uint16;
    script: uint16;
    flags: uint8;
};
export class likelyScriptRegion {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: likelyScriptRegion$Storage) {
    }
    public static $storageOf($source: likelyScriptRegion): likelyScriptRegion$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: likelyScriptRegion$Storage): likelyScriptRegion {
        return new likelyScriptRegion($source);
    }
    public get region(): uint16 {
        return this.$storage.region;
    }
    public set region($value: uint16) {
        this.$storage.region = $value;
    }
    public get script(): uint16 {
        return this.$storage.script;
    }
    public set script($value: uint16) {
        this.$storage.script = $value;
    }
    public get flags(): uint8 {
        return this.$storage.flags;
    }
    public set flags($value: uint8) {
        this.$storage.flags = $value;
    }
    static $zero(): likelyScriptRegion {
        return new likelyScriptRegion({
            region: 0,
            script: 0,
            flags: 0
        });
    }
    static $copy($source: likelyScriptRegion): likelyScriptRegion {
        return new likelyScriptRegion({
            region: $source.$storage.region,
            script: $source.$storage.script,
            flags: $source.$storage.flags
        });
    }
    declare private readonly then?: never;
}
export type likelyLangScript$Storage = {
    lang: uint16;
    script: uint16;
    flags: uint8;
};
export class likelyLangScript {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: likelyLangScript$Storage) {
    }
    public static $storageOf($source: likelyLangScript): likelyLangScript$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: likelyLangScript$Storage): likelyLangScript {
        return new likelyLangScript($source);
    }
    public get lang(): uint16 {
        return this.$storage.lang;
    }
    public set lang($value: uint16) {
        this.$storage.lang = $value;
    }
    public get script(): uint16 {
        return this.$storage.script;
    }
    public set script($value: uint16) {
        this.$storage.script = $value;
    }
    public get flags(): uint8 {
        return this.$storage.flags;
    }
    public set flags($value: uint8) {
        this.$storage.flags = $value;
    }
    static $zero(): likelyLangScript {
        return new likelyLangScript({
            lang: 0,
            script: 0,
            flags: 0
        });
    }
    static $copy($source: likelyLangScript): likelyLangScript {
        return new likelyLangScript({
            lang: $source.$storage.lang,
            script: $source.$storage.script,
            flags: $source.$storage.flags
        });
    }
    declare private readonly then?: never;
}
export type likelyTag$Storage = {
    lang: uint16;
    region: uint16;
    script: uint16;
};
export class likelyTag {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: likelyTag$Storage) {
    }
    public static $storageOf($source: likelyTag): likelyTag$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: likelyTag$Storage): likelyTag {
        return new likelyTag($source);
    }
    public get lang(): uint16 {
        return this.$storage.lang;
    }
    public set lang($value: uint16) {
        this.$storage.lang = $value;
    }
    public get region(): uint16 {
        return this.$storage.region;
    }
    public set region($value: uint16) {
        this.$storage.region = $value;
    }
    public get script(): uint16 {
        return this.$storage.script;
    }
    public set script($value: uint16) {
        this.$storage.script = $value;
    }
    static $zero(): likelyTag {
        return new likelyTag({
            lang: 0,
            region: 0,
            script: 0
        });
    }
    static $copy($source: likelyTag): likelyTag {
        return new likelyTag({
            lang: $source.$storage.lang,
            region: $source.$storage.region,
            script: $source.$storage.script
        });
    }
    declare private readonly then?: never;
}
export type parentRel$Storage = {
    lang: uint16;
    script: uint16;
    maxScript: uint16;
    toRegion: uint16;
    fromRegion: RuntimeSlice<uint16>;
};
export class parentRel {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: parentRel$Storage) {
    }
    public static $storageOf($source: parentRel): parentRel$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: parentRel$Storage): parentRel {
        return new parentRel($source);
    }
    public get lang(): uint16 {
        return this.$storage.lang;
    }
    public set lang($value: uint16) {
        this.$storage.lang = $value;
    }
    public get script(): uint16 {
        return this.$storage.script;
    }
    public set script($value: uint16) {
        this.$storage.script = $value;
    }
    public get maxScript(): uint16 {
        return this.$storage.maxScript;
    }
    public set maxScript($value: uint16) {
        this.$storage.maxScript = $value;
    }
    public get toRegion(): uint16 {
        return this.$storage.toRegion;
    }
    public set toRegion($value: uint16) {
        this.$storage.toRegion = $value;
    }
    public get fromRegion(): RuntimeSlice<uint16> {
        return this.$storage.fromRegion;
    }
    public set fromRegion($value: RuntimeSlice<uint16>) {
        this.$storage.fromRegion = $value;
    }
    static $zero(): parentRel {
        return new parentRel({
            lang: 0,
            script: 0,
            maxScript: 0,
            toRegion: 0,
            fromRegion: RuntimeSlice.nil<uint16>()
        });
    }
    declare private readonly then?: never;
}
