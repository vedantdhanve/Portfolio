/* 
Total number of orders
Average delivery time
Minimum delivery time
Maximum delivery time
*/
select count(distinct id) as total_orders, avg(`Time_taken (min)`) as average_delivery_time,
min(`Time_taken (min)`) as minimum_delivery_time, max(`Time_taken (min)`) as maximum_delivery_time
from zomato_cleaned;




/*
How many orders take more than 30 minutes to deliver?
count orders taking 30 minutes or less
*/
select count(distinct id) as total_orders,
case when `Time_taken (min)` > 30 then 'More than 30 minutes'
when `Time_taken (min)` <= 30 then 'Less than or equal to 30 min'
end as delivery_time
from zomato_cleaned
group by delivery_time
;



/*
Road_traffic_density:
Number of orders
Average delivery time
*/
select 
count(distinct id) as total_orders, avg(`Time_taken (min)`) as average_time, Road_traffic_density
from zomato_cleaned
group by Road_traffic_density
order by average_time desc;



/* 
How does the number of multiple deliveries assigned to a delivery person relate to delivery time?
Analyze:
Which number of multiple deliveries has the highest average delivery time?
How does delivery time change as multiple deliveries increase?
*/
select
Delivery_person_ID, multiple_deliveries, avg(`Time_taken (min)`) as average_time
from zomato_cleaned
group by Delivery_person_ID, multiple_deliveries
order by average_time desc;






/* 
Groups orders by Weather_conditions
Calculates total orders
Calculates average delivery time
Sorts weather conditions by average delivery time, highest first
*/
select 
count(distinct id) as total_orders, avg(`Time_taken (min)`) as average_time, Weather_conditions
from zomato_cleaned
group by Weather_conditions
order by average_time desc;




/* 
Groups delivery person ratings
Calculates total orders
Calculates average delivery time
Sorts by rating
*/
select 
Delivery_person_Ratings, count(id) as total_orders, avg(`Time_taken (min)`) as average_delivery_time
from zomato_cleaned
group by Delivery_person_Ratings order by Delivery_person_Ratings desc;




/* 
Write a query that groups by Vehicle_condition and calculates:
Total orders
Average delivery time
Sort by average delivery time, highest first.
*/
select 
count(distinct id) as total_orders, avg(`Time_taken (min)`) as average_time, Vehicle_condition
from zomato_cleaned
group by Vehicle_condition
order by average_time desc;



/*
Write a query grouping by Festival and calculating:
Total orders
Average delivery time
Then tell me what the comparison suggests.
*/
select 
count(distinct id) as total_orders, avg(`Time_taken (min)`) as average_time, Festival
from zomato_cleaned
group by Festival
order by average_time desc;



/*
Write a query grouping by City, calculating:
Total orders
Average delivery time
Sort by average delivery time, highest first.
*/
select 
count(distinct id) as total_orders, avg(`Time_taken (min)`) as average_time, city
from zomato_cleaned
group by city
order by average_time desc;






/* 
grouping by Type_of_order, calculating:
Total orders
Average delivery time
*/
select 
count(distinct id) as total_orders, avg(`Time_taken (min)`) as average_time, Type_of_order
from zomato_cleaned
group by Type_of_order
order by average_time desc;




/* 
Does delivery time differ by vehicle type?
*/
select 
count(distinct id) as total_orders, avg(`Time_taken (min)`) as average_time, Type_of_vehicle
from zomato_cleaned
group by Type_of_vehicle
order by average_time desc;



