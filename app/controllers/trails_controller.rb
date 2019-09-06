class TrailsController < ApplicationController
    def index

        puts "--HIKING API IN INDEX FUNCTION ------------------------------------------"
        @hikingData = JSON.parse HTTParty.get('https://www.hikingproject.com/data/get-trails?lat=33.4152&lon=-111.8315&maxDistance=10&key=200583144-74f526f47bf91dadd7add272542d8019').response.body
        #@hikingData = JSON.parse HTTParty.get("https://www.hikingproject.com/data/get-trails?lat=" + trailLat + "&lon=" + trailLng + "&maxDistance=30&maxResults=5&key=200583144-74f526f47bf91dadd7add272542d8019").response.body
        
        @hikingTrailName= @hikingData["trails"][0]["name"]
        @hikingTrailType= @hikingData["trails"][0]["type"]
        @hikingTrailDifficulty= @hikingData["trails"][0]["difficulty"]
    end



end
