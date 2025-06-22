import { writable } from 'svelte/store';

export enum EventTypes {
    OverlayOpened = 'OverlayOpened',
    SearchButtonClicked = 'SearchButtonClicked'
}

export type CustomEvent = {
    type: EventTypes;
    data?: any;
} | null;

const initialValue: CustomEvent = null;

export const eventStore = writable<CustomEvent>(initialValue);