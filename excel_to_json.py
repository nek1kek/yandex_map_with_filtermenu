import openpyxl
import json
from tkinter import Tk  # from tkinter import Tk for Python 3.x
from tkinter.filedialog import askopenfilename
from tkinter import messagebox as mbox

# json structure of file:
# {'type': 'FeatureCollection',
# 'features': [
# {'type': 'Feature',
#  'id': 0,
#  'geometry': {'type': 'Point','coordinates': [55.831903, 37.411961]},
#  'options': {'preset': 'islands#nightStretchyIcon'},
#  'properties': {
# 	    'iconContent': 'school',
# 	    'в 1 класс': 'в 1 класс',
# 	    'в 2 класс': 'check_documentation',
# 	    'в 3 класс': 'check_documentation',
# 	    'в 4 класс': 'check_documentation',
# 	    ...
# 	    }
# {'type': 'Feature',
#  'id': 1,
#  'geometry': {'type': 'Point','coordinates': [55.831903, 37.411961]},
#  'options': {'preset': 'islands#nightStretchyIcon'},
#  'properties': {
# 	    'iconContent': 'school',
# 	    'в 1 класс': 'в 1 класс',
# 	    'в 2 класс': 'check_documentation',
# 	    'в 3 класс': 'check_documentation',
# 	    'в 4 класс': 'check_documentation',
# 	    ...
# 	    }
# ]
# }


filters = ["iconContent", "в 1 класс", "в 2 класс", "в 3 класс", "в 4 класс", "в 5 класс", "в 6 класс", "в 7 класс",
           "в 8 класс", "в 9 класс", "в 10 класс", "в 11 класс", "Математика", "Физика", "Информатика", "Биология",
           "Химия", "Английский", "История", "Обществознание", "Экономика", "Русский язык", "Литература",
           "Центральный", "Северный", "Северо-Восточный", "Восточный", "Юго-Восточный", "Южный", "Юго-Западный",
           "Западный", "Северо-Западный", "Остальные", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
           "Август", "Лицей", "Гимназия", "Школа", "Частная школа", "Ссылка"]

def foo(coordinate):
    return round(float(coordinate), 6)

# строки с единицы, ряды с нуля
def parse_xlsx_to_2d_array(name_of_file):
    features = []
    num_id = 0
    book = openpyxl.open(name_of_file, read_only=True)  # просто открытие файла
    sheet = book.active  # открытие первой страницы

    which_line_is_last = 2
    while True:
        if sheet[f"A{which_line_is_last}"].value is not None:
            which_line_is_last += 1
        else:
            break

    count_of_school = which_line_is_last - 2
    for i in range(count_of_school):
        school = []
        for _ in range(47):
            school.append(sheet[i + 2][_].value)
        features.append(array_to_json(school, num_id))
        num_id += 1
        print(f"Обработано: {num_id} из {count_of_school} школ")

    json_dict = {'type': 'FeatureCollection', 'features': features}
    with open('data.json', 'w') as outfile:
        json.dump(json_dict, outfile)


def array_to_json(school,num_id):
        json_school = {'type': 'Feature', 'id': num_id}
        coordinates = list(map(foo, school[1].split(', ')))
        json_school['geometry'] = {'type': 'Point', 'coordinates': coordinates}

        properties = {}
        school.pop(1)  # f#cking coordinates

        enter_class = []
        predmet = []
        dictrict = []
        month = []
        tip_school = []

        for _ in range(len(school)):
            if _ == 0:
                properties['balloonContentHeader'] = school[_]
                properties['iconContent'] = school[_]
            elif school[_] == 1 or school[_] == '1':
                properties[filters[_]] = filters[_]
            else:
                properties[filters[_]] = 'check_documentation'  # look in object_manager_filter.js

            if 1 <= _ <= 11 and (school[_] == 1 or school[_] == '1'):
                enter_class.append(str(_))
            elif 12 <= _ <= 22 and (school[_] == 1 or school[_] == '1'):
                predmet.append(filters[_])
            elif 23 <= _ <= 32 and (school[_] == 1 or school[_] == '1'):
                dictrict.append(filters[_])
            elif 33 <= _ <= 40 and (school[_] == 1 or school[_] == '1'):
                month.append(filters[_])
            elif 41 <= _ <= 44 and (school[_] == 1 or school[_] == '1'):
                tip_school.append(filters[_])
            elif _ == 45:
                link = school[_]

        balloon_text = ["<strong> Поступление в классы: </strong>" + ', '.join(enter_class),
                        "<strong> Профильные предметы: </strong> " + ', '.join(predmet),
                        "<strong> Округ: </strong>" + ', '.join(dictrict),
                        "<strong> Месяц отбора: </strong>" + ', '.join(month),
                        "<strong> Статус школы: </strong>" + ', '.join(tip_school)]

        info_about_school = '<address>' + "<br/>".join(balloon_text) + '</address>'
        school_link = f'<a target="_blank" rel="noopener noreferrer" href="{link}"><strong>Страница школы</strong></a>'
        properties['balloonContentBody'] = info_about_school + school_link
        json_school['properties'] = properties
        json_school['options'] = {'preset': 'islands#nightStretchyIcon'}

        return json_school




def onInfo():
    mbox.showinfo("Информация", "Преобразование в json закончено")


Tk().withdraw()  # we don't want a full GUI, so keep the root window from appearing
filename = askopenfilename()  # show an "Open" dialog box and return the path to the selected file
parse_xlsx_to_2d_array(filename)
onInfo()
