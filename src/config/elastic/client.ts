import { Client } from "@elastic/elasticsearch";

//elastic client
export default new Client({ node: "http://localhost:9200" });
