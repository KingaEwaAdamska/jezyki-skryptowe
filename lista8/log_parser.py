import sys
import os
from datetime import datetime, date

_PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _PROJECT_ROOT not in sys.path:
    sys.path.insert(0, _PROJECT_ROOT)

from lista3.get_entries_in_time_range import get_entries_in_time_range


def _parse_line(line):
    line = line.strip()
    if not line:
        return None
    elements = line.split("\t")
    if len(elements) < 15:
        return None
    try:
        ts = datetime.fromtimestamp(float(elements[0]))
        uid = elements[1]
        id_orig_h = elements[2]
        id_orig_p = elements[3]
        id_resp_h = elements[4]
        id_resp_p = elements[5]
        method = elements[7]
        host = elements[8]
        uri = elements[9]
        user_agent = elements[11] if len(elements) > 11 else "-"
        resp_size = int(elements[13]) if len(elements) > 13 and elements[13].isdigit() else None
        status_code = int(elements[14]) if elements[14].isdigit() else None
        # Tuple extended beyond lista3's 10-field format: adds user_agent and resp_size at [10] and [11]
        return (ts, uid, id_orig_h, id_orig_p, id_resp_h, id_resp_p, method, host, uri, status_code, user_agent, resp_size)
    except (ValueError, IndexError):
        return None


def read_log_file(file_path):
    entries = []
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            entry = _parse_line(line)
            if entry is not None:
                entries.append(entry)
    return entries


def filter_by_date_range(entries, start_date, end_date):
    start_dt = datetime.combine(start_date, datetime.min.time())
    end_dt = datetime.combine(end_date, datetime.max.time())
    # Delegates to lista3 for the core comparison logic
    return get_entries_in_time_range(entries, start_dt, end_dt)


def get_entry_display_text(entry):
    ts, uid, ip, _p, resp_h, resp_p, method, host, uri, status_code = entry[:10]
    text = f"{ip} - - [{ts.strftime('%d/%b/%Y:%H:%M:%S')}] \"{method} {uri}\""
    if len(text) > 60:
        return text[:57] + "..."
    return text


def get_status_color(status_code):
    if status_code is None:
        return "#aaaaaa"
    if status_code < 300:
        return "#22aa22"
    if status_code < 400:
        return "#ff9900"
    return "#cc2222"
