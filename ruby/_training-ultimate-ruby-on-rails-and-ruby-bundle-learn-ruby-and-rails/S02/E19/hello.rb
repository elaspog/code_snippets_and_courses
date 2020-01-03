system "clear"


(1..100).each do |num|

	if num % 3 == 0 && num % 5 == 0
		puts "#{num}. FIZZBUZZ!"

	elsif num % 3 == 0
		puts "#{num}. FIZZB!"

	elsif num % 5 == 0
		puts "#{num}. BUZZ!"

	else
		puts "#{num}"

	end 

end
