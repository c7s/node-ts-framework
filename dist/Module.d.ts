import { Container } from 'inversify';
export declare abstract class Module {
    readonly controllers: string;
    readonly migrations: string;
    readonly models: string;
    abstract initDiContainer(container: Container): Promise<void>;
    protected readonly abstract baseDirectory: string;
}
