const keyspace = "bdIICassandraProject";

const migrations = `
    CREATE KEYSPACE IF NOT EXISTS "${keyspace}"
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

    CREATE TABLE IF NOT EXISTS "${keyspace}"."person" (
        id uuid,
        name text,
        email text,
        PRIMARY KEY(id)
    );
`;

export { keyspace, migrations };
