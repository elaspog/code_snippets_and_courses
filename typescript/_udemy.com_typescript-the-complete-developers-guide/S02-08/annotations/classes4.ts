class Vehicle4 {
  constructor(public color: string) {}

  protected honk(): void {
    console.log("beep");
  }
}

const vehicle4 = new Vehicle4("orange");
console.log(vehicle4.color);

class Car4 extends Vehicle4 {
  constructor(public wheels: number, color: string) {
    super(color);
  }

  private drive(): void {
    console.log("vroom");
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car4(4, "red");
car.startDrivingProcess();
