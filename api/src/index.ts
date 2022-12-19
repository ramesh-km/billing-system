import signale from "signale";
import app from "./app";
import config from "./lib/config";

async function main() {
  signale.info("Node environment:", config.NODE_ENV);
  signale.info("Database URL:", config.DATABASE_URL);

  if (config.NODE_ENV === "development") {
    // console.clear();
  }

  app.listen(config.PORT, () => {
    signale.success(`Server listening on port ${config.PORT}`);
  });
}

main().catch((error) => {
  signale.fatal(error);
  process.exit(1);
});
