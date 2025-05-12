export interface ActitoAsset {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly key?: string;
  readonly url?: string;
  readonly button?: ActitoAssetButton;
  readonly metaData?: ActitoAssetMetaData;
  readonly extra: Record<string, unknown>;
}

export interface ActitoAssetButton {
  readonly label?: string;
  readonly action?: string;
}

export interface ActitoAssetMetaData {
  readonly originalFileName: string;
  readonly contentType: string;
  readonly contentLength: number;
}
