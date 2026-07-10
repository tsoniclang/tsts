package main

type Snapshot struct {
	SchemaVersion int          `json:"schemaVersion"`
	SourceRoot    string       `json:"sourceRoot"`
	ModulePath    string       `json:"modulePath"`
	GitRevision   string       `json:"gitRevision"`
	Environment   Environment  `json:"environment"`
	Summary       Summary      `json:"summary"`
	Files         []FileReport `json:"files"`
}

type Environment struct {
	GoVersion string `json:"goVersion"`
	GOOS      string `json:"goos"`
	GOARCH    string `json:"goarch"`
}

type Summary struct {
	FileCount       int            `json:"fileCount"`
	GoFileCount     int            `json:"goFileCount"`
	GeneratedFiles  int            `json:"generatedFiles"`
	LineCount       int            `json:"lineCount"`
	UnitCount       int            `json:"unitCount"`
	UnitKindCounts  map[string]int `json:"unitKindCounts"`
	NodeKindCounts  map[string]int `json:"nodeKindCounts"`
	BuildTagCounts  map[string]int `json:"buildTagCounts"`
	PackageCounts   map[string]int `json:"packageCounts"`
	ImportPathCount int            `json:"importPathCount"`
}

type FileReport struct {
	Path              string            `json:"path"`
	SourceHash        string            `json:"sourceHash"`
	GitBlobHash       string            `json:"gitBlobHash"`
	PackageName       string            `json:"packageName"`
	ImportPath        string            `json:"importPath"`
	LineCount         int               `json:"lineCount"`
	Generated         bool              `json:"generated"`
	BuildTags         []string          `json:"buildTags"`
	ImplicitBuildTags []string          `json:"implicitBuildTags"`
	Imports           []ImportReport    `json:"imports"`
	Units             []UnitReport      `json:"units"`
	NodeKindCounts    map[string]int    `json:"nodeKindCounts"`
	FeatureCounts     map[string]int    `json:"featureCounts"`
	ParseError        string            `json:"parseError,omitempty"`
	Metadata          map[string]string `json:"metadata"`
}

type ImportReport struct {
	Name            string `json:"name,omitempty"`
	PackageName     string `json:"packageName,omitempty"`
	Path            string `json:"path"`
	ResolutionError string `json:"resolutionError,omitempty"`
}

type UnitReport struct {
	ID                   string                `json:"id"`
	Kind                 string                `json:"kind"`
	Name                 string                `json:"name"`
	QualifiedName        string                `json:"qualifiedName"`
	Receiver             string                `json:"receiver,omitempty"`
	ReceiverMode         string                `json:"receiverMode,omitempty"`
	ReceiverType         *TypeExprReport       `json:"receiverType,omitempty"`
	TypeKind             string                `json:"typeKind,omitempty"`
	Exported             bool                  `json:"exported"`
	Generated            bool                  `json:"generated"`
	StartLine            int                   `json:"startLine"`
	EndLine              int                   `json:"endLine"`
	Signature            string                `json:"signature"`
	SigHash              string                `json:"sigHash"`
	BodyHash             string                `json:"bodyHash"`
	Snippet              string                `json:"snippet"`
	TypeParameters       []string              `json:"typeParameters,omitempty"`
	TypeParameterDetails []TypeParameterReport `json:"typeParameterDetails,omitempty"`
	Parameters           []ParamReport         `json:"parameters,omitempty"`
	Results              []ParamReport         `json:"results,omitempty"`
	TypeExpression       *TypeExprReport       `json:"typeExpression,omitempty"`
	ValueSpecs           []ValueSpecReport     `json:"valueSpecs,omitempty"`
	Members              []MemberReport        `json:"members,omitempty"`
	ExternalRefs         []ExternalRefReport   `json:"externalRefs,omitempty"`
	NodeKindCounts       map[string]int        `json:"nodeKindCounts"`
	FeatureCounts        map[string]int        `json:"featureCounts"`
	Metadata             map[string]string     `json:"metadata"`
}

type ExternalRefReport struct {
	ImportPath string `json:"importPath"`
	Package    string `json:"package"`
	Name       string `json:"name"`
	Role       string `json:"role"`
	Count      int    `json:"count"`
}

type MemberReport struct {
	Kind     string          `json:"kind"`
	Name     string          `json:"name"`
	Type     string          `json:"type,omitempty"`
	TypeExpr *TypeExprReport `json:"typeExpr,omitempty"`
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
	Names              []string              `json:"names"`
	Type               *TypeExprReport       `json:"type,omitempty"`
	Values             []string              `json:"values,omitempty"`
	InferredValueTypes []*TypeExprReport     `json:"inferredValueTypes,omitempty"`
	ConstantValues     []ConstantValueReport `json:"constantValues,omitempty"`
	ConstIndex         int                   `json:"constIndex,omitempty"`
}

type ConstantValueReport struct {
	Supported bool   `json:"supported"`
	Kind      string `json:"kind,omitempty"`
	Exact     string `json:"exact"`
	Reason    string `json:"reason,omitempty"`
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
