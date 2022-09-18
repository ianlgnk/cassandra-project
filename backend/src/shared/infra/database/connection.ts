import { keyspace } from "./migrations";

const cassandra = require("cassandra-driver");

const client = new cassandra.Client({
  contactPoints: ["localhost"],
  localDataCenter: "datacenter1",
  keyspace: keyspace,
});

export async function query(cql: string, params?: string[]): Promise<any[]> {
  try {
    const response = client.execute(cql, params).then((res: any) => res);
    return response;
  } catch (error) {
    throw error;
  }
}
