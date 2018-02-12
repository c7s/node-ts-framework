import * as cluster from 'cluster';
import { Application } from './Application';
import { MainLogger } from '../../../components/logging';

export class ClusteredApplication extends Application {

    public run(): void {
        if (cluster.isMaster) {
            const workersCount = this.config.workers;
            MainLogger.info(`Starting ${workersCount} workers`);
            for (let i = 0; i < workersCount; i++) {
                cluster.fork();
            }
        } else {
            super.run();
        }
    }
}
