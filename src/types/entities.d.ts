/**
 * Interface represents Relay Connection model
 */
export interface EntityConnection {
  readonly entities: {
    readonly totalCount: number;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly [key: string]: string | null;
      };
    }>;
  };
  readonly ' $refType': string;
}
