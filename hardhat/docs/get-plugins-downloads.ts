import fs from "fs";
import { request } from "undici";

const plugins = require("./.vuepress/plugins");

async function getLastMonthDownloads(npmPackage: string): Promise<number> {
  const res = await request(
    `https://api.npmjs.org/downloads/point/last-month/${npmPackage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (res.statusCode === 404) {
    return 0;
  }

  const json = await res.body.json() as { downloads: number };

  return json.downloads;
}

async function main() {
  const downloads: Array<{ [plugin: string]: number }> = await Promise.all(
    [...plugins.officialPlugins, ...plugins.communityPlugins].map(
      async (p: any) => ({
        [p.name]: await getLastMonthDownloads(p.npmPackage ?? p.name),
      })
    )
  );

  downloads.sort((p1, p2) => Object.values(p2)[0] - Object.values(p1)[0]);

  const result = Object.assign({}, ...downloads);
  fs.writeFileSync(
    __dirname + "/.vuepress/plugin-downloads.json",
    JSON.stringify(result, undefined, 2)
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
