
require 'twilio-ruby'

class MakeCallsController < ApplicationController
  

  def connect_calls
    talk_to_twilio
  end

  def talk_to_twilio
    account_sid =  'YOUR_ACCOUNT_SID'
    auth_token  =  'YOUR_ACCOUNT_TOKEN'
    @client     =  Twilio::REST::Client.new(account_sid, auth_token)
    # call appears from
    from_num    =  'SPOOF_NUMBER'
    # this should be the web users #
    to_num      =  params[:userPhone]

    #callback url
    url = "#{callback_url}"
    # make call
    @call = @client.account.calls.create({
      :from => from_num, 
      :to => to_num, 
      # this should be the senator
      :url => "#{url}?to=#{params[:senPhone]}"
    })
  end


  def callback
    render layout: false
  end
 

end
