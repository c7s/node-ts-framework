import * as cluster from 'cluster';
import { WebApplication } from './WebApplication';

export class ClusteredWebApplication extends WebApplication {

  public async run() {
    if (cluster.isMaster) {
      const workersCount = this.config.workers;
      this.logger.info(`Starting ${workersCount} workers`);
      for (let i = 0; i < workersCount; i += 1) {
        cluster.fork();
      }
    } else {
      super.run();
    }
  }
}
