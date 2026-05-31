export interface TypeValidatedField {
  isPresent(): boolean;
  isValid(): boolean;
  expectedJSONType(): string;
  actualJSONType(): string;
}
