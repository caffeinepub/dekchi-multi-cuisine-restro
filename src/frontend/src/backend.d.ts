import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reservation {
    id: bigint;
    date: string;
    name: string;
    note?: string;
    time: string;
    timestamp: Time;
    phoneNumber: string;
    numberOfGuests: bigint;
}
export interface MenuItem {
    id: bigint;
    category: string;
    name: string;
    price: bigint;
    description: string;
    imageUrl: string;
}
export type Time = bigint;
export interface backendInterface {
    createReservation(name: string, phoneNumber: string, date: string, time: string, numberOfGuests: bigint, note: string | null): Promise<bigint>;
    getAllReservations(): Promise<Array<Reservation>>;
    getReservation(id: bigint): Promise<Reservation>;
    getMenuItems(): Promise<Array<MenuItem>>;
    getMenuItemsByCategory(category: string): Promise<Array<MenuItem>>;
}
