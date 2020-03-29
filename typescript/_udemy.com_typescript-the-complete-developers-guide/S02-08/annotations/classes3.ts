class Vehicle3 {
  // 1)
  // color: string = "red";

  // 2)
  // color: string;
  // constructor(color: string) {
  //   this.color = color;
  // }

  // 3)
  constructor(public color: string) {
    this.color = color;
  }

  protected honk(): void {
    console.log("beep3");
  }
}

const vehicle3 = new Vehicle3("orange");
console.log(vehicle3.color);
