require 'rails_helper'

RSpec.describe TrailsController, type: :controller do
    describe "trails#show action" do 
        it "should successfully show the page if the gram is found" do 
            get :show
            expect(response).to have_http_status(:success)
        end
    end

    describe "trails#index action" do
        it "should successfully show the page" do
          get :index
          expect(response).to have_http_status(:success)
        end
    end

    describe "trails#new action" do
        it "should successfully show the new form" do
            get :new
            expect(response).to have_http_status(:success)
        end
    end

    describe "trails#create action" do
        it "should successfully create a new trail in our database" do
          post :create, params: { trail: { description: 'Winter!' } }
          expect(response).to redirect_to root_path

          trail = Trail.last
          expext(trail.description).to eq("Winter!")
        end
    end 

end
