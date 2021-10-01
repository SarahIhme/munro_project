createdb munros
psql -d munros
CREATE TABLE munros(name VARCHAR, height_m REAL, height_ft INTEGER, grid_ref VARCHAR, grid_ref_xy VARCHAR, xcoord INTEGER, ycoord INTEGER, completed BOOL, munro_id INTEGER PRIMARY KEY);
COPY munros(name, height_m, height_ft, grid_ref, grid_ref_xy, xcoord, ycoord, completed, munro_id)
FROM '/home/sarah/Documents/munro_project/node-postgres/munros.csv'
DELIMITER ','
CSV HEADER;
