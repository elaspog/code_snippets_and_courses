system "clear"

print "Enter Your Name: "
name = gets	# gets.chomp

puts "Hello " + name
puts "Hello #{ name }"

puts "Hello #{ name }, how are you?"
name = name.chomp
puts "Hello #{ name }, how are you?"
puts "Hello #{ name.upcase }, how are you?"
