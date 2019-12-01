class Vehicle1 {
  drive(): void {
    console.log("chugga chugga");
  }
  honk(): void {
    console.log("beep");
  }
}

const vehicle1 = new Vehicle1();
vehicle1.drive();
vehicle1.honk();

class Car1 extends Vehicle1 {
  drive(): void {
    console.log("vroom");
  }
}

const car1 = new Car1();
car1.drive();
car1.honk();
