declare module 'ph-municipalities' {
  class ExcelFactory {
    prototype: unknown
    constructor();

    /** Returns a map: provinceName → list of municipalities */
    listMunicipalities(opts: { provinces: string[] }): Record<string, string[]>;

    /** Returns a list of region values (e.g., names, abbrevs, region_num, region_name) */
    listRegions(field: string): string[];

    /** Returns a list of province names for the given region */
    listProvinces(param: string): string[];
  }

  export {
    ExcelFactory,
  }
}
