/*
https://yandex.ru/dev/maps/jsbox/2.1/object_manager_filter/
In this project I made coolest map of schools with filters
if u see variable like check_documentation in code there i explain why i use it:
when i create this map i had a problem. I need to make menu with multiply choice
but this code can`t work easy for this.
map can take filters from Listboxes(6 menu on the top) and give dictionary(categories)
and check with a dictionary(check_documentation: false, Июль: true, Март: false, ...)
in  getFilterFunction() this check from filters and if it return True it will be shown on map
made by nek1kek

structure_of_code:
    1. call  main function of api that initializate map
    2. 38-48 make map
    3. 53 - 59 some strange function, dont care about it
    4. 63 - 83 it create right menu on map
    5. 87 - 181 same that in p.4
    6. 188-197 load to listbox.filters primary filters by which he should compare
    7. 205 - 210 tracking changes in the menu
    8. 211 - 235 same p.7 for other menus
    9. 235 - 240 filter function
    10. 241-246 function for button
    11. 250 - 300 bool function for filter function
    12. 302 - ajax technology that reload only some parts in html code not all site
    13. comments for search on map









*/
ymaps.ready(init);

function init()
    {
        //создание карты не трогаем
        var myMap = new ymaps.Map('map',
                {center: [55.76, 37.64], zoom: 10 , controls: []})
        var objectManager = new ymaps.ObjectManager
            ({
                clusterize: true,// Чтобы метки начали кластеризоваться, выставляем опцию.
                gridSize: 164,// ObjectManager принимает те же опции, что и кластеризатор.
                clusterIconLayout: "default#pieChart"// Макет метки кластера pieChart.?????
            });
        myMap.geoObjects.add(objectManager);




        //общая функция, не трогаем
        var reducer = function (filters, filter)
                {
                filters[filter.data.get('content')] = filter.isSelected();
                return filters;
                }




        //4menu(НАЧИНАЯ С НУЛЯ!)
        // Создадим n пунктов выпадающего списка.
        var listBoxItems = ['Лицей','Гимназия','Школа','Частная школа']//!!!
                .map(//выполнить следующую функцию над каждым объектом
                function (_) {return new ymaps.control.ListBoxItem({data: {content: _}, state: {selected: true}} )})

        ////// отвечает за то чтобы добавился новая менюшка на карту
            // Теперь создадим список, содержащий 5 пунктов.
        var  listBoxControl4 = new ymaps.control.ListBox({
                data: {
                    content: 'Тип',//!!!
                    title: 'Фильтр'
                },
                items: listBoxItems,//!!!
                state: {// 1 -  Признак, развернут ли список.
                    expanded: false, filters: listBoxItems.reduce(reducer, {})}
            });


        myMap.controls.add(listBoxControl4);
        //////// отвечает за то чтобы добавился новая менюшка на карту



        //3menu
        // Создадим n пунктов выпадающего списка.
        var listBoxItems = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль',"Август"]//!!!
                .map(//выполнить следующую функцию над каждым объектом
                function (_) {return new ymaps.control.ListBoxItem({data: {content: _}, state: {selected: true}} )})

        ////// отвечает за то чтобы добавился новая менюшка на карту
            // Теперь создадим список, содержащий 5 пунктов.
        var  listBoxControl3 = new ymaps.control.ListBox({
                data: {
                    content: 'Месяцы экзаменов',//!!!
                    title: 'Фильтр'
                },
                items: listBoxItems,//!!!
                state: {// 1 -  Признак, развернут ли список.
                    expanded: false, filters: listBoxItems.reduce(reducer, {})}
            });


        myMap.controls.add(listBoxControl3);
        //////// отвечает за то чтобы добавился новая менюшка на карту



        //2menu
        // Создадим n пунктов выпадающего списка.
        var listBoxItems = ['Центральный','Северный','Северо-Восточный','Восточный','Юго-Восточный','Южный','Юго-Западный','Западный','Северо-Западный', 'Остальные']//!!!
                .map(//выполнить следующую функцию над каждым объектом
                function (_) {return new ymaps.control.ListBoxItem({data: {content: _}, state: {selected: true}} )})

        ////// отвечает за то чтобы добавился новая менюшка на карту
            // Теперь создадим список, содержащий 5 пунктов.
        var  listBoxControl2 = new ymaps.control.ListBox({
                data: {
                    content: 'Округ Москвы',//!!!
                    title: 'Фильтр'
                },
                items: listBoxItems,//!!!
                state: {// 1 -  Признак, развернут ли список.
                    expanded: false, filters: listBoxItems.reduce(reducer, {})}
            });


        myMap.controls.add(listBoxControl2);
        //////// отвечает за то чтобы добавился новая менюшка на карту






        //1menu
        // Создадим n пунктов выпадающего списка.
        var listBoxItems = ['Математика','Физика','Информатика','Биология','Химия','Английский', 'История', 'Обществознание', 'Экономика', 'Русский язык', 'Литература']//!!!
                .map(//выполнить следующую функцию над каждым объектом
                function (_) {return new ymaps.control.ListBoxItem({data: {content: _}, state: {selected: true}} )})

        ////// отвечает за то чтобы добавился новая менюшка на карту
            // Теперь создадим список, содержащий 5 пунктов.
        var  listBoxControl1 = new ymaps.control.ListBox({
                data: {
                    content: 'Профильный предмет',//!!!
                    title: 'Фильтр'
                },
                items: listBoxItems,//!!!
                state: {// 1 -  Признак, развернут ли список.
                    expanded: false, filters: listBoxItems.reduce(reducer, {})}
            });


        myMap.controls.add(listBoxControl1);
        //////// отвечает за то чтобы добавился новая менюшка на карту




        //0menu
        // Создадим n  пунктов выпадающего списка.
            var listBoxItems = ['в 1 класс','в 2 класс','в 3 класс','в 4 класс','в 5 класс','в 6 класс','в 7 класс','в 8 класс','в 9 класс','в 10 класс','в 11 класс']//!!!
                .map(//выполнить следующую функцию над каждым объектом
                function (_) {return new ymaps.control.ListBoxItem({data: {content: _}, state: {selected: true}} )})

        ////// отвечает за то чтобы добавился новая менюшка на карту
            // Теперь создадим список, содержащий 5 пунктов.
        var  listBoxControl = new ymaps.control.ListBox({
                data: {
                    content: 'Поступление',//!!!
                    title: 'Фильтр'
                },
                items: listBoxItems,//!!!
                state: {// 1ое -  Признак, развернут ли список.
                    expanded: false, filters: listBoxItems.reduce(reducer, {})}
            });
        myMap.controls.add(listBoxControl);
        //////// отвечает за то чтобы добавился новая менюшка на карту


            //Задаем первоначальные фигни
            var filters = ymaps.util.extend(
                {'check_documentation': false},
                listBoxControl.state.get('filters'),
                listBoxControl1.state.get('filters'),
                listBoxControl2.state.get('filters'),
                listBoxControl3.state.get('filters'),
                listBoxControl4.state.get('filters'),
            );
            listBoxControl.state.set('filters', filters);



            // Добавим отслеживание изменения признака, выбран ли пункт списка. Если поменяется что-то,
            // То добавляется новый фильтр и присваивается значения тру о фалс

        listBoxControl.events.add(['select', 'deselect'], function (e)  {
                var listBoxItem = e.get('target');
                var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
                filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
                listBoxControl.state.set('filters', filters);
        });
        listBoxControl1.events.add(['select', 'deselect'], function (e) {

                var listBoxItem = e.get('target');
                var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
                filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
                listBoxControl.state.set('filters', filters);
        });
        listBoxControl2.events.add(['select', 'deselect'], function (e) {

                var listBoxItem = e.get('target');
                var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
                filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
                listBoxControl.state.set('filters', filters);
        });
        listBoxControl3.events.add(['select', 'deselect'], function (e) {

                var listBoxItem = e.get('target');
                var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
                filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
                listBoxControl.state.set('filters', filters);
        });
        listBoxControl4.events.add(['select', 'deselect'], function (e) {

                var listBoxItem = e.get('target');
                var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
                filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();//смотрит какие выбраны
                listBoxControl.state.set('filters', filters);
        });


        var filterMonitor = new ymaps.Monitor(listBoxControl.state);
        filterMonitor.add('filters', function (filters) {
            objectManager.setFilter(getFilterFunction(filters));
        });

        //добавили эту штуку, при нажатии на кнопку отрабатывает функция фильтрации, в которую добавили поле ввода
        $('#addMarkers').bind('click', for_button);
        function for_button() {
            objectManager.setFilter(getFilterFunction(ymaps.util.extend({}, listBoxControl.state.get('filters'))));
        };


            // Применим фильтр.

        function getFilterFunction(categories) {
            return function (obj){
            //console.log(categories)
                var nabor = categories[obj.properties['в 1 класс']] || categories[obj.properties['в 2 класс']] ||
                        categories[obj.properties['в 3 класс']] || categories[obj.properties['в 4 класс']] ||
                        categories[obj.properties['в 5 класс']] || categories[obj.properties['в 6 класс']] ||
                        categories[obj.properties['в 7 класс']] || categories[obj.properties['в 8 класс']] ||
                        categories[obj.properties['в 9 класс']] || categories[obj.properties['в 10 класс']] ||
                        categories[obj.properties['в 11 класс']]


                var profil = categories[obj.properties['Математика']] || categories[obj.properties['Физика']] ||
                    categories[obj.properties['Информатика']] || categories[obj.properties['Биология']] ||
                    categories[obj.properties['Химия']] || categories[obj.properties['Английский']] ||
                    categories[obj.properties['История']] || categories[obj.properties['Обществознание']] ||
                    categories[obj.properties['Экономика']] || categories[obj.properties['Русский язык']] ||
                    categories[obj.properties['Литература']]

                var okrug = categories[obj.properties['Центральный']] || categories[obj.properties['Северный']] ||
                    categories[obj.properties['Северо-Восточный']] || categories[obj.properties['Восточный']] ||
                    categories[obj.properties['Юго-Восточный']] || categories[obj.properties['Южный']] ||
                    categories[obj.properties['Юго-Западный']] || categories[obj.properties['Западный']] ||
                    categories[obj.properties['Северо-Западный']] || categories[obj.properties['Остальные']]

                var month =  categories[obj.properties['Январь']] || categories[obj.properties['Февраль']] ||
                    categories[obj.properties['Март']] || categories[obj.properties['Апрель']] ||
                    categories[obj.properties['Май']] || categories[obj.properties['Июнь']] ||
                    categories[obj.properties['Июль']] || categories[obj.properties['Август']]

                var tip = categories[obj.properties['Лицей']] || categories[obj.properties['Гимназия']] ||
                    categories[obj.properties['Школа']] || categories[obj.properties['Частная школа']]

                //считываем инфу с ячейки, переводим в строку-> в маленький регистр->удаляем пробелы в начале и конце
                var from_box = String($('#count').val()).toLowerCase().trim()
                //считываем инфу с названия школа, переводим в строку-> в маленький регистр->удаляем пробелы в начале и конце
                var object = obj.properties['iconContent'].toLowerCase().trim()

                // если ячейка пустая, то фильтр не применяем, иначе фильтруем по имени
                if (from_box == "") {
                    var search = true;
                } else {
                    var search = object.includes(from_box);//здесь проверка на наличие тут имени
                }
                // console.log(search)

                var answer =  nabor && profil && okrug && month && tip && search
                // console.log(answer)
                return answer
                }
            }


        $.ajax({
            url: "data.json"
        }).done(function (data) {
            objectManager.add(data);
        });
        		// хотел сначала через поиск, но подумал зачем
        // Создаем экземпляр класса ymaps.control.SearchControl
		// var mySearchControl = new ymaps.control.SearchControl({
		// 	options: {
		// 		// Заменяем стандартный провайдер данных (геокодер) нашим собственным.
        //
		// 		// Не будем показывать еще одну метку при выборе результата поиска,
		// 		// т.к. метки коллекции myCollection уже добавлены на карту.
		// 		noPlacemark: true,
		// 		resultsPerPage: 5
		// 	}});
        //
		// // Добавляем контрол в верхний правый угол,
		// myMap.controls
		// 	.add(mySearchControl, { float: 'right' });
    }