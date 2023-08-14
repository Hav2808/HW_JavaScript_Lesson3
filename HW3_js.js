// Good - класс для хранения данных о товаре со свойствами:
class Good {
    
    constructor(id, name, description, sizes, price, available) {
        // Код товара
        this.id = id;
        // Наименование
        this.name = name;
        // Описание
        this.description = description;
        // массив возможных размеров
        this.sizes = sizes;
        // цена товара
        this.price = price;
        // Признак доступности для продажи
        this.available = available;
    }
    // изменение признака доступности для продажи
    setAvailable() {
            return this.available = true
    }  
}

// GoodsList - класс для хранения каталога товаров со свойствами:
class GoodsList {
    #goods = [];   
    constructor(goods, filter, sortPrice, sortDir) {
        // массив экземпляров объектов класса Good (приватное поле)
        this.#goods = goods;
        // регулярное выражение используемое для фильтрации товаров по полю name
        this.filter = filter;
        // булево значение, признак включения сортировки по полю Price
        this.sortPrice = sortPrice;
        // булево значение, признак направления сортировки по полю Price (true - по возрастанию, false - по убыванию)
        this.sortDir = sortDir;
    }

    // возвращает массив доступных для продажи товаров в соответствии с установленным фильтром и сортировкой по полю Price  (работает)
    get list() {

        let temporaryList = [];
        
        for (let index = 0; index < this.#goods.length; index++) {
            // console.log(this.#goods[index].name)
            if (this.filter.test(this.#goods[index].name) === true) {

                temporaryList.push(this.#goods[index]);
                }
            }  

        let sortedList = function(a,b) { 

            if (this.sortPrice === true) {
    
                if (this.sortDir === true) {
                    return a.price - b.price;
                    }
                if (this.sortDir === false) {
                    return b.price - a.price;
                    }
                }
            }

        return temporaryList.sort(sortedList.bind(GoodsList))
    }

    // добавление товара в каталог
    add(newGood) {
        this.#goods.push(newGood);
        let result = this.#goods;
        return result
    }

    // удаление товара из каталога по его id
    remove(idForDel) {

        let trigger = false

        this.#goods.forEach((good, index) => {
            if (good.id === idForDel) {;
                this.#goods.splice(index, 1);
                trigger = true
                }
            })

        let newGoods = this.#goods;

        if (trigger === true) {
            return newGoods
        } else {
            return "Товар не найден"
        }
    }   
    
    filterAvailable () {
        const result = this.#goods.filter(good => good.available === true)
        return result;
    }
}

// BasketGood - класс дочерний от Good, для хранения данных о товаре в корзине с дополнительным свойством:
class BasketGood extends Good {
    constructor(currentGood, amount) {
            super(currentGood);
            // количество товара в корзине
            this.amount = amount;
            // Код товара
            this.id = currentGood.id;
            // Наименование
            this.name = currentGood.name;
            // массив возможных размеров
            this.sizes = currentGood.sizes;
            // цена товара
            this.price = currentGood.price;
            // Добавил только для метода removeUnavailable(). Можно было обойтись и искать в общем каталоге  good.available
            this.available = currentGood.available
    }
}

// Basket - класс для хранения данных о корзине товаров со свойствами:
class Basket {
    constructor() {        
        this.goods = [];
    }

// get totalAmount()  возвращает общую стоимость товаров в корзине
    get totalAmount () {
        // this.removeUnavailable()
        let result = this.goods.reduce(function(totalAmount, good) {
            return totalAmount + good.amount * good.price;
          }, 0);

        return result
    }

// get totalSum()     возвращает общее количество товаров в корзине (работает)
    get totalSum () {
        // this.removeUnavailable()
        let result = this.goods.reduce(function(totalSum, good) {
            return totalSum + good.amount
          }, 0);

        return result
    }
// Реализуйте методы:
// add(good, amount)    Добавляет товар в корзину, если товар уже есть увеличивает количество.
    add (good, amount) {
        if (!(typeof amount === "number")) {
          throw new Error("Введите количество");
        }
        if (amount < 0) {this.remove(good, amount)

        }else{

        let trigger = false
        for (let index = 0; index < this.goods.length; index++) {
            if (this.goods[index].id === good.id) {
                this.goods[index].amount = this.goods[index].amount + amount
                trigger = true
                break
            }
        }
        if (trigger === false) {

            this.goods.push(good)
            } 
        }
    }
        
// remove(good, amount) Уменьшает количество товара в корзине, если количество становится равным нулю
    remove (good, amount) {
      if (!(typeof amount === "number")) {
        throw new Error("Введите количество");
      }
        const idList = this.goods.map((currentGood) => currentGood.id)
        if (idList.includes(good.id) === true) {
          
            for (let index = 0; index < this.goods.length; index++) {
            
                if (this.goods[index].id === good.id) {
                    this.goods[index].amount = this.goods[index].amount + amount;   
                    }
                if (this.goods[index].amount < 0) {
                    this.goods.splice(index, 1);
                    }
            }
          
        } 
    }
// clear() Очищает содержимое корзины
    clear() {
        this.goods.splice(0, this.goods.length)
    }
// removeUnavailable()  Удаляет из корзины товары, имеющие признак available === false (использовать filter())
    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available === true)
        return this.goods;
    }

