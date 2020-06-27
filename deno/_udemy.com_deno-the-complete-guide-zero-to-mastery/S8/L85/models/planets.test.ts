
import { assertEquals, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("short example test", () => {
    assertEquals("deno", "deno");
    assertNotEquals({
        runtime: "deno"
    }, {
        runtime: "node"
    })
});

Deno.test({
    name: "long example test",
    ignore: false,
    fn() {
      console.log("hello from our test");
      assertEquals("deno", "deno");
      assertNotEquals({
          runtime: "deno"
      }, {
          runtime: "node"
      })
    }
});

Deno.test({
    name: "ops leak",
    sanitizeOps: false, // ignores dispatched but not completed async operations
    fn() {
      setTimeout(console.log, 10000);
    },
});

Deno.test({
    name: "resource leak",
    sanitizeResources: false,   // ignores not closed resources
    async fn() {
      await Deno.open("./models/planets.ts");   // not closing the file
    },
});
