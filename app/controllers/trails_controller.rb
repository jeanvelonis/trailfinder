class TrailsController < ApplicationController
    def new
        @trail = Trail.new
    end

    def index
    end

    def create
        redirect_to root_path
    end


end
