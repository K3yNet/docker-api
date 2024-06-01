db = db.getSiblingDB('library');
db.createUser(
    {
        user: 'root',
        pwd: 'root',
        roles: [{ role: 'readWrite', db: 'library' }],
    },
);