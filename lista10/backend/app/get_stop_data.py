from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from app.models import Stop, StopTime, Trip, Route


def choose_stop(db: Session):
    stops = db.query(Stop).order_by(Stop.stop_name).all()

    for i, stop in enumerate(stops):
        print(f"{i}: {stop.stop_name} ({stop.stop_id})")

    idx = int(input("Wybierz przystanek: "))
    return stops[idx]


def base_query(db: Session, stop_id: str):
    return (
        db.query(StopTime, Trip, Route)
        .join(Trip, StopTime.trip_id == Trip.trip_id)
        .join(Route, Trip.route_id == Route.route_id)
        .filter(StopTime.stop_id == stop_id)
    )


def count_routes(db: Session, stop_id: str):
    return (
        db.query(func.count(func.distinct(Route.route_id)))
        .join(Trip, Trip.route_id == Route.route_id)
        .join(StopTime, StopTime.trip_id == Trip.trip_id)
        .filter(StopTime.stop_id == stop_id)
        .scalar()
    )


def count_departures(db: Session, stop_id: str):
    return (
        db.query(func.count(StopTime.id)).filter(StopTime.stop_id == stop_id).scalar()
    )


def min_max_departure(db: Session, stop_id: str):
    min_time, max_time = (
        db.query(func.min(StopTime.departure_time), func.max(StopTime.departure_time))
        .filter(StopTime.stop_id == stop_id)
        .one()
    )

    return min_time, max_time


def most_common_directions(db: Session, stop_id: str):
    return (
        db.query(Trip.trip_headsign, func.count(StopTime.trip_id).label("cnt"))
        .join(StopTime, StopTime.trip_id == Trip.trip_id)
        .filter(StopTime.stop_id == stop_id)
        .group_by(Trip.trip_headsign)
        .order_by(desc("cnt"))
        .limit(5)
        .all()
    )
