import { readFileSync } from "fs";
import path from "path";
import YAML from "yaml";

const swaggerDocumentFileContents = readFileSync(
  path.resolve(__dirname, "./../../../openapi.yaml"),
  "utf-8"
);
const swaggerDocument = YAML.parse(swaggerDocumentFileContents);

export default swaggerDocument;
