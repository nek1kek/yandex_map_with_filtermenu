import openpyxl
import json
from tkinter import Tk     # from tkinter import Tk for Python 3.x
from tkinter.filedialog import askopenfilename

# строки с единицы, ряды с нуля
def parse_xlsx_to_2d_array(name_of_file):
    book = openpyxl.open(name_of_file, read_only=True)  # просто открытие файла
    sheet = book.active  # открытие первой страницы

    which_line_is_last = 2
    while True:
        if sheet[f"A{which_line_is_last}"].value is not None:
            which_line_is_last += 1
        else:
            break

    count_of_school = which_line_is_last - 2
    schools = []
    for i in range(count_of_school):
        temp = []
        for _ in range(46):
            temp.append(sheet[i + 2][_].value)
        schools.append(temp)
    return schools


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

def array_to_json(schools):
    filters = ['iconContent', 'в 1 класс', 'в 2 класс', 'в 3 класс', 'в 4 класс', 'в 5 класс', 'в 6 класс', 'в 7 класс',
               'в 8 класс', 'в 9 класс', 'в 10 класс', 'в 11 класс', 'Математика', 'Физика', 'Информатика', 'Биология',
               'Химия', 'Английский', 'История', 'Обществознание', 'Экономика', 'Русский язык', 'Литература',
               'Центральный', 'Северный', 'Северо-Восточный', 'Восточный', 'Юго-Восточный', 'Южный', 'Юго-Западный',
               'Западный', 'Северо-Западный', 'Остальные', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
               "Август", 'Лицей', 'Гимназия', 'Школа', 'Частная школа']
    features = []
    num_id = 0
    for school in schools:
        # print(school)
        json_school = {'type': 'Feature', 'id': num_id}
        num_id += 1

        def foo(coordinate):
            return round(float(coordinate), 6)

        coordinates = list(map(foo, school[1].split(', ')))
        json_school['geometry'] = {'type': 'Point', 'coordinates': coordinates}

        properties = {}

        school.pop(1)#f#cking coordinates
        for _ in range(len(school)):
            if _ == 0:
                properties['iconContent'] = school[_]
            elif school[_] == 1 or school[_] == '1':
                properties[filters[_]] = filters[_]
            else:
                properties[filters[_]] = 'check_documentation'  # look in object_manager_filter.js
        json_school['properties'] = properties
        json_school['options'] = {'preset': 'islands#nightStretchyIcon'}

        features.append(json_school)

    json_dict = {'type': 'FeatureCollection', 'features': features}
    with open('data.json', 'w') as outfile:
        json.dump(json_dict, outfile)





Tk().withdraw() # we don't want a full GUI, so keep the root window from appearing
filename = askopenfilename() # show an "Open" dialog box and return the path to the selected file
schools = parse_xlsx_to_2d_array(filename)
array_to_json(schools)
