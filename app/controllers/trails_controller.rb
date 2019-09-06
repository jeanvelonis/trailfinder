class TrailsController < ApplicationController
    def index
        
        puts "--HIKING API IN INDEX FUNCTION ------------------------------------------"
        
        @hikingData = JSON.parse HTTParty.get('https://www.hikingproject.com/data/get-trails?lat=33.4152&lon=-111.8315&maxDistance=10&key=200583144-74f526f47bf91dadd7add272542d8019').response.body
        #@hikingData = JSON.parse HTTParty.get("https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=30&maxResults=5&key=200583144-74f526f47bf91dadd7add272542d8019").response.body
        
        @hikingTrailName= @hikingData["trails"][0]["name"]
        @hikingTrailType= @hikingData["trails"][0]["type"]
        @hikingTrailDifficulty= @hikingData["trails"][0]["difficulty"]
        @hikingTrailLat= @hikingData["trails"][0]["latitude"]
        @hikingTrailLng= @hikingData["trails"][0]["longitude"]
    end

    def new
        puts "YoURE IN TEH NEW FUNCTION------"
        puts @trail 
    end

    def show
        puts "YOURE IN THE SHOW FUNCITON ~~~~~~~~~~~"
        zipCode= params["id"]
        @hikingData = JSON.parse HTTParty.get('https://www.hikingproject.com/data/get-trails?lat=33.4152&lon=-111.8315&maxDistance=10&key=200583144-74f526f47bf91dadd7add272542d8019').response.body
    
    end

end
