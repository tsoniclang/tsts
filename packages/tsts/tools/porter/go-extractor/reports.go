package main

const porterSnapshotSchemaVersion = 11

type Snapshot struct {
	SchemaVersion int                    `json:"schemaVersion"`
	SourceRoot    string                 `json:"sourceRoot"`
	ModulePath    string                 `json:"modulePath"`
	GitRevision   string                 `json:"gitRevision"`
	Environment   Environment            `json:"environment"`
	Semantic      SemanticEvidenceReport `json:"semantic"`
	Summary       Summary                `json:"summary"`
	Files         []FileReport           `json:"files"`
}

type Environment struct {
	GoVersion string `json:"goVersion"`
	GOOS      string `json:"goos"`
	GOARCH    string `json:"goarch"`
}

type SemanticEvidenceReport struct {
	Toolchain                  string                               `json:"toolchain"`
	ToolchainExecutable        string                               `json:"toolchainExecutable"`
	ToolchainHash              string                               `json:"toolchainHash"`
	GOROOT                     string                               `json:"goroot"`
	GOROOTHash                 string                               `json:"gorootHash"`
	GOROOTHashContract         string                               `json:"gorootHashContract"`
	GOROOTEntryCount           int                                  `json:"gorootEntryCount"`
	GOROOTFileCount            int                                  `json:"gorootFileCount"`
	GOROOTDirectoryCount       int                                  `json:"gorootDirectoryCount"`
	GOROOTSymlinkCount         int                                  `json:"gorootSymlinkCount"`
	GOROOTBytes                int64                                `json:"gorootBytes"`
	Compiler                   string                               `json:"compiler"`
	ReleaseTags                []string                             `json:"releaseTags"`
	ModulePath                 string                               `json:"modulePath"`
	RequiredFiles              []string                             `json:"requiredFiles"`
	CoveredFiles               []string                             `json:"coveredFiles"`
	ExcludedFiles              []string                             `json:"excludedFiles"`
	Profiles                   []SemanticProfileReport              `json:"profiles"`
	UnsupportedProfiles        []SemanticProfileRejectionReport     `json:"unsupportedProfiles"`
	ModuleGraph                []SemanticModuleReport               `json:"moduleGraph"`
	MethodSetSignatures        []SemanticMethodSetSignatureReport   `json:"methodSetSignatures"`
	DependencyTypeDeclarations []SemanticDeclarationReport          `json:"dependencyTypeDeclarations"`
	ExternalPackageSurface     SemanticExternalPackageSurfaceReport `json:"externalPackageSurface"`
}

type SemanticExternalPackageSurfaceReport struct {
	Selections                 []string                                  `json:"selections"`
	UnresolvedSelections       []SemanticExternalPackageUnresolvedReport `json:"unresolvedSelections"`
	Declarations               []SemanticDeclarationReport               `json:"declarations"`
	DependencyTypeDeclarations []SemanticDeclarationReport               `json:"dependencyTypeDeclarations"`
}

type SemanticExternalPackageUnresolvedReport struct {
	ObjectID string `json:"objectId"`
	Profiles []int  `json:"profiles"`
}

type SemanticProfileReport struct {
	GOOS              string   `json:"goos"`
	GOARCH            string   `json:"goarch"`
	CgoEnabled        bool     `json:"cgoEnabled"`
	Architecture      string   `json:"architecture"`
	Experiments       string   `json:"experiments"`
	ExperimentSetting string   `json:"goexperiment"`
	BuildTags         []string `json:"buildTags"`
	BuildFlags        []string `json:"buildFlags"`
	ToolTags          []string `json:"toolTags"`
	Environment       []string `json:"environment"`
	PackageIDs        []string `json:"packageIds"`
	CoveredFiles      []string `json:"coveredFiles"`
}

type SemanticProfileRejectionReport struct {
	GOOS              string `json:"goos"`
	GOARCH            string `json:"goarch"`
	CgoEnabled        bool   `json:"cgoEnabled"`
	Architecture      string `json:"architecture"`
	ExperimentSetting string `json:"goexperiment"`
	Reason            string `json:"reason"`
}

type SemanticModuleReport struct {
	Path           string `json:"path"`
	Version        string `json:"version"`
	Sum            string `json:"sum"`
	ReplacePath    string `json:"replacePath"`
	ReplaceVersion string `json:"replaceVersion"`
	ReplaceSum     string `json:"replaceSum"`
}

