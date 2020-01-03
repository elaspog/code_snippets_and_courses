system "clear"

class Square

	# attr_reader
	# attr_writer
	# attr_accessor

	attr_accessor :side_length 	#, :area

	def initialize(side_length)
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
puts my_square.side_length
my_square.side_length = 20
puts my_square.side_length


