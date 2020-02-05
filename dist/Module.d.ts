import { Container } from 'inversify';
export declare abstract class Module {
    get controllers(): string;
    get migrations(): string;
    get models(): string;
    abstract initDiContainer(container: Container, allApplicationModules: Module[]): Promise<void>;
    abstract end(container: Container): Promise<void>;
    protected abstract get baseDirectory(): string;
}
