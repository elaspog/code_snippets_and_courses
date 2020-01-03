system "clear"

print "Enter a number between 1 and 10: "
num = gets.to_i

if num > 10
	puts "Hey! I said between 1 and 10!"
elsif num > 5
	puts "#{ num } is greater than 5"
elsif num == 5
	puts "#{ num } is equal to 5"
else
	puts "#{ num } is less than 5"
end

print "Enter your name "
name = gets.chomp

if name == "John"
	puts "Hello John!"
else
	puts "I don't know you!"
end