type Summary struct {
	FileCount       int            `json:"fileCount"`
	GoFileCount     int            `json:"goFileCount"`
	GeneratedFiles  int            `json:"generatedFiles"`
	LineCount       int            `json:"lineCount"`
	UnitCount       int            `json:"unitCount"`
	UnitKindCounts  map[string]int `json:"unitKindCounts"`
	BuildTagCounts  map[string]int `json:"buildTagCounts"`
	PackageCounts   map[string]int `json:"packageCounts"`
	ImportPathCount int            `json:"importPathCount"`
	StructTagCount  int            `json:"structTagCount"`
	StructTagKeys   map[string]int `json:"structTagKeyCounts"`
}

type FileReport struct {
	Path              string            `json:"path"`
	SourceHash        string            `json:"sourceHash"`
	GitBlobHash       string            `json:"gitBlobHash"`
	ByteLength        int               `json:"byteLength"`
	PackageName       string            `json:"packageName"`
	ImportPath        string            `json:"importPath"`
	LineCount         int               `json:"lineCount"`
	Generated         bool              `json:"generated"`
	BuildTags         []string          `json:"buildTags"`
	ImplicitBuildTags []string          `json:"implicitBuildTags"`
	Imports           []ImportReport    `json:"imports"`
	Units             []UnitReport      `json:"units"`
	Metadata          map[string]string `json:"metadata"`
}

type ImportReport struct {
	Name        string `json:"name,omitempty"`
	PackageName string `json:"packageName,omitempty"`
	Path        string `json:"path"`
}

type UnitReport struct {
	ID                   string                      `json:"id"`
	Kind                 string                      `json:"kind"`
	Name                 string                      `json:"name"`
	QualifiedName        string                      `json:"qualifiedName"`
	Receiver             string                      `json:"receiver,omitempty"`
	ReceiverMode         string                      `json:"receiverMode,omitempty"`
	ReceiverType         *TypeExprReport             `json:"receiverType,omitempty"`
	TypeKind             string                      `json:"typeKind,omitempty"`
	Exported             bool                        `json:"exported"`
	Generated            bool                        `json:"generated"`
	StartLine            int                         `json:"startLine"`
	EndLine              int                         `json:"endLine"`
	StartOffset          int                         `json:"startOffset"`
	EndOffset            int                         `json:"endOffset"`
	Signature            string                      `json:"signature"`
	SigHash              string                      `json:"sigHash"`
	BodyHash             string                      `json:"bodyHash"`
	Snippet              string                      `json:"snippet"`
	TypeParameters       []string                    `json:"typeParameters"`
	TypeParameterDetails []TypeParameterReport       `json:"typeParameterDetails"`
	Parameters           []ParamReport               `json:"parameters"`
	Results              []ParamReport               `json:"results"`
	TypeExpression       *TypeExprReport             `json:"typeExpression,omitempty"`
	ValueSpecs           []ValueSpecReport           `json:"valueSpecs"`
	Members              []MemberReport              `json:"members"`
	Semantic             []SemanticDeclarationReport `json:"semantic,omitempty"`
	Metadata             map[string]string           `json:"metadata"`
}

type MemberReport struct {
	Kind         string                 `json:"kind"`
	Name         string                 `json:"name"`
	Exported     bool                   `json:"exported"`
	Type         string                 `json:"type,omitempty"`
	TypeExpr     *TypeExprReport        `json:"typeExpr,omitempty"`
	StructTag    *string                `json:"structTag,omitempty"`
	TagValues    []StructTagValueReport `json:"tagValues,omitempty"`
	TagRemainder *string                `json:"tagRemainder,omitempty"`
}

type StructTagValueReport struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type ParamReport struct {
	Names    []string        `json:"names,omitempty"`
	Type     *TypeExprReport `json:"type"`
	Variadic bool            `json:"variadic,omitempty"`
}

type TypeParameterReport struct {
	Name       string          `json:"name"`
	Constraint *TypeExprReport `json:"constraint,omitempty"`
}

type ValueSpecReport struct {
	Names []string        `json:"names"`
	Type  *TypeExprReport `json:"type,omitempty"`
}

