import * as L from 'leaflet';

declare module 'leaflet' {
  function curve(
    path: Array<string | number[]>,
    options?: L.PathOptions
  ): L.Curve;

  class Curve extends L.Path {
    constructor(path: Array<string | number[]>, options?: L.PathOptions);
  }

  namespace Curve {
    export function curve(
      path: Array<string | number[]>,
      options?: L.PathOptions
    ): Curve;
  }
}