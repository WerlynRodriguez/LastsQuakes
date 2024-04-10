namespace :earthquake_data do
  desc "Fetch earthquake data from last month and store it in the database"

  task fetch: :environment do
    require 'open-uri'

    puts "[Task]: Fetching earthquake data"

    url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
    data = JSON.parse(URI.open(url).read)

    data["features"].each do |feature|
      external_id = feature["id"]

      # Skip if the earthquake already exists
      next if Earthquake.exists?(external_id: external_id)

      properties = feature["properties"]
      geometry = feature["geometry"]

      # This is not raising an exception if the record is invalid
      # Cause we don't want to stop the task if a record is invalid
      Earthquake.create(
        external_id: external_id,
        magnitude: properties["mag"],
        place: properties["place"],
        time: Time.at(properties["time"] / 1000), # Convert from milliseconds to seconds
        tsunami: properties["tsunami"] == 1,
        mag_type: properties["magType"],
        title: properties["title"],
        longitude: geometry["coordinates"][0],
        latitude: geometry["coordinates"][1],
        url: properties["url"]
      )

    end

    puts "[Task]: Earthquake data fetched successfully"
  end
end