type TypeExprReport struct {
	Kind       string           `json:"kind"`
	Text       string           `json:"text"`
	Name       string           `json:"name,omitempty"`
	Package    string           `json:"package,omitempty"`
	Op         string           `json:"op,omitempty"`
	Direction  string           `json:"direction,omitempty"`
	Length     string           `json:"length,omitempty"`
	Element    *TypeExprReport  `json:"element,omitempty"`
	Key        *TypeExprReport  `json:"key,omitempty"`
	Value      *TypeExprReport  `json:"value,omitempty"`
	Left       *TypeExprReport  `json:"left,omitempty"`
	Right      *TypeExprReport  `json:"right,omitempty"`
	TypeArgs   []TypeExprReport `json:"typeArgs,omitempty"`
	Parameters []ParamReport    `json:"parameters,omitempty"`
	Results    []ParamReport    `json:"results,omitempty"`
	Members    []MemberReport   `json:"members,omitempty"`
}

type SemanticDeclarationReport struct {
	Kind        string                    `json:"kind"`
	PackagePath string                    `json:"packagePath"`
	Object      *SemanticObjectReport     `json:"object,omitempty"`
	Type        *SemanticTypeDeclaration  `json:"type,omitempty"`
	ValueSpecs  []SemanticValueSpecReport `json:"valueSpecs,omitempty"`
	Signature   *SemanticSignatureReport  `json:"signature,omitempty"`
	Profiles    []int                     `json:"profiles"`
}

type SemanticObjectReport struct {
	ID          string              `json:"id"`
	Name        string              `json:"name"`
	PackagePath string              `json:"packagePath"`
	Exported    bool                `json:"exported"`
	Type        *SemanticTypeReport `json:"type,omitempty"`
}

type SemanticTypeDeclaration struct {
	Alias            bool                            `json:"alias"`
	Object           SemanticObjectReport            `json:"object"`
	TypeParameters   []SemanticTypeParameterReport   `json:"typeParameters"`
	RHS              *SemanticTypeReport             `json:"rhs"`
	MethodSurface    string                          `json:"methodSurface"`
	Methods          []SemanticMethodReport          `json:"methods"`
	ValueMethodSet   []SemanticMethodSelectionReport `json:"valueMethodSet"`
	PointerMethodSet []SemanticMethodSelectionReport `json:"pointerMethodSet"`
}

type SemanticValueSpecReport struct {
	SpecIndex int                          `json:"specIndex"`
	Names     []SemanticValueBindingReport `json:"names"`
}

type SemanticValueBindingReport struct {
	Name      string                  `json:"name"`
	NameIndex int                     `json:"nameIndex"`
	Blank     bool                    `json:"blank"`
	Type      *SemanticTypeReport     `json:"type"`
	Object    *SemanticObjectReport   `json:"object,omitempty"`
	Constant  *SemanticConstantReport `json:"constant,omitempty"`
}

type SemanticConstantReport struct {
	Kind        string  `json:"kind"`
	Exact       string  `json:"exact"`
	StringValue *string `json:"stringValue,omitempty"`
}

type SemanticTypeReport struct {
	Kind          string                       `json:"kind"`
	Nilable       bool                         `json:"nilable"`
	Basic         *SemanticBasicTypeReport     `json:"basic,omitempty"`
	Reference     *SemanticTypeReferenceReport `json:"reference,omitempty"`
	TypeParameter *SemanticTypeParameterRef    `json:"typeParameter,omitempty"`
	Element       *SemanticTypeReport          `json:"element,omitempty"`
	Key           *SemanticTypeReport          `json:"key,omitempty"`
	Length        *string                      `json:"length,omitempty"`
	Direction     string                       `json:"direction,omitempty"`
	Signature     *SemanticSignatureReport     `json:"signature,omitempty"`
	Tuple         *SemanticTupleReport         `json:"tuple,omitempty"`
	Struct        *SemanticStructReport        `json:"struct,omitempty"`
	Interface     *SemanticInterfaceReport     `json:"interface,omitempty"`
	Union         *SemanticUnionReport         `json:"union,omitempty"`
}

type SemanticBasicTypeReport struct {
	Name    string `json:"name"`
	Untyped bool   `json:"untyped"`
}