// В основном коде программы создайте не менее 5 экземпляров класса Good. 
//Создайте экземпляры классов GoodsList и Basket. 
//Вызовите несколько раз реализованные методы этих объектов с необходимыми аргументами, 
//устанавливая условия фильтрации и сортировки для GoodsList. Выведите в консоль отфильтрованный и 
//сортированный каталог товаров, а также значения общих суммы и количества товаров в корзине.

}


// Создание объектов
const good1 = new Good (
    1,
    "Шорты мужские",
    "хлопок 95 %, лайкра 5 %",
    ["L", "XL", "XXL"],
    3.53,
    true,
    );

const good2 = new Good (
    2,
    "Футболка",
    "хлопок 100 %",
    ["XL", "XXL"],
    2.30,
    true
    );

const good3 = new Good (
    3,
    "Юбка приталенная",
    "хлопок 100 %",
    ["M", "L", "XL"],
    4.40,
    true
    );

const good4 = new Good (
    4,
    "Костюм рабочий",
    "хлопок 100 %",
    ["M", "L", "XL", "XXL"],
    21.55,
    false
    );

const good5 = new Good (
    5,
    "Брюки черные",
    "хлопок 100 %",
    ["M", "L", "XL", "XXL"],
    15.65,
    false
    );

const good6 = new Good (
    6,
    "Платье",
    "хлопок 90 %",
    ["M", "L"],
    15.65,
    false
    );
// Создание массива экземпляров товаров
const goodsAll = []
    goodsAll.push(good1)
    goodsAll.push(good2)
    goodsAll.push(good3)
    goodsAll.push(good4)
    goodsAll.push(good5)

// Создание экземпляра каталога
// Создаю filter
regexp  = /(Рубашка|Майка)/i
const newCatalogue = new GoodsList(goodsAll, regexp, true, true)

// Создание экземпляра товара для корзины
const newBasketGood1 = new BasketGood(good1, 11)
const newBasketGood2 = new BasketGood(good2, 11)
const newBasketGood3 = new BasketGood(good3, 11)
const newBasketGood4 = new BasketGood(good4, 11)
const newBasketGood6 = new BasketGood(good6, 11)
// console.log(newBasketGood1);
// console.log(newBasketGood2);

// Создание экземпляра корзины (успешно)
const newBasket = new Basket()
// console.log(newBasket);


// Тестовые запуски методов товаров

// Проверка работы функции setAvailable
good4.setAvailable();
console.log(good4.available);

// Проверка работы функции get list()

console.log(newCatalogue.list);

// Проверка работы функции add(newGood)
console.log(newCatalogue.add(good6));

// Проверка работы функции remove(idForDel)
// console.log(newCatalogue.remove(undefined));

// Проверка работы функции filterAvailable ()
// console.log(newCatalogue.filterAvailable());

// Тестовые запуски методов корзины

// Добавляю товар
newBasket.add(newBasketGood1, newBasketGood1.amount)
// console.log(newBasket);

// Добавляю товар
newBasket.add(newBasketGood1, 12)
// console.log(newBasket);

// Добавляю товар
newBasket.add(newBasketGood4, 3)
// console.log("удаление товара 1");
// console.log(newBasket);

// clear() Очищает содержимое корзины
newBasket.clear()
console.log(newBasket);

// removeUnavailable()  Удаляет из корзины товары available === false
newBasket.removeUnavailable()
console.log(newBasketGood1.amount);


// Общее количество (успешно)
console.log("Общая стоимость = " + newBasket.totalAmount);
// Общая сумма (успешно)
console.log("Общая сумма = " + newBasket.totalSum);