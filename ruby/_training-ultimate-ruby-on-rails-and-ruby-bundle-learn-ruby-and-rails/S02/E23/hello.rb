system "clear"

class Square

	def initialize(side_length)
		@side_length = side_length
	end

end

my_square = Square.new(10)

puts my_square
puts my_square.inspect