type SemanticTypeReferenceReport struct {
	ObjectID    string                `json:"objectId"`
	PackagePath string                `json:"packagePath"`
	Name        string                `json:"name"`
	TypeArgs    []*SemanticTypeReport `json:"typeArgs"`
}

type SemanticTypeParameterRef struct {
	OwnerID string `json:"ownerId"`
	Role    string `json:"role"`
	Index   int    `json:"index"`
	Name    string `json:"name"`
}

type SemanticTypeParameterReport struct {
	Reference        SemanticTypeParameterRef  `json:"reference"`
	Constraint       *SemanticTypeReport       `json:"constraint"`
	ConstraintSource *SemanticTypeParameterRef `json:"constraintSource,omitempty"`
	ConstraintSyntax string                    `json:"constraintSyntax"`
}

type SemanticSignatureReport struct {
	Receiver                *SemanticVariableReport       `json:"receiver,omitempty"`
	ReceiverMode            string                        `json:"receiverMode,omitempty"`
	ReceiverTypeParameters  []SemanticTypeParameterReport `json:"receiverTypeParameters"`
	TypeParameters          []SemanticTypeParameterReport `json:"typeParameters"`
	Parameters              SemanticTupleReport           `json:"parameters"`
	Results                 SemanticTupleReport           `json:"results"`
	Variadic                bool                          `json:"variadic"`
	ParameterNameProvenance string                        `json:"parameterNameProvenance"`
}

type SemanticTupleReport struct {
	Variables []SemanticVariableReport `json:"variables"`
}

type SemanticVariableReport struct {
	ID          string              `json:"id"`
	Name        string              `json:"name"`
	NameKind    string              `json:"nameKind"`
	PackagePath string              `json:"packagePath"`
	Embedded    bool                `json:"embedded,omitempty"`
	Exported    bool                `json:"exported"`
	Type        *SemanticTypeReport `json:"type"`
}

type SemanticStructReport struct {
	Fields []SemanticStructFieldReport `json:"fields"`
}

type SemanticStructFieldReport struct {
	Variable     SemanticVariableReport `json:"variable"`
	Tag          string                 `json:"tag"`
	TagValues    []StructTagValueReport `json:"tagValues"`
	TagRemainder string                 `json:"tagRemainder"`
}

type SemanticInterfaceReport struct {
	ExplicitMethods               []SemanticMethodReport `json:"explicitMethods"`
	EmbeddedTypes                 []*SemanticTypeReport  `json:"embeddedTypes"`
	EmbeddedKinds                 []string               `json:"embeddedKinds"`
	CompleteMethods               []SemanticMethodReport `json:"completeMethods"`
	Comparable                    bool                   `json:"comparable"`
	Implicit                      bool                   `json:"implicit"`
	MethodSetOnly                 bool                   `json:"methodSetOnly"`
	ExplicitMethodOrderProvenance string                 `json:"explicitMethodOrderProvenance"`
}

type SemanticMethodReport struct {
	ID          string                   `json:"id"`
	OwnerID     string                   `json:"ownerId"`
	Name        string                   `json:"name"`
	PackagePath string                   `json:"packagePath"`
	Exported    bool                     `json:"exported"`
	Signature   *SemanticSignatureReport `json:"signature"`
}

type SemanticMethodSelectionReport struct {
	Key           string                   `json:"key"`
	MethodID      string                   `json:"methodId"`
	MethodOwnerID string                   `json:"methodOwnerId"`
	Name          string                   `json:"name"`
	PackagePath   string                   `json:"packagePath"`
	Exported      bool                     `json:"exported"`
	Index         []int                    `json:"index"`
	Indirect      bool                     `json:"indirect"`
	Promoted      bool                     `json:"promoted"`
	SignatureID   string                   `json:"signatureId"`
	Signature     *SemanticSignatureReport `json:"-"`
}

type SemanticMethodSetSignatureReport struct {
	ID        string                   `json:"id"`
	MethodID  string                   `json:"methodId"`
	Signature *SemanticSignatureReport `json:"signature"`
}

type SemanticUnionReport struct {
	Terms []SemanticUnionTermReport `json:"terms"`
}

type SemanticUnionTermReport struct {
	Tilde bool                `json:"tilde"`
	Type  *SemanticTypeReport `json:"type"`
}
