import requests
import json

def get_file():
    file = requests.get("http://lad.ufcg.edu.br/loac/uploads/OAC/anon.txt")

    lines = file.text.split('\n')

    data = dict()

    for line in lines:
        if len(line) > 0:
            code, date, cents, mode = line.split()[:4]
            mode = mode[:-1]    


            description = None
            try:
                description = line.split(":")[1]
            except:
                description = ""

            if code not in data:
                data[code] = {
                    "projects": [],
                    "cents": 0
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

    return data
