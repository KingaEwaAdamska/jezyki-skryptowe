from collections import namedtuple
from typing import List, Tuple
import logging

Measurement = namedtuple('Measurement', ['timestamp', 'value'])

logger = logging.getLogger(__name__)

# Definicja progów do wykrywania anomalii
ALARM_THRESHOLD = 500
DELTA_THRESHOLD = 50  # Procentowy próg zmiany pomiędzy kolejnymi pomiarami
ZERO_THRESHOLD = 0.1  # Procent wartości, które mogą być zerami/None/ujemne

def detect_anomalies(measurements: List[Measurement]) -> List[str]:
    anomalies = []

    # Reguła 1: Zbyt częste skoki wartości
    for i in range(1, len(measurements)):
        prev_value = measurements[i - 1].value
        curr_value = measurements[i].value

        if prev_value is None or curr_value is None:
            continue

        delta = abs(float(curr_value) - float(prev_value))
        if delta > DELTA_THRESHOLD:
            anomalies.append(f"Skok wartości między {measurements[i-1].timestamp} a {measurements[i].timestamp} przekracza próg: {delta}")

    # Reguła 2: Zbyt wiele wartości zerowych, None lub ujemnych
    zero_count = sum(1 for m in measurements if m.value in [0, None] or m.value < 0)
    total_count = len(measurements)

    if zero_count / total_count > ZERO_THRESHOLD:
        anomalies.append(f"Zbyt wiele wartości zerowych, None lub ujemnych: {zero_count}/{total_count}")

    # Reguła 3: Nagłe skoki powyżej progów alarmowych
    for m in measurements:
        if m.value > ALARM_THRESHOLD:
            anomalies.append(f"Nagły skok: wartość {m.value} na {m.timestamp} przekracza próg alarmowy {ALARM_THRESHOLD}")

    return anomalies
