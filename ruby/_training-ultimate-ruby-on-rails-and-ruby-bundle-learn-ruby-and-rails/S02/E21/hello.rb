system "clear"



def hello1(first_name, last_name)
	puts "Hello there #{ first_name } #{ last_name }"
end

f_name = "John"
hello1("John", "Elder")
hello1(f_name, "Elder")


def hello2(first_name, last_name)
	return "Hello there #{ first_name } #{ last_name }"
end

puts hello2("John", "Elder")
method_output = hello2("John", "Elder")
puts method_output
puts method_output.downcase
puts method_output.upcase
