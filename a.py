import json

with open("data.json", "r") as f:
    d = json.load(f)

z = 0
for i in d['features']:
    i['properties'] = {}
    i['properties']['iconContent'] = 'school'
    i['properties']['в 1 класс'] = 'в 1 класс'
    i['properties']['в 2 класс'] = 'check_documentation'
    i['properties']['в 3 класс'] = 'check_documentation'
    i['properties']['в 4 класс'] = 'check_documentation'
    i['properties']['в 5 класс'] = 'в 5  класс'
    i['properties']['в 6 класс'] = 'check_documentation'
    i['properties']['в 7 класс'] = 'check_documentation'
    i['properties']['в 8 класс'] = 'check_documentation'
    i['properties']['в 9 класс'] = 'check_documentation'
    i['properties']['в 10 класс'] = 'check_documentation'
    i['properties']['в 11 класс'] = 'check_documentation'


    i['properties']['Математика'] = 'check_documentation'
    i['properties']['Физика'] = 'Физика'
    i['properties']['Информатика'] = 'check_documentation'
    i['properties']['Биология'] = 'Биология'
    i['properties']['Химия'] = 'Химия'
    i['properties']['Английский'] = 'check_documentation'
    i['properties']['История'] = 'check_documentation'
    i['properties']['Обществознание'] = 'check_documentation'
    i['properties']['Экономика'] = 'check_documentation'
    i['properties']['Русский язык'] = 'check_documentation'
    i['properties']['Литература'] = 'check_documentation'

    i['properties']['Центральный'] = 'check_documentation'
    i['properties']['Северный'] = 'check_documentation'
    i['properties']['Северо-Восточный'] = 'check_documentation'
    i['properties']['Восточный'] = 'Восточный'
    i['properties']['Юго-Восточный'] = 'check_documentation'
    i['properties']['Южный'] = 'check_documentation'
    i['properties']['Юго-Западный'] = 'check_documentation'
    i['properties']['Западный'] = 'check_documentation'
    i['properties']['Северо-Западный'] = 'check_documentation'
    i['properties']['Остальные'] = 'check_documentation'

    if z % 2 == 0:
        i['properties']['Январь'] = 'check_documentation'
        i['properties']['Февраль'] = 'check_documentation'
        i['properties']['Март'] = 'check_documentation'
        i['properties']['Апрель'] = 'Апрель'
        i['properties']['Май'] = 'check_documentation'
        i['properties']['Июнь'] = 'check_documentation'
        i['properties']['Июль'] = 'check_documentation'
        i['properties']['Август'] = 'check_documentation'
    else:
        i['properties']['Январь'] = 'check_documentation'
        i['properties']['Февраль'] = 'check_documentation'
        i['properties']['Март'] = 'check_documentation'
        i['properties']['Апрель'] = 'check_documentation'
        i['properties']['Май'] = 'Май'
        i['properties']['Июнь'] = 'check_documentation'
        i['properties']['Июль'] = 'check_documentation'
        i['properties']['Август'] = 'check_documentation'
    z+=1

    i['properties']['Лицей'] = 'check_documentation'
    i['properties']['Гимназия'] = 'check_documentation'
    i['properties']['Школа'] = 'Школа'
    i['properties']['Частная школа'] = 'check_documentation'





    i["options"]["preset"]  = 'islands#nightStretchyIcon'


with open('data.json', 'w') as outfile:
    json.dump(d, outfile)