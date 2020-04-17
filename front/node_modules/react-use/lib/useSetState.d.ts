declare const useSetState: <T extends object>(initialState?: T) => [T, (patch: Partial<T> | (() => void)) => void];
export default useSetState;
