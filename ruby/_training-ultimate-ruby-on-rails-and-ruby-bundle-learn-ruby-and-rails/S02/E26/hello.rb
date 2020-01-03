system "clear"

class Square

	def initialize(side_length)
		@side_length = side_length
	end

	def side_length
		return @side_length
	end

	def side_length=(side_length)
		@side_length = side_length
	end

	def perimeter
		return @side_length * 4
	end

	def perimeterStr
		return "Perimeter: #{@side_length * 4}"
	end

	def area
		return @side_length * @side_length
	end

	def to_s
		#return "Side length: #{@side_length}\nPerimeter: #{@side_length * 4}\nArea: #{@side_length * @side_length}"
		return "Side length: #{@side_length}\nPerimeter: #{perimeter}\nArea: #{area}"
	end

end

my_square = Square.new(10)

puts my_square.perimeter
puts my_square.perimeterStr
puts my_square.area
puts my_square
