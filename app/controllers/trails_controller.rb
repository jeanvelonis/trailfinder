class TrailsController < ApplicationController


    def new
        @trail = Trail.new
    end

    def index
        puts "--WEATHER API IN INDEX FUNCTION ------------------------------------------"
        @weatherData = HTTParty.get('https://api.openweathermap.org/data/2.5/weather?zip=85213,us&appid=bef3bd0c3ea4da917953e027b5dc2d91')
        #@weatherData.code, @weatherData.message, @weatherData.headers.inspect

        puts "--HIKING API IN INDEX FUNCTION ------------------------------------------"
        @hikingData = JSON.parse HTTParty.get('https://www.hikingproject.com/data/get-trails?lat=33.4152&lon=-111.8315&maxDistance=10&key=200583144-74f526f47bf91dadd7add272542d8019').response.body
        @hikingTrailName= @hikingData["trails"][0]["name"]
    end

    def create
        redirect_to root_path
    end


end
