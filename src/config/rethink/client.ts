import rethinkdbdash from "rethinkdbdash";
const {
  RETHINKDB_HOST = "localhost",
  RETHINKDB_DB = "jaydb",
}: any = process.env;

//rethink client
export default rethinkdbdash({ db: RETHINKDB_DB, servers: RETHINKDB_HOST });
