async function readFile() {
  const data = await Deno.readTextFile("heeelo.txt");
  console.log(data);
}

await readFile();
