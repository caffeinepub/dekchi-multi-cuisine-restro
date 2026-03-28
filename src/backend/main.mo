import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";

actor {
  type Reservation = {
    id : Nat;
    name : Text;
    phoneNumber : Text;
    date : Text;
    time : Text;
    numberOfGuests : Nat;
    note : ?Text;
    timestamp : Time.Time;
  };

  module Reservation {
    public func compare(res1 : Reservation, res2 : Reservation) : Order.Order {
      Nat.compare(res1.id, res2.id);
    };
  };

  let reservations = Map.empty<Nat, Reservation>();
  var nextId = 0;

  func getNextId() : Nat {
    let id = nextId;
    nextId += 1;
    id;
  };

  public shared ({ caller }) func createReservation(name : Text, phoneNumber : Text, date : Text, time : Text, numberOfGuests : Nat, note : ?Text) : async Nat {
    let id = getNextId();
    let reservation : Reservation = {
      id;
      name;
      phoneNumber;
      date;
      time;
      numberOfGuests;
      note;
      timestamp = Time.now();
    };
    reservations.add(id, reservation);
    id;
  };

  public query ({ caller }) func getReservation(id : Nat) : async Reservation {
    switch (reservations.get(id)) {
      case (null) { Runtime.trap("Reservation does not exist") };
      case (?reservation) { reservation };
    };
  };

  public query ({ caller }) func getAllReservations() : async [Reservation] {
    reservations.values().toArray().sort();
  };
};
