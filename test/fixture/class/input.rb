class HealthController < ApplicationController
  def health
    render plain: 'up'
  end
end
