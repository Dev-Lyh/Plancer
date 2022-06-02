/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'plancerDatabase.db'; //name do banco de dados
const database_version = '1.0'; //Versão do banco de dados
const database_displayname = 'SQLite React Offline Database'; //name de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

export default class Database {

    Conectar() {
        let db;
        return new Promise((resolve) => {
            console.log("Checking plugin's integrity...");
            SQLite.echoTest().then(() => {
                console.log('Integrity ok...');
                console.log('Opening Database ...');
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;
                    console.log('DATABASE OPEN');
                    db.executeSql('SELECT 1 FROM Gig LIMIT 1;').then(() => {
                        console.log('O banco de dados está pronto ... Executando Consulta SQL ...');
                    }).catch((error) => {
                        console.log('Erro Recebido: ', error);
                        console.log('O Banco de dados não está pronto ... Criando Dados');
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Gig (idGig INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, gigDate TEXT, deadLine TEXT, price TEXT, clientName TEXT, phoneClient TEXT, concluded TEXT);');
                        }).then(() => {
                            console.log('Successfully created table GIGS');
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    db.executeSql('SELECT 1 FROM Client LIMIT 1;').then(() => {
                        console.log('O banco de dados está pronto ... Executando Consulta SQL ...');
                    }).catch((error) => {
                        console.log('Erro Recebido: ', error);
                        console.log('O Banco de dados não está pronto ... Criando Dados');
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Client (idClient INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phoneNumber TEXT, favorite TEXT, imgPath TEXT);');
                        }).then(() => {
                            console.log('Successfully created tables CLIENTS');
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log('echoTest Failed - plugin not working');
            });
        });
    }

    Desconectar(db) {
        if (db) {
            console.log('Closing Database');
            db.close().then(status => {
                console.log('Disconnected Database!!');
            }).catch(error => {
                this.errorCB(error);
            });
        } else {
            console.log('Database connection is not open');
        }
    }

    ListGigs() {
        return new Promise((resolve) => {
            const listGigs = [];
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela;
                    tx.executeSql('SELECT * FROM Gig ORDER BY idGig DESC', []).then(([tx, results]) => {
                        console.log('Full consultation');
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { idGig, title, description, gigDate, deadLine, price, clientName, phoneClient, concluded } = row;
                            listGigs.push({ idGig, title, description, gigDate, deadLine, price, clientName, phoneClient, concluded });
                        }
                            console.log(listGigs);
                            resolve(listGigs);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    ListClients() {
        return new Promise((resolve) => {
            const listClients = [];
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela;
                    tx.executeSql('SELECT * FROM Client ORDER BY name ASC', []).then(([tx, results]) => {
                        console.log('Full consultation');
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { idClient, name, email, phoneNumber, favorite, imgPath } = row;
                            listClients.push({ idClient, name, email, phoneNumber, favorite, imgPath });
                        }
                        console.log(listClients);
                        resolve(listClients);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    SearchIdGig(id) {
        console.log(id);
        return new Promise((resolve) => {
            this.Conector().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para buscar as informações do produto;
                    tx.executeSql('SELECT * FROM Gig WHERE idGig = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        if (results.rows.length > 0) {
                            let row = results.rows.item(0);
                            resolve(row);
                        }
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    SearchIdClient(id) {
        console.log(id);
        return new Promise((resolve) => {
            this.Conector().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para buscar as informações do produto;
                    tx.executeSql('SELECT * FROM Client WHERE idClient = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        if (results.rows.length > 0) {
                            let row = results.rows.item(0);
                            resolve(row);
                        }
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    InsertGig(item) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para inserir um novo produto;
                    tx.executeSql('INSERT INTO Gig ( title, description, gigDate, deadLine, price, clientName, phoneClient ) VALUES (?, ?, ?, ?, ?, ?, ?)', [item.title, item.description, item.gigDate, item.deadLine, item.price, item.clientName, item.phoneClient]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    InsertClient(item) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para inserir um novo produto;
                    tx.executeSql('INSERT INTO Client ( name, email, phoneNumber, favorite, imgPath ) VALUES (?, ?, ?, ?, ?)', [item.name, item.email, item.phoneNumber, item.favorite, item.imgPath]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    UpdateGig(item) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco;
                    tx.executeSql('UPDATE Gig SET concluded = "Sim" WHERE idGig = ?', [item.idGig]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    UpdateToFavorite(item) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco;
                    tx.executeSql('UPDATE Client SET favorite = "true" WHERE idClient = ?', [item.idClient]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    UpdateToUnfavorite(item) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco;
                    tx.executeSql('UPDATE Client SET favorite = "false" WHERE idClient = ?', [item.idClient]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    DeleteGig(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para deletar um item da base de dados;
                    tx.executeSql('DELETE FROM Gig WHERE idGig = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    DeleteClient(idClient) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para deletar um item da base de dados;
                    tx.executeSql('DELETE FROM Client WHERE idClient = ?', [idClient]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
}
