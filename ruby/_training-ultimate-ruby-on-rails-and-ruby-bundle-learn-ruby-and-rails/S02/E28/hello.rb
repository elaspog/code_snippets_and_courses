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

	def draw
		puts "*" * @side_length
		(@side_length - 2).times do
			print "*" + (" " * (@side_length - 2)) + "*\n"
		end
		puts "*" * @side_length
	end

end

my_square = Square.new(5)
my_square.draw

my_square = Square.new(10)
my_square.draw
