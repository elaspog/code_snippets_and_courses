class Vehicle2 {
  public drive1(): void {
    console.log("chugga chugga 1");
  }
  public honk1(): void {
    console.log("beep1");
  }
  private honk2(): void {
    console.log("beep2");
  }
  protected honk3(): void {
    console.log("beep3");
  }
}

const vehicle2 = new Vehicle2();
vehicle2.drive1();
vehicle2.honk1();

class Car2 extends Vehicle2 {
  public drive1(): void {
    console.log("vroom1");
  }
  private drive2(): void {
    console.log("vroom2");
  }
  startDrivingProcess() {
    this.drive2();
    // this.honk2();  // error: private
    this.honk3();
  }
}

const car2 = new Car2();
car2.drive1();
// car2.drive2(); // error: private
car2.startDrivingProcess();
car2.honk1();
// car2.honk2();  // error: private
// car2.honk3();  // error: protected
