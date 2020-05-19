import { parse } from "ini";
import { readFileSync } from "fs";
import { IConfig } from "../interfaces/IConfig";

export const config = parse(
  readFileSync(process.env.CONFIGFILE || "../../config.ini", "utf-8"),
) as IConfig;
