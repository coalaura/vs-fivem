import vscode from 'vscode';

const eventBus = new vscode.EventEmitter(),
    listeners = {};

eventBus.event(event => {
    const listening = listeners[event.event] || [];

    listening.forEach(callback => {
        callback(...event.data);
    });
});

export function emit(event, ...data) {
    eventBus.fire({
        event,
        data
    });
}

export function on(event, callback) {
    const listening = listeners[event] || [];

    listening.push(callback);

    listeners[event] = listening;
}