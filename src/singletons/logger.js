import vscode from 'vscode';
import { on } from './event-bus';

class Logger {
    constructor() {
        this.channel = vscode.window.createOutputChannel('VS-FiveM');
    }

    // MM/DD/YYYY - HH:II:SS
    date() {
        const now = new Date();

        const mm = String(now.getMonth() + 1).padStart(2, '0'),
            dd = String(now.getDate()).padStart(2, '0'),
            yyyy = now.getFullYear();

        const hh = String(now.getHours()).padStart(2, '0'),
            ii = String(now.getMinutes()).padStart(2, '0'),
            ss = String(now.getSeconds()).padStart(2, '0');

        return `${mm}/${dd}/${yyyy} - ${hh}:${ii}:${ss}`;
    }

    log(message) {
        this.channel.appendLine(`[${this.date()}] ${message}`);
    }
}

const logger = new Logger();

export default logger;

on('natives', () => {
    logger.log('Natives ready.');
});