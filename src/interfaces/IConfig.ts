export enum IConfigDNISMode {
  file = "file",
  db = "db",
}

export interface IConfigFS {
  hostname: string;
  port: number;
  credentials: string;

  /**
   * check current active channels in seconds
   */
  check_period: number;

  /**
   * how many query on the same connection
   */
  queries_per_connection: number;

  originate_call_ip: string;

  call_per_sec: number;
  min_duration: number;
  max_duration: number;

  execute_on_answer_tones: number[];

  hangup_tones: number[];

  prefix?: string;

  log_request: boolean;
}

export interface IConfig {
  FREESWITCHSOCKETS: IConfigFS;

  testnumbercaller: {
    /**
     * worker threads
     */
    threads: number;

    /**
     * time between input files changes checks
     */
    reload_time: number;

    /**
     * sleep in sec
     */
    sleep_time: number;
    mode: IConfigDNISMode;
    dnis_path: string;
    ani_path: string;
    endless_playbacks_path: string;
    result_true_num_file: string;
    state_path: string;
    logfile: string;
    lockfile: string;
  };

  redis: {
    hostname: string;
    port: number;
    prefix: string;
  };

  logger: {
    level: string;
    console: boolean;
    errorlog: string;
    combinedlog: string;
  };
}
