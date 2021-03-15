import client from "./client";
import rethinkdb_client from "../rethink/client";
import bluebird from "bluebird";

export default async () => {
  const tables = ["users", "posts"];

  //check index users and posts, if not exist create
  await bluebird.map(tables, async (table) => {
    await client.indices
      .exists({ index: table })
      .then(async ({ statusCode }) => {
        if (statusCode === 404) await client.indices.create({ index: table });
      });
  });

  //listener
  const processRow = (cursor: any, table: string) => {
    return async (err: any, data: any) => {
      if (err) throw err;

      //check if theirs data added in rethinkdb
      if (data.type === "add") {
        await client
          .index({
            index: table, // table
            body: {
              ...data.new_val,
            },
          })
          .catch((e) => {
            console.log(e.meta.body.error);
          });
      }

      //check if theirs data updated in rethinkdb
      if (data.type === "change") {
        const source = Object.keys(data.new_val).reduce((acc, key) => {
          return `${acc}ctx._source["${key}"]="${data.new_val[key]}";`;
        }, "");
        await client
          .updateByQuery({
            index: table,
            refresh: true,
            body: {
              script: {
                source,
              },
              query: {
                match: {
                  id: data.old_val.id,
                },
              },
            },
          })
          .catch((e) => {
            console.log(e.meta.body.error);
          });
      }

      //check if theirs data deleted in rethinkdb
      if (data.type === "remove") {
        await client
          .deleteByQuery({
            body: {
              query: {
                match: {
                  id: data.old_val.id,
                },
              },
            },
            index: table,
          })
          .catch((e) => {
            console.log(e.meta.body.error);
          });
      }
      cursor.next(processRow(cursor, table));
    };
  };

  tables.map(async (table) => {
    await rethinkdb_client
      .table(table)
      .changes({ includeTypes: true })
      .run()
      .then((cursor) => cursor.next(processRow(cursor, table)));
  });
};
