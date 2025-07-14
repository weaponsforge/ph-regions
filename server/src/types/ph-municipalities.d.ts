declare module 'ph-municipalities' {
  class ExcelFactory {
    prototype: unknown
    constructor();

    listMunicipalities({ provinces: [] }: { provinces: string[] });
    listRegions(param: string);
    listProvinces(param: string);
  }

  export {
    ExcelFactory
  }
}
