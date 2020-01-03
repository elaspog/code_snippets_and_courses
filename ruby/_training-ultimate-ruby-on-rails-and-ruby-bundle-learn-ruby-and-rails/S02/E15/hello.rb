system "clear"

names = ["John", "Tim", "Mary", "Tina"]

puts names[0]
puts names.length
puts names[names.length - 1]

names = ["John", "Tim", "Mary", "Tina", 41]

puts names[4]
puts names[4] - 1

first_name = "Bob"
names = ["John", "Tim", "Mary", "Tina", first_name]

puts names[4]

nums = [1,2,3,4,5]
names = ["John", "Tim", "Mary", "Tina", nums]

puts names[4]
puts names[4][2]

names = ["John", "Tim", "Mary", "Tina", [1,2,3,4,5]]

puts names[4][0]
puts names[4][2]
