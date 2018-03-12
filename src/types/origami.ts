export module Origami {
    // ------------------------------------------------------------- Config file
    export interface Config {
        /** Settings for the overall project */
        "app": ConfigApp;
        /** Settings for the store/database */
        "store": ConfigStore;
        /** Settings for the theme */
        "theme": ConfigTheme;
        /** Settings for the server setup */
        "server": ConfigServer;
    }

    export interface ConfigApp {
        /** Name of the project */
        "name": string;
    }

    export interface ConfigStore {
        /** Store/Database type to integrate with */
        "type": string;
        /** Store/Database hostname to connect with */
        "host": string;
        /** Store/Database port to connect with */
        "port": number;
        /** Store/Database db name to connect with */
        "database": string;
        /** Store/Database username to connect with */
        "username": string;
        /** Store/Database password to connect with */
        "password": string;
    }

    export interface ConfigTheme {
        /** Theme name to run */
        "name": string
    }

    export interface ConfigServer {
        /** Secret code to encrypt data and authentication tokens with */
        "secret": string,
        /** Port number to run the server on */
        "port": number
    }
}
