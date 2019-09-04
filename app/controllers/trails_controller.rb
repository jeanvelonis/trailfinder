class TrailsController < ApplicationController


    def new
        @trail = Trail.new
    end

    def index
        puts "--UR IN INDEX FUNCTION ------------------------------------------"
        @weatherData = HTTParty.get('https://api.openweathermap.org/data/2.5/weather?zip=85213,us&appid=bef3bd0c3ea4da917953e027b5dc2d91')
        #@weatherData.code, @weatherData.message, @weatherData.headers.inspect
    end

    def create
        redirect_to root_path
    end


end
