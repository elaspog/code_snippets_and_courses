
SELECT
	curdate() AS current_day,
	concat(left(curdate() - INTERVAL 1 MONTH, 7), '-01') AS first_day_of_last_month,
	CONVERT(concat(left(curdate(),7),'-01'), DATE) - INTERVAL 1 DAY AS last_day_of_last_month,
	CONVERT(concat(left(curdate() + INTERVAL 1 MONTH, 7), '-01'), DATE) - INTERVAL 1 DAY AS last_day_of_current_month
