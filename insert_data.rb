require 'open-uri'
require 'json'
_end_point = "http://openstates.org/api/v1/legislators/?state=ny&chamber=upper&apikey=687300e062024e2fbe05f23dae984936"

json_object = JSON.parse(open(_end_point).read)


json_object.each do |x|
  y = Legislator.new(x)  
  y.save
end

# object= Legislator.new(json_object)