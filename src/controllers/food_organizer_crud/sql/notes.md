# Sql folder notes

- Database engine used: [**SQLite**](https://www.sqlite.org/about.html)


- Order to create tables:

<!--- No Foreign keys -->
<!-- Actually tables with not FK could be created in any order -->
1. days
2. units_of_measure_types
3. purchase_places
4. food_types
5. weekly_menus
6. menus

<!--- With Foreign keys -->
7. units_of_measure

8. ingredients
9. ingredient_stock
10. ingredient_purchase_places
11. ingredient_prices

12. foods
13. food_ingredients
14. food_prices

15. menu_foods
16. menu_prices

17. weekly_menu_days
18. weekly_menu_prices