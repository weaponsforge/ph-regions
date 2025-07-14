declare module 'ph-municipalities' {
  class ExcelFactory {
    prototype: unknown
    constructor();

    listMunicipalities();
    listRegions(param: string);
    listProvinces(param: string);
  }

  export {
    ExcelFactory
  }
}
