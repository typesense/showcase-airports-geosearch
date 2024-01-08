.mode csv
.import ./source/airports.csv airports
.import ./source/countries.csv countries
.import ./source/regions.csv regions

.mode columns
.headers ON

ALTER TABLE 
  countries RENAME COLUMN code TO iso_country;
ALTER TABLE 
  countries RENAME COLUMN name TO country_name;
ALTER TABLE 
  countries RENAME COLUMN continent TO country_continent;
ALTER TABLE 
  regions RENAME COLUMN code TO iso_region;
ALTER TABLE 
  regions RENAME COLUMN name TO region_name;
ALTER TABLE 
  regions RENAME COLUMN continent TO region_continent;

CREATE VIEW out AS 
SELECT 
  * 
FROM 
  airports 
  INNER JOIN (
    SELECT 
      iso_country, 
      country_name, 
      country_continent 
    FROM 
      countries
  ) AS countries ON airports.iso_country = countries.iso_country 
  INNER JOIN (
    SELECT 
      iso_region, 
      region_name, 
      region_continent 
    from 
      regions
  ) AS regions ON airports.iso_region = regions.iso_region;


.mode csv
.output data.csv

SELECT 
  id, 
  ident, 
  type, 
  name, 
  latitude_deg, 
  longitude_deg, 
  elevation_ft, 
  continent, 
  iso_country, 
  iso_region, 
  municipality, 
  scheduled_service, 
  gps_code, 
  iata_code, 
  local_code, 
  home_link, 
  wikipedia_link, 
  keywords, 
  country_name, 
  region_name 
FROM 
  out;

.output stdout