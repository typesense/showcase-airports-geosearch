.mode csv
.import ./source/airports.csv airports
.import ./source/countries.csv countries
.import ./source/regions.csv regions
.import ./source/runways.csv runways

.mode columns
.headers ON

CREATE VIEW out AS
SELECT
  *
FROM 
  airports
  INNER JOIN (
    SELECT
      code AS iso_country,
      name AS country_name
    FROM
      countries
  ) AS countries ON airports.iso_country = countries.iso_country
  INNER JOIN (
    SELECT
      code AS iso_region,
      name AS region_name
    FROM
      regions
  ) AS regions ON airports.iso_region = regions.iso_region
  INNER JOIN (
    SELECT
      airport_ident AS ident,
      COUNT(*) AS num_runways
    FROM
      runways
    WHERE closed = 0
    GROUP BY
      ident
  ) AS runways ON airports.ident = runways.ident
ORDER BY RANDOM();

.mode csv
.output data.csv

SELECT * FROM out;

.output stdout