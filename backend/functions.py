from datetime import datetime
import requests
import json


def get_file():
    file = requests.get("http://lad.ufcg.edu.br/loac/uploads/OAC/anon.txt")

    lines = file.text.split('\n')

    data = dict()

    for line in lines:
        if len(line) > 0:
            code, date, cents, mode = ("", "", "", "")
            if len(line.split()) >= 4:
                code, date, cents, mode = line.split()[:4]
                mode = mode[:-1]    
            else:
                continue

            description = None
            try:
                description = line.split(":")[1]
            except:
                description = ""

            if code not in data:
                data[code] = {
                    "projects": [],
                    "cents": 0,
                    "modes": []
                }

            data[code]["projects"].append(
                {
                    "date": date,
                    "cents": int(cents),
                    "mode": mode,
                    "description": description
                }
            )

            data[code]["cents"] += int(cents)

            if mode not in data[code]["modes"]:
                data[code]["modes"].append(mode)

    return data


def ids():
    keys = get_file().keys()
    return list(keys)

def group_by_mode():
    file = requests.get("http://lad.ufcg.edu.br/loac/uploads/OAC/anon.txt")

    lines = file.text.split('\n')

    data = dict()

    for line in lines:
        if len(line) > 0:
            code, date, cents, mode = ("", "", "", "")
            if len(line.split()) >= 4:
                code, date, cents, mode = line.split()[:4]
                mode = mode[:-1]    
            else:
                continue

            description = None
            try:
                description = line.split(":")[1]
            except:
                description = ""

            if code not in data:
                data[code] = {
                    "projects": {},
                    "cents": 0
                }

            if mode not in data[code]["projects"].keys():
                data[code]["projects"][mode] = {"all": [], "sum": 0}

            data[code]["projects"][mode]["all"].append(
                {
                    "date": date,
                    "cents": int(cents),
                    "description": description
                }
            )
            
            data[code]["projects"][mode]["sum"] += int(cents)

            data[code]["cents"] += int(cents)

    return data    


def analytics():
    file = get_file()
    today = datetime.now()
    first_day = datetime(day=21, month=6, year=2021)

    days = today - first_day

    obj_analytics = {
        "days": days.days,
        "mean": 0,
        "median": 0,
        "max": 0,
        "min": 0,
        "approved": 0,
        "no-approved":0,
        "percent_approved": 0
    }

    print(obj_analytics['days'])
    mean_sum = 0
    list_median = list() 
    by_type = dict()

    for key in file:
        obj = file[key]
        cents = obj['cents']
        mean_sum += cents
        list_median.append(cents)

        if (cents >= 700):
            obj_analytics['approved'] += 1
        else:
            obj_analytics['no-approved'] += 1

    list_median.sort()
    
    if len(list_median) % 2 == 0:
        i = len(list_median)//2
        j = i + 1
        obj_analytics['median'] = int((list_median[i] + list_median[j])/2)
    else:
        i = len(list_median)//2
        obj_analytics['median'] = int(list_median[i])
    

    obj_analytics['max'] = max(list_median)
    obj_analytics['min'] = min(list_median)
    obj_analytics['mean'] = round(sum(list_median)/len(list_median))
    obj_analytics['percent_approved'] = round(obj_analytics['approved']/len(list_median), 2)

    return obj_analytics
