const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE1:   Symbol("size"),
    SIZE2:   Symbol("size"),
    SIZE3:   Symbol("size"),
    TOPPINGS1:   Symbol("toppings"),
    TOPPINGS2:   Symbol("toppings"),
    TOPPINGS3:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    FRIES:  Symbol("fries")
});

module.exports = class BurgerOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize1 = "";
        this.sSize2 = "";
        this.sSize3 = "";
        this.sToppings1 = "";
        this.sToppings2 = "";
        this.sToppings3 = "";
        this.sDrinks = "";
        this.sItem = "burger";
        this.sFries = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE1;
                aReturn.push("Welcome to Konrad's Burger Palace.");
                aReturn.push("What size for first burger?");
                break;
            case OrderState.SIZE1:
                this.stateCur = OrderState.SIZE2
                this.sSize1 = sInput;
                aReturn.push("What size for second burger?");
                break;
            case OrderState.SIZE2:
                this.stateCur = OrderState.SIZE3
                this.sSize2 = sInput;
                aReturn.push("What size for third burger?");
                break;
            case OrderState.SIZE3:
                this.stateCur = OrderState.TOPPINGS1
                this.sSize3 = sInput;
                aReturn.push("What toppings would you like on the first burger?");
                break;
            case OrderState.TOPPINGS1:
                this.stateCur = OrderState.TOPPINGS2
                this.sToppings1 = sInput;
                aReturn.push("What are your toppings for the second burger?");
                break;
            case OrderState.TOPPINGS2:
                this.stateCur = OrderState.TOPPINGS3
                this.sToppings2 = sInput;
                aReturn.push("What are your toppings for the third burger?");
                break;
            case OrderState.TOPPINGS3:
                this.stateCur = OrderState.DRINKS
                this.sToppings3 = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.stateCur = OrderState.FRIES
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Would you like fries with that?");
                break;
            case OrderState.FRIES:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sFries = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize1} ${this.sItem} with ${this.sToppings1} ${this.sSize2} ${this.sItem} with ${this.sToppings2} ${this.sSize3} ${this.sItem} with ${this.sToppings3}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                if(this.sFries == 'yes'){
                    aReturn.push("Fries!");
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}