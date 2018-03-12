/// <reference types="yargs" />
import { Arguments, CommandModule } from 'yargs';
export declare const command = "new [directory]";
export declare const description = "Initialize a new Origami app";
export declare const builder: CommandModule["builder"];
export declare const handler: (yargs: Arguments) => Promise<void>;
