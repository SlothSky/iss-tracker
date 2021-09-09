export declare class SatelliteService {
    private TERMINAL_COLOR_PREFIX;
    private TERMINAL_COLOR_SUFFIX;
    private BROWSER_COLOR_PREFIX;
    private BROWSER_COLOR_SUFFIX;
    getSatelliteMap(usedTech: string, indeces: Array<number>): string;
    addCoordinatesToMap(usedTech: string, mapInput: string, issIndeces: Array<number>): string;
}
